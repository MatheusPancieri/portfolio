import { useRef } from "react";
import { useLang } from "../../context/i18n.jsx";
import { TASKBAR_H } from "../../context/WindowManager.jsx";
import { CELL_W, CELL_H } from "../../utils/desktopGrid.js";

const DRAG_THRESHOLD = 4;
const SETTLE_TRANSITION = "left 150ms ease-out, top 150ms ease-out";

// Lets long dotted labels (home.mdx, chess.com) wrap right after the dot
// instead of at an arbitrary mid-word point when they don't fit on one line.
const renderLabel = (label) => {
  const segments = label.split(".");
  const nodes = [];
  segments.forEach((seg, i) => {
    if (i > 0) nodes.push(<wbr key={`wbr-${i}`} />);
    nodes.push(i < segments.length - 1 ? `${seg}.` : seg);
  });
  return nodes;
};

const DesktopIcon = ({ app, x, y, onOpen, onMove }) => {
  const { c } = useLang();
  const elRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClick = useRef(false);

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: x,
      baseY: y,
      moved: false,
    };
    // no transition while dragging: the icon must track the pointer 1:1
    elRef.current.style.transition = "none";
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    d.moved = true;
    const nx = Math.min(Math.max(d.baseX + dx, 0), window.innerWidth - CELL_W);
    const ny = Math.min(Math.max(d.baseY + dy, 0), window.innerHeight - TASKBAR_H - CELL_H);
    d.lastX = nx;
    d.lastY = ny;
    elRef.current.style.left = `${nx}px`;
    elRef.current.style.top = `${ny}px`;
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d?.moved) return;
    suppressClick.current = true;
    // onMove resolves the drop to a grid cell (nudging off an occupied one
    // if needed) and returns that final position. Apply it to the DOM
    // directly: if it happens to match what React last rendered, React's
    // diffing skips touching that style property, leaving the raw mid-drag
    // value stuck. Setting it here keeps the DOM authoritative.
    const final = onMove(app.id, d.lastX, d.lastY);
    elRef.current.style.transition = SETTLE_TRANSITION;
    elRef.current.style.left = `${final.x}px`;
    elRef.current.style.top = `${final.y}px`;
  };

  const handleClick = (e) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    onOpen(app, e.currentTarget.getBoundingClientRect());
  };

  return (
    <button
      ref={elRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={handleClick}
      style={{ left: x, top: y }}
      className="group absolute flex flex-col items-center gap-1.5 w-24 cursor-grab active:cursor-grabbing select-none touch-none"
      title={app.label(c)}
    >
      <app.Icon className="icon-bounce w-11 h-11 text-ink drop-shadow-[2px_2px_0_rgba(59,51,37,0.25)] group-hover:text-accent-deep transition-colors" />
      <span className="w-full break-words text-xs font-anonymous text-ink text-center leading-tight px-1 rounded group-hover:bg-accent/60">
        {renderLabel(app.label(c))}
      </span>
    </button>
  );
};

export default DesktopIcon;
