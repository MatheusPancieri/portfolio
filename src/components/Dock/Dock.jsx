import { useState } from "react";
import { useProfile } from "../../context/ProfileContext.jsx";
import { DOCK_GROUPS } from "./dockApps.js";
import PixelIcon from "../PixelIcon/PixelIcon.jsx";

const BASE = 34;
// macOS-style magnification: the hovered tile and its neighbours grow,
// falling off by distance (in tiles). Index-based rather than pointer-based
// so the layout never feeds back into itself.
const SCALES = [1.45, 1.2, 1.07];

// The visitor's tool stack, shown inside the taskbar. The row keeps a fixed
// height so magnified tiles pop out above the taskbar instead of growing it.
const Dock = () => {
  const { profile } = useProfile();
  const [hovered, setHovered] = useState(null);
  const group = DOCK_GROUPS.find((g) => g.id === (profile === "editor" ? "edit" : "dev"));

  const sizeOf = (i) => {
    if (hovered === null) return BASE;
    return BASE * (SCALES[Math.abs(i - hovered)] ?? 1);
  };

  return (
    <ul
      className="flex items-end gap-1.5 shrink-0"
      style={{ height: BASE }}
      aria-label="Stack"
      onMouseLeave={() => setHovered(null)}
    >
      {group.apps.map((app, i) => {
        const size = sizeOf(i);
        return (
          <li
            key={app.name}
            tabIndex={0}
            aria-label={app.name}
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            className={`dock-item relative outline-none ${hovered === i ? "z-10" : ""}`}
          >
            {hovered === i && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-ink text-panel font-anonymous text-xs rounded-md whitespace-nowrap pointer-events-none">
                {app.name}
              </span>
            )}
            <PixelIcon
              art={app.art}
              className="dock-tile block drop-shadow-[2px_2px_0_rgba(59,51,37,0.25)]"
              style={{ width: size, height: size }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Dock;
