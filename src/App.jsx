import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#050810",
  surface: "#0a0f1e",
  card: "#0d1426",
  accent: "#00d4ff",
  accentGlow: "rgba(0,212,255,0.15)",
  accentSoft: "rgba(0,212,255,0.07)",
  gold: "#ffd166",
  text: "#e8eaf0",
  muted: "#6b7a9a",
  border: "rgba(0,212,255,0.12)",
};

const skills = [
  { label: "Python", level: 88, category: "Language" },
  { label: "C++", level: 80, category: "Language" },
  { label: "C", level: 75, category: "Language" },
  { label: "React", level: 82, category: "Web" },
  { label: "JavaScript", level: 80, category: "Web" },
  { label: "HTML/CSS", level: 90, category: "Web" },
  { label: "SQL", level: 78, category: "Database" },
  { label: "MongoDB", level: 70, category: "Database" },
  { label: "Git", level: 85, category: "Tools" },
  { label: "API Dev", level: 75, category: "Tools" },
  { label: "DSA", level: 82, category: "CS" },
];

const navItems = ["Home", "About", "Skills", "Projects", "Profiles", "Contact"];

function Particle({ style }) {
  return <div style={style} />;
}

function useParticles(count = 40) {
  const [particles] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1,
    }))
  );
  return particles;
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrollY;
}

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function AnimatedSection({ children, style, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hovered, setHovered] = useState(false);
  const categoryColors = {
    Language: "#00d4ff",
    Web: "#a78bfa",
    Database: "#34d399",
    Tools: "#fbbf24",
    CS: "#f87171",
  };
  const color = categoryColors[skill.category] || COLORS.accent;
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginBottom: 16,
        transition: "transform 0.2s",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, fontFamily: "'Space Mono', monospace" }}>
          {skill.label}
        </span>
        <span style={{ fontSize: 12, color, fontFamily: "'Space Mono', monospace" }}>{skill.level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: inView ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: 99,
            transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${index * 60}ms`,
            boxShadow: hovered ? `0 0 12px ${color}88` : "none",
          }}
        />
      </div>
    </div>
  );
}

function GlowCard({ children, style, glowColor = COLORS.accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: COLORS.card,
        border: `1px solid ${hovered ? glowColor + "55" : COLORS.border}`,
        borderRadius: 16,
        padding: 28,
        transition: "all 0.3s ease",
        boxShadow: hovered
          ? `0 0 40px ${glowColor}22, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${glowColor}22`
          : "0 4px 20px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function TypewriterText({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts]);
  return (
    <span>
      {displayed}
      <span style={{
        display: "inline-block",
        width: 2,
        height: "1em",
        background: COLORS.accent,
        marginLeft: 2,
        verticalAlign: "middle",
        animation: "blink 1s step-end infinite",
      }} />
    </span>
  );
}

function NavDot({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        width: active ? 24 : 8,
        height: 8,
        borderRadius: 99,
        background: active ? COLORS.accent : COLORS.muted,
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s",
        padding: 0,
        boxShadow: active ? `0 0 8px ${COLORS.accent}` : "none",
      }}
    />
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollY();
  const particles = useParticles(50);
  const sectionRefs = useRef([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const down = () => setCursorActive(true);
    const up = () => setCursorActive(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY + window.innerHeight / 3;
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[i];
        if (el && el.offsetTop <= scrolled) { setActiveSection(i); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionStyle = {
    minHeight: "100vh",
    padding: "80px 24px",
    maxWidth: 1100,
    margin: "0 auto",
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: COLORS.bg,
      color: COLORS.text,
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Space+Mono:wght@400;700&family=Orbitron:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.accent}44; border-radius: 99px; }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes drift {
          0% { transform: translate(0,0) scale(1); opacity: var(--op); }
          33% { transform: translate(30px, -50px) scale(1.2); opacity: calc(var(--op) * 1.5); }
          66% { transform: translate(-20px, 30px) scale(0.8); opacity: calc(var(--op) * 0.5); }
          100% { transform: translate(0,0) scale(1); opacity: var(--op); }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 20px ${COLORS.accent}44; }
          50% { box-shadow: 0 0 40px ${COLORS.accent}88; }
        }
        @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .nav-link {
          color: ${COLORS.muted};
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s;
          background: none; border: none;
        }
        .nav-link:hover, .nav-link.active { color: ${COLORS.accent}; }
        .tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Space Mono', monospace;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px;
          background: transparent;
          border: 1.5px solid ${COLORS.accent};
          color: ${COLORS.accent};
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Space Mono', monospace;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: ${COLORS.accent};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
          z-index: -1;
        }
        .btn-primary:hover::before { transform: scaleX(1); }
        .btn-primary:hover { color: ${COLORS.bg}; box-shadow: 0 0 24px ${COLORS.accent}66; }
        .social-link {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 20px;
          border: 1px solid ${COLORS.border};
          border-radius: 10px;
          color: ${COLORS.muted};
          text-decoration: none;
          font-size: 13px;
          transition: all 0.2s;
          background: ${COLORS.surface};
        }
        .social-link:hover {
          border-color: ${COLORS.accent}55;
          color: ${COLORS.accent};
          transform: translateX(4px);
          background: ${COLORS.accentSoft};
        }
      `}</style>

      {/* Custom cursor */}
      <div style={{
        position: "fixed",
        left: cursorPos.x - 12,
        top: cursorPos.y - 12,
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: `1.5px solid ${COLORS.accent}`,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.1s, opacity 0.2s",
        transform: cursorActive ? "scale(0.5)" : "scale(1)",
        mixBlendMode: "screen",
      }} />

      {/* Background particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {particles.map(p => (
          <Particle key={p.id} style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: COLORS.accent,
            opacity: p.opacity,
            "--op": p.opacity,
            animation: `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }} />
        ))}
        {/* Grid overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.border} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.4,
        }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent}0d 0%, transparent 70%)`, filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, #a78bfa0d 0%, transparent 70%)`, filter: "blur(60px)" }} />
      </div>

      {/* Navbar */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 40px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrollY > 50 ? `${COLORS.bg}ee` : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? `1px solid ${COLORS.border}` : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 18, fontWeight: 900, color: COLORS.accent, letterSpacing: 3 }}>
          SJ<span style={{ color: COLORS.text }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {navItems.map((item, i) => (
            <button key={item} className={`nav-link${activeSection === i ? " active" : ""}`} onClick={() => scrollTo(i)}>
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Side nav dots */}
      <div style={{ position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: 10 }}>
        {navItems.map((item, i) => (
          <NavDot key={item} label={item} active={activeSection === i} onClick={() => scrollTo(i)} />
        ))}
      </div>

      {/* HERO */}
      <section ref={el => sectionRefs.current[0] = el} style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 60 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <span className="tag" style={{ background: COLORS.accentSoft, color: COLORS.accent, border: `1px solid ${COLORS.border}` }}>
                ◉ Available for Opportunities
              </span>
            </div>
            <h1 style={{ fontFamily: "'Orbitron', monospace", fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}>
              <span style={{ display: "block", color: COLORS.text }}>SHOBHIT</span>
              <span style={{ display: "block", color: COLORS.accent, textShadow: `0 0 40px ${COLORS.accent}66` }}>JAJOO</span>
            </h1>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(14px, 2vw, 20px)", color: COLORS.muted, marginBottom: 32, minHeight: 28 }}>
              <span style={{ color: COLORS.accent }}>&gt; </span>
              <TypewriterText texts={["Software Engineer", "React Developer", "Problem Solver", "DSA Enthusiast", "Full Stack Builder"]} />
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.muted, maxWidth: 520, marginBottom: 40 }}>
              Computer Science student at <span style={{ color: COLORS.text }}>VIT Chennai</span> with a 9.14 CGPA. I build efficient software systems and solve complex algorithmic challenges — 100+ LeetCode problems and counting.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo(5)}>Get in Touch ↗</button>
              <button className="btn-primary" style={{ borderColor: COLORS.muted + "55", color: COLORS.muted }} onClick={() => scrollTo(3)}>View Projects</button>
            </div>
          </div>
          {/* Avatar / Orb */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", animation: "float 6s ease-in-out infinite" }}>
              <div style={{
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: `conic-gradient(from 0deg, ${COLORS.accent}, #a78bfa, ${COLORS.accent})`,
                padding: 3,
                animation: "rotate 8s linear infinite, glowPulse 3s ease-in-out infinite",
              }}>
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: COLORS.card,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}>
                  <div style={{ animation: "rotate 8s linear infinite reverse", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 48, fontWeight: 900, color: COLORS.accent }}>SJ</div>
                    <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>Dev</div>
                  </div>
                </div>
              </div>
              {/* Orbit rings */}
              {[280, 340].map((s, i) => (
                <div key={s} style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: s,
                  height: s,
                  marginLeft: -s / 2,
                  marginTop: -s / 2,
                  borderRadius: "50%",
                  border: `1px solid ${COLORS.accent}${i === 0 ? "33" : "1a"}`,
                  animation: `rotate ${12 + i * 8}s linear infinite${i === 1 ? " reverse" : ""}`,
                }}>
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: i === 0 ? "-6px" : "calc(100% - 6px)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: i === 0 ? COLORS.accent : "#a78bfa",
                    boxShadow: `0 0 12px ${i === 0 ? COLORS.accent : "#a78bfa"}`,
                    transform: "translateY(-50%)",
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${COLORS.accent}, transparent)`, animation: "float 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section ref={el => sectionRefs.current[1] = el} style={{ ...sectionStyle, position: "relative", zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.accent }}>01.</span>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 32, fontWeight: 900, color: COLORS.text }}>About Me</h2>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${COLORS.border}, transparent)` }} />
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <AnimatedSection delay={100}>
            <GlowCard>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, color: COLORS.accent, marginBottom: 20, letterSpacing: 2 }}>Profile</h3>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: COLORS.muted }}>
                I'm a highly motivated undergraduate student at <span style={{ color: COLORS.text, fontWeight: 600 }}>Vellore Institute of Technology, Chennai</span>, pursuing a B.Tech in Computer Science with a strong academic record.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: COLORS.muted, marginTop: 16 }}>
                My passion lies in building clean, efficient software systems — from mobile applications to web platforms. I take pride in my adaptability, work ethic, and ability to learn new technologies quickly.
              </p>
            </GlowCard>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <GlowCard glowColor="#a78bfa">
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, color: "#a78bfa", marginBottom: 20, letterSpacing: 2 }}>Education</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}>B.Tech — Computer Science</div>
                <div style={{ color: COLORS.muted, fontSize: 14 }}>Vellore Institute of Technology, Chennai</div>
                <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                  <span className="tag" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.25)" }}>Expected Jul 2028</span>
                  <span className="tag" style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }}>CGPA: 9.14</span>
                </div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 8 }}>Certifications</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.gold }} />
                    <span style={{ fontSize: 14, color: COLORS.text }}>Code Help — DSA Complete Course</span>
                  </div>
                </div>
              </div>
            </GlowCard>
          </AnimatedSection>
          <AnimatedSection delay={300} style={{ gridColumn: "1 / -1" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { val: "9.14", label: "CGPA", icon: "🎓", color: COLORS.gold },
                { val: "100+", label: "LeetCode Problems", icon: "⚡", color: COLORS.accent },
                { val: "3+", label: "Tech Stacks", icon: "🛠", color: "#a78bfa" },
                { val: "2028", label: "Graduation Year", icon: "📅", color: "#34d399" },
              ].map(stat => (
                <GlowCard key={stat.label} glowColor={stat.color} style={{ textAlign: "center", padding: 24 }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.val}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>{stat.label}</div>
                </GlowCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SKILLS */}
      <section ref={el => sectionRefs.current[2] = el} style={{ ...sectionStyle, position: "relative", zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.accent }}>02.</span>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 32, fontWeight: 900, color: COLORS.text }}>Skills</h2>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${COLORS.border}, transparent)` }} />
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <AnimatedSection delay={100}>
            <GlowCard style={{ height: "100%" }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.accent, marginBottom: 24, letterSpacing: 2, textTransform: "uppercase" }}>Proficiency</h3>
              {skills.map((s, i) => <SkillBar key={s.label} skill={s} index={i} />)}
            </GlowCard>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { title: "Languages", items: ["Python", "C", "C++"], color: "#00d4ff", icon: "{ }" },
                { title: "Web Development", items: ["React", "JavaScript", "HTML", "CSS"], color: "#a78bfa", icon: "</>" },
                { title: "Databases", items: ["SQL", "MongoDB"], color: "#34d399", icon: "◫" },
                { title: "Tools & Concepts", items: ["Git", "API Development", "Data Structures", "Algorithms"], color: "#fbbf24", icon: "⚙" },
              ].map(group => (
                <GlowCard key={group.title} glowColor={group.color} style={{ padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: group.color }}>{group.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>{group.title}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.map(item => (
                      <span key={item} className="tag" style={{ background: `${group.color}12`, color: group.color, border: `1px solid ${group.color}33` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={el => sectionRefs.current[3] = el} style={{ ...sectionStyle, position: "relative", zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.accent }}>03.</span>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 32, fontWeight: 900, color: COLORS.text }}>Projects</h2>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${COLORS.border}, transparent)` }} />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <GlowCard glowColor="#a78bfa" style={{ position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 200,
              height: 200,
              background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <span className="tag" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.25)" }}>Mobile App</span>
                  <span className="tag" style={{ background: "rgba(0,212,255,0.07)", color: COLORS.accent, border: `1px solid ${COLORS.border}` }}>Frontend</span>
                </div>
                <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 22, fontWeight: 900, color: COLORS.text, marginBottom: 8 }}>
                  Cinema Movie Display
                </h3>
                <h4 style={{ fontFamily: "'Orbitron', monospace", fontSize: 14, color: COLORS.muted, fontWeight: 400 }}>Application</h4>
              </div>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                background: "rgba(167,139,250,0.1)",
                border: "1px solid rgba(167,139,250,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}>🎬</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                "Developed a mobile app displaying currently running movies and their complete details",
                "Implemented browsing features for movie listings with title, description, and show timings",
                "Designed a clean, user-friendly interface to enhance navigation and viewing experience",
                "Focused on structured UI components and front-end architecture best practices",
              ].map((point, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 10,
                  padding: "12px 14px",
                  background: COLORS.accentSoft,
                  borderRadius: 10,
                  border: `1px solid ${COLORS.border}`,
                }}>
                  <span style={{ color: COLORS.accent, fontFamily: "'Space Mono', monospace", fontSize: 12, marginTop: 1, flexShrink: 0 }}>0{i + 1}</span>
                  <span style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>{point}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["React Native", "Mobile UI", "Component Design", "UX"].map(t => (
                <span key={t} className="tag" style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}>{t}</span>
              ))}
            </div>
          </GlowCard>
        </AnimatedSection>
      </section>

      {/* CODING PROFILES */}
      <section ref={el => sectionRefs.current[4] = el} style={{ ...sectionStyle, position: "relative", zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.accent }}>04.</span>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 32, fontWeight: 900, color: COLORS.text }}>Profiles & Links</h2>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${COLORS.border}, transparent)` }} />
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <AnimatedSection delay={100}>
            <GlowCard glowColor={COLORS.gold} style={{ height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,209,102,0.1)", border: "1px solid rgba(255,209,102,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⚡</div>
                <div>
                  <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 18, color: COLORS.gold }}>LeetCode</h3>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>Competitive Programming</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[
                  { val: "100+", label: "Problems Solved" },
                  { val: "5+", label: "Topics Covered" },
                ].map(s => (
                  <div key={s.label} style={{ textAlign: "center", padding: "16px 12px", background: "rgba(255,209,102,0.06)", borderRadius: 10, border: "1px solid rgba(255,209,102,0.15)" }}>
                    <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 24, fontWeight: 900, color: COLORS.gold }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.7, marginBottom: 20 }}>
                Focused on <span style={{ color: COLORS.text }}>arrays, strings, trees, stacks, and dynamic programming</span>. Solutions optimized for best time and space complexity.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Arrays", "Strings", "Trees", "Stacks", "Dynamic Programming"].map(t => (
                  <span key={t} className="tag" style={{ background: "rgba(255,209,102,0.08)", color: COLORS.gold, border: "1px solid rgba(255,209,102,0.2)" }}>{t}</span>
                ))}
              </div>
            </GlowCard>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Social & Portfolio Links</h3>
              {[
                { href: "https://www.linkedin.com/in/shobhit-jajoo-839a1031b/", label: "LinkedIn", sub: "Connect Professionally", icon: "in", color: "#0077b5" },
                { href: "https://github.com/shobhit-jajoo", label: "GitHub", sub: "View My Repositories", icon: "gh", color: "#f0f0f0" },
                { href: "https://leetcode.com/u/shobhitjajoo/", label: "LeetCode", sub: "Coding Challenges Profile", icon: "lc", color: COLORS.gold },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="social-link">
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${link.color}15`, border: `1px solid ${link.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontSize: 11, color: link.color, fontWeight: 700, flexShrink: 0 }}>
                    {link.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{link.label}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted }}>{link.sub}</div>
                  </div>
                  <span style={{ marginLeft: "auto", fontSize: 16 }}>↗</span>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={el => sectionRefs.current[5] = el} style={{ ...sectionStyle, position: "relative", zIndex: 1 }}>
        <AnimatedSection>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 60 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLORS.accent }}>05.</span>
            <h2 style={{ fontFamily: "'Orbitron', monospace", fontSize: 32, fontWeight: 900, color: COLORS.text }}>Contact</h2>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${COLORS.border}, transparent)` }} />
          </div>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <AnimatedSection delay={100}>
            <div>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 24, fontWeight: 900, color: COLORS.text, marginBottom: 16 }}>
                Let's Build Something <span style={{ color: COLORS.accent }}>Together</span>
              </h3>
              <p style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.8, marginBottom: 32 }}>
                I'm always open to discussing new projects, internship opportunities, or collaborations. My inbox is open — reach out anytime!
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "✉", label: "Email", val: "jajooshobhit@gmail.com", href: "mailto:jajooshobhit@gmail.com" },
                  { icon: "📍", label: "Location", val: "Chennai, India", href: null },
                  { icon: "📞", label: "Phone", val: "+91 8955726633", href: "tel:+918955726633" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: COLORS.accentSoft, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ color: COLORS.text, textDecoration: "none", fontSize: 15, fontWeight: 500, transition: "color 0.2s" }}
                          onMouseEnter={e => e.target.style.color = COLORS.accent}
                          onMouseLeave={e => e.target.style.color = COLORS.text}>
                          {item.val}
                        </a>
                      ) : (
                        <span style={{ color: COLORS.text, fontSize: 15 }}>{item.val}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <GlowCard>
              <ContactForm />
            </GlowCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "40px 24px", borderTop: `1px solid ${COLORS.border}`, position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 20, fontWeight: 900, color: COLORS.accent, marginBottom: 12 }}>SJ.</div>
        <p style={{ fontSize: 13, color: COLORS.muted }}>
          Designed & Built by <span style={{ color: COLORS.text }}>Shobhit Jajoo</span> · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", message: "" });
    }
  };
  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 10,
    color: COLORS.text,
    fontSize: 14,
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.2s",
  };
  return (
    <div>
      <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, color: COLORS.accent, marginBottom: 24, letterSpacing: 2 }}>Send a Message</h3>
      {sent ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#34d399" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14 }}>Message sent!</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { key: "name", placeholder: "Your Name", type: "text" },
            { key: "email", placeholder: "your@email.com", type: "email" },
          ].map(f => (
            <input
              key={f.key}
              type={f.type}
              placeholder={f.placeholder}
              value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = COLORS.accent + "88"}
              onBlur={e => e.target.style.borderColor = COLORS.border}
            />
          ))}
          <textarea
            placeholder="Your message..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            rows={4}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={e => e.target.style.borderColor = COLORS.accent + "88"}
            onBlur={e => e.target.style.borderColor = COLORS.border}
          />
          <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", justifyContent: "center" }}>
            Send Message ↗
          </button>
        </div>
      )}
    </div>
  );
}