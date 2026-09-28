import { toSeconds, toTimecode } from "../timecode.js";

// Clip widths follow duration on a log scale — a 45s short next to a 14min
// long-form would be invisible on a linear one.
const clipGrow = (duration) => Math.log2(toSeconds(duration) + 16);

// Deterministic pseudo-waveform so every clip gets its own shape.
const waveform = (seed, bars = 48) =>
  Array.from({ length: bars }, (_, i) => {
    const v =
      Math.abs(Math.sin(i * 0.9 + seed * 1.7)) * 0.55 +
      Math.abs(Math.sin(i * 0.23 + seed)) * 0.45;
    return 0.15 + v * 0.85;
  });

const Wave = ({ seed }) => {
  const bars = waveform(seed);
  return (
    <svg viewBox={`0 0 ${bars.length} 2`} preserveAspectRatio="none" className="w-full h-full">
      {bars.map((h, i) => (
        <rect key={i} x={i + 0.15} y={1 - h} width={0.7} height={h * 2} />
      ))}
    </svg>
  );
};

const Timeline = ({ projects, selectedId, onSelect, lang, t }) => {
  const total = projects.reduce((s, p) => s + toSeconds(p.duration), 0);
  const grows = projects.map((p) => clipGrow(p.duration));
  const growTotal = grows.reduce((a, b) => a + b, 0);
  const selIndex = projects.findIndex((p) => p.id === selectedId);
  const playheadPct = (grows.slice(0, selIndex).reduce((a, b) => a + b, 0) / growTotal) * 100;
  const starts = projects.reduce(
    (acc, p, i) => [...acc, i === 0 ? 0 : acc[i - 1] + toSeconds(projects[i - 1].duration)],
    []
  );

  return (
    <div className="ed-panel">
      <div className="ed-panel-head">
        <span>{t.sequence}</span>
        <span className="hidden sm:inline">{t.hint}</span>
        <span className="tabular-nums">{toTimecode(total)}</span>
      </div>

      <div className="overflow-x-auto ed-scroll">
        <div className="min-w-[720px] grid grid-cols-[44px_1fr]">
          {/* ruler */}
          <div className="ed-track-label border-b border-ed-line" />
          <div className="ed-ruler border-b border-ed-line" />

          {/* playhead spans the three tracks; slides to the selected clip */}
          <div className="col-start-2 row-start-2 row-span-3 relative pointer-events-none z-10">
            <span className="ed-playhead" style={{ left: `calc(${playheadPct}% + 3px)` }} />
          </div>

          {/* V2 — title layer */}
          <div className="ed-track-label row-start-2">V2</div>
          <div className="ed-track col-start-2 row-start-2">
            {projects.map((p) => (
              <div key={p.id} className={`ed-slot ed-label-${p.type}`} style={{ flexGrow: clipGrow(p.duration) }}>
                <span className="ed-clip-title">{t.types[p.type]}</span>
              </div>
            ))}
          </div>

          {/* V1 — the clips */}
          <div className="ed-track-label row-start-3">V1</div>
          <div className="ed-track col-start-2 row-start-3 h-16">
            {projects.map((p, i) => {
              const active = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelect(p.id)}
                  className={`ed-slot ed-clip ed-label-${p.type} ${active ? "ed-clip-active" : ""}`}
                  style={{ flexGrow: clipGrow(p.duration) }}
                  aria-pressed={active}
                >
                  <span className="truncate font-anonymous text-sm">{p.title[lang]}</span>
                  <span className="truncate text-[11px] opacity-70 tabular-nums">
                    {toTimecode(starts[i])}
                  </span>
                </button>
              );
            })}
          </div>

          {/* A1 — audio */}
          <div className="ed-track-label row-start-4">A1</div>
          <div className="ed-track col-start-2 row-start-4 h-10">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`ed-slot ed-audio ${p.id === selectedId ? "ed-audio-active" : ""}`}
                style={{ flexGrow: clipGrow(p.duration) }}
              >
                <Wave seed={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
