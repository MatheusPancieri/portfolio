import { useEffect, useRef } from "react";

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const Background = ({ children }) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    let frame = null;

    const handleMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${e.clientX}px`);
        el.style.setProperty("--y", `${e.clientY}px`);
        frame = null;
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111110]">
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 15%), rgba(212,175,55,0.20), transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")` }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Background;
