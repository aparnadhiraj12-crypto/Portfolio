import { useState, useEffect, useRef } from "react";

// ─── Palette — Midnight Indigo × Coral ────────────────────────────────────────
const B = {
  bg:          "#05040E",   // near-black with deep indigo cast
  bgDim:       "#030208",
  surface:     "#0C0A1C",   // dark indigo surface
  surfaceHi:   "#141228",   // lighter indigo hover
  border:      "rgba(160,150,255,0.09)",
  borderBright:"rgba(160,150,255,0.18)",
  fg:          "#F0EDFF",   // warm violet-white
  fgMuted:     "#7E78A4",   // muted violet-grey
  fgFaint:     "#302B52",   // deep muted violet
  coral:       "#FF4D35",   // vivid coral — primary accent
  coralD:      "#CC2D15",   // dark coral
  teal:        "#00D4A8",   // fresh mint-teal — secondary
  violet:      "#8B6EFF",   // electric violet — tertiary
  pink:        "#FF7EC7",   // hot pink — quaternary
  warm:        "#F5EED8",   // scrapbook paper (About modal)
  warmInk:     "#1C1408",
  warmMuted:   "#6B5A3A",
  shadow:      "0 24px 60px rgba(0,0,0,0.7)",
  glow:        "0 0 32px rgba(255,77,53,0.35)",
};
const DISPLAY = "'Barlow Condensed', sans-serif";
const BODY    = "'DM Sans', sans-serif";
const MONO    = "'JetBrains Mono', monospace";
const SERIF   = "'Shippori Mincho', serif";

const GRAIN_SVG = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='250' height='250'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='250' height='250' filter='url(#n)'/></svg>`);
const GRAIN_BG  = `url("data:image/svg+xml;charset=utf-8,${GRAIN_SVG}")`;

const G = `
  @keyframes pulseY{0%,100%{opacity:.15}50%{opacity:.7}}
  @keyframes cblink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes tickL{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes accentPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,77,53,.45)}50%{box-shadow:0 0 0 12px rgba(255,77,53,0)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes floatDot{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pathGlow{0%,100%{opacity:.55}50%{opacity:.9}}
  @keyframes reveal{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes previewIn{from{opacity:0;transform:scale(.94) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}
  .cb{animation:cblink 1s step-end infinite}
  *{cursor:none!important}
  ::selection{background:rgba(200,255,0,.25);color:#F0EDE6}
  @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`;

// ─── Data ──────────────────────────────────────────────────────────────────────
const WORKS = [
  { n:"01", title:"FinClarity",                        tag:"HackRx 6.0",             cat:"Hackathon",  color:"#7EE787", desc:"Financial-clarity tool reaching semi-final in Bajaj Finance's HackRx 6.0 among national competitors." },
  { n:"02", title:"Civic Issue Resolution System",     tag:"Granted Patent",          cat:"Patent",     color:"#D2A8FF", desc:"AI-powered complaint-routing system that directs civic issues to the right authority automatically." },
  { n:"03", title:"Agricultural Enhancement System",   tag:"Granted Patent",          cat:"Patent",     color:"#D2A8FF", desc:"IoT + AI system for precision farming using sensor data to optimise crop yield and resource use." },
  { n:"04", title:"Hallucinations in LLMs",            tag:"Published Paper, 2026",   cat:"Research",   color:"#FFA657", desc:"Research into why LLMs hallucinate, how to detect it, and practical mitigation strategies." },
  { n:"05", title:"IoT & AI in Smart Agriculture",     tag:"Published Paper, 2026",   cat:"Research",   color:"#FFA657", desc:"Study combining IoT sensors with AI models for precision farming outcomes." },
  { n:"06", title:"Smart India Hackathon",             tag:"National Shortlist",       cat:"Hackathon",  color:"#7EE787", desc:"National-level shortlist following a college-level shortlist at SIH 2024." },
  { n:"07", title:"One Earth International Hackathon", tag:"Semi-finalist",            cat:"Hackathon",  color:"#7EE787", desc:"Semi-final round in a sustainability-focused international hackathon." },
  { n:"08", title:"Sprint Planning & Delivery",        tag:"LimeUp · 2025",           cat:"PM",         color:"#79C0FF", desc:"Led sprint planning, risk tracking, and stakeholder comms using Agile/Scrum." },
  { n:"09", title:"Campus Ambassador Outreach",        tag:"Unstop · 2025",           cat:"Community",  color:"#FF9BCE", desc:"Spearheaded outreach campaigns and grew student engagement across campus chapters." },
  { n:"10", title:"Cross-team Coordination",           tag:"Averixis Solutions",       cat:"Frontend",   color:B.coral,    desc:"Built reusable component libraries collaborating cross-functionally for seamless UX." },
  { n:"11", title:"Portal Accessibility Drive",        tag:"Climentos · 2024",         cat:"Frontend",   color:B.coral,    desc:"Enhanced a government complaint portal's user flow and accessibility in an agile team." },
];

const EXP = [
  { n:"01", dates:"Nov – Dec 2024",     role:"Frontend Developer Intern", org:"Climentos",  icon:"💻", color:"#79C0FF", current:false, detail:"Worked inside an agile team to enhance a government complaint portal, improving flow and accessibility for citizens filing and tracking civic issues." },
  { n:"02", dates:"May – Jun 2025",     role:"Project Management Intern", org:"LimeUp",     icon:"📋", color:"#FFA657", current:false, detail:"Led sprint planning, risk tracking, and stakeholder comms using Agile/Scrum. Facilitated standups, retrospectives, and sprint reviews to keep delivery on time." },
  { n:"03", dates:"Aug – Oct 2025",     role:"Frontend Developer",        org:"Averixis",   icon:"🧩", color:"#7EE787", current:false, detail:"Built reusable component libraries and collaborated cross-functionally to deliver a seamless experience across all devices." },
  { n:"04", dates:"Aug – Nov 2025",     role:"Campus Ambassador",         org:"Unstop",     icon:"📣", color:"#FF9BCE", current:false, detail:"Spearheaded outreach campaigns and coordinated stakeholder comms to grow student engagement across campus communities." },
  { n:"05", dates:"Jun 2026 – Present", role:"Machine Learning Intern",   org:"CSIR-IICT",  icon:"🧪", color:B.coral,    current:true,  detail:"Contributing to ML-driven research, applying data analysis and model development to real-world problems at one of India's leading chemical technology institutes." },
];


const SKILLS = ["React","Node.js","Python","Ollama","ML / AI","Prompt Eng","MongoDB","Agile"];

// ─── Cursor ────────────────────────────────────────────────────────────────────
function Cursor() {
  const [p, setP] = useState({ x:-100, y:-100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const mv = (e: MouseEvent) => setP({ x:e.clientX, y:e.clientY });
    window.addEventListener("mousemove", mv);
    const on = () => setBig(true); const off = () => setBig(false);
    const wire = () => document.querySelectorAll("[data-hover]").forEach(el => {
      el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off);
    });
    wire();
    const obs = new MutationObserver(wire);
    obs.observe(document.body, { childList:true, subtree:true });
    return () => { window.removeEventListener("mousemove", mv); obs.disconnect(); };
  }, []);
  return (
    <>
      <div style={{ position:"fixed",left:p.x-5,top:p.y-5,width:10,height:10,borderRadius:"50%",background:B.coral,pointerEvents:"none",zIndex:9999,transition:"transform .1s",transform:big?"scale(4)":"scale(1)",mixBlendMode:"difference" as const }}/>
      <div style={{ position:"fixed",left:p.x-18,top:p.y-18,width:36,height:36,borderRadius:"50%",border:`1px solid ${B.coral}`,pointerEvents:"none",zIndex:9998,opacity:0.3,transition:"left .12s,top .12s,transform .2s",transform:big?"scale(1.8)":"scale(1)" }}/>
    </>
  );
}

function Grain() {
  return <div style={{ position:"fixed",inset:0,backgroundImage:GRAIN_BG,backgroundRepeat:"repeat",backgroundSize:"250px 250px",opacity:0.055,pointerEvents:"none",zIndex:9990,mixBlendMode:"overlay" as const }}/>;
}

// ─── Scramble ──────────────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";
function ScrambleText({ text, go, delay=0 }: { text:string; go:boolean; delay?:number }) {
  const [out, setOut] = useState(() => text.replace(/[^ ]/g,"█"));
  useEffect(() => {
    if(!go) return;
    const t = setTimeout(() => {
      let f = 0;
      const id = setInterval(() => {
        f++;
        setOut(text.split("").map((ch,i) => {
          if(ch===" ") return ch;
          return f > i*1.2 ? ch : CHARS[Math.floor(Math.random()*CHARS.length)];
        }).join(""));
        if(f > text.length*1.5) clearInterval(id);
      }, 38);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [go]);
  return <>{out}</>;
}

// ─── Landing ───────────────────────────────────────────────────────────────────
function Landing({ onEnter }: { onEnter:()=>void }) {
  const [typed, setTyped] = useState("");
  const full = "こんにちは";
  useEffect(() => {
    let i=0; const t=setInterval(()=>{ i++; setTyped(full.slice(0,i)); if(i>=full.length) clearInterval(t); },155);
    return ()=>clearInterval(t);
  },[]);
  return (
    <div style={{ minHeight:"100vh",background:B.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }} onClick={onEnter}>
      <style>{G}</style><Grain/><Cursor/>
      <div style={{ position:"absolute",width:"600px",height:"600px",borderRadius:"50%",background:`radial-gradient(circle,${B.coral}08 0%,transparent 70%)`,bottom:"-200px",right:"-200px",pointerEvents:"none" }}/>
      <div style={{ textAlign:"center",zIndex:1,padding:"0 2rem" }}>
        <div style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.25em",color:B.fgFaint,marginBottom:"2rem" }}>// PORTFOLIO 2026</div>
        <h1 style={{ fontFamily:SERIF,fontSize:"clamp(4rem,14vw,10rem)",fontWeight:600,color:B.fg,lineHeight:1,margin:"0 0 1rem" }}>
          {typed}<span className="cb" style={{ display:"inline-block",width:"0.08em",height:"0.85em",background:B.coral,verticalAlign:"middle",marginLeft:"0.06em" }}/>
        </h1>
        <div style={{ fontFamily:MONO,fontSize:"0.7rem",textTransform:"uppercase",letterSpacing:"0.3em",color:B.coralD,marginBottom:"3rem" }}>Konichiwa</div>
        <button onClick={e=>{ e.stopPropagation(); onEnter(); }} data-hover
          style={{ fontFamily:MONO,fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",background:"none",border:`1px solid ${B.borderBright}`,color:B.fgMuted,padding:"0.9rem 2.2rem",transition:"border-color .3s,color .3s" }}
          onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=B.coral; b.style.color=B.coral; }}
          onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=B.borderBright; b.style.color=B.fgMuted; }}>
          $ enter_portfolio
        </button>
      </div>
      <div style={{ position:"absolute",bottom:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.6rem" }}>
        <div style={{ width:"1px",height:"48px",background:B.coralD,animation:"pulseY 2s ease-in-out infinite" }}/>
        <span style={{ fontFamily:MONO,fontSize:"0.58rem",textTransform:"uppercase",letterSpacing:"0.22em",color:B.fgFaint }}>scroll</span>
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ onAbout }: { onAbout:()=>void }) {
  const [go, setGo] = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setGo(true),300); return ()=>clearTimeout(t); },[]);
  return (
    <section id="hero" style={{ minHeight:"100vh",background:B.bg,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 2.8rem 3.5rem",position:"relative",overflow:"hidden",borderBottom:`1px solid ${B.border}` }}>
      <div style={{ position:"absolute",top:"2rem",right:"2.8rem",display:"flex",alignItems:"center",gap:"0.5rem",fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.15em",color:B.coral }}>
        <span style={{ display:"inline-block",width:"6px",height:"6px",borderRadius:"50%",background:B.coral,animation:"accentPulse 2s ease-in-out infinite" }}/>
        Available for work
      </div>
      <div style={{ position:"absolute",top:"2rem",left:"2.8rem",display:"flex",gap:"2.5rem" }}>
        {(["#works","#experience","#contact"] as const).map((h,i)=>(
          <a key={h} href={h} data-hover style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.15em",color:B.fgMuted,textDecoration:"none",transition:"color .2s" }}
            onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color=B.coral}
            onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color=B.fgMuted}>
            {["Work","Experience","Contact"][i]}
          </a>
        ))}
      </div>
      <div style={{ position:"relative",zIndex:2 }}>
        <div style={{ fontFamily:MONO,fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.22em",color:B.coralD,marginBottom:"0.8rem",animation:"fadeIn .6s ease both",animationDelay:".2s" }}>Software Engineering Student · ML Intern · Builder</div>
        <h1 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(5rem,16vw,16rem)",lineHeight:0.88,letterSpacing:"-0.01em",color:B.fg,margin:"0 0 0.1rem",textTransform:"uppercase" }}><ScrambleText text="APARNA" go={go}/></h1>
        <h1 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(5rem,16vw,16rem)",lineHeight:0.88,letterSpacing:"-0.01em",WebkitTextStroke:`2px ${B.coral}`,color:"transparent",margin:"0 0 2.5rem",textTransform:"uppercase" }}><ScrambleText text="DHIRAJ" go={go} delay={300}/></h1>
        <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"1.5rem" }}>
          <p style={{ fontFamily:BODY,fontSize:"clamp(0.9rem,1.2vw,1.05rem)",color:B.fgMuted,maxWidth:"36rem",lineHeight:1.7,margin:0 }}>
            Currently an ML Intern at CSIR-IICT with two published papers and two granted patents. Happiest somewhere between a hackathon whiteboard and a half-finished side project.
          </p>
          <div style={{ display:"flex",gap:"1rem",flexShrink:0 }}>
            <button onClick={onAbout} data-hover style={{ fontFamily:MONO,fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.12em",background:"none",border:`1px solid ${B.borderBright}`,color:B.fgMuted,padding:"0.8rem 1.6rem",transition:"all .25s" }}
              onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=B.coral; b.style.color=B.coral; }}
              onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=B.borderBright; b.style.color=B.fgMuted; }}>About me ↗</button>
            <a href="#works" data-hover style={{ fontFamily:MONO,fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.12em",background:B.coral,color:B.bg,padding:"0.8rem 1.6rem",textDecoration:"none",transition:"background .2s" }}
              onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.background=B.coralD}
              onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.background=B.coral}>View work ↗</a>
          </div>
        </div>
      </div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"2px",background:`linear-gradient(to right,transparent,${B.coral},transparent)`,opacity:0.4 }}/>
    </section>
  );
}

// ─── About — Magazine split-canvas ────────────────────────────────────────────
function AboutOverlay({ onClose }: { onClose:()=>void }) {
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const rightRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    const el = rightRef.current; if(!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
    setTilt({ x:(e.clientY-cy)/(rect.height/2)*4, y:-(e.clientX-cx)/(rect.width/2)*4 });
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  },[]);

  return (
    <div style={{ position:"fixed",inset:0,zIndex:10000,display:"flex",animation:"fadeIn .3s ease" }}>
      {/* ── LEFT — dark panel ── */}
      <div style={{ width:"38%",minWidth:"280px",background:B.bg,borderRight:`1px solid ${B.border}`,display:"flex",flexDirection:"column",padding:"3rem 2.5rem",position:"relative",overflow:"hidden",flexShrink:0 }}>
        {/* Close */}
        <button onClick={onClose} data-hover style={{ position:"absolute",top:"1.5rem",left:"1.5rem",fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.15em",color:B.fgFaint,background:"none",border:`1px solid ${B.border}`,padding:"0.4rem 0.8rem",transition:"color .2s,border-color .2s" }}
          onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.color=B.coral; b.style.borderColor=B.coral; }}
          onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.color=B.fgFaint; b.style.borderColor=B.border; }}>
          ✕ ESC
        </button>

        {/* Big name — left half */}
        <div style={{ marginTop:"4rem",marginBottom:"2.5rem" }}>
          <div style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(3.5rem,6vw,5.5rem)",WebkitTextStroke:`2px ${B.coral}`,color:"transparent",lineHeight:0.88,textTransform:"uppercase",letterSpacing:"-0.01em" }}>APARNA</div>
          <div style={{ fontFamily:MONO,fontSize:"0.55rem",textTransform:"uppercase",letterSpacing:"0.25em",color:B.coralD,marginTop:"0.6rem" }}>// profile.md</div>
        </div>

        {/* Polaroid */}
        <div style={{ background:"#fff",padding:"10px 10px 38px",boxShadow:"0 12px 40px rgba(0,0,0,0.7)",transform:"rotate(-2deg)",alignSelf:"flex-start",marginBottom:"2.5rem" }}>
          <div style={{ width:"150px",height:"170px",background:`linear-gradient(155deg,rgba(255,107,94,.75),rgba(185,140,232,.75))`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",backgroundSize:"14px 14px" }}/>
            <span style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"3rem",color:"rgba(255,255,255,0.18)",zIndex:1 }}>AD</span>
          </div>
          <div style={{ textAlign:"center",marginTop:"5px",fontFamily:MONO,fontSize:"0.42rem",textTransform:"uppercase",letterSpacing:"0.14em",color:"rgba(0,0,0,0.35)" }}>APARNA DHIRAJ</div>
        </div>

        {/* Stat grid */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem 1rem",marginBottom:"2.5rem" }}>
          {[["02","PATENTS"],["02","PAPERS"],["05","ROLES"],["04","LANGS"]].map(([n,l])=>(
            <div key={l}>
              <div style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"2.8rem",color:B.coral,lineHeight:1 }}>{n}</div>
              <div style={{ fontFamily:MONO,fontSize:"0.46rem",textTransform:"uppercase",letterSpacing:"0.18em",color:B.fgFaint,marginTop:"1px" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div style={{ marginTop:"auto",display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.65rem 0.9rem",border:`1px solid ${B.coral}30`,background:`${B.coral}06` }}>
          <span style={{ display:"inline-block",width:"6px",height:"6px",borderRadius:"50%",background:B.coral,animation:"accentPulse 2s ease-in-out infinite",flexShrink:0 }}/>
          <span style={{ fontFamily:MONO,fontSize:"0.5rem",textTransform:"uppercase",letterSpacing:"0.15em",color:B.coral }}>Open to opportunities</span>
        </div>

        {/* Decorative kanji */}
        <div style={{ position:"absolute",bottom:"2rem",right:"1.5rem",fontFamily:SERIF,fontSize:"5rem",color:`${B.coral}10`,lineHeight:1,userSelect:"none" }}>安</div>
      </div>

      {/* ── RIGHT — warm paper panel ── */}
      <div ref={rightRef} onMouseMove={onMouseMove} onMouseLeave={()=>setTilt({x:0,y:0})}
        style={{ flex:1,background:B.warm,overflowY:"auto",padding:"3rem 3.5rem",perspective:"1200px" }}>
        <div style={{ transform:`rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,transition:"transform .15s ease",transformStyle:"preserve-3d" as const }}>

          {/* Name right-half */}
          <div style={{ marginBottom:"2rem",paddingBottom:"2rem",borderBottom:`1px solid rgba(44,32,16,0.15)` }}>
            <div style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(3.5rem,6vw,5.5rem)",color:B.warmInk,lineHeight:0.88,textTransform:"uppercase",letterSpacing:"-0.01em" }}>DHIRAJ</div>
            <p style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.2em",color:B.warmMuted,margin:"0.75rem 0 0" }}>Software Eng. Student · ML Intern · Builder</p>
          </div>

          {/* Pull quote */}
          <div style={{ borderLeft:`3px solid ${B.warmInk}20`,paddingLeft:"1.25rem",marginBottom:"2rem" }}>
            <p style={{ fontFamily:SERIF,fontStyle:"italic",fontSize:"1.15rem",color:B.warmMuted,margin:0,lineHeight:1.65 }}>
              "I file hard. I need strong tabs."
            </p>
          </div>

          {/* Bio — two-column magazine feel */}
          <div style={{ columns:2,columnGap:"2rem",marginBottom:"2rem" }}>
            {[
              "Jain University, Bangalore, 2024–2028. Moves between frontend craft, ML research, and community building. Two published papers, two patents, five internship roles.",
              "Currently at CSIR-IICT applying data analysis and model development to real-world chemical research. Before that: government portals, sprint planning, component libraries, campus outreach.",
              "Reached semi-finals at HackRx 6.0 and One Earth International Hackathon. National shortlist at Smart India Hackathon 2025. ML + frontend = her corner of the stack.",
            ].map((p,i)=>(
              <p key={i} style={{ fontFamily:BODY,fontSize:"0.88rem",color:B.warmMuted,lineHeight:1.85,marginBottom:"0.75rem",breakInside:"avoid" }}>{p}</p>
            ))}
          </div>

          {/* Skills */}
          <div style={{ marginBottom:"2rem" }}>
            <div style={{ fontFamily:MONO,fontSize:"0.5rem",textTransform:"uppercase",letterSpacing:"0.2em",color:"rgba(44,32,16,0.35)",marginBottom:"0.85rem" }}>// SKILLS</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"0.4rem" }}>
              {SKILLS.map(s=>(
                <span key={s} data-hover style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.1em",border:"1px solid rgba(44,32,16,0.25)",padding:"5px 12px",color:B.warmMuted,transition:"all .2s",cursor:"default" }}
                  onMouseEnter={e=>{ const d=e.currentTarget as HTMLSpanElement; d.style.background=B.warmInk; d.style.color=B.coral; d.style.borderColor=B.warmInk; }}
                  onMouseLeave={e=>{ const d=e.currentTarget as HTMLSpanElement; d.style.background=""; d.style.color=B.warmMuted; d.style.borderColor="rgba(44,32,16,0.25)"; }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ paddingTop:"1.5rem",borderTop:"1px solid rgba(44,32,16,0.15)",display:"flex",gap:"1.5rem",flexWrap:"wrap" }}>
            {[
              { l:"GitHub",   h:"https://github.com/aparnadhiraj12-crypto" },
              { l:"LinkedIn", h:"https://linkedin.com/in/aparna-dhiraj-6b25992a0" },
              { l:"Gmail",    h:"mailto:aparnadhiraj07@gmail.com" },
              { l:"7356675700", h:"tel:7356675700" },
            ].map(({l,h})=>(
              <a key={l} href={h} target="_blank" rel="noopener" data-hover style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.12em",color:B.warmMuted,textDecoration:"none",borderBottom:"1px solid rgba(44,32,16,0.2)",paddingBottom:"2px",transition:"color .2s,border-color .2s" }}
                onMouseEnter={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.color=B.warmInk; a.style.borderColor=B.warmInk; }}
                onMouseLeave={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.color=B.warmMuted; a.style.borderColor="rgba(44,32,16,0.2)"; }}>↗ {l}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stats ticker ──────────────────────────────────────────────────────────────
function StatsTicker() {
  const items = ["2 GRANTED PATENTS","2 PUBLISHED PAPERS","5 ROLES","4 LANGUAGES","ML + FRONTEND","CSIR-IICT","JAIN UNIVERSITY 2024–2028","HACKRX SEMI-FINALIST"];
  return (
    <div style={{ borderTop:`1px solid ${B.border}`,borderBottom:`1px solid ${B.border}`,overflow:"hidden",padding:"0.85rem 0",background:B.bg }}>
      <div style={{ display:"flex",gap:0,width:"max-content",animation:"tickL 28s linear infinite" }}>
        {[...items,...items].map((s,i)=>(
          <span key={i} style={{ fontFamily:MONO,fontSize:"0.62rem",textTransform:"uppercase",letterSpacing:"0.2em",color:B.fgFaint,whiteSpace:"nowrap",padding:"0 2.5rem",borderRight:`1px solid ${B.border}` }}>
            <span style={{ color:B.coral,marginRight:"0.6rem" }}>▸</span>{s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Works — sticky stacking cards + typing popup ─────────────────────────────
function WorkPopup({ w, onClose }: { w: typeof WORKS[0]; onClose: () => void }) {
  const lines = [
    { label: "PROJECT", text: w.title, font: DISPLAY, size: "clamp(1.6rem,2.8vw,2.2rem)", weight: 900, upper: true },
    { label: "CATEGORY", text: w.cat, font: MONO, size: "0.88rem", weight: 400, upper: false },
    { label: "TAG", text: w.tag, font: MONO, size: "0.82rem", weight: 400, upper: false },
    { label: "ABOUT", text: w.desc, font: BODY, size: "0.92rem", weight: 400, upper: false },
  ];
  const SPEEDS = [45, 35, 30, 18];

  const [lineIdx, setLineIdx] = useState(0);
  const [counts, setCounts] = useState(lines.map(() => 0));

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const txt = lines[lineIdx].text;
    if (counts[lineIdx] >= txt.length) {
      const t = setTimeout(() => setLineIdx(l => l + 1), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCounts(prev => { const n = [...prev]; n[lineIdx] = Math.min(n[lineIdx] + 1, txt.length); return n; });
    }, SPEEDS[lineIdx]);
    return () => clearTimeout(t);
  }, [lineIdx, counts]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(5,4,14,0.96)",backdropFilter:"blur(14px)",zIndex:10001,display:"flex",flexDirection:"column",animation:"fadeIn .22s ease" }}>
      {/* Top bar */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1rem 2rem",borderBottom:`1px solid ${B.border}`,flexShrink:0,background:B.bg }}>
        <div style={{ display:"flex",alignItems:"center",gap:"0.75rem" }}>
          <div style={{ width:"10px",height:"10px",borderRadius:"50%",background:w.color,boxShadow:`0 0 10px ${w.color}80` }}/>
          <span style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.16em",color:B.fgFaint }}>{w.n} — {w.cat}</span>
        </div>
        <button onClick={onClose} data-hover style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.1em",color:B.fgMuted,background:"none",border:`1px solid ${B.border}`,padding:"0.4rem 0.9rem",transition:"border-color .2s,color .2s" }}
          onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=w.color; b.style.color=w.color; }}
          onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=B.border; b.style.color=B.fgMuted; }}>
          ESC ✕
        </button>
      </div>

      {/* Body: video left, typed details right */}
      <div style={{ flex:1,display:"grid",gridTemplateColumns:"58fr 42fr",minHeight:0 }}>
        {/* Left — video player */}
        <div style={{ background:B.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"3rem",borderRight:`1px solid ${B.border}` }}>
          <div style={{ width:"100%",maxWidth:"680px" }}>
            {/* 16:9 video area */}
            <div style={{ aspectRatio:"16/9",background:B.surface,border:`1px solid ${B.border}`,position:"relative",overflow:"hidden",marginBottom:"1.25rem" }}>
              <div style={{ position:"absolute",inset:0,background:`linear-gradient(145deg,${w.color}0D,${w.color}28)` }}/>
              <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"20px 20px" }}/>
              {/* Play icon */}
              <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem" }}>
                <svg width="60" height="60" viewBox="0 0 60 60" style={{ position:"relative",zIndex:1 }}>
                  <circle cx="30" cy="30" r="29" stroke={w.color} strokeWidth="1.5" fill="none" opacity="0.5"/>
                  <circle cx="30" cy="30" r="29" stroke={w.color} strokeWidth="1.5" fill="none" opacity="0.15"
                    strokeDasharray="182" strokeDashoffset="46"/>
                  <polygon points="24,20 44,30 24,40" fill={w.color} opacity="0.85"/>
                </svg>
                <span style={{ fontFamily:MONO,fontSize:"0.55rem",textTransform:"uppercase",letterSpacing:"0.2em",color:B.fgFaint,position:"relative",zIndex:1 }}>Video preview</span>
              </div>
              {/* Top-right badge */}
              <div style={{ position:"absolute",top:"0.75rem",right:"0.75rem",fontFamily:MONO,fontSize:"0.45rem",textTransform:"uppercase",letterSpacing:"0.14em",color:w.color,background:`${w.color}20`,padding:"3px 8px",border:`1px solid ${w.color}40` }}>{w.cat}</div>
            </div>
            {/* Links row */}
            <div style={{ display:"flex",gap:"1.5rem" }}>
              {[{l:"GitHub",h:"https://github.com/aparnadhiraj12-crypto"},{l:"Live Demo",h:"#"}].map(({l,h})=>(
                <a key={l} href={h} target="_blank" rel="noopener" data-hover style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.14em",color:l==="GitHub"?w.color:B.fgFaint,textDecoration:"none",borderBottom:`1px solid ${l==="GitHub"?w.color:B.borderBright}`,paddingBottom:"2px",transition:"color .2s,border-color .2s" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLAnchorElement).style.color=w.color}
                  onMouseLeave={e=>(e.currentTarget as HTMLAnchorElement).style.color=l==="GitHub"?w.color:B.fgFaint}>
                  ↗ {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — typing terminal */}
        <div style={{ background:B.surface,padding:"3rem 2.5rem",overflowY:"auto",display:"flex",flexDirection:"column",justifyContent:"center" }}>
          <div style={{ fontFamily:MONO,fontSize:"0.52rem",textTransform:"uppercase",letterSpacing:"0.22em",color:B.fgFaint,marginBottom:"2.5rem" }}>
            // {w.n} — project_details.log
          </div>

          <div style={{ display:"flex",flexDirection:"column",gap:"2rem" }}>
            {lines.map((line, i) => {
              const shown = counts[i] > 0 || i < lineIdx;
              const isCurLine = i === lineIdx && lineIdx < lines.length;
              if (!shown) return null;
              return (
                <div key={i} style={{ animation:"fadeUp .3s ease" }}>
                  {/* Label */}
                  <div style={{ fontFamily:MONO,fontSize:"0.5rem",textTransform:"uppercase",letterSpacing:"0.2em",color:w.color,marginBottom:"0.4rem",display:"flex",alignItems:"center",gap:"0.5rem" }}>
                    <span style={{ opacity:0.5 }}>{'>'}</span>
                    {line.label}
                    <span style={{ flex:1,height:"1px",background:`${w.color}30` }}/>
                  </div>
                  {/* Content */}
                  <div style={{ fontFamily:line.font,fontWeight:line.weight,fontSize:line.size,color:B.fg,lineHeight:i===0?1:1.75,textTransform:line.upper?"uppercase":"none",letterSpacing:i===0?"-0.01em":"normal",wordBreak:"break-word" }}>
                    {line.text.slice(0, counts[i])}
                    {isCurLine && (
                      <span className="cb" style={{ display:"inline-block",width:"2px",height:i===0?"1.1rem":"0.9em",background:w.color,verticalAlign:"middle",marginLeft:"2px" }}/>
                    )}
                  </div>
                </div>
              );
            })}

            {/* EOF marker */}
            {lineIdx >= lines.length && (
              <div style={{ fontFamily:MONO,fontSize:"0.52rem",textTransform:"uppercase",letterSpacing:"0.18em",color:B.fgFaint,marginTop:"0.5rem",animation:"fadeIn .5s ease" }}>
                // ── EOF ──
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Works() {
  const [activeW, setActiveW] = useState<typeof WORKS[0]|null>(null);

  return (
    <section id="works" style={{ background:B.bg, borderBottom:`1px solid ${B.border}` }}>
      {/* Sticky section label */}
      <div style={{ position:"sticky",top:0,zIndex:200,background:B.bg,borderBottom:`1px solid ${B.border}`,padding:"1rem 3.5rem",display:"flex",justifyContent:"space-between",alignItems:"center",backdropFilter:"blur(8px)" }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:"1.5rem" }}>
          <span style={{ fontFamily:MONO,fontSize:"0.58rem",textTransform:"uppercase",letterSpacing:"0.2em",color:B.fgFaint }}>01 /</span>
          <h2 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(1.8rem,4vw,3.5rem)",color:B.fg,margin:0,textTransform:"uppercase",lineHeight:1 }}>Work</h2>
        </div>
        <span style={{ fontFamily:MONO,fontSize:"0.58rem",color:B.fgFaint,letterSpacing:"0.1em" }}>11 PROJECTS · SCROLL ↓</span>
      </div>

      {/* Sticky stacking cards — each wrapper gives scroll space, inner card sticks */}
      {WORKS.map((w, i) => (
        <div key={i} style={{ minHeight:"100vh", position:"relative" }}>
          <div onClick={() => setActiveW(w)} data-hover
            style={{
              position:"sticky",
              top:`${56 + i * 4}px`,          // slight cascade — each sticks a tiny bit lower
              zIndex: i + 1,                   // later cards cover earlier
              cursor:"pointer",
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              height:`calc(100vh - ${56 + i * 4}px)`,
              overflow:"hidden",
              border:`1px solid ${B.border}`,
              borderTop:`3px solid ${w.color}`,
              background:B.surface,
              boxShadow:`0 -${4 + i * 2}px ${24 + i * 6}px rgba(0,0,0,${0.4 + i * 0.02})`,
              transition:"filter .25s",
            }}
            onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.filter="brightness(1.06)"}
            onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.filter=""}>

            {/* ── Left: text info ── */}
            <div style={{ padding:"3.5rem 3.5rem", display:"flex", flexDirection:"column", justifyContent:"center", borderRight:`1px solid ${B.border}`, position:"relative", overflow:"hidden" }}>
              {/* Faint ghost number */}
              <div style={{ position:"absolute",left:"-0.5rem",bottom:"-1rem",fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(8rem,13vw,13rem)",color:`${w.color}0D`,lineHeight:1,userSelect:"none",pointerEvents:"none",letterSpacing:"-0.03em" }}>{w.n}</div>
              <div style={{ position:"relative",zIndex:1 }}>
                <div style={{ display:"flex",alignItems:"center",gap:"0.85rem",marginBottom:"1.4rem" }}>
                  <span style={{ fontFamily:MONO,fontSize:"0.52rem",textTransform:"uppercase",letterSpacing:"0.2em",color:B.fgFaint }}>{w.n}</span>
                  <span style={{ flex:1,height:"1px",background:B.border,maxWidth:"40px" }}/>
                  <span style={{ fontFamily:MONO,fontSize:"0.52rem",textTransform:"uppercase",letterSpacing:"0.16em",color:w.color }}>{w.cat}</span>
                </div>
                <h3 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(2.2rem,4.2vw,4rem)",color:B.fg,textTransform:"uppercase",margin:"0 0 1.4rem",lineHeight:0.92,letterSpacing:"-0.02em" }}>{w.title}</h3>
                <p style={{ fontFamily:BODY,fontSize:"0.88rem",color:B.fgMuted,lineHeight:1.8,margin:"0 0 1.5rem",maxWidth:"24rem" }}>{w.desc}</p>
                <div style={{ fontFamily:MONO,fontSize:"0.55rem",textTransform:"uppercase",letterSpacing:"0.12em",color:B.fgFaint,marginBottom:"2.2rem" }}>{w.tag}</div>
                <div style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",fontFamily:MONO,fontSize:"0.62rem",textTransform:"uppercase",letterSpacing:"0.14em",color:w.color,border:`1px solid ${w.color}40`,padding:"0.55rem 1rem" }}>
                  Click to open ↗
                </div>
              </div>
            </div>

            {/* ── Right: gradient visual ── */}
            <div style={{ background:`linear-gradient(145deg,${w.color}15,${w.color}55)`, position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"24px 24px" }}/>
              {/* Giant bleed number */}
              <div style={{ position:"absolute",right:"-1rem",bottom:"-1.5rem",fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(10rem,20vw,22rem)",color:`${w.color}18`,lineHeight:1,userSelect:"none",letterSpacing:"-0.04em" }}>{w.n}</div>
              {/* Stack indicator — shows how many cards are "below" */}
              <div style={{ position:"absolute",top:"1.2rem",right:"1.2rem",fontFamily:MONO,fontSize:"0.5rem",textTransform:"uppercase",letterSpacing:"0.16em",color:`${w.color}90`,background:`${w.color}14`,padding:"4px 10px",border:`1px solid ${w.color}30` }}>
                {w.n} / {WORKS.length.toString().padStart(2,"0")}
              </div>
            </div>
          </div>
        </div>
      ))}

      {activeW && <WorkPopup w={activeW} onClose={() => setActiveW(null)}/>}
    </section>
  );
}

// ─── Experience — side hover panel ────────────────────────────────────────────
function JourneyMap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [modal, setModal] = useState<typeof EXP[0]|null>(null);

  function switchTo(i: number) {
    if (i === activeIdx) return;
    setAnimating(true);
    setTimeout(() => { setActiveIdx(i); setAnimating(false); }, 180);
  }

  const cur = EXP[activeIdx];

  return (
    <section id="experience" style={{ padding:"6rem 2.8rem 8rem",background:B.bg,borderBottom:`1px solid ${B.border}`,position:"relative" }}>
      {/* subtle dot grid */}
      <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)",backgroundSize:"36px 36px",pointerEvents:"none",opacity:1 }}/>

      <div style={{ maxWidth:"1100px",margin:"0 auto",position:"relative",zIndex:1 }}>
        {/* Header */}
        <div style={{ display:"flex",alignItems:"baseline",gap:"1.5rem",marginBottom:"4rem",paddingBottom:"1.5rem",borderBottom:`1px solid ${B.border}` }}>
          <span style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.2em",color:B.fgFaint }}>02 /</span>
          <h2 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(2.5rem,6vw,5rem)",color:B.fg,margin:0,textTransform:"uppercase",lineHeight:1 }}>The Journey</h2>
        </div>

        {/* Side-hover layout */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 5rem",alignItems:"start" }}>

          {/* ── Left: role list ── */}
          <div>
            {EXP.map((exp,i)=>{
              const isActive = activeIdx === i;
              return (
                <div key={i} onMouseEnter={()=>switchTo(i)} onClick={()=>setModal(exp)} data-hover
                  style={{
                    padding:"1.75rem 0 1.75rem 1.1rem",
                    borderBottom:`1px solid ${isActive?exp.color+"30":B.border}`,
                    borderLeft:`3px solid ${isActive?exp.color:"transparent"}`,
                    cursor:"pointer",
                    transition:"border-color .25s,opacity .25s,padding-left .25s",
                    opacity:isActive?1:0.3,
                    background:isActive?`${exp.color}06`:"transparent",
                  }}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"1rem" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:"0.6rem",marginBottom:"0.3rem" }}>
                        <span style={{ fontFamily:MONO,fontSize:"0.52rem",color:isActive?exp.color:B.fgFaint,letterSpacing:"0.1em" }}>{exp.n}</span>
                        {exp.current && isActive && (
                          <span style={{ display:"inline-flex",alignItems:"center",gap:"0.3rem",fontFamily:MONO,fontSize:"0.44rem",textTransform:"uppercase",letterSpacing:"0.14em",color:B.coral }}>
                            <span style={{ display:"inline-block",width:"5px",height:"5px",borderRadius:"50%",background:B.coral,animation:"accentPulse 2s ease-in-out infinite" }}/>
                            NOW
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:isActive?"clamp(1.4rem,2.5vw,2rem)":"clamp(1.15rem,2vw,1.5rem)",color:isActive?B.fg:B.fgMuted,textTransform:"uppercase",margin:"0 0 0.22rem",lineHeight:1.05,transition:"font-size .25s,color .25s" }}>{exp.role}</h3>
                      <span style={{ fontFamily:MONO,fontSize:"0.58rem",color:isActive?exp.color:B.fgFaint,letterSpacing:"0.06em",transition:"color .25s" }}>{exp.org}</span>
                    </div>
                    <span style={{ fontFamily:MONO,fontSize:"0.52rem",color:B.fgFaint,whiteSpace:"nowrap",paddingTop:"0.2rem",flexShrink:0 }}>{exp.dates}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: sticky detail panel ── */}
          <div style={{ position:"sticky",top:"6rem",alignSelf:"flex-start" }}>
            <div style={{
              opacity:animating?0:1,
              transform:animating?"translateX(16px)":"translateX(0)",
              transition:"opacity .18s ease,transform .22s ease",
            }}>
              {/* Color bar */}
              <div style={{ height:"3px",background:cur.color,marginBottom:"0",opacity:0.9,transition:"background .3s" }}/>
              {/* Card */}
              <div style={{ background:B.surface,border:`1px solid ${cur.color}30`,padding:"2.2rem 2rem 2.2rem",transition:"border-color .3s",boxShadow:`0 24px 60px rgba(0,0,0,0.4), 0 0 0 0 ${cur.color}` }}>
                {/* Icon + org */}
                <div style={{ display:"flex",alignItems:"center",gap:"0.9rem",marginBottom:"1.4rem" }}>
                  <div style={{ width:"48px",height:"48px",borderRadius:"50%",background:cur.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem",flexShrink:0,boxShadow:`0 0 0 4px ${B.bg},0 0 20px ${cur.color}55`,transition:"background .3s,box-shadow .3s" }}>
                    {cur.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily:MONO,fontSize:"0.58rem",color:cur.color,textTransform:"uppercase",letterSpacing:"0.12em",transition:"color .3s" }}>{cur.org}</div>
                    <div style={{ fontFamily:MONO,fontSize:"0.52rem",color:B.fgFaint,letterSpacing:"0.06em" }}>{cur.dates}</div>
                  </div>
                </div>

                <h2 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(1.6rem,2.8vw,2.4rem)",color:B.fg,textTransform:"uppercase",margin:"0 0 1.2rem",lineHeight:1.05 }}>{cur.role}</h2>
                <p style={{ fontFamily:BODY,fontSize:"0.9rem",color:B.fgMuted,lineHeight:1.88,margin:"0 0 1.75rem" }}>{cur.detail}</p>

                {cur.current && (
                  <div style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",padding:"0.6rem 1rem",border:`1px solid ${B.coral}30`,background:`${B.coral}08`,marginBottom:"1.25rem" }}>
                    <span style={{ display:"inline-block",width:"6px",height:"6px",borderRadius:"50%",background:B.coral,animation:"accentPulse 2s ease-in-out infinite" }}/>
                    <span style={{ fontFamily:MONO,fontSize:"0.52rem",textTransform:"uppercase",letterSpacing:"0.15em",color:B.coral }}>CURRENT ROLE — ONGOING</span>
                  </div>
                )}

                <button onClick={()=>setModal(cur)} data-hover
                  style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.12em",background:"none",border:`1px solid ${B.borderBright}`,color:B.fgMuted,padding:"0.65rem 1.2rem",cursor:"pointer",display:"block",transition:"border-color .2s,color .2s" }}
                  onMouseEnter={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=cur.color; b.style.color=cur.color; }}
                  onMouseLeave={e=>{ const b=e.currentTarget as HTMLButtonElement; b.style.borderColor=B.borderBright; b.style.color=B.fgMuted; }}>
                  Read full story ↗
                </button>
              </div>

              {/* Step indicators */}
              <div style={{ display:"flex",gap:"0.4rem",padding:"1rem 0 0" }}>
                {EXP.map((_,i)=>(
                  <div key={i} onClick={()=>switchTo(i)} data-hover style={{ height:"2px",flex:1,background:i===activeIdx?EXP[i].color:B.border,transition:"background .3s",cursor:"pointer" }}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full detail modal */}
      {modal && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",backdropFilter:"blur(10px)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem",animation:"fadeIn .2s ease" }} onClick={()=>setModal(null)}>
          <div style={{ background:B.surface,border:`1px solid ${modal.current?B.coral+"50":modal.color+"40"}`,maxWidth:"42rem",width:"100%",boxShadow:modal.current?`0 0 50px ${B.coral}18`:"none",animation:"reveal .3s ease" }} onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1rem 1.5rem",borderBottom:`1px solid ${B.border}`,background:B.bg }}>
              <div style={{ display:"flex",alignItems:"center",gap:"0.6rem" }}>
                <div style={{ width:"10px",height:"10px",borderRadius:"50%",background:modal.color }}/>
                <span style={{ fontFamily:MONO,fontSize:"0.6rem",color:B.fgFaint,letterSpacing:"0.1em" }}>~/experience/{modal.n}.log</span>
              </div>
              <button onClick={()=>setModal(null)} data-hover style={{ background:"none",border:"none",fontFamily:MONO,fontSize:"1rem",color:B.fgMuted }}>✕</button>
            </div>
            <div style={{ padding:"2.2rem 2.2rem 2.5rem" }}>
              <div style={{ fontFamily:MONO,fontSize:"0.6rem",color:modal.color,textTransform:"uppercase",letterSpacing:"0.18em",marginBottom:"0.6rem" }}>{modal.dates}</div>
              <h2 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(1.8rem,3vw,2.6rem)",color:B.fg,margin:"0 0 0.35rem",textTransform:"uppercase",lineHeight:1 }}>{modal.role}</h2>
              <p style={{ fontFamily:MONO,fontSize:"0.68rem",color:modal.color,letterSpacing:"0.08em",marginBottom:"1.5rem" }}>{modal.org}</p>
              <p style={{ fontFamily:BODY,fontSize:"0.92rem",color:B.fgMuted,lineHeight:1.88,margin:0 }}>{modal.detail}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [entries, setEntries] = useState<{name:string;msg:string;date:string}[]>([]);
  const [name, setName] = useState(""); const [msg, setMsg] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if(!name.trim()||!msg.trim()) return;
    setEntries([{name:name.trim(),msg:msg.trim(),date:new Date().toLocaleDateString()},...entries]);
    setName(""); setMsg("");
  }
  const iBase: React.CSSProperties = { fontFamily:MONO,fontSize:"0.82rem",padding:"0.9rem 1rem",background:B.surface,border:`1px solid ${B.border}`,color:B.fg,outline:"none",width:"100%",boxSizing:"border-box",transition:"border-color .2s" };

  const contactLinks = [
    { label:"aparnadhiraj07@gmail.com", href:"mailto:aparnadhiraj07@gmail.com" },
    { label:"7356675700",              href:"tel:7356675700" },
    { label:"LinkedIn ↗",             href:"https://linkedin.com/in/aparna-dhiraj-6b25992a0" },
    { label:"GitHub ↗",               href:"https://github.com/aparnadhiraj12-crypto" },
  ];

  return (
    <section id="contact" style={{ padding:"6rem 2.8rem 0",background:B.bg }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto" }}>
        {/* Header + small links only */}
        <div style={{ borderBottom:`1px solid ${B.border}`,paddingBottom:"5rem",marginBottom:"5rem" }}>
          <div style={{ display:"flex",alignItems:"baseline",gap:"1.5rem",marginBottom:"3rem" }}>
            <span style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.2em",color:B.fgFaint }}>03 /</span>
            <h2 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"clamp(2.5rem,6vw,5rem)",color:B.fg,margin:0,textTransform:"uppercase",lineHeight:1 }}>{"Let's Work"}</h2>
          </div>

          {/* Contact links strip */}
          <div style={{ display:"flex",gap:"0",flexWrap:"wrap",border:`1px solid ${B.border}` }}>
            {contactLinks.map(({ label, href }) => (
              <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined} rel="noopener" data-hover
                style={{ fontFamily:MONO,fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.1em",color:B.fgMuted,textDecoration:"none",padding:"1.1rem 1.6rem",borderRight:`1px solid ${B.border}`,display:"flex",alignItems:"center",gap:"0.4rem",transition:"color .2s,background .2s" }}
                onMouseEnter={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.color=B.coral; a.style.background=`${B.coral}08`; }}
                onMouseLeave={e=>{ const a=e.currentTarget as HTMLAnchorElement; a.style.color=B.fgMuted; a.style.background="transparent"; }}>
                <span style={{ color:B.fgFaint }}>↗</span> {label}
              </a>
            ))}
          </div>
        </div>

        {/* Guestbook */}
        <div style={{ maxWidth:"42rem",paddingBottom:"6rem" }}>
          <div style={{ display:"flex",alignItems:"baseline",gap:"1rem",marginBottom:"2rem" }}>
            <span style={{ fontFamily:MONO,fontSize:"0.6rem",textTransform:"uppercase",letterSpacing:"0.2em",color:B.fgFaint }}>~/guestbook</span>
            <h3 style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"1.8rem",color:B.fg,margin:0,textTransform:"uppercase" }}>Sign the log</h3>
          </div>
          <form onSubmit={submit} style={{ display:"flex",flexDirection:"column",gap:"0.75rem",marginBottom:"2.5rem" }}>
            <div style={{ display:"flex",gap:"0.75rem",alignItems:"center",background:B.surface,border:`1px solid ${B.border}`,padding:"0 1rem" }}>
              <span style={{ fontFamily:MONO,fontSize:"0.75rem",color:B.coral,flexShrink:0 }}>$</span>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="your_name" maxLength={60} required
                style={{ ...iBase,border:"none",background:"transparent",padding:"0.9rem 0" }}
                onFocus={e=>(e.currentTarget as HTMLInputElement).parentElement!.style.borderColor=B.coral}
                onBlur={e=>(e.currentTarget as HTMLInputElement).parentElement!.style.borderColor=B.border}/>
            </div>
            <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="say hello, or tell me about an opportunity…" maxLength={400} required rows={3}
              style={{ ...iBase,resize:"vertical" }}
              onFocus={e=>(e.currentTarget as HTMLTextAreaElement).style.borderColor=B.coral}
              onBlur={e=>(e.currentTarget as HTMLTextAreaElement).style.borderColor=B.border}/>
            <button type="submit" data-hover style={{ fontFamily:MONO,fontSize:"0.65rem",textTransform:"uppercase",letterSpacing:"0.12em",background:B.coral,color:B.bg,border:"none",padding:"0.9rem 2rem",alignSelf:"flex-start",transition:"background .2s" }}
              onMouseEnter={e=>(e.currentTarget as HTMLButtonElement).style.background=B.coralD}
              onMouseLeave={e=>(e.currentTarget as HTMLButtonElement).style.background=B.coral}>$ submit_note →</button>
          </form>
          {entries.length===0
            ? <p style={{ fontFamily:MONO,fontSize:"0.65rem",color:B.fgFaint,fontStyle:"italic" }}>// no entries yet — be the first</p>
            : entries.map((en,i)=>(
              <div key={i} style={{ borderTop:`1px solid ${B.border}`,padding:"1rem 0" }}>
                <div style={{ fontFamily:MONO,fontSize:"0.58rem",textTransform:"uppercase",letterSpacing:"0.1em",color:B.coral,marginBottom:"0.35rem" }}>&gt; {en.name} · {en.date}</div>
                <p style={{ fontFamily:BODY,fontSize:"0.88rem",color:B.fgMuted,lineHeight:1.65,margin:0 }}>{en.msg}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop:`1px solid ${B.border}`,padding:"1.5rem 2.8rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem" }}>
        <span style={{ fontFamily:DISPLAY,fontWeight:900,fontSize:"1.2rem",color:B.fg,textTransform:"uppercase" }}>APARNA DHIRAJ</span>
        <span style={{ fontFamily:MONO,fontSize:"0.55rem",textTransform:"uppercase",letterSpacing:"0.15em",color:B.fgFaint }}>// designed & built by aparna · 陛 · {new Date().getFullYear()}</span>
        <span style={{ fontFamily:MONO,fontSize:"0.55rem",color:B.coralD }}>● ALL RIGHTS RESERVED</span>
      </div>
    </section>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [entered, setEntered] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  if(!entered) return <Landing onEnter={()=>setEntered(true)}/>;
  return (
    <div style={{ fontFamily:BODY,background:B.bg,color:B.fg }}>
      <style>{G}</style>
      <Grain/>
      <Cursor/>
      <Hero onAbout={()=>setAboutOpen(true)}/>
      <StatsTicker/>
      <Works/>
      <JourneyMap/>
      <Contact/>
      {aboutOpen && <AboutOverlay onClose={()=>setAboutOpen(false)}/>}
    </div>
  );
}
