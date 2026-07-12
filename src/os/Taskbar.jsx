import { useWindows, TASKBAR_H } from "./WindowManager.jsx";
import { useLang } from "./i18n.jsx";
import { APPS } from "./apps.jsx";
import TaskbarPet from "./TaskbarPet.jsx";
import Clock from "./Clock.jsx";

const Taskbar = () => {
  const { windows, minimize, restore, focus } = useWindows();
  const { c, lang, toggleLang } = useLang();

  const topZ = Math.max(0, ...windows.map((w) => w.z));

  const onTaskClick = (win) => {
    if (win.minimized) restore(win.id);
    else if (win.z === topZ) minimize(win.id);
    else focus(win.id);
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[80] flex items-center gap-2 px-3 bg-panel-soft border-t-2 border-line"
      style={{ height: TASKBAR_H }}
    >
      <TaskbarPet />

      <div className="w-0.5 self-stretch my-2.5 bg-line/20 rounded" />

      {/* Open windows */}
      <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
        {windows
          .filter((w) => !w.closing)
          .map((win) => {
            const app = APPS.find((a) => a.id === win.id);
            const active = !win.minimized && win.z === topZ;
            return (
              <button
                key={win.id}
                id={`taskbtn-${win.id}`}
                onClick={() => onTaskClick(win)}
                className={`flex items-center gap-2 px-3 py-1.5 border-2 border-line rounded-md font-anonymous text-xs transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? "bg-accent text-ink shadow-[2px_2px_0_0_rgba(59,51,37,0.85)]"
                    : "bg-panel text-ink-soft hover:bg-accent-soft"
                } ${win.minimized ? "opacity-60" : ""}`}
              >
                <app.Icon className="w-3.5 h-3.5" />
                {app.label(c)}
              </button>
            );
          })}
      </div>

      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="px-2.5 py-1.5 border-2 border-line rounded-md bg-panel font-anonymous text-xs font-bold text-ink hover:bg-accent-soft transition-colors cursor-pointer select-none"
        title={lang === "en" ? "Mudar para português" : "Switch to English"}
      >
        {lang === "en" ? "EN" : "PT"}
      </button>

      <div className="w-0.5 self-stretch my-2.5 bg-line/20 rounded" />

      <Clock />
    </div>
  );
};

export default Taskbar;
