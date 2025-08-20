// =============================================
// RSVP Tracking – Next.js (App Router) on Vercel
// Minimal end‑to‑end starter for link tracking + RSVP
// =============================================

// ---------- file: package.json ----------
{
  "name": "rsvp-tracking-starter",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:migrate": "node scripts/migrate.js"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "@vercel/postgres": "^0.9.0",
    "jose": "^5.2.4"
  },
  "devDependencies": {
    "typescript": "5.6.2",
    "@types/node": "22.5.2",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5"
  }
}

// ---------- file: next.config.js ----------
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { serverActions: { bodySizeLimit: '2mb' } }
};
module.exports = nextConfig;

// ---------- file: .env.example ----------
# Copy to .env.local
POSTGRES_URL="postgres://user:pass@host:5432/db"
TOKEN_SECRET="change-me-32-bytes-or-more"
BASE_URL="http://localhost:3000"

// ---------- file: scripts/migrate.js ----------
// Lightweight migration runner for @vercel/postgres
import { sql } from '@vercel/postgres';

async function main() {
  await sql`CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id TEXT NOT NULL,
    channel TEXT NOT NULL,
    campaign_id TEXT,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
  );`;

  await sql`CREATE TABLE IF NOT EXISTS message_tokens (
    token TEXT PRIMARY KEY,
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ,
    purpose TEXT NOT NULL
  );`;

  await sql`CREATE TABLE IF NOT EXISTS message_events (
    id BIGSERIAL PRIMARY KEY,
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payload JSONB DEFAULT '{}'::jsonb,
    source TEXT
  );`;

  console.log('Migrations applied');
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });

// ---------- file: app/layout.tsx ----------
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui', padding: 24, maxWidth: 720, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <h1>RSVP Tracking Starter</h1>
        </header>
        {children}
      </body>
    </html>
  );
}

// ---------- file: app/page.tsx ----------
export default function Home() {
  return (
    <main>
      <p>Use tokenized links like <code>/r/&lt;token&gt;?cta=rsvp_yes</code> in your emails/iMessages.</p>
      <p>API routes:
        <ul>
          <li>GET <code>/api/r/[token]</code> – click redirect handler</li>
          <li>POST <code>/api/rsvp</code> – final RSVP action</li>
          <li>POST <code>/api/webhooks/email-inbound</code> – email reply webhook</li>
        </ul>
      </p>
    </main>
  );
}

// ---------- file: lib/db.ts ----------
import { sql } from '@vercel/postgres';
export { sql };

// ---------- file: lib/tokens.ts ----------
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET || 'dev-secret');

export type TokenPayload = { m: string; purpose: string; exp?: number };

export async function makeToken(payload: TokenPayload) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = payload.exp ?? iat + 60 * 60 * 24 * 7; // 7d
  return await new SignJWT({ m: payload.m, purpose: payload.purpose })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as TokenPayload;
}

// ---------- file: app/api/r/[token]/route.ts ----------
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/tokens';

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
  const url = new URL(req.url);
  const cta = url.searchParams.get('cta') || undefined; // rsvp_yes | rsvp_no | undefined
  try {
    const t = await verifyToken(params.token);
    const messageId = t.m;

    await sql`INSERT INTO message_events (message_id, event_type, source, payload)
              VALUES (${messageId}, 'clicked', 'link', ${ { ua: req.headers.get('user-agent') } as any });`;

    if (cta === 'rsvp_yes' || cta === 'rsvp_no') {
      await sql`INSERT INTO message_events (message_id, event_type, source)
                VALUES (${messageId}, ${cta}, 'link');`;
      const thanks = new URL('/thanks', process.env.BASE_URL);
      thanks.searchParams.set('choice', cta.replace('rsvp_', ''));
      return NextResponse.redirect(thanks, 302);
    }

    const rsvp = new URL('/rsvp', process.env.BASE_URL);
    rsvp.searchParams.set('token', params.token);
    return NextResponse.redirect(rsvp, 302);
  } catch (e) {
    return new NextResponse('Invalid or expired token', { status: 400 });
  }
}

// ---------- file: app/api/rsvp/route.ts ----------
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { verifyToken } from '@/lib/tokens';

export async function POST(req: NextRequest) {
  const { token, choice } = await req.json(); // choice: 'yes' | 'no'
  if (!token || !['yes', 'no'].includes(choice)) return NextResponse.json({ ok: false }, { status: 400 });
  const { m: messageId } = await verifyToken(token);
  await sql`INSERT INTO message_events (message_id, event_type, source)
            VALUES (${messageId}, ${`rsvp_${choice}`}, 'api');`;
  return NextResponse.json({ ok: true });
}

// ---------- file: app/api/webhooks/email-inbound/route.ts ----------
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// Configure your email provider to POST the payload here
export async function POST(req: NextRequest) {
  const payload = await req.json();
  // Example provider fields — adapt to your provider
  const to = (payload.to?.[0] || '').toString(); // e.g., reply+<token>@yourdomain.com
  const match = to.match(/\+([^@]+)@/);
  if (!match) return NextResponse.json({ ok: false }, { status: 400 });
  const token = match[1];

  // If you also sign tokens, you could verify here and extract messageId from provider-custom headers.
  // For simplicity, store email as payload and link later if needed.
  await sql`INSERT INTO message_events (message_id, event_type, source, payload)
            SELECT m.id, 'reply_inbound', 'email-webhook', ${payload as any}
            FROM message_tokens t JOIN messages m ON m.id = t.message_id
            WHERE t.token = ${token} LIMIT 1;`;

  return NextResponse.json({ ok: true });
}

// ---------- file: app/rsvp/page.tsx ----------
'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function RSVP() {
  const sp = useSearchParams();
  const token = sp.get('token') || '';
  const [status, setStatus] = useState<'idle'|'saving'|'done'>('idle');

  async function submit(choice: 'yes'|'no') {
    setStatus('saving');
    const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, choice }) });
    setStatus(res.ok ? 'done' : 'idle');
  }

  return (
    <main>
      <h2>Confirm your RSVP</h2>
      <p>Tap a button below to respond.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => submit('yes')} disabled={status!=='idle'}>Yes</button>
        <button onClick={() => submit('no')} disabled={status!=='idle'}>No</button>
      </div>
      {status==='done' && <p>Thanks! You can close this page.</p>}
    </main>
  );
}

// ---------- file: app/thanks/page.tsx ----------
import { Suspense } from 'react';
import ThanksInner from './thanksInner';
export default function Page() { return <Suspense><ThanksInner/></Suspense>; }

// ---------- file: app/thanks/thanksInner.tsx ----------
'use client';
import { useSearchParams } from 'next/navigation';
export default function ThanksInner() {
  const sp = useSearchParams();
  const choice = sp.get('choice');
  return <main><h2>Thanks for your RSVP{choice?`: ${choice.toUpperCase()}`:''}!</h2></main>;
}

// ---------- file: app/dashboard/page.tsx ----------
import { sql } from '@/lib/db';

export default async function Dashboard() {
  const { rows: summary } = await sql`SELECT campaign_id,
    COUNT(*) AS sent,
    COUNT(*) FILTER (WHERE EXISTS (SELECT 1 FROM message_events e WHERE e.message_id=m.id AND e.event_type='clicked')) AS clicked,
    COUNT(*) FILTER (WHERE EXISTS (SELECT 1 FROM message_events e WHERE e.message_id=m.id AND e.event_type IN ('rsvp_yes','rsvp_no'))) AS rsvpd
    FROM messages m
    GROUP BY campaign_id
    ORDER BY campaign_id;`;

  return (
    <main>
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr><th>Campaign</th><th>Sent</th><th>Clicked</th><th>RSVP’d</th></tr>
        </thead>
        <tbody>
          {summary.map((r:any) => (
            <tr key={r.campaign_id}>
              <td>{r.campaign_id}</td>
              <td>{r.sent}</td>
              <td>{r.clicked}</td>
              <td>{r.rsvpd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

// ---------- file: app/(admin)/seed/page.tsx ----------
import { sql } from '@/lib/db';
import { makeToken } from '@/lib/tokens';

export default async function Seed() {
  const campaign = 'demo-001';
  const recipient_id = 'alice@example.com';
  const channel = 'email';
  const { rows } = await sql`INSERT INTO messages (recipient_id, channel, campaign_id)
                             VALUES (${recipient_id}, ${channel}, ${campaign}) RETURNING id;`;
  const messageId = rows[0].id as string;
  const token = await makeToken({ m: messageId, purpose: 'rsvp' });
  await sql`INSERT INTO message_tokens (token, message_id, purpose, expires_at)
            VALUES (${token}, ${messageId}, 'rsvp', NOW() + INTERVAL '7 days');`;

  const linkYes = `${process.env.BASE_URL}/api/r/${token}?cta=rsvp_yes`;
  const linkNo = `${process.env.BASE_URL}/api/r/${token}?cta=rsvp_no`;

  return (
    <main>
      <h2>Seeded one demo message</h2>
      <p>Share these links to simulate RSVP:</p>
      <ul>
        <li><a href={linkYes}>{linkYes}</a></li>
        <li><a href={linkNo}>{linkNo}</a></li>
      </ul>
    </main>
  );
}
