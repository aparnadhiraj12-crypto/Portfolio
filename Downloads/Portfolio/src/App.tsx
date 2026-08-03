import { useState, useEffect, useRef } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────

const PHRASES = [
  "I don't forget ideas — I let them marinate until they're ready to click.",
]

const EXPERIENCES = [
  { role: 'ML Intern', company: 'CSIR-IICT', dates: 'Jun–Jul 2026', description: 'Contributing to ML-driven research, applying data analysis and model development to real-world problems.' },
  { role: 'Campus Ambassador', company: 'Unstop', dates: 'Aug–Nov 2025', description: 'Spearheaded outreach campaigns and coordinated stakeholder communication to grow student engagement.' },
  { role: 'Frontend Developer', company: 'Averixis Solutions', dates: 'Aug–Oct 2025', description: 'Built reusable component libraries for seamless cross-device UX.' },
  { role: 'PM Intern', company: 'LimeUp', dates: 'May–Jun 2025', description: 'Led sprint planning, risk tracking, and stakeholder communication using Agile/Scrum.' },
  { role: 'Frontend Dev Intern', company: 'Climentos', dates: 'Nov–Dec 2024', description: "Enhanced a government complaint portal's flow and accessibility within an agile team." },
]

const PROJECTS = [
  {
    name: 'Finclarity',
    company: 'HackRx 6.0',
    year: '2025',
    description: 'AI-assisted personal finance app; semi-finalist at Bajaj HackRx 6.0.',
    tags: ['React', 'AI/ML', 'FinTech'],
    github: '#',
    img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=700&fit=crop&auto=format',
  },
  {
    name: 'TraumaLink',
    company: 'Personal',
    year: '2025',
    description: 'Real-time app connecting paramedics and hospitals for faster trauma-care coordination.',
    tags: ['Node.js', 'WebSockets', 'Healthcare'],
    github: '#',
    img: 'https://images.unsplash.com/photo-1628372095387-017d1099fc19?w=1200&h=700&fit=crop&auto=format',
  },
  {
    name: 'SkillDial',
    company: 'Personal',
    year: '2025',
    description: 'A freelancing marketplace built exclusively for students.',
    tags: ['React', 'PostgreSQL', 'Marketplace'],
    github: '#',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=700&fit=crop&auto=format',
  },
  {
    name: 'JanMitra',
    company: 'Personal · Patent Pending',
    year: '2024',
    description: 'AI-powered civic complaint routing; patent application under review.',
    tags: ['Python', 'NLP', 'Civic Tech'],
    github: '#',
    img: 'https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=1200&h=700&fit=crop&auto=format',
  },
  {
    name: 'Malaria Forecasting',
    company: 'CSIR-IICT',
    year: '2024',
    description: 'Built with IICT to forecast outbreaks for earlier public-health response.',
    tags: ['ML', 'Python', 'Public Health'],
    github: '#',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop&auto=format',
  },
  {
    name: 'Astram',
    company: 'Personal',
    year: '2024',
    description: 'ML-based app visualizing real-time traffic conditions.',
    tags: ['ML', 'Maps API', 'Real-time'],
    github: '#',
    img: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?w=1200&h=700&fit=crop&auto=format',
  },
  {
    name: 'Smart Irrigation',
    company: 'Personal · In Progress',
    year: '2026',
    description: 'Remote monitoring and control of irrigation systems via IoT sensors.',
    tags: ['IoT', 'Arduino', 'Hardware'],
    github: '#',
    img: 'https://images.unsplash.com/photo-1692369584496-3216a88f94c1?w=1200&h=700&fit=crop&auto=format',
  },
]

const ACCENTS = [
  { color: '#3B5BDB', name: 'blue' },
  { color: '#8FCB9B', name: 'pastel green' },
  { color: '#7048E8', name: 'purple' },
]

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useTypewriter(phrases: string[], speed = 52, delSpeed = 28, pause = 2400) {
  const [text, setText] = useState('')
  const [pi, setPi] = useState(0)
  const [del, setDel] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const phrase = phrases[pi]
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDel(true) }, pause)
      return () => clearTimeout(t)
    }
    if (del) {
      if (text.length === 0) { setDel(false); setPi(i => (i + 1) % phrases.length); return }
      const t = setTimeout(() => setText(s => s.slice(0, -1)), delSpeed)
      return () => clearTimeout(t)
    }
    if (text === phrase) { setPaused(true); return }
    const t = setTimeout(() => setText(phrase.slice(0, text.length + 1)), speed)
    return () => clearTimeout(t)
  }, [text, pi, del, paused, phrases, speed, delSpeed, pause])

  return text
}

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect() } },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return { ref, vis }
}

// ─── Pill button ────────────────────────────────────────────────────────────

function Pill({
  children, onClick, active = false, accent,
}: {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  accent: string
}) {
  const [hov, setHov] = useState(false)
  const lit = active || hov
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: 'none', cursor: 'pointer', borderRadius: '999px',
        padding: '7px 20px', fontSize: '13px', fontWeight: 500,
        fontFamily: 'var(--font-display)', letterSpacing: '0.01em',
        background: lit ? accent : 'rgba(20,20,20,0.06)',
        color: lit ? '#fff' : 'var(--foreground)',
        boxShadow: lit
          ? `0 4px 14px ${accent}44`
          : '0 1px 4px rgba(20,20,20,0.08)',
        transform: lit ? 'scale(1.03)' : 'scale(1)',
        transition: 'all 0.15s ease',
      }}
    >
      {children}
    </button>
  )
}

// ─── Arrow text link ─────────────────────────────────────────────────────────

function ArrowLink({ href, children, accent, large = false }: { href: string; children: React.ReactNode; accent: string; large?: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '3px',
        fontSize: large ? '17px' : '13px', fontWeight: 500,
        color: hov ? accent : 'var(--muted-foreground)',
        textDecoration: 'none',
        transition: 'color 0.15s ease',
      }}
    >
      {children}
      <span style={{
        display: 'inline-block',
        transform: hov ? 'translate(3px,-3px)' : 'translate(0,0)',
        transition: 'transform 0.18s ease',
        fontSize: large ? '15px' : '11px',
      }}>↗</span>
    </a>
  )
}

// ─── Nav pill link (playful Resume/LinkedIn treatment) ────────────────────────

function NavPillLink({ href, children, accent }: { href: string; children: React.ReactNode; accent: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600,
        padding: '7px 14px', borderRadius: '999px',
        textDecoration: 'none',
        background: hov ? accent : 'transparent',
        color: hov ? '#fff' : 'var(--muted-foreground)',
        transform: hov ? 'scale(1.05) rotate(-2deg)' : 'scale(1) rotate(0deg)',
        boxShadow: hov ? `0 6px 16px ${accent}44` : 'none',
        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {children}
      <span style={{
        display: 'inline-block', fontSize: '11px',
        transform: hov ? 'translate(2px,-2px) rotate(8deg)' : 'translate(0,0) rotate(0deg)',
        transition: 'transform 0.2s ease',
      }}>↗</span>
    </a>
  )
}

// ─── Project card (Perry Wang style — full-width with image reveal) ──────────

function ProjectCard({ name, company, year, description, tags, github, img, accent, index }: typeof PROJECTS[0] & { accent: string; index: number }) {
  const [hov, setHov] = useState(false)
  const { ref, vis } = useFadeIn(index * 80)

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.55s ease ${index * 0.06}s, transform 0.55s ease ${index * 0.06}s`,
      }}
    >
      <a
        href={github} target="_blank" rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        {/* Image area */}
        <div style={{
          width: '100%',
          aspectRatio: '16 / 7',
          borderRadius: '18px',
          overflow: 'hidden',
          background: '#e8e8e6',
          boxShadow: hov ? '0 20px 60px rgba(20,20,20,0.13), 0 6px 20px rgba(20,20,20,0.07)' : '0 6px 28px rgba(20,20,20,0.07), 0 2px 8px rgba(20,20,20,0.04)',
          transition: 'box-shadow 0.3s ease, transform 0.3s ease',
          transform: hov ? 'translateY(-3px) scale(1.005)' : 'translateY(0) scale(1)',
        }}>
          <img
            src={img}
            alt={name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transform: hov ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.45s ease',
            }}
          />
        </div>

        {/* Card meta */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          marginTop: '18px', gap: '16px',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '22px', color: 'var(--foreground)', margin: 0,
                lineHeight: 1.1,
              }}>{name}</h3>
              <span style={{ color: 'var(--muted-foreground)', fontSize: '13px' }}>{company} · {year}</span>
            </div>
            <p style={{ margin: '6px 0 10px', fontSize: '14px', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{description}</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <span key={tag} style={{
                  border: `1px solid rgba(20,20,20,0.12)`, borderRadius: '999px',
                  padding: '2px 10px', fontSize: '11px', color: 'var(--muted-foreground)',
                  letterSpacing: '0.02em',
                }}>{tag}</span>
              ))}
            </div>
          </div>
          <span style={{
            width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: hov ? accent : 'rgba(20,20,20,0.06)',
            color: hov ? '#fff' : 'var(--muted-foreground)',
            fontSize: '16px',
            boxShadow: hov ? `0 4px 16px ${accent}44` : 'none',
            transform: hov ? 'translate(2px,-2px)' : 'translate(0,0)',
            transition: 'all 0.2s ease',
          }}>↗</span>
        </div>
      </a>
    </article>
  )
}

// ─── Experience row ─────────────────────────────────────────────────────────

function ExpRow({ role, company, dates, description, accent }: typeof EXPERIENCES[0] & { accent: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '18px 20px', borderRadius: '14px',
        background: hov ? `${accent}08` : 'transparent',
        boxShadow: hov ? '0 4px 20px rgba(20,20,20,0.07)' : 'none',
        transform: hov ? 'translateX(5px)' : 'translateX(0)',
        transition: 'all 0.2s ease', cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px', color: 'var(--foreground)' }}>{role}</span>
          <span style={{ color: accent, fontSize: '14px', fontWeight: 500 }}>@ {company}</span>
        </div>
        <span style={{ color: 'var(--muted-foreground)', fontSize: '12px', fontStyle: 'italic' }}>{dates}</span>
      </div>
      <p style={{ margin: '5px 0 0', fontSize: '13.5px', color: 'var(--muted-foreground)', lineHeight: 1.55 }}>{description}</p>
    </div>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const typed = useTypewriter(PHRASES)
  const [scrolled, setScrolled] = useState(false)
  const [accentIdx, setAccentIdx] = useState(0)
  const [view, setView] = useState<'work' | 'info' | 'fun'>('work')
  const [dark, setDark] = useState(false)
  const [funAboutOpen, setFunAboutOpen] = useState(false)
  const accent = ACCENTS[accentIdx].color

  const heroRef = useFadeIn(0)
  const workFade = useFadeIn(0)
  const aboutFade = useFadeIn(0)
  const expFade = useFadeIn(0)
  const contactFade = useFadeIn(0)
  const funFade = useFadeIn(0)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const goToView = (v: 'work' | 'info' | 'fun') => {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const rotateAccent = () => {
    const next = (accentIdx + 1) % ACCENTS.length
    setAccentIdx(next)
  }

  return (
    <div className={dark ? 'dark' : ''} style={{ background: 'var(--background)', minHeight: '100vh', fontFamily: 'var(--font-body)', transition: 'background-color 0.25s ease' }}>

      {/* ── NAV ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? '10px 0' : '18px 0',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--border)' : 'none',
        transition: 'padding 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
      }}>
        <nav style={{
          maxWidth: '1120px', margin: '0 auto',
          padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Left */}
          <div style={{
            opacity: (scrolled || view === 'info') ? 1 : 0,
            transform: (scrolled || view === 'info') ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: (scrolled || view === 'info') ? 'auto' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--foreground)', lineHeight: 1.1 }}>
              Aparna Dhiraj
            </div>
            <div style={{ fontSize: '10px', color: 'var(--label)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '1px' }}>
              Web Developer
            </div>
          </div>

          {/* Center: pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { label: 'Work', id: 'work' as const },
              { label: 'Info', id: 'info' as const },
            ].map(({ label, id }) => (
              <Pill key={id} onClick={() => goToView(id)} active={view === id} accent={accent}>
                {label}
              </Pill>
            ))}
          </div>

          {/* Right: playful links + avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NavPillLink href="#" accent={accent}>Resume</NavPillLink>
            <NavPillLink href="#" accent={accent}>LinkedIn</NavPillLink>
            <AvatarButton accent={accent} onClick={() => setFunAboutOpen(true)} />
          </div>
        </nav>
      </header>

      <FunAboutModal open={funAboutOpen} onClose={() => setFunAboutOpen(false)} accent={accent} />

      {view === 'work' && (
      <>
      {/* ── HERO (full screen — Selected Work stays off-screen until you scroll) ── */}
      <section
        ref={heroRef.ref as React.RefObject<HTMLElement>}
        style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '0 32px', position: 'relative',
          maxWidth: '1120px', margin: '0 auto',
          opacity: heroRef.vis ? 1 : 0,
          transform: heroRef.vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Location, top center */}
        <span style={{
          fontSize: '13px', color: 'var(--foreground)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          marginBottom: '32px',
        }}>
          Bangalore, India
        </span>

        {/* Big headline */}
        <h1 style={{
          fontFamily: 'var(--font-headline)', fontWeight: 700,
          fontSize: 'clamp(64px, 9.5vw, 100px)',
          lineHeight: 0.82, color: 'var(--foreground)',
          margin: '0 0 8px',
          letterSpacing: '-0.02em', textTransform: 'uppercase',
          maxWidth: '12em', textAlign: 'center',
        }}>
          APARNA DHIRAJ
        </h1>

        {/* Subtitle / role — pale watermark style, same headline font */}
        <p style={{
          fontFamily: 'var(--font-headline)', fontWeight: 400,
          fontSize: 'clamp(28px, 5vw, 56px)',
          color: 'var(--pale)',
          margin: '0 0 40px',
          letterSpacing: '0em', lineHeight: 1.05, textTransform: 'uppercase',
        }}>
          SOFTWARE ENGINEERING STUDENT &amp; WEB DEVELOPER
        </p>

        {/* Typewriter line */}
        <div style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          fontFamily: 'var(--font-display)', fontWeight: 500,
          color: 'var(--muted-foreground)', minHeight: '32px',
        }}>
          "{typed}"
          <span className="cursor-blink" style={{
            display: 'inline-block', width: '2px', height: '1em',
            background: accent, marginLeft: '3px',
            verticalAlign: 'middle', borderRadius: '1px',
          }} />
        </div>

        {/* Scroll link */}
        <button
          onClick={() => scrollTo('work')}
          style={{
            position: 'absolute', bottom: '40px', right: '0',
            background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'var(--label)', fontSize: '12px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            fontFamily: 'var(--font-display)',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = accent)}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--label)')}
        >
          Scroll
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      {/* ── WORK (Perry Wang style — full-width, single column, stacked down) ── */}
      <section
        id="work"
        ref={workFade.ref as React.RefObject<HTMLElement>}
        style={{
          maxWidth: '1120px', margin: '0 auto', padding: '0 32px 100px',
          opacity: workFade.vis ? 1 : 0,
          transform: workFade.vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: accent,
          }}>Selected Work '24–'26</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* single column, every project stacked full-width down the page */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: '64px',
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} {...p} accent={accent} index={i} />
          ))}
        </div>
      </section>
      </>
      )}

      {view === 'info' && (
      <>
      {/* ── ABOUT (formal, Perry Wang-style Info page) ── */}
      <section
        ref={aboutFade.ref as React.RefObject<HTMLElement>}
        style={{
          maxWidth: '1120px', margin: '0 auto', padding: '140px 32px 100px',
          opacity: aboutFade.vis ? 1 : 0,
          transform: aboutFade.vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: accent, display: 'inline-block' }} />
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px',
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--label)',
          }}>About Me</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(30px, 4.2vw, 52px)',
          lineHeight: 1.15, color: 'var(--foreground)',
          letterSpacing: '-0.02em', margin: '0 0 28px', maxWidth: '820px',
        }}>
          I'm a software engineering student who loves turning half-formed ideas into <span style={{ color: accent, fontStyle: 'italic' }}>shipped products.</span>
        </h2>

        <p style={{
          fontSize: 'clamp(15px, 1.6vw, 17px)', color: 'var(--muted-foreground)',
          lineHeight: 1.75, maxWidth: '680px', margin: 0,
        }}>
          Software Engineering student at VIT Vellore, based in Bangalore, India. I've built and shipped work with Averixis Solutions, LimeUp, and CSIR-IICT — spanning frontend development, product management, and ML research. I care about clean interfaces, solid engineering, and ideas that actually make it out of the notes app.
        </p>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        ref={expFade.ref as React.RefObject<HTMLElement>}
        style={{
          maxWidth: '1120px', margin: '0 auto', padding: '0 32px 100px',
          opacity: expFade.vis ? 1 : 0,
          transform: expFade.vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: accent,
          }}>Work Experience</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ width: '1px', background: `linear-gradient(to bottom, ${accent}, ${accent}22)`, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {EXPERIENCES.map(e => <ExpRow key={e.role} {...e} accent={accent} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT / FOOTER (Perry Wang-style personal footer) ── */}
      <footer
        id="contact"
        ref={contactFade.ref as React.RefObject<HTMLElement>}
        style={{
          maxWidth: '1120px', margin: '0 auto', padding: '80px 32px 60px',
          opacity: contactFade.vis ? 1 : 0,
          transform: contactFade.vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Big CTA headline */}
        <h2 style={{
          fontFamily: 'var(--font-headline)', fontWeight: 400,
          fontSize: 'clamp(40px, 6vw, 80px)',
          lineHeight: 1.05, color: 'var(--foreground)',
          letterSpacing: '0em',
          margin: '0 0 48px',
        }}>
          Let's build<br />
          <span style={{ color: accent }}>something.</span>
        </h2>

        {/* Contact details */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 64px', marginBottom: '48px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--label)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Email</div>
            <EmailHover href="mailto:aparnadhiraj07@gmail.com" accent={accent}>
              aparnadhiraj07@gmail.com
            </EmailHover>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--label)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Phone</div>
            <span style={{ fontSize: '16px', color: 'var(--muted-foreground)' }}>+91 7356675700</span>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--label)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Location</div>
            <span style={{ fontSize: '16px', color: 'var(--muted-foreground)' }}>Bangalore, India</span>
          </div>
        </div>

        {/* Links row */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '64px' }}>
          <ArrowLink href="#" accent={accent} large>GitHub</ArrowLink>
          <ArrowLink href="#" accent={accent} large>LinkedIn</ArrowLink>
          <ArrowLink href="#" accent={accent} large>Resume</ArrowLink>
        </div>

        {/* Footer bottom */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          flexWrap: 'wrap', gap: '16px',
          borderTop: '1px solid var(--border)', paddingTop: '24px',
        }}>
          <div style={{
            fontFamily: 'var(--font-hand)', fontSize: '20px',
            color: 'var(--label)', transform: 'rotate(-1.5deg)',
            display: 'inline-block',
          }}>
            always building, rarely finished 🌱
          </div>
          <span style={{ fontSize: '12px', color: 'var(--label)', letterSpacing: '0.04em' }}>
            © 2026 Aparna Dhiraj
          </span>
        </div>
      </footer>
      </>
      )}

      {/* ── Accent palette + dark/light switcher (Spencer Gabor corner control) ── */}
      <PaletteSwitcher
        accent={accent}
        accentIdx={accentIdx}
        onSelect={setAccentIdx}
        onRotate={rotateAccent}
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
      />
    </div>
  )
}

// ─── Email hover ──────────────────────────────────────────────────────────────

function EmailHover({ href, children, accent }: { href: string; children: React.ReactNode; accent: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 'clamp(16px, 2vw, 20px)',
        color: hov ? accent : 'var(--foreground)',
        textDecoration: 'none',
        borderBottom: `1.5px solid ${hov ? accent : 'transparent'}`,
        paddingBottom: '1px',
        transition: 'color 0.18s ease, border-color 0.18s ease',
        display: 'inline-block',
      }}
    >
      {children}
    </a>
  )
}

// ─── Palette switcher ─────────────────────────────────────────────────────────

function PaletteSwitcher({
  accent, accentIdx, onSelect, dark, onToggleDark,
}: {
  accent: string
  accentIdx: number
  onSelect: (i: number) => void
  onRotate: () => void
  dark: boolean
  onToggleDark: () => void
}) {
  const [hov, setHov] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 100 }}>
      {/* Color dots + dark/light toggle */}
      {open && (
        <div style={{
          position: 'absolute', bottom: '56px', right: 0,
          display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end',
        }}>
          {ACCENTS.map((a, i) => (
            <button
              key={a.name}
              onClick={() => onSelect(i)}
              title={a.name}
              style={{
                width: i === accentIdx ? '32px' : '24px',
                height: i === accentIdx ? '32px' : '24px',
                borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: a.color,
                boxShadow: i === accentIdx
                  ? `0 4px 14px ${a.color}55`
                  : '0 2px 8px rgba(20,20,20,0.1)',
                outline: i === accentIdx ? `2px solid ${a.color}` : 'none',
                outlineOffset: '2px',
                transition: 'all 0.2s ease',
              }}
            />
          ))}

          {/* Dark / light mode toggle */}
          <button
            onClick={onToggleDark}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: '26px', height: '26px', borderRadius: '50%',
              border: '1px solid var(--border)', cursor: 'pointer',
              background: dark ? '#1A1A18' : '#FFFFFF',
              boxShadow: '0 2px 8px rgba(20,20,20,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease', marginTop: '4px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              {dark ? (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#F5F5F3" />
              ) : (
                <g fill="#141414">
                  <circle cx="12" cy="12" r="4.2" />
                  <path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" />
                </g>
              )}
            </svg>
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        title="Customize theme"
        style={{
          width: '44px', height: '44px', borderRadius: '50%', border: 'none',
          background: accent, cursor: 'pointer',
          boxShadow: hov
            ? `0 8px 28px ${accent}55`
            : `0 4px 16px ${accent}33`,
          transform: hov ? 'scale(1.12) rotate(72deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.28s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="4" r="1.8" fill="white" opacity="0.9" />
          <circle cx="13.6" cy="6.5" r="1.8" fill="white" opacity="0.9" />
          <circle cx="13.6" cy="11.5" r="1.8" fill="white" opacity="0.9" />
          <circle cx="9" cy="14" r="1.8" fill="white" opacity="0.9" />
          <circle cx="4.4" cy="11.5" r="1.8" fill="white" opacity="0.9" />
          <circle cx="4.4" cy="6.5" r="1.8" fill="white" opacity="0.9" />
        </svg>
      </button>
    </div>
  )
}

// ─── Avatar button (opens the fun about) ──────────────────────────────────────

function AvatarButton({ accent, onClick }: { accent: string; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      title="The fun version of me"
      style={{
        width: '34px', height: '34px', borderRadius: '50%',
        border: `1.5px solid ${hov ? accent : 'var(--border)'}`,
        background: 'var(--card)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: hov ? 'scale(1.08) rotate(-6deg)' : 'scale(1)',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Hair silhouette (wavy) — fills with accent on hover, muted when idle */}
        <path d="M2.5 13.5c0-4.2 2.8-7.4 7.2-7.8 0 0 1.6-.2 3.3.6 1.7.8 3.5 1.1 4.8 2.8 1.3 1.7 1.2 4 0.6 5.8-.6 1.8-1.8 2.8-3.6 3.2-1.8.4-3.8.1-5.6-.6-1.8-.7-4.7-1.8-6.3-4z" fill={hov ? accent : 'var(--muted-foreground)'} />
        {/* Face */}
        <circle cx="11.8" cy="9.2" r="2.6" fill="var(--card)" />
        {/* Eyes */}
        <circle cx="10.6" cy="9" r="0.28" fill="var(--muted-foreground)" />
        <circle cx="12.9" cy="9" r="0.28" fill="var(--muted-foreground)" />
        {/* Smile */}
        <path d="M10.6 11.2c.6.6 1.6.6 2.2 0" stroke="var(--muted-foreground)" strokeWidth="0.45" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

// ─── Fun About modal ───────────────────────────────────────────────────────────

function FunAboutModal({ open, onClose, accent }: { open: boolean; onClose: () => void; accent: string }) {
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'var(--modal-overlay)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '520px', width: '100%',
          background: 'var(--card)', borderRadius: '24px',
          padding: '40px', position: 'relative',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
          border: '1px solid var(--border)',
        }}
      >
        <button
          onClick={onClose}
          title="Close"
          style={{
            position: 'absolute', top: '18px', right: '18px',
            width: '30px', height: '30px', borderRadius: '50%',
            border: 'none', background: 'var(--muted)', cursor: 'pointer',
            color: 'var(--muted-foreground)', fontSize: '15px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          ✕
        </button>

        <div style={{
          fontFamily: 'var(--font-hand)', fontSize: '20px', color: accent,
          transform: 'rotate(-2deg)', display: 'inline-block', marginBottom: '10px',
        }}>
          okay you found it 👀
        </div>

        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '28px', color: 'var(--foreground)', margin: '0 0 18px',
        }}>
          The unfiltered me
        </h3>

        <div style={{ fontSize: '15px', color: 'var(--muted-foreground)', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ margin: 0 }}>
            I'm the person who colour-codes a to-do list and then completely ignores it because a better idea just walked in.
          </p>
          <p style={{ margin: 0 }}>
            I keep a graveyard of half-finished side projects — not abandoned, just <em>marinating</em> — until one day, usually mid-shower, the missing piece clicks and I disappear for a weekend to build it.
          </p>
          <p style={{ margin: 0 }}>
            I do my best focused work with a movie quietly playing in the background. Don't ask me the plot of anything I've "watched" while coding — I was there for the vibes, not the dialogue.
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: 'var(--foreground)' }}>
            "I don't forget ideas — I let them marinate until they're ready to click."
          </p>
        </div>
      </div>
    </div>
  )
}