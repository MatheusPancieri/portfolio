// Renders a pixelArt.js grid as a crisp SVG. Every empty pixel that touches
// the fill (up/down/left/right) becomes the black outline, which also gives
// square shapes the stepped corners of the desktop icons. Line-art icons
// (outline: false) skip it; "currentColor" in a palette follows the text color.

const OUTLINE = "#000";
const cache = new WeakMap();

// Horizontal runs of same-colored pixels, so a 16x16 icon is a few dozen
// rects instead of 256.
const toRects = ({ rows, palette, outline = true }) => {
  const filled = (x, y) => rows[y]?.[x] !== undefined && rows[y][x] !== ".";
  const colorAt = (x, y) => {
    if (filled(x, y)) return palette[rows[y][x]];
    if (!outline) return null;
    if (filled(x - 1, y) || filled(x + 1, y) || filled(x, y - 1) || filled(x, y + 1)) return OUTLINE;
    return null;
  };

  const rects = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const color = colorAt(x, y);
      let end = x + 1;
      while (end < row.length && colorAt(end, y) === color) end++;
      if (color) rects.push({ x, y, w: end - x, color });
      x = end;
    }
  });
  return rects;
};

const PixelIcon = ({ art, style, className }) => {
  if (!cache.has(art)) cache.set(art, toRects(art));
  const rects = cache.get(art);
  return (
    <svg
      viewBox={`0 0 ${art.rows[0].length} ${art.rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={style}
      className={className}
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={r.color} />
      ))}
    </svg>
  );
};

export default PixelIcon;
