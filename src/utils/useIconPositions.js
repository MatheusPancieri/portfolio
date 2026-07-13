import { useEffect, useState } from "react";
import { TASKBAR_H } from "../context/WindowManager.jsx";
import {
  gridBounds,
  cellPosition,
  cellOfPosition,
  snapToGrid,
  indexToCell,
  nearestFreeCell,
} from "./desktopGrid.js";

const STORAGE_KEY = "os-icon-positions";

function loadStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function usableSize() {
  return { w: window.innerWidth, h: window.innerHeight - TASKBAR_H };
}

function cellKeyOf(pos) {
  const { col, row } = cellOfPosition(pos.x, pos.y);
  return `${col},${row}`;
}

export function useIconPositions(apps) {
  const [positions, setPositions] = useState(() => {
    const stored = loadStored();
    const { w, h } = usableSize();
    const { cols, rows } = gridBounds(w, h);
    const occupied = new Set();
    const next = {};
    apps.forEach((app, i) => {
      let col, row;
      if (stored[app.id]) {
        const snapped = snapToGrid(stored[app.id].x, stored[app.id].y, w, h);
        ({ col, row } = cellOfPosition(snapped.x, snapped.y));
      } else {
        ({ col, row } = indexToCell(i, rows));
      }
      const free = nearestFreeCell(col, row, occupied, cols, rows) ?? { col, row };
      occupied.add(`${free.col},${free.row}`);
      next[app.id] = cellPosition(free.col, free.row);
    });
    return next;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }, [positions]);

  // Snaps to the nearest grid cell, then nudges to the nearest free one if
  // another icon already sits there. Returns the resolved position so the
  // caller can sync it onto the DOM immediately (see DesktopIcon.jsx).
  const move = (id, x, y) => {
    const { w, h } = usableSize();
    const { cols, rows } = gridBounds(w, h);
    const snapped = snapToGrid(x, y, w, h);
    const { col, row } = cellOfPosition(snapped.x, snapped.y);
    const occupied = new Set(
      Object.entries(positions)
        .filter(([otherId]) => otherId !== id)
        .map(([, pos]) => cellKeyOf(pos))
    );
    const free = nearestFreeCell(col, row, occupied, cols, rows) ?? { col, row };
    const final = cellPosition(free.col, free.row);
    setPositions((prev) => ({ ...prev, [id]: final }));
    return final;
  };

  return { positions, move };
}
