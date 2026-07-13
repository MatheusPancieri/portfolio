// Desktop icon grid: cell size is the icon footprint (button w-24 = 96px)
// plus breathing room, so icons always land aligned instead of at free pixels.
export const GRID_ORIGIN_X = 16;
export const GRID_ORIGIN_Y = 24;
export const CELL_W = 112;
export const CELL_H = 104;

export function gridBounds(usableWidth, usableHeight) {
  const cols = Math.max(1, Math.floor((usableWidth - GRID_ORIGIN_X) / CELL_W));
  const rows = Math.max(1, Math.floor((usableHeight - GRID_ORIGIN_Y) / CELL_H));
  return { cols, rows };
}

export function cellPosition(col, row) {
  return { x: GRID_ORIGIN_X + col * CELL_W, y: GRID_ORIGIN_Y + row * CELL_H };
}

// Snaps a raw pixel position to the nearest in-bounds grid cell.
export function snapToGrid(x, y, usableWidth, usableHeight) {
  const { cols, rows } = gridBounds(usableWidth, usableHeight);
  const col = Math.min(Math.max(Math.round((x - GRID_ORIGIN_X) / CELL_W), 0), cols - 1);
  const row = Math.min(Math.max(Math.round((y - GRID_ORIGIN_Y) / CELL_H), 0), rows - 1);
  return cellPosition(col, row);
}

// Inverse of cellPosition: which cell a pixel position was snapped to.
export function cellOfPosition(x, y) {
  return {
    col: Math.round((x - GRID_ORIGIN_X) / CELL_W),
    row: Math.round((y - GRID_ORIGIN_Y) / CELL_H),
  };
}

// Column-major: fills a column top-to-bottom before wrapping to the next
// one, matching how desktop OS icon grids lay out by default.
export function indexToCell(index, rows) {
  return { col: Math.floor(index / rows), row: index % rows };
}

const cellKey = (col, row) => `${col},${row}`;

// Spiral search outward (ring by ring) from (col, row) for the closest cell
// not in `occupied` (a Set of "col,row" keys). Returns null only if every
// in-bounds cell is taken.
export function nearestFreeCell(col, row, occupied, cols, rows) {
  if (!occupied.has(cellKey(col, row))) return { col, row };
  const maxRadius = cols + rows;
  for (let radius = 1; radius <= maxRadius; radius++) {
    for (let dc = -radius; dc <= radius; dc++) {
      for (let dr = -radius; dr <= radius; dr++) {
        if (Math.max(Math.abs(dc), Math.abs(dr)) !== radius) continue; // ring perimeter only
        const c = col + dc;
        const r = row + dr;
        if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
        if (!occupied.has(cellKey(c, r))) return { col: c, row: r };
      }
    }
  }
  return null;
}
