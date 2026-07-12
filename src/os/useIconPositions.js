import { useEffect, useState } from "react";

const STORAGE_KEY = "os-icon-positions";
const START_X = 16;
const START_Y = 24;
const STEP_Y = 104;

function loadStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function useIconPositions(apps) {
  const [positions, setPositions] = useState(() => {
    const stored = loadStored();
    const next = {};
    apps.forEach((app, i) => {
      next[app.id] = stored[app.id] || { x: START_X, y: START_Y + i * STEP_Y };
    });
    return next;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }, [positions]);

  const move = (id, x, y) => {
    setPositions((prev) => ({ ...prev, [id]: { x, y } }));
  };

  return { positions, move };
}
