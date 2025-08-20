import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./clientloop.css"; // keep your external stylesheet

// NOTE: Place your images/videos (CL.png, founder.jpg, satya.jpg, generic-outreach.png, sync.mp4, time.mp4,
// nvidia.png, nsf.png, google1.png, client1.jpg, client2.jpg, client3.jpg, Message.png) in /public.

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyPxKb5c3Oi8Ntr9YC2gBuVg_CvEv2jvIwbQmE6qC6PuzCrfBqfgpL09M-Hg_qnoQeOlA/exec";

/* =========================
   Header (floating pill nav)
========================= */
function Header() {
  const [open, setOpen] = useState(false);
  const handleLinkClick = () => setOpen(false);

  return (
    <header className="header">
      <style>{`
        :root { --header-h:72px; --accent:#36c48d; --text:#0b3b2e; }

        .header { position: sticky; top: 0; z-index: 1000; display: flex; justify-content: center; padding: 12px 0; background: transparent; }
        .navbar { background: rgba(54,196,141,0.18); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-radius: 999px; border: 1px solid rgba(54,196,141,0.35); display:flex; align-items:center; justify-content: space-between; padding: 8px 20px; gap: 24px; box-shadow: 0 8px 22px rgba(0,0,0,0.08); width: min(940px, 92%); }

        .logo { font-weight: 800; font-size: 1.15rem; color: var(--text); white-space: nowrap; }
        .logo .brand { color: var(--accent); }

        .nav-links { display:flex; gap:16px; list-style:none; margin:0; padding:0; }
        .nav-links li { position:relative; }
        .nav-links a { text-decoration:none; color: var(--text); font-weight:600; padding: 8px 16px; border-radius: 999px; transition: all .25s ease; background: rgba(255,255,255,0.18); }
        .nav-links a:hover { color:#fff; background: var(--accent); box-shadow: 0 0 0 2px rgba(54,196,141,0.35); }

        .nav-links li:not(:last-child)::after { content:""; position:absolute; right:-10px; top:50%; width:20px; height:2px; background: rgba(54,196,141,0.35); transform: translateY(-50%); transition: background 0.3s; }
        .nav-links li:hover::after { background: var(--accent); }

        .nav-ctas { display:flex; gap:10px; }
        .btn-primary { background: var(--accent); color:#fff; padding:10px 18px; border-radius:999px; font-weight:700; text-decoration:none; box-shadow: 0 0 12px rgba(54,196,141,0.35); transition: all .25s ease; }
        .btn-primary:hover { box-shadow: 0 0 18px rgba(54,196,141,0.55); }
        .btn-glass { background: rgba(255,255,255,0.22); color: var(--text); padding:10px 18px; border-radius:999px; border:1px solid rgba(0,0,0,0.05); font-weight:700; text-decoration:none; transition: background .25s ease; }
        .btn-glass:hover { background: rgba(255,255,255,0.35); }

        .menu-toggle { display:none; }

        @media (max-width: 880px) {
          .navbar { flex-wrap: wrap; justify-content:center; gap:14px; width: min(100%, 94%); }
          .nav-links { display:none; }
          .nav-links.active { display:flex; flex-direction: column; align-items: stretch; position: absolute; top: calc(100% + 8px); left: 50%; transform: translateX(-50%); background: rgba(54,196,141,0.18); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(54,196,141,0.3); border-radius: 18px; padding: 10px; gap: 10px; box-shadow: 0 10px 24px rgba(0,0,0,0.12); }
          .nav-links li:not(:last-child)::after { display:none; }
          .menu-toggle { display:block; border: 1px solid rgba(0,0,0,0.08); background: rgba(255,255,255,0.24); border-radius: 12px; padding: 8px; cursor:pointer; }
          .menu-toggle span { width:22px; height:2px; background:#0b3b2e; display:block; border-radius:2px; }
          .menu-toggle span + span { margin-top:5px; }
          .nav-ctas { display:none; }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo"><span className="brand">Clientloop</span></div>
        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li><a href="#stories" onClick={handleLinkClick}>Stories</a></li>
          <li><a href="#solutions" onClick={handleLinkClick}>Solutions</a></li>
          <li><a href="#clients" onClick={handleLinkClick}>Clients</a></li>
          <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
        </ul>
        <div className="nav-ctas">
          <a href="/signin" className="btn-glass">Sign in</a>
          <a href="/signup" className="btn-primary">Sign up</a>
        </div>
        <button className="menu-toggle" aria-label="Toggle navigation menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  );
}

/* =========================
   Hero (calm connections + phone slider)
========================= */
function Hero() {
  const slides = [
    { src: "/Splash%20Screen.png", alt: "Splash" },
    { src: "/Onboarding.png", alt: "Onboarding 1" },
    { src: "/Onboarding%205.png", alt: "Onboarding 2" },
    { src: "/Onboarding%206.png", alt: "Onboarding 3" },
    { src: "/Onboarding%207.png", alt: "Onboarding 4" },
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % slides.length), 3000);
    return () => clearInterval(t);
  }, [slides.length]);

  const nodes = [
    { id: 0, x: 120, y: 140 },
    { id: 1, x: 340, y: 100 },
    { id: 2, x: 560, y: 140 },
    { id: 3, x: 780, y: 100 },
    { id: 4, x: 960, y: 140 },
    { id: 5, x: 230, y: 300 },
    { id: 6, x: 460, y: 340 },
    { id: 7, x: 690, y: 300 },
  ];
  const edges = [[0,1],[1,2],[2,3],[3,4],[1,5],[2,6],[3,7],[5,6],[6,7]];
  const highlightCycle = [0,1,2,3,7,8];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEdge = highlightCycle[activeIndex];
  useEffect(() => {
    const int = setInterval(() => setActiveIndex((i) => (i + 1) % highlightCycle.length), 1800);
    return () => clearInterval(int);
  }, []);
  const byId = (id) => nodes.find((n) => n.id === id);

  return (
    <section className="hero" id="home">
      <style>{`
        html, body { overflow-x: hidden; }
        body {
          background:
            radial-gradient(1100px 420px at 18% -8%, #e9f7f0 0%, transparent 65%),
            linear-gradient(180deg, #f6fbf8 0%, #f9fdfb 55%, #ffffff 100%);
          background-attachment: fixed;
        }
        :root { --header-h:72px; --accent:#36c48d; --text:#0b3b2e; --muted:#5b6b64; }

        .hero { position: relative; padding-bottom: clamp(40px, 12vh, 140px); color: var(--text); overflow: clip; }

        .connections { position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.42; -webkit-mask-image: radial-gradient(140% 80% at 50% 10%, #000 60%, transparent 100%); mask-image: radial-gradient(140% 80% at 50% 10%, #000 60%, transparent 100%); }
        .connections svg { width: 120%; height: 120%; position: absolute; left: -10%; top: -6%; }

        .edge { stroke: #2fa97a; stroke-opacity: 0.12; stroke-width: 1.4; }
        .edge--active { stroke: #36c48d; stroke-opacity: 0.85; stroke-width: 2.4; filter: url(#glow); stroke-dasharray: 7 12; animation: dashFlow 1.6s linear infinite, throb 2.2s ease-in-out infinite; }

        .node { fill: #1f5f4a; opacity: 0.22; }
        .nodePulse { fill: #36c48d; opacity: 0.06; transform-box: fill-box; transform-origin: center; animation: pulse 3.2s ease-in-out infinite; }
        .node--active { fill: #36c48d; opacity: 0.9; filter: url(#glow); }
        .nodePulse--active { opacity: 0.12; animation-duration: 2s; transform: scale(1.15); }

        @keyframes pulse { 0%,100% { transform: scale(1);} 50% { transform: scale(1.08);} }
        @keyframes dashFlow { to { stroke-dashoffset: -22; } }
        @keyframes throb { 0%,100% { stroke-width: 2.4; } 50% { stroke-width: 2.8; } }

        .hero-stick { position: sticky; top: calc(var(--header-h) + 0.5vh); z-index: 2; padding: 2px 16px 0; }
        .hero-title { text-align: center; font-weight: 900; letter-spacing: -0.02em; line-height: 1.03; margin: 0 0 16px; font-size: clamp(40px, 7.5vw, 88px); }
        .hero-title span { padding: 0 .18em; border-radius: 10px; background: linear-gradient(transparent 62%, rgba(54,196,141,0.28) 0); -webkit-box-decoration-break: clone; box-decoration-break: clone; }
        .stage { width: min(1100px, 92vw); margin: 0 auto; }
        .hero-stick .stage { margin-top: clamp(40px, 10vh, 128px); }

        .phone-layer { position: relative; z-index: 3; }
        .stack { display: grid; grid-template-columns: auto clamp(280px, 32vw, 420px); align-items: center; gap: clamp(18px, 5vw, 56px); justify-content: center; }

        .phone-shell { position: relative; width: clamp(240px, 28vw, 340px); border-radius: 42px; padding: 12px; background: linear-gradient(145deg,#2b2b2b,#0f0f0f); box-shadow: 0 22px 60px rgba(0,0,0,0.16); border: 1px solid rgba(255,255,255,0.08); }
        .phone-shell::before { content: ""; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 36%; height: 22px; background: #0f0f0f; border-radius: 14px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.05); }
        .phone-screen { border-radius: 32px; overflow: hidden; background: #fff; }
        .viewport { width: 100%; aspect-ratio: 375 / 812; overflow: hidden; }
        .track { display: flex; height: 100%; transition: transform 520ms ease; }
        .slide { flex: 0 0 100%; height: 100%; }
        .slide img { display: block; width: 100%; height: 100%; object-fit: cover; }

        .chat { position: relative; background: #ffffff; border-radius: 18px; padding: 18px 20px; border: 2px dashed rgba(54,196,141,0.45); box-shadow: 0 14px 38px rgba(0,0,0,0.08), 0 2px 8px rgba(16,185,129,0.10); max-width: clamp(260px, 40vw, 420px); }
        .chat p { margin: 0; color: var(--muted); font-size: clamp(16px, 1.5vw, 20px); }
        .chat-ctas { display:flex; gap: 10px; margin-top: 12px; flex-wrap: wrap; }
        .chat-ctas .btn-primary { background:#36c48d; color:#fff; padding:10px 16px; border-radius:999px; font-weight:700; text-decoration:none; }
        .chat-ctas .btn-glass { background:rgba(255,255,255,0.4); color:#0b3b2e; padding:10px 16px; border-radius:999px; border:1px solid rgba(0,0,0,0.08); backdrop-filter: blur(6px); font-weight:700; text-decoration:none; }

        @keyframes chatSwing { 0%,100%{ transform: rotate(0deg) translateY(0);} 50%{ transform: rotate(-1deg) translateY(-2px);} }
        @keyframes mouthTalk { 0%,100%{ transform: rotate(45deg) scaleY(1);} 50%{ transform: rotate(45deg) scaleY(0.9);} }
        .chat.swing { animation: chatSwing 4.2s ease-in-out infinite; transform-origin: 12% 10%; }
        .chat.swing::after { content: ""; position: absolute; left: -10px; top: 32px; width: 20px; height: 20px; background: #ffffff; border-left: 2px dashed rgba(54,196,141,0.45); border-bottom: 2px dashed rgba(54,196,141,0.45); border-bottom-left-radius: 6px; animation: mouthTalk 2.4s ease-in-out infinite; }

        .dots { display:flex; gap:8px; justify-content:center; margin-top:10px; z-index: 3; position: relative; }
        .dot { width: 8px; height: 8px; border-radius: 999px; background: #d1d5db; cursor: pointer; }
        .dot.active { width: 18px; background: var(--accent); }

        @media (prefers-reduced-motion: reduce) { .edge--active, .nodePulse, .nodePulse--active, .chat.swing, .chat.swing::after { animation: none !important; } .track { transition: none; } }
        @media (max-width: 980px) { .stack { grid-template-columns: 1fr; } .phone-shell { width: min(300px, 84vw); margin: 0 auto; } .chat { max-width: 680px; margin: 14px auto 0; } }
      `}</style>

      {/* Connections background */}
      <div className="connections" aria-hidden="true">
        <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {edges.map(([a,b], i) => { const na = byId(a); const nb = byId(b); const isActive = i === activeEdge; return (<line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} className={isActive ? "edge edge--active" : "edge"} />); })}
          {nodes.map((n) => { const current = edges[activeEdge]; const isEndpoint = current && (current[0] === n.id || current[1] === n.id); return (<g key={n.id}><circle cx={n.x} cy={n.y} r="5" className={`node${isEndpoint ? " node--active" : ""}`} /><circle cx={n.x} cy={n.y} r="12" className={`nodePulse${isEndpoint ? " nodePulse--active" : ""}`} /></g>); })}
        </svg>
      </div>

      {/* Foreground content */}
      <div className="hero-stick">
        <h1 className="hero-title"><span>Build lasting sales, not just contacts.</span></h1>
        <div className="stage">
          <div className="phone-layer">
            <div className="stack">
              <div className="phone-shell">
                <div className="phone-screen">
                  <div className="viewport">
                    <div className="track" style={{ transform: `translateX(${-index * 100}%)` }}>
                      {slides.map((s, idx) => (<div className="slide" key={idx}><img src={s.src} alt={s.alt} /></div>))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat swing" data-aos="fade-left">
                <p>Let Clientloop handle the relationship rhythm—smart connections that stay warm and natural.</p>
                <div className="chat-ctas">
                  <a href="#contact" className="btn-primary">Get Started</a>
                  <a href="/login.html" className="btn-glass">Download on App Store</a>
                </div>
              </div>
            </div>
            <div className="dots">{slides.map((_, i) => (<div key={i} className={"dot" + (i === index ? " active" : "")} onClick={() => setIndex(i)} />))}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Metrics (parallax)
========================= */
function Metrics() {
  const [coldDays, setColdDays] = useState(0);
  const [multiplier, setMultiplier] = useState(0);

  useEffect(() => {
    const cards = document.querySelectorAll(".metric-box");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          if (e.target.dataset.key === "cold" && coldDays === 0) runCount(14, 800, setColdDays);
          if (e.target.dataset.key === "multi" && multiplier === 0) runCount(5, 900, setMultiplier);
        }
      });
    }, { threshold: 0.35 });
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [coldDays, multiplier]);

  useEffect(() => {
    const boxes = Array.from(document.querySelectorAll(".metric-box"));
    if (!boxes.length) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        boxes.forEach((el) => {
          const r = el.getBoundingClientRect();
          const p = ((r.top + r.height / 2) - vh / 2) / (vh / 2);
          const speed = parseFloat(el.dataset.speed || "0.12");
          el.style.setProperty("--ty", `${-p * 20 * speed}px`);
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  function runCount(target, duration, setter) {
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setter(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return (
    <section className="metrics-section">
      <style>{`
        .metrics-section { padding: clamp(64px, 11vh, 160px) 1.5rem 4.5rem; background: linear-gradient(180deg, rgba(54,196,141,0.08) 0 22%, transparent 22%); overflow: clip; }
        .metrics-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 28px; }
        @media (max-width: 900px) { .metrics-grid { grid-template-columns: 1fr; } }

        .metric-box { --rx: 0deg; --ry: 0deg; --ty: 0px; position: relative; background: #ffffff; border-radius: 32px; padding: clamp(28px, 4vw, 44px) clamp(32px, 4.5vw, 56px); min-height: clamp(220px, 28vh, 320px); border: 1px solid #eef2ef; box-shadow: 0 40px 120px rgba(34,197,94,0.10), 0 8px 20px rgba(0,0,0,0.06); transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(calc(22px + var(--ty))); opacity: 0; transition: transform .6s ease, box-shadow .3s ease, opacity .6s ease; will-change: transform; }
        .metric-box.in { opacity: 1; transform: perspective(900px) rotateX(0deg) rotateY(0deg) translateY(var(--ty)); animation: cardFloat 7s ease-in-out .4s infinite; }
        @keyframes cardFloat { 0%,100% { transform: translateY(var(--ty)); } 50% { transform: translateY(calc(var(--ty) - 6px)); } }
        .metric-box:hover { transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(calc(var(--ty) - 6px)); box-shadow: 0 50px 130px rgba(34,197,94,0.14), 0 12px 26px rgba(0,0,0,0.10); }

        .metrics-eyebrow { font-weight: 800; color: #55636a; display: inline-flex; align-items:center; gap: 10px; margin-bottom: 12px; font-size: clamp(16px, 1.6vw, 20px); }
        .metric-value { font-size: clamp(40px, 6.8vw, 72px); font-weight: 900; color: #0f172a; margin: 8px 0; letter-spacing: -0.02em; }
        .metric-label { color: #5b6b64; margin: 0; font-size: clamp(16px, 1.6vw, 20px); }
      `}</style>

      <div className="metrics-grid">
        <div className="metric-box" data-key="cold" data-speed="0.10">
          <div className="metrics-eyebrow">🧊 Most networks go cold in</div>
          <div className="metric-value">{coldDays}<span style={{fontSize:"0.5em"}}> days</span></div>
          <p className="metric-label">Clientloop keeps them warm automatically</p>
        </div>

        <div className="metric-box" data-key="multi" data-speed="0.14">
          <div className="metrics-eyebrow">🔥 Clientloop vs. cold outreach</div>
          <div className="metric-value">{multiplier}<span style={{fontSize:"0.5em"}}>x</span></div>
          <p className="metric-label">Increase in response rates</p>
        </div>

        <div className="metric-box" data-key="sms" data-speed="0.12">
          <div className="metrics-eyebrow">💬 Built to work with your</div>
          <div className="metric-value">SMS</div>
          <p className="metric-label">not another app you'll forget to open</p>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Stories (elevated cards)
========================= */
function Stories() {
  return (
    <section className="story-section" id="stories">
      <style>{`
        .story-section {
          padding: clamp(72px, 12vh, 140px) 1.5rem;
          background:
            radial-gradient(1200px 420px at 10% -10%, rgba(54,196,141,.08), transparent 60%),
            radial-gradient(1000px 380px at 110% 110%, rgba(54,196,141,.08), transparent 60%);
        }
        .story-head {
          max-width: 1000px; margin: 0 auto 28px; text-align: center;
        }
        .story-title {
          font-size: clamp(28px, 4.6vw, 44px); font-weight: 900; letter-spacing: -0.02em; color:#0f172a; margin:0;
        }
        .story-sub {
          color:#56636a; margin:10px auto 0; max-width: 760px; font-size: clamp(15px, 1.6vw, 18px);
        }

        .story-grid {
          max-width: 1100px; margin: 34px auto 0;
          display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 22px;
        }
        @media (max-width: 900px) { .story-grid { grid-template-columns: 1fr; } }

        .story-card {
          position: relative; overflow: hidden; border-radius: 28px;
          background: linear-gradient(180deg, #ffffff 0%, #fbfdfc 100%);
          border:1px solid #eef2ef;
          box-shadow: 0 30px 90px rgba(34,197,94,0.08), 0 6px 18px rgba(0,0,0,0.06);
          display: grid; grid-template-columns: 120px 1fr; gap: 18px; align-items: center;
          padding: clamp(18px, 3vw, 28px);
        }
        @media (max-width: 560px) { .story-card { grid-template-columns: 1fr; text-align: left; } }

        .story-photo {
          width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 20px;
          box-shadow: 0 10px 26px rgba(0,0,0,.08);
        }

        .story-quote {
          position: relative; margin: 0; color:#384750; font-size: clamp(15px, 1.7vw, 18px); line-height: 1.55;
        }
        .story-quote::before {
          content: "“"; position: absolute; left: -18px; top: -10px; font-size: 42px; line-height: 1; color: rgba(54,196,141,.55);
        }
        .story-author {
          margin: 10px 0 0; font-weight: 800; color:#0b3b2e; letter-spacing: .01em;
        }
      `}</style>

      <div className="story-head">
        <h2 className="story-title">Our Purpose in Building</h2>
        <p className="story-sub">Relationships—not blasts. We’re crafting tools that keep connections warm and human at scale.</p>
      </div>

      <div className="story-grid">
        <article className="story-card" data-aos="fade-up">
          <img src="/founder.jpg" alt="Bella Y." className="story-photo" />
          <div>
            <p className="story-quote">
              With a background in ecommerce, I learned the work isn’t sending more—it’s saying the right thing at the right time. That’s what Clientloop makes effortless.
            </p>
            <p className="story-author">— Bella Y., Co-founder</p>
          </div>
        </article>

        <article className="story-card" data-aos="fade-up" data-aos-delay="120">
          <img src="/arbi.jpg" alt="Arbi T." className="story-photo" />
          <div>
            <p className="story-quote">
              Using Clientloop has changed the way I start my day. Waking up to thoughtful replies from past connections is not just exciting — it reminds me how powerful staying engaged can be.
            </p>
            <p className="story-author">— Arbi T., Co-founder</p>
          </div>
        </article>
      </div>
    </section>
  );
}

/* =========================
   PhoneFrame helper
========================= */
function PhoneFrame({ children }) {
  return (
    <div className="phone-shell">
      <div className="phone-screen">
        <div className="viewport" style={{ position: "relative" }}>{children}</div>
      </div>
    </div>
  );
}

/* =========================
   FeatureSplit (top-aligned phone compare)
========================= */
function FeatureSplit({
  id,
  title,
  body,
  reverse = false,
  videoSrc,
  poster,
  ctaPrimary,
  ctaSecondary,
  compareImages,
  compareFit = "top-contain", // "cover" | "contain" | "top-contain" (default here)
}) {
  const sectionRef = React.useRef(null);
  const copyRef = React.useRef(null);
  const mediaRef = React.useRef(null);
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = [copyRef.current, mediaRef.current].filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          targets.forEach((el) => el?.classList.add("in"));
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const copyDir = reverse ? "reveal-right" : "reveal-left";
  const mediaDir = reverse ? "reveal-left" : "reveal-right";

  return (
    <section className={"feature-section" + (reverse ? " reverse" : "")} id={id} ref={sectionRef}>
      <style>{`
  .feature-section { position: relative; padding: clamp(56px, 9vh, 120px) 1.5rem; overflow: clip; isolation: isolate; }
  .feature-section::before { content: ""; position: absolute; inset: 0;
    background: radial-gradient(1100px 360px at 10% -10%, rgba(54,196,141,.08), transparent 60%),
                radial-gradient(1200px 420px at 120% 110%, rgba(54,196,141,.08), transparent 60%); z-index: -1; }

  .feature-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.05fr 1fr; grid-template-areas: "copy media"; gap: clamp(24px, 5vw, 56px); align-items: center; }
  .feature-copy  { grid-area: copy; }
  .feature-media { grid-area: media; }
  .feature-section.reverse .feature-inner { grid-template-columns: 1fr 1.05fr; grid-template-areas: "media copy"; }

  .feature-copy { background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    border:1px solid #eef2ef; border-radius: 28px; padding: clamp(22px, 3.8vw, 38px); box-shadow: 0 24px 80px rgba(0,0,0,0.06); }
  .feature-eyebrow { display:inline-flex; align-items:center; gap:8px; font-weight: 800; color:#56636a; margin-bottom: 8px; }
  .feature-title { font-size: clamp(28px, 4.8vw, 44px); line-height: 1.1; letter-spacing:-0.02em; margin: 6px 0 12px; color:#0f172a; font-weight: 900; }
  .feature-body { color:#485660; font-size: clamp(16px,1.6vw,19px); }
  .feature-ctas { display:flex; gap:10px; margin-top: 16px; flex-wrap: wrap; }
  .btn-primary { background:#36c48d; color:#fff; padding:10px 16px; border-radius:999px; font-weight:800; text-decoration:none; }
  .btn-glass   { background:rgba(255,255,255,0.24); color:#0b3b2e; padding:10px 16px; border-radius:999px; border:1px solid rgba(0,0,0,0.06); font-weight:800; text-decoration:none; }

  .media-wrap { display:flex; align-items:center; gap: 12px; }
  .feature-section.reverse .media-wrap { flex-direction: row-reverse; }

  /* Phone frame */
  .phone-shell {
    position: relative; width: clamp(260px, 34vw, 380px); border-radius: 44px; padding: 12px;
    background: linear-gradient(145deg,#2b2b2b,#0f0f0f); box-shadow: 0 22px 60px rgba(0,0,0,0.16); border: 1px solid rgba(255,255,255,0.08);
    animation: floaty 7s ease-in-out infinite;
  }
  .phone-shell::before { content: ""; position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 36%; height: 22px; background: #0f0f0f; border-radius: 14px; box-shadow: inset 0 -1px 0 rgba(255,255,255,0.05); }
  .phone-screen { border-radius: 32px; overflow: hidden; background: #fff; }

  /* IMPORTANT: viewport aligns children to the TOP so contained images leave blank space at bottom */
  .viewport {
    width: 100%; aspect-ratio: 375 / 812; overflow: hidden; position: relative;
    display:flex; align-items:flex-start; justify-content:center;
  }

  /* Default "cover" for generic artwork; we override for fit modes below */
  .viewport video, .viewport img { width: 100%; height: 100%; display: block; object-fit: cover; }

  /* Compare slider */
  .compare-wrap { position: relative; width: 100%; height: 100%; overflow: hidden; }
  .compare-track { display: flex; width: 200%; height: 100%; transition: transform .6s cubic-bezier(.2,.8,.2,1); }
  .compare-wrap.is-hover .compare-track { transform: translateX(-50%); }
  .compare-img { flex: 0 0 50%; height: 100%; }
  .compare-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* FIT MODES */
  .compare-wrap.fit-contain .compare-img img { object-fit: contain; object-position: center center; background: #ffffff; }
  .compare-wrap.fit-top .compare-img img     { object-fit: contain; object-position: top center; background: #ffffff; } /* ← top anchored */

  /* Edge arrow (hidden on tiny screens to avoid nudging layout) */
  .edge-cta {
    position: absolute; top: 50%; right: 6px; transform: translateY(-50%);
    display: grid; place-items: center; width: 36px; height: 60px; border-radius: 999px;
    background: rgba(255,255,255,0.9); border: 1px solid rgba(0,0,0,0.07);
    box-shadow: 0 6px 18px rgba(0,0,0,0.10); cursor: pointer; transition: transform .15s ease, box-shadow .2s ease, background .2s ease;
  }
  .edge-cta:hover, .edge-cta:focus-visible { transform: translateY(-50%) translateX(-1px); box-shadow: 0 10px 22px rgba(0,0,0,0.14); outline: none; }
  .edge-cta svg { width: 18px; height: 18px; }
  .edge-cta .a-head { animation: nudge 1.8s ease-in-out infinite; transform-origin: center; }

  /* Reveal helpers */
  .reveal-block { opacity: 0; transform: translateX(var(--x, 0)) translateY(var(--y, 0)); transition: transform .72s cubic-bezier(.2,.8,.2,1), opacity .48s ease; will-change: transform, opacity; transition-delay: var(--delay, 0ms); }
  .reveal-left  { --x: -44px; }
  .reveal-right { --x:  44px; }
  .reveal-block.in { opacity: 1; transform: translateX(0) translateY(0); }

  @keyframes floaty { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(-6px);} }
  @keyframes nudge  { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }

  /* Mobile */
  @media (max-width: 980px) {
    .feature-inner { grid-template-columns: 1fr; grid-template-areas: "copy" "media"; justify-items: center; }
    .feature-section.reverse .feature-inner { grid-template-columns: 1fr; grid-template-areas: "copy" "media"; }
    .media-wrap { gap: 10px; justify-content: center; width: 100%; }
    .phone-shell { width: min(300px, 85vw); margin: 0 auto; }
    .edge-cta { display: none; }
  }
      `}</style>

      <div className="feature-inner">
        {/* COPY */}
        <div ref={copyRef} className={`feature-copy reveal-block ${copyDir}`} style={{ "--delay": "60ms" }}>
          <div className="feature-eyebrow">✨ Connection-first workflow</div>
          <h2 className="feature-title">{title}</h2>
          <div className="feature-body">{body}</div>

          {(ctaPrimary || ctaSecondary) && (
            <div className="feature-ctas">
              {ctaPrimary && <a className="btn-primary" href={ctaPrimary.href}>{ctaPrimary.label}</a>}
              {ctaSecondary && <a className="btn-glass" href={ctaSecondary.href}>{ctaSecondary.label}</a>}
            </div>
          )}
        </div>

        {/* MEDIA */}
        <div ref={mediaRef} className={`feature-media reveal-block ${mediaDir}`} style={{ "--delay": "140ms" }}>
          <div className="media-wrap">
            <PhoneFrame>
              {compareImages ? (
                <div
                  id={`${id || title}-compare`}
                  className={`compare-wrap ${hovered ? "is-hover" : ""} ${
                    compareFit === "contain" ? "fit-contain" :
                    compareFit === "top-contain" ? "fit-top" : ""
                  }`}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onTouchStart={() => setHovered((h) => !h)}
                  role="group"
                  aria-label="Preview pages"
                >
                  <div className="compare-track">
                    <div className="compare-img">
                      <img src={compareImages.badSrc} alt={compareImages.badAlt || "Page 1"} />
                    </div>
                    <div className="compare-img">
                      <img src={compareImages.goodSrc} alt={compareImages.goodAlt || "Page 2"} />
                    </div>
                  </div>

                  {/* Right-edge arrow */}
                  <button
                    type="button"
                    className="edge-cta"
                    aria-label="Next page"
                    onClick={() => setHovered((h) => !h)}
                    onMouseEnter={() => setHovered(true)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
                        e.preventDefault(); setHovered((h) => !h);
                      }
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h10" stroke="#0b3b2e" strokeWidth="2" strokeLinecap="round"/>
                      <path className="a-head" d="M12 7l6 5-6 5" stroke="#0b3b2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ) : (
                videoSrc ? (
                  <video autoPlay muted loop playsInline poster={poster}>
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                ) : (
                  <img src="/Message.png" alt="Clientloop message" />
                )
              )}
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================
   Partners (logo band)
========================= */
function Partners() {
  return (
    <section className="partners" id="clients">
      <style>{`
        .partners {
          padding: clamp(56px, 10vh, 120px) 1.5rem;
          background: linear-gradient(180deg, #f6fbf8 0%, #ffffff 100%);
          border-top: 1px solid #eef2ef;
          border-bottom: 1px solid #eef2ef;
        }
        .partners-head { text-align: center; max-width: 900px; margin: 0 auto 24px; }
        .partners h2 {
          margin: 0; font-size: clamp(24px, 3.8vw, 34px); font-weight: 900; color:#0f172a; letter-spacing:-.01em;
        }
        .partners-sub { color:#56636a; margin: 8px 0 0; }

        .partners-grid {
          margin: 26px auto 0; max-width: 1100px;
          display: grid; grid-template-columns: repeat(6, minmax(0,1fr)); gap: clamp(14px, 2.2vw, 22px);
          align-items: center;
        }
        @media (max-width: 900px) { .partners-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 520px) { .partners-grid { grid-template-columns: repeat(2, 1fr); } }

        .partners-grid img {
          width: 100%; max-height: 44px; object-fit: contain;
          filter: grayscale(100%) contrast(1.05); opacity: .8; transition: filter .25s ease, opacity .25s ease, transform .2s ease;
          mix-blend-mode: multiply;
        }
        .partners-grid img:hover { filter: none; opacity: 1; transform: translateY(-2px); }
      `}</style>

      <div className="partners-head">
        <h2>Backed by</h2>
        <p className="partners-sub">This is Clientloop's potential.</p>
      </div>

      <div className="partners-grid" data-aos="zoom-in">
        <img src="/nvidia.png" alt="NVIDIA" />
        <img src="/nsf.png" alt="NSF" />
        <img src="/google1.png" alt="Google" />
        {/* Add more logos as you have them */}
        <div />
        <div />
        <div />
      </div>
    </section>
  );
}

/* =========================
   Testimonials (slider)
========================= */
function Testimonials() {
  const items = [
    { img: "/client1.jpg", 
        quote: "When Bella followed up after a conference, I didn’t realize the draft came from AI until she said so.", 
        name: "Sharad A.", title: "Global Head of Vendor Strategy, Google" },
    { img: "/client2.jpg", quote: "I'm usually too tired to keep up after events. Clientloop helps me follow through easily.", name: "Sahithi L.", title: "Student, UCLA" },
    { img: "/client3.jpg", quote: "Keeps relationships warm better than any AI I’ve tried—simple and targeted.", name: "Yen Bui", title: "Real Estate Agent" },
  ];

  const [i, setI] = React.useState(0);
  const len = items.length;

  // Auto-advance (pauses for reduced motion)
  React.useEffect(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;
    const t = setInterval(() => setI((p) => (p + 1) % len), 4200);
    return () => clearInterval(t);
  }, [len]);

  const go = (n) => setI(((n % len) + len) % len);

  return (
    <section className="testimonials" aria-label="Customer testimonials">
      <style>{`
        .testimonials {
          padding: clamp(68px, 12vh, 140px) 1.5rem;
          background:
            radial-gradient(1200px 420px at 90% -20%, rgba(54,196,141,.08), transparent 60%),
            radial-gradient(1000px 380px at -10% 120%, rgba(54,196,141,.08), transparent 60%);
        }
        .t-head { text-align:center; max-width: 900px; margin:0 auto 24px; }
        .t-title { font-size: clamp(26px, 4vw, 38px); font-weight: 900; color:#0f172a; margin:0; }
        .t-sub { color:#56636a; margin:8px 0 0; }

        .t-stage { max-width: 1050px; margin: 28px auto 0; position: relative; }
        .t-viewport { overflow: hidden; border-radius: 28px; }
        .t-track {
          display: flex; width: 100%; transform: translateX(calc(-100% * var(--i, 0)));
          transition: transform .6s cubic-bezier(.2,.8,.2,1);
        }

        .t-card {
          flex: 0 0 100%;
          background: linear-gradient(180deg, #ffffff 0%, #fbfdfc 100%);
          border:1px solid #eef2ef; border-radius: 28px;
          box-shadow: 0 40px 120px rgba(34,197,94,0.10), 0 8px 20px rgba(0,0,0,0.06);
          display: grid; grid-template-columns: 140px 1fr; gap: 22px; align-items: center;
          padding: clamp(18px, 3.2vw, 34px);
        }
        @media (max-width: 680px) { .t-card { grid-template-columns: 1fr; text-align: left; } }

        .t-photo {
          width: 140px; height: 140px; border-radius: 999px; object-fit: cover;
          box-shadow: 0 10px 26px rgba(0,0,0,.08);
          justify-self: center;
        }
        .t-quote { margin:0; color:#334155; font-size: clamp(16px, 1.8vw, 20px); line-height: 1.55; position: relative; }
        .t-quote::before {
          content: "“"; position: absolute; left: -18px; top: -10px; font-size: 42px; line-height: 1; color: rgba(54,196,141,.55);
        }
        .t-name { margin: 12px 0 0; font-weight: 900; color:#0b3b2e; }
        .t-role { margin: 2px 0 0; color:#64748b; font-weight: 600; }

        .t-controls {
          display:flex; justify-content:center; gap:10px; margin-top: 14px;
        }
        .t-dot {
          width: 8px; height: 8px; border-radius: 999px; background: #d1d5db; border: none; cursor: pointer;
        }
        .t-dot[aria-current="true"] { width: 22px; background: #36c48d; }

        .t-arrows { position:absolute; inset: 0; pointer-events:none; }
        .t-arrow {
          pointer-events:auto; position: absolute; top: 50%; transform: translateY(-50%);
          width: 42px; height: 42px; border-radius: 999px; display:grid; place-items:center;
          background: rgba(255,255,255,0.9); border:1px solid rgba(0,0,0,0.06);
          box-shadow: 0 6px 18px rgba(0,0,0,.10); cursor: pointer;
          transition: transform .15s ease, box-shadow .2s ease;
        }
        .t-arrow:hover { transform: translateY(-50%) scale(1.03); box-shadow: 0 10px 22px rgba(0,0,0,.14);}
        .t-arrow--prev { left: -18px; }
        .t-arrow--next { right: -18px; }
        @media (max-width: 900px) { .t-arrow--prev { left: -6px; } .t-arrow--next { right: -6px; } }
        @media (max-width: 560px) { .t-arrows { display:none; } }
      `}</style>

      <div className="t-head">
        <h2 className="t-title">What our beta users say</h2>
        <p className="t-sub">Real notes, real relationships—kept warm with less effort.</p>
      </div>

      <div className="t-stage" data-aos="fade-up">
        <div className="t-viewport" style={{ "--i": i }}>
          <div className="t-track" style={{ "--i": i }}>
            {items.map((t, idx) => (
              <article className="t-card" key={idx}>
                <img src={t.img} alt={t.name} className="t-photo" />
                <div>
                  <p className="t-quote">{t.quote}</p>
                  <p className="t-name">{t.name}</p>
                  <p className="t-role">{t.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="t-arrows" aria-hidden="true">
          <button className="t-arrow t-arrow--prev" onClick={() => go(i - 1)} aria-label="Previous testimonial">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="#0b3b2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="t-arrow t-arrow--next" onClick={() => go(i + 1)} aria-label="Next testimonial">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M9 6l6 6-6 6" stroke="#0b3b2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="t-controls" role="tablist" aria-label="Testimonials pagination">
          {items.map((_, d) => (
            <button
              key={d}
              className="t-dot"
              role="tab"
              aria-current={i === d}
              aria-label={`Go to testimonial ${d + 1}`}
              onClick={() => go(d)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Pricing (roomy, responsive, never-narrow cards)
========================= */
function Pricing() {
  const plans = [
    { name: "Basic", price: "$12", period: "/month", features: ["Limited usage", "Core features"], cta: "Get Started" },
    { name: "Premium", price: "$38", period: "/month", features: ["All Basic features", "Multi-channel auto-sync", "Priority support"], cta: "Subscribe Now", featured: true },
    { name: "Enterprise", price: "Custom", period: "", features: ["Everything in Premium", "Unlimited usage", "Dedicated support"], cta: "Contact Sales" },
  ];

  return (
    <section id="pricing" className="pricing">
      <style>{`
        .pricing {
          padding: clamp(68px, 12vh, 140px) 1.5rem;
          background: linear-gradient(180deg, #ffffff 0%, #f9fdfb 100%);
        }
        .pricing-head { text-align:center; max-width: 900px; margin:0 auto 28px; }
        .pricing h2 { margin:0; font-size: clamp(26px, 4vw, 38px); font-weight: 900; color:#0f172a; }
        .pricing-sub { color:#56636a; margin: 8px 0 0; }

        /* Wide container + "never narrow" cards */
        .pricing-plans {
          --col-min: 420px;                /* minimum card width */
          width: min(1400px, 96vw);        /* roomy max container */
          margin: 32px auto 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(var(--col-min), 1fr));
          gap: clamp(18px, 2vw, 28px);
          align-items: stretch;
        }
        /* Adjust minimum card width at smaller screens */
        @media (max-width: 1024px) { .pricing-plans { --col-min: 360px; } }
        @media (max-width: 720px)  { .pricing-plans { --col-min: 320px; } }
        @media (max-width: 420px)  { .pricing-plans { --col-min: 280px; } }

        .plan {
          position: relative; border-radius: 28px; overflow: hidden; height: 100%;
          background: linear-gradient(180deg, #ffffff 0%, #fbfdfc 100%);
          border: 1px solid #eef2ef;
          box-shadow: 0 30px 90px rgba(34,197,94,0.08), 0 8px 18px rgba(0,0,0,.06);
          padding: clamp(20px, 2.8vw, 32px);
          display:flex; flex-direction: column; gap: 14px;
          transition: transform .18s ease, box-shadow .22s ease;
        }
        .plan:hover { transform: translateY(-4px); box-shadow: 0 40px 110px rgba(34,197,94,0.12), 0 10px 24px rgba(0,0,0,.10); }

        .plan.featured {
          border: none;
          background:
            radial-gradient(60% 100% at 0% 0%, rgba(54,196,141,.10), transparent 70%),
            linear-gradient(180deg, #ffffff 0%, #f7fffb 100%);
          box-shadow: 0 50px 140px rgba(54,196,141,.18), 0 10px 28px rgba(0,0,0,.10);
          outline: 2px solid rgba(54,196,141,.25);
        }

        .plan-name { font-weight: 900; color:#0f172a; font-size: clamp(18px, 2vw, 20px); margin: 0; }
        .price-row { display:flex; align-items: baseline; gap: 6px; }
        .price { font-size: clamp(38px, 6vw, 56px); font-weight: 900; letter-spacing: -0.02em; color:#0b3b2e; }
        .period { color:#64748b; font-weight: 700; }

        .features { margin: 8px 0 0; padding: 0; list-style: none; display: grid; gap: 10px; }
        .feat { display:flex; align-items:center; gap: 10px; color:#334155; font-weight: 600; }
        .feat svg { flex: 0 0 auto; }

        .plan-cta {
          margin-top: auto; display:inline-flex; justify-content:center; align-items:center; text-decoration:none;
          border-radius: 999px; padding: 12px 16px; font-weight: 800;
          background:#36c48d; color:#fff; box-shadow: 0 0 0 0 rgba(54,196,141,.4);
          transition: box-shadow .25s ease, transform .15s ease;
        }
        .plan-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(54,196,141,.35); }
        .plan.featured .plan-cta { background:#0b3b2e; }
        .plan.featured .plan-cta:hover { box-shadow: 0 10px 24px rgba(11,59,46,.35); }
      `}</style>

      <div className="pricing-head">
        <h2>Pricing</h2>
        <p className="pricing-sub">Pick a plan that grows with your relationships.</p>
      </div>

      <div className="pricing-plans">
        {plans.map((p) => (
          <div className={`plan ${p.featured ? "featured" : ""}`} key={p.name} data-aos="zoom-in">
            <h3 className="plan-name">{p.name}</h3>
            <div className="price-row">
              <span className="price">{p.price}</span>
              <span className="period">{p.period}</span>
            </div>

            <ul className="features">
              {p.features.map((f, i) => (
                <li className="feat" key={i}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" stroke="#36c48d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a href={p.name === "Enterprise" ? "#contact" : "/login.html"} className="plan-cta">
              {p.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}


/* =========================
   Footer
========================= */
function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle" });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(APPS_SCRIPT_URL, { method: "POST", body: new URLSearchParams({ email }) });
      setStatus({ type: "ok", message: "Thank you for subscribing!" });
      setEmail("");
    } catch (err) {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="newsletter-content">
        <h3>Stay in the loop</h3>
        <p>Sign up for our newsletter to receive the latest updates, insights, and stories.</p>
        <form className="newsletter-form" id="newsletter-form" onSubmit={onSubmit}>
          <input type="email" name="email" id="newsletter-email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="btn-primary">Subscribe</button>
        </form>
        {status.type !== "idle" && (<p role="status" style={{ marginTop: "0.75rem" }}>{status.message}</p>)}
      </div>
      <p>© 2025 Clientloop. All rights reserved.</p>
      <ul className="footer-links">
        <li><a href="#privacy">Privacy Policy</a></li>
        <li><a href="#terms">Terms of Service</a></li>
      </ul>
    </footer>
  );
}

/* =========================
   Page
========================= */
export default function Clientloop() {
  useEffect(() => { AOS.init({ duration: 800, easing: "ease-in-out", once: true }); }, []);

  return (
    <main>
      <Header />
      <Hero />
      <Metrics />

      {/* Comparison moved inside FeatureSplit; emojis + hint outside the phone; face buttons next to phone */}
      <FeatureSplit
        id="solutions"
        title="More than Hi, just checking in…"
        body={<>
          Generic outreach goes unnoticed. Clientloop drafts <em>contextual</em> notes that feel human,
          land in the right channel, and are effortless to send.
        </>}
        reverse
        compareFit="top-contain"
        compareImages={{
          badSrc: "/generic-outreach.png",
          badAlt: "Generic outreach",
          goodSrc: "/clientloop-outreach.png",
          goodAlt: "Clientloop message composed"
        }}
      />

      <FeatureSplit
        id="messages"
        title="It's already in your Messages app"
        body="AI drops your message right into iMessage or Gmail, auto-opens the app, and lines it up for you. We open it. We write it. You press send."
        videoSrc="/sync.mp4"
      />

      {/* Third feature: phone left, text right */}
      <FeatureSplit
        title="Thoughtful at scale"
        body="From birthdays to new year wishes, our agent sends the kind of notes that keep relationships strong—no reminders or mental tabs needed."
        videoSrc="/time.mp4"
        reverse
      />

      <Stories />
      <Partners />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
