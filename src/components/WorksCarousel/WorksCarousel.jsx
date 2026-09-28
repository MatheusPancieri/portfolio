import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useLang } from "../../context/i18n.jsx";
import { useLaunch } from "../../context/LaunchContext.jsx";
import { useNotes } from "../../context/NotesContext.jsx";
import { TASKBAR_H } from "../../context/WindowManager.jsx";
import { APPS } from "../apps/apps.jsx";
import { getProjectMedia } from "../../utils/projectMedia.js";
import { videoThumbUrl } from "../../utils/videoEmbed.js";
import signature from "../../assets/imgs/assinaturaMatheus.svg";

// The profile's works as banner cards, right on the desktop (editor profile).
// Modeled on the Adastra precuts page: an endless strip you drag (or scroll)
// sideways, banners in grayscale that light up on hover. Click one to open
// its video. On mobile (inline) it's a plain vertical list.

const GAP = 24;
const DRAG_PX = 5; // movement before a press counts as a drag
const POWER = 0.4; // fling distance = release speed (px/s) * POWER
const TIME_CONSTANT = 350; // ms, how fast a fling settles
const WHEEL_SPEED = 1.3; // strip px per wheel px
const WHEEL_TIME_CONSTANT = 140; // ms, wheel/keys ease: quicker than a fling
const LENS_SPEED = 120; // px/s of drag before the strip stretches

const pad2 = (n) => String(n).padStart(2, "0");

const thumbOf = (p) =>
  p.banner ?? (p.video ? videoThumbUrl(p) : getProjectMedia(p.folder).find((m) => m.type === "image")?.url);

// Card size from the free space: ~36% of the width, capped so the strip
// still fits between the desktop icons and the taskbar on short screens.
const cardWidthFor = (w, h) => Math.round(Math.max(300, Math.min(720, w * 0.36, (h - 330) * 1.6)));

// Speed in px/s over the last 100ms of samples.
const speedOf = (samples, now) => {
  const recent = samples.filter((s) => now - s.t < 100);
  if (recent.length < 2) return 0;
  const a = recent[0];
  const b = recent[recent.length - 1];
  return b.t === a.t ? 0 : ((b.x - a.x) / (b.t - a.t)) * 1000;
};

const Banner = ({ project }) => {
  const src = thumbOf(project);
  return src ? (
    <img src={src} alt="" referrerPolicy="no-referrer" draggable={false} loading="lazy" className="wc-banner" />
  ) : (
    <span className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#2a2418_0_12px,#3b3325_12px_24px)]" />
  );
};

// Ambilight: the banner's most vivid colors (left, center, right thirds),
// sampled once on a tiny canvas. Pixels are weighted by brightness and
// saturation, so a dark frame glows with its highlights (neon, sky) instead
// of casting a shadow; each color is then pushed to full brightness.
const glowCache = new Map();

const sampleGlow = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.onerror = () => resolve(null);
    img.onload = () => {
      try {
        const w = 24;
        const h = 15;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);
        const zones = [0, 1, 2].map((z) => {
          let r = 0;
          let g = 0;
          let b = 0;
          for (let y = 0; y < h; y++) {
            for (let x = Math.floor((z * w) / 3); x < Math.floor(((z + 1) * w) / 3); x++) {
              const i = (y * w + x) * 4;
              const max = Math.max(data[i], data[i + 1], data[i + 2]);
              const min = Math.min(data[i], data[i + 1], data[i + 2]);
              const sat = max ? (max - min) / max : 0;
              const weight = (max / 255) ** 2 * (0.05 + sat * sat);
              r += data[i] * weight;
              g += data[i + 1] * weight;
              b += data[i + 2] * weight;
            }
          }
          const peak = Math.max(r, g, b) || 1;
          return [r, g, b].map((v) => Math.round((v / peak) * 255)).join(", ");
        });
        resolve(`linear-gradient(90deg, ${zones.map((c) => `rgba(${c}, 0.8)`).join(", ")})`);
      } catch {
        resolve(null); // cross-origin thumbnail without CORS: no glow
      }
    };
    img.src = src;
  });

const Glow = ({ project }) => {
  const src = thumbOf(project);
  const [background, setBackground] = useState(() => glowCache.get(src) ?? null);

  useEffect(() => {
    if (!src || glowCache.has(src)) return;
    let alive = true;
    sampleGlow(src).then((bg) => {
      glowCache.set(src, bg);
      if (alive) setBackground(bg);
    });
    return () => {
      alive = false;
    };
  }, [src]);

  return background ? <span className="wc-glow" style={{ background }} aria-hidden="true" /> : null;
};

const Overlays = () => (
  <>
    <span className="wc-grain" aria-hidden="true" />
    <span className="wc-grain wc-grain-fine" aria-hidden="true" />
    <span className="wc-shade" aria-hidden="true" />
  </>
);

const WorksStrip = ({ projects, t, onOpen }) => {
  const stageRef = useRef(null);
  const lensRef = useRef(null);
  const trackRef = useRef(null);
  const x = useRef(0);
  const anim = useRef(0);
  const pending = useRef(0); // distance the strip still has to travel
  const easing = useRef(TIME_CONSTANT);
  const lastFrame = useRef(0);
  const drag = useRef(null);
  const dragged = useRef(false);
  const lensTimer = useRef(0);
  const [viewport, setViewport] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  const [dragging, setDragging] = useState(false);

  const n = projects.length;
  // The strip spans the whole window, so its width is the viewport width.
  const stageW = viewport.w;
  const cardW = cardWidthFor(viewport.w, viewport.h);
  const itemW = cardW + GAP;
  // One "set" repeats the projects until it's wider than the stage; three
  // sets side by side always cover it while x wraps inside the middle one.
  const reps = Math.max(1, Math.ceil(stageW / (n * itemW)));
  const setW = n * reps * itemW;
  const items = Array.from({ length: reps * 3 }, () => projects).flat();

  const apply = () => {
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${x.current}px,0,0)`;
  };

  // Keeps x inside the middle set; returns how far it jumped.
  const wrap = () => {
    let shift = 0;
    while (x.current > -setW) (x.current -= setW), (shift -= setW);
    while (x.current <= -2 * setW) (x.current += setW), (shift += setW);
    return shift;
  };

  const stop = () => {
    cancelAnimationFrame(anim.current);
    anim.current = 0;
    pending.current = 0;
  };

  // Each frame covers the same share of what's left: fast at first, then
  // settling. Frame-rate independent, and new input just adds to `pending`,
  // so wheel ticks blend into one continuous glide instead of jumping.
  const frame = (now) => {
    const dt = Math.min(now - lastFrame.current, 64);
    lastFrame.current = now;
    const step = pending.current * (1 - Math.exp(-dt / easing.current));
    pending.current -= step;
    x.current += step;
    wrap();
    apply();
    anim.current = Math.abs(pending.current) > 0.3 ? requestAnimationFrame(frame) : 0;
  };

  // Moves the strip by `distance` (added to any glide already running when
  // `add` is set).
  const glide = (distance, timeConstant = TIME_CONSTANT, add = false) => {
    pending.current = add ? pending.current + distance : distance;
    easing.current = timeConstant;
    if (!anim.current) {
      lastFrame.current = performance.now();
      anim.current = requestAnimationFrame(frame);
    }
  };

  // Stretches the strip in the drag direction while it moves fast.
  const lens = (speed) => {
    if (!lensRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const s = speed > LENS_SPEED ? 1.07 : speed < -LENS_SPEED ? 0.93 : 1;
    lensRef.current.style.transform = `scaleX(${s})`;
  };

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Start with the first project's card centered.
  useLayoutEffect(() => {
    stop();
    x.current = -setW + (stageW - cardW) / 2;
    wrap();
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setW, stageW, cardW]);

  // Mouse wheel / trackpad scrolls the strip (there's no page to scroll).
  useEffect(() => {
    const el = stageRef.current;
    const onWheel = (e) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!d) return;
      e.preventDefault();
      // deltaMode: 0 = pixels, 1 = lines (Firefox mouse wheels), 2 = pages
      const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerWidth : 1;
      glide(-d * unit * WHEEL_SPEED, WHEEL_TIME_CONSTANT, true);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setW]);

  useEffect(
    () => () => {
      stop();
      clearTimeout(lensTimer.current);
    },
    [],
  );

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    stop();
    drag.current = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, moved: false, samples: [] };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved) {
      if (Math.abs(e.clientX - d.startX) < DRAG_PX) return;
      // Capture only once it's a real drag, so plain clicks still reach the card.
      d.moved = true;
      stageRef.current.setPointerCapture(e.pointerId);
      clearTimeout(lensTimer.current);
      setDragging(true);
    }
    x.current += e.clientX - d.lastX;
    d.lastX = e.clientX;
    wrap();
    apply();
    d.samples.push({ t: e.timeStamp, x: e.clientX });
    if (d.samples.length > 6) d.samples.shift();
    lens(speedOf(d.samples, e.timeStamp));
  };

  const onPointerUp = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    // Swallow the click that ends this drag, then let clicks (and Enter) through.
    dragged.current = true;
    setTimeout(() => (dragged.current = false));
    setDragging(false);
    glide(speedOf(d.samples, e.timeStamp) * POWER);
    lensTimer.current = setTimeout(() => lens(0), 120);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") glide(itemW, WHEEL_TIME_CONSTANT * 1.5, true);
    if (e.key === "ArrowRight") glide(-itemW, WHEEL_TIME_CONSTANT * 1.5, true);
  };

  // Keyboard focus on a card that's cut off brings it to the middle.
  const onCardFocus = (e) => {
    if (drag.current || !e.currentTarget.matches(":focus-visible")) return;
    const card = e.currentTarget.getBoundingClientRect();
    const stage = stageRef.current.getBoundingClientRect();
    if (card.left >= stage.left && card.right <= stage.right) return;
    glide(stage.left + stage.width / 2 - (card.left + card.width / 2));
  };

  return (
    <div onKeyDown={onKeyDown}>
      <h2 className="relative z-10 px-10 mb-1 font-anonymous text-lg text-ink">
        {t.title} <span className="text-sm text-ink-soft tabular-nums">{pad2(n)}</span>
      </h2>

      <div
        ref={stageRef}
        className={`wc-stage ${dragging ? "wc-dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={lensRef} className="wc-lens">
          <div ref={trackRef} className="flex w-max" style={{ gap: GAP }}>
            {items.map((p, i) => {
              const idx = i % n;
              // Only the first copy in the middle set is tabbable/announced.
              const primary = i >= reps * n && i < reps * n + n;
              return (
                <div key={i} className="wc-slot" style={{ width: cardW }}>
                  <Glow project={p} />
                  <button
                    type="button"
                    tabIndex={primary ? 0 : -1}
                    aria-hidden={primary ? undefined : true}
                    aria-label={`${t.watch}: ${p.name}`}
                    onClick={(e) => !dragged.current && onOpen(idx, e)}
                    onFocus={onCardFocus}
                    className="wc-card w-full"
                  >
                    <Banner project={p} />
                    <Overlays />
                    <span className="wc-center">
                      <span className="wc-play">
                        <FaPlay className="w-3.5 h-3.5 translate-x-px" />
                      </span>
                    </span>
                    <img src={signature} alt="" draggable={false} className="wc-signature" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const WorksList = ({ projects, t, onOpen }) => (
  <section className="relative mt-10 max-w-md mx-auto">
    <h2 className="font-anonymous text-lg text-ink mb-3">
      {t.title} <span className="text-sm text-ink-soft tabular-nums">{pad2(projects.length)}</span>
    </h2>
    <div className="flex flex-col gap-3">
      {projects.map((p, i) => (
        <button
          key={p.name}
          type="button"
          onClick={(e) => onOpen(i, e)}
          aria-label={`${t.watch}: ${p.name}`}
          className="wc-card wc-row"
        >
          <Banner project={p} />
          <Overlays />
          <span className="wc-play absolute right-3 top-1/2 -translate-y-1/2">
            <FaPlay className="w-3 h-3 translate-x-px" />
          </span>
        </button>
      ))}
    </div>
  </section>
);

const WorksCarousel = ({ inline = false }) => {
  const { c } = useLang();
  const launch = useLaunch();
  const { setProjectIdx } = useNotes();
  const projects = c.works.projects;
  const t = c.desktop.showcase;

  if (!projects.length) return null;

  const open = (i, e) => {
    setProjectIdx(i);
    launch(APPS.find((a) => a.id === "project-notes"), e.currentTarget.getBoundingClientRect());
  };

  if (inline) return <WorksList projects={projects} t={t} onOpen={open} />;

  // Full width, in the lower part of the desktop, below the icon row and
  // above the taskbar. Windows open on top of it.
  return (
    <section
      className="fixed inset-x-0 top-0 z-[5] flex flex-col justify-end pb-[7vh] pointer-events-none"
      style={{ bottom: TASKBAR_H }}
    >
      <div className="pointer-events-auto">
        <WorksStrip projects={projects} t={t} onOpen={open} />
      </div>
    </section>
  );
};

export default WorksCarousel;
