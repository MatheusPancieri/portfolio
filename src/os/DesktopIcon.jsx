import { useRef } from "react";
import { useLang } from "./i18n.jsx";
import { TASKBAR_H } from "./WindowManager.jsx";

const DRAG_THRESHOLD = 4;

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
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    d.moved = true;
    const nx = Math.min(Math.max(d.baseX + dx, 4), window.innerWidth - 84);
    const ny = Math.min(Math.max(d.baseY + dy, 4), window.innerHeight - TASKBAR_H - 88);
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
    onMove(app.id, d.lastX, d.lastY);
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
      className="group absolute flex flex-col items-center gap-1.5 w-20 cursor-grab active:cursor-grabbing select-none touch-none"
      title={app.label(c)}
    >
      <app.Icon className="w-11 h-11 text-ink drop-shadow-[2px_2px_0_rgba(59,51,37,0.25)] group-hover:-translate-y-1 group-hover:text-accent-deep group-active:translate-y-0 transition-all" />
      <span className="text-xs font-anonymous text-ink text-center leading-tight px-1 rounded group-hover:bg-accent/60">
        {app.label(c)}
      </span>
    </button>
  );
};

export default DesktopIcon;
