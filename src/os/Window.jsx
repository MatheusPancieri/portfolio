import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useWindows, TASKBAR_H } from "./WindowManager.jsx";
import { useLang } from "./i18n.jsx";

const OPEN_EASE = "cubic-bezier(0.2, 0.9, 0.25, 1)";

const Window = ({ win, app }) => {
  const { close, destroy, minimize, focus, move, toggleMax } = useWindows();
  const { c } = useLang();
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);
  const wasMinimized = useRef(false);
  const dragRef = useRef(null);

  // Window's resting rect from state (never trust getBoundingClientRect while transformed)
  const restingRect = () => {
    if (win.maximized) {
      return {
        left: 8,
        top: 8,
        width: window.innerWidth - 16,
        height: window.innerHeight - TASKBAR_H - 16,
      };
    }
    return { left: win.x, top: win.y, width: win.w, height: win.h };
  };

  const transformFrom = (from) => {
    const to = restingRect();
    const sx = Math.max(from.width / to.width, 0.05);
    const sy = Math.max(from.height / to.height, 0.05);
    const tx = from.left + from.width / 2 - (to.left + to.width / 2);
    const ty = from.top + from.height / 2 - (to.top + to.height / 2);
    return `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;
  };

  const animate = (el, fromTransform, toTransform, opacity, done) => {
    el.style.transition = "none";
    if (fromTransform !== null) {
      el.style.transform = fromTransform;
      el.style.opacity = opacity.from;
    }
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.transition = `transform 380ms ${OPEN_EASE}, opacity 320ms ease`;
        el.style.transform = toTransform;
        el.style.opacity = opacity.to;
        if (done) setTimeout(done, 400);
      })
    );
  };

  const taskbarRect = () => {
    const btn = document.getElementById(`taskbtn-${win.id}`);
    if (btn) return btn.getBoundingClientRect();
    return {
      left: window.innerWidth / 2 - 20,
      top: window.innerHeight - TASKBAR_H / 2,
      width: 40,
      height: 40,
    };
  };

  // Open: zoom from the desktop icon
  useLayoutEffect(() => {
    const el = ref.current;
    const from = win.iconRect;
    if (!el || !from) return;
    animate(el, transformFrom(from), "none", { from: "0.2", to: "1" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close: zoom back to the icon, then unmount
  useEffect(() => {
    if (!win.closing) return;
    const el = ref.current;
    const target = win.iconRect || taskbarRect();
    animate(el, null, transformFrom(target), { from: "1", to: "0" }, () =>
      destroy(win.id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.closing]);

  // Minimize / restore: zoom to and from the taskbar button
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (win.minimized && !wasMinimized.current) {
      wasMinimized.current = true;
      animate(el, null, transformFrom(taskbarRect()), { from: "1", to: "0" }, () =>
        setHidden(true)
      );
    } else if (!win.minimized && wasMinimized.current) {
      wasMinimized.current = false;
      setHidden(false);
      animate(el, transformFrom(taskbarRect()), "none", { from: "0", to: "1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win.minimized]);

  const onTitlePointerDown = (e) => {
    if (win.maximized || e.button !== 0 || e.target.closest("button")) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: win.x,
      baseY: win.y,
    };
    // kill any leftover open/restore transition so the window tracks 1:1
    ref.current.style.transition = "none";
    // capture on the title bar itself — capturing on the window div retargets
    // pointermove away from this handler and the drag starves
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onTitlePointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const x = Math.min(
      Math.max(d.baseX + e.clientX - d.startX, -win.w + 80),
      window.innerWidth - 80
    );
    const y = Math.min(
      Math.max(d.baseY + e.clientY - d.startY, 0),
      window.innerHeight - TASKBAR_H - 40
    );
    d.lastX = x;
    d.lastY = y;
    // transform instead of left/top: stays on the compositor, no relayout
    ref.current.style.transform = `translate3d(${x - d.baseX}px, ${y - d.baseY}px, 0)`;
  };

  const onTitlePointerUp = () => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    if (d.lastX === undefined) return;
    const el = ref.current;
    el.style.left = `${d.lastX}px`;
    el.style.top = `${d.lastY}px`;
    el.style.transform = "";
    move(win.id, d.lastX, d.lastY);
  };

  const rect = restingRect();

  return (
    <div
      ref={ref}
      onPointerDownCapture={() => focus(win.id)}
      className="absolute flex flex-col bg-panel border-2 border-line rounded-lg shadow-[8px_8px_0_0_rgba(59,51,37,0.35)] overflow-hidden"
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        zIndex: win.z,
        visibility: hidden ? "hidden" : "visible",
        willChange: "transform, opacity",
      }}
    >
      {/* Title bar */}
      <div
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onDoubleClick={() => toggleMax(win.id)}
        className="flex items-center gap-2 px-3 h-10 shrink-0 bg-panel-soft border-b-2 border-line select-none cursor-grab active:cursor-grabbing touch-none"
      >
        <button
          onClick={() => close(win.id)}
          title={c.window.close}
          className="w-3.5 h-3.5 rounded-full bg-[#e25d33] border border-line hover:brightness-110 cursor-pointer"
        />
        <button
          onClick={() => minimize(win.id)}
          title={c.window.minimize}
          className="w-3.5 h-3.5 rounded-full bg-accent border border-line hover:brightness-110 cursor-pointer"
        />
        <button
          onClick={() => toggleMax(win.id)}
          title={c.window.maximize}
          className="w-3.5 h-3.5 rounded-full bg-[#8a9a5b] border border-line hover:brightness-110 cursor-pointer"
        />
        <span className="ml-2 flex items-center gap-1.5 font-anonymous text-sm text-ink lowercase">
          <app.Icon className="w-3.5 h-3.5 text-ink-soft" />
          {app.label(c)}
        </span>
      </div>

      {/* App content */}
      <div className="flex-1 overflow-y-auto os-scroll">
        <app.Component />
      </div>
    </div>
  );
};

export default Window;
