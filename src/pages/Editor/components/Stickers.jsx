// Decorative collage pieces (zine / Y2K sticker style). All are aria-hidden:
// they only decorate, the real content lives next to them.

// 8-point spiky star with slightly uneven arms so it reads as a cut-out
// sticker rather than a perfect icon.
const ARMS = [50, 40, 50, 36, 48, 42, 50, 38];
const STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 === 0 ? ARMS[i / 2] : 16;
  const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

export const Star = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={`ed-star ${className}`} aria-hidden="true">
    <polygon points={STAR_POINTS} />
  </svg>
);

// Classic "link select" hand cursor, drawn pixel by pixel.
// k = outline, w = fill, . = transparent
const HAND = [
  "......kk.........",
  ".....kwwk........",
  ".....kwwk........",
  ".....kwwk........",
  ".....kwwkkk......",
  ".....kwwkwwkkk...",
  ".....kwwkwwkwwkk.",
  "..kk.kwwkwwkwwkwk",
  ".kwwkkwwwwwwwwwwk",
  ".kwwwkwwwwwwwwwwk",
  "..kwwwwwwwwwwwwwk",
  "...kwwwwwwwwwwwwk",
  "...kwwwwwwwwwwwk.",
  "....kwwwwwwwwwwk.",
  "....kwwwwwwwwwk..",
  ".....kwwwwwwwwk..",
  ".....kkkkkkkkkk..",
];

const pixels = (rows) =>
  rows.flatMap((row, y) => [...row].map((ch, x) => ({ ch, x, y })).filter((p) => p.ch !== "."));

const HAND_PIXELS = pixels(HAND);

export const PixelHand = ({ className = "" }) => (
  <span className={`ed-hand ${className}`} aria-hidden="true">
    <svg viewBox={`0 0 ${HAND[0].length} ${HAND.length}`} shapeRendering="crispEdges">
      {HAND_PIXELS.map(({ ch, x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={ch === "k" ? "#14110c" : "#fffaf0"} />
      ))}
    </svg>
  </span>
);

// Loose checkerboard cluster, like pixels breaking off the screen edge.
const BLOCKS = [
  "xx..x.",
  "x.xx..",
  ".x..x.",
  "x.x...",
  ".x....",
  "x.....",
];
const BLOCK_PIXELS = pixels(BLOCKS);

export const PixelBlocks = ({ className = "" }) => (
  <svg
    viewBox={`0 0 ${BLOCKS[0].length} ${BLOCKS.length}`}
    shapeRendering="crispEdges"
    className={`ed-blocks ${className}`}
    aria-hidden="true"
  >
    {BLOCK_PIXELS.map(({ x, y }) => (
      <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
    ))}
  </svg>
);

// Hand-drawn curved arrow (points right by default).
export const Arrow = ({ className = "" }) => (
  <svg viewBox="0 0 100 60" fill="none" className={`ed-arrow ${className}`} aria-hidden="true">
    <path d="M4 48 C 22 8, 62 2, 90 26" />
    <path d="M74 22 L 91 27 L 84 11" />
  </svg>
);
