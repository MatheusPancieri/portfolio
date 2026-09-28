import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaYoutube, FaInstagram, FaEnvelope } from "react-icons/fa";
import {
  EDITOR_CONTENT,
  EDITOR_LINKS,
  EDITOR_PROJECTS,
  EDITOR_TOOLS,
} from "../../utils/editorContent.js";
import { FPS, toTimecode } from "./timecode.js";
import { hasVideo, videoThumbUrl } from "../../utils/videoEmbed.js";
import Monitor from "./components/Monitor.jsx";
import Timeline from "./components/Timeline.jsx";
import Ticker from "./components/Ticker.jsx";
import { Arrow, PixelBlocks, PixelHand, Star } from "./components/Stickers.jsx";

const pad2 = (n) => String(n).padStart(2, "0");

// Previous standalone editor page, now at /reel (see App.jsx) — the editor
// portfolio itself is the OS in the "editor" profile.
// Shares fonts and the accent color with the "OS" portfolio but lives in a
// dark editing-suite palette (ed-* tokens in index.css).

// Wall-clock timecode in the header, ticking at 24fps. Isolated so only this
// span re-renders every frame.
const LiveTimecode = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let raf;
    const tick = () => {
      setNow(new Date());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const secs = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  return <span className="tabular-nums">{toTimecode(secs, (now.getMilliseconds() / 1000) * FPS)}</span>;
};

const readLang = () => {
  try {
    return localStorage.getItem("os-lang") || "en";
  } catch {
    return "en";
  }
};

const EditorPage = () => {
  const [lang, setLang] = useState(readLang);
  const [selectedId, setSelectedId] = useState(EDITOR_PROJECTS[0].id);
  const [copied, setCopied] = useState(false);
  const reelRef = useRef(null);
  const c = EDITOR_CONTENT[lang];

  const index = EDITOR_PROJECTS.findIndex((p) => p.id === selectedId);
  const project = EDITOR_PROJECTS[index];

  useEffect(() => {
    document.title = c.meta.title;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelector('meta[name="description"]')?.setAttribute("content", c.meta.description);
  }, [c, lang]);

  const toggleLang = () => {
    const next = lang === "en" ? "pt" : "en";
    setLang(next);
    try {
      localStorage.setItem("os-lang", next);
    } catch {
      /* private mode — language just won't persist */
    }
  };

  const step = (dir) =>
    setSelectedId(EDITOR_PROJECTS[(index + dir + EDITOR_PROJECTS.length) % EDITOR_PROJECTS.length].id);

  // Picking a clip from the timeline/cards brings the monitor into view.
  const selectAndShow = (id) => {
    setSelectedId(id);
    reelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EDITOR_LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EDITOR_LINKS.email}`;
    }
  };

  const socials = [
    { href: EDITOR_LINKS.linkedin, Icon: FaLinkedin, label: "LinkedIn" },
    { href: EDITOR_LINKS.youtube, Icon: FaYoutube, label: "YouTube" },
    { href: EDITOR_LINKS.instagram, Icon: FaInstagram, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <div className="editor-page min-h-screen bg-ed-bg text-ed-ink font-inter overflow-x-clip">
      <div className="ed-grain" aria-hidden="true" />

      {/* Header / menu bar */}
      <header className="sticky top-0 z-20 bg-ed-bg/95 backdrop-blur border-b border-ed-line">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <a href="#reel" className="font-anonymous text-lg whitespace-nowrap">
            pancieri<span className="text-ed-accent">.edit</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-ed-muted">
            {["reel", "work", "about", "contact"].map((id) => (
              <a key={id} href={`#${id}`} className="hover:text-ed-accent transition-colors">
                {c.nav[id]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:flex items-center gap-2 font-anonymous text-ed-muted">
              <span className="ed-dot" aria-hidden="true" />
              <LiveTimecode />
            </span>
            <button type="button" onClick={toggleLang} className="ed-btn-ghost" aria-label="Switch language">
              <span className={lang === "en" ? "text-ed-accent" : ""}>EN</span>
              <span className="text-ed-line">/</span>
              <span className={lang === "pt" ? "text-ed-accent" : ""}>PT</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero + program monitor */}
        <div className="relative">
          <PixelBlocks className="hidden min-[1400px]:block absolute left-0 top-0 w-24" />
          <PixelBlocks className="hidden min-[1400px]:block absolute right-0 bottom-0 w-24 rotate-180" />

          <section id="reel" ref={reelRef} className="scroll-mt-14 max-w-6xl mx-auto px-4 pt-10 md:pt-16 pb-14">
            <div className="grid lg:grid-cols-[5fr_7fr] gap-10 items-center">
              <div className="relative">
                <span className="ed-sticker -rotate-3 mb-4">
                  {c.hero.tag} {new Date().getFullYear()}
                </span>
                <h1 className="font-anonymous text-4xl sm:text-5xl leading-[1.05] text-balance">
                  {c.hero.title}
                </h1>
                <p className="mt-5 text-ed-muted leading-relaxed max-w-md">{c.hero.body}</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#work" className="ed-btn">
                    {c.hero.ctaWork}
                  </a>
                  <a href="#contact" className="ed-btn-outline">
                    {c.hero.ctaContact}
                  </a>
                  <PixelHand className="hidden sm:inline-block w-8 ml-1" />
                </div>
                <Arrow className="hidden lg:block absolute -right-14 bottom-1 w-24" />
              </div>
              <div className="relative">
                <Star className="absolute -top-8 -left-3 sm:-left-7 w-14 sm:w-16 z-10" />
                <span className="ed-sticker ed-sticker-dark absolute -top-8 right-2 rotate-3 z-10 tabular-nums">
                  #{pad2(index + 1)}/{pad2(EDITOR_PROJECTS.length)}
                </span>
                <Monitor
                  project={project}
                  lang={lang}
                  t={c.monitor}
                  typeLabel={c.work.types[project.type]}
                  onPrev={() => step(-1)}
                  onNext={() => step(1)}
                />
              </div>
            </div>
          </section>
        </div>

        <Ticker text={c.nav.work} />

        {/* Work: timeline + cards */}
        <section id="work" className="scroll-mt-14 max-w-6xl mx-auto px-4 py-12">
          <SectionTitle n={1}>{c.work.title}</SectionTitle>
          <Timeline
            projects={EDITOR_PROJECTS}
            selectedId={selectedId}
            onSelect={selectAndShow}
            lang={lang}
            t={c.work}
          />

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EDITOR_PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => selectAndShow(p.id)}
                className={`ed-card ed-label-${p.type} text-left ${p.id === selectedId ? "ed-card-active" : ""}`}
              >
                <div className="aspect-video bg-black relative overflow-hidden border-b border-ed-line">
                  {hasVideo(p) ? (
                    <img
                      src={videoThumbUrl(p)}
                      referrerPolicy="no-referrer"
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="ed-card-placeholder" />
                  )}
                  <span className="absolute bottom-2 right-2 bg-black/80 font-anonymous text-xs px-1.5 py-0.5 tabular-nums">
                    {p.duration}
                  </span>
                  <span className="ed-tag absolute top-2 left-2">
                    {c.work.types[p.type]}
                  </span>
                  <span className="ed-sticker ed-sticker-dark absolute top-2 right-2 rotate-3 tabular-nums">
                    #{pad2(i + 1)}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-anonymous text-lg leading-tight">{p.title[lang]}</p>
                  <p className="text-xs text-ed-muted mt-1">{p.role[lang]}</p>
                  <p className="text-sm text-ed-muted mt-3 leading-relaxed">{p.description[lang]}</p>
                  <p className="text-xs text-ed-muted/70 mt-3">{p.client[lang]}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <Ticker text={c.nav.about} tone="ink" reverse />

        {/* About */}
        <section id="about" className="scroll-mt-14 max-w-6xl mx-auto px-4 py-12">
          <SectionTitle n={2}>{c.about.title}</SectionTitle>
          <div className="grid md:grid-cols-[3fr_2fr] gap-8">
            <div className="space-y-4 text-ed-muted leading-relaxed text-lg">
              {c.about.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <div className="space-y-6">
              <div className="ed-panel">
                <div className="ed-panel-head">{c.about.servicesTitle}</div>
                <ul className="p-4 space-y-2 text-sm">
                  {c.about.services.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-ed-accent">▸</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ed-panel">
                <div className="ed-panel-head">{c.about.toolsTitle}</div>
                <ul className="p-4 flex flex-wrap gap-x-3 gap-y-4">
                  {EDITOR_TOOLS.map((tool) => (
                    <li key={tool.name} className="w-16 flex flex-col items-center gap-1.5 text-center">
                      <span className="ed-app-tile" aria-hidden="true">
                        {tool.abbr}
                      </span>
                      <span className="text-[11px] leading-tight text-ed-muted">{tool.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <Ticker text={c.nav.contact} />

        <section id="contact" className="scroll-mt-14 max-w-6xl mx-auto px-4 py-16">
          <SectionTitle n={3}>{c.nav.contact}</SectionTitle>
          <div className="ed-panel relative p-6 sm:p-10">
            <Star className="absolute -top-7 -right-2 sm:-right-6 w-14 sm:w-20" />
            <Star className="hidden sm:block absolute -bottom-5 -left-5 w-11" />
            <h2 className="font-anonymous text-3xl sm:text-4xl leading-tight text-balance">{c.contact.title}</h2>
            <p className="mt-4 text-ed-muted max-w-xl">{c.contact.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${EDITOR_LINKS.email}`} className="ed-btn">
                <FaEnvelope /> {c.contact.email}
              </a>
              <PixelHand className="w-8 -ml-1 mr-1" />
              <button type="button" onClick={copyEmail} className="ed-btn-outline font-anonymous">
                {copied ? c.contact.copied : EDITOR_LINKS.email}
              </button>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ed-icon-btn"
                  aria-label={s.label}
                >
                  <s.Icon />
                </a>
              ))}
            </div>
            <a
              href={EDITOR_LINKS.devPortfolio}
              className="inline-block mt-10 text-sm text-ed-muted underline underline-offset-4 decoration-ed-line hover:text-ed-accent hover:decoration-ed-accent transition-colors"
            >
              {c.contact.devLink}
            </a>
          </div>
        </section>
      </main>

      <Ticker text={c.ticker} tone="ink" reverse />

      <footer className="relative">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between text-xs text-ed-muted font-anonymous">
          <span>{c.footer}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};

// Title in a box with a hard offset block behind it, plus a small index tag.
const SectionTitle = ({ n, children }) => (
  <div className="flex items-start gap-2 mb-8">
    <h2 className="ed-title">{children}</h2>
    <span className="ed-sticker ed-sticker-dark rotate-6 tabular-nums">{pad2(n)}</span>
  </div>
);

export default EditorPage;
