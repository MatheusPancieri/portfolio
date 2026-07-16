import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useLang } from "../../context/i18n.jsx";
import { APPS } from "../apps/apps.jsx";
import { LaunchContext } from "../../context/LaunchContext.jsx";
import Clock from "../Clock/Clock.jsx";
import TaskbarPet from "../TaskbarPet/TaskbarPet.jsx";
import Toast from "../Toast/Toast.jsx";

const MobileLauncher = () => {
  const { c, lang, toggleLang } = useLang();
  const [activeId, setActiveId] = useState(null);
  const [toast, setToast] = useState(null);
  const activeApp = APPS.find((a) => a.id === activeId);

  const launch = (app) => {
    if (app.copyText) {
      navigator.clipboard.writeText(app.copyText);
      setToast({ id: Date.now(), text: app.toast(c) });
      return;
    }
    if (app.external) {
      window.open(app.external, "_blank", "noopener,noreferrer");
      return;
    }
    setActiveId(app.id);
  };

  return (
    <LaunchContext.Provider value={launch}>
    <div className="fixed inset-0 bg-desk flex flex-col overflow-hidden">
      <div className="grain-layer" />

      {/* Status bar */}
      <div className="relative flex items-center justify-between px-4 h-14 bg-panel-soft border-b-2 border-line shrink-0">
        <TaskbarPet />
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1 border-2 border-line rounded-md bg-panel font-anonymous text-xs font-bold text-ink cursor-pointer"
          >
            {lang === "en" ? "EN" : "PT"}
          </button>
          <Clock />
        </div>
      </div>

      {/* Home screen grid */}
      <div className="relative flex-1 overflow-y-auto os-scroll p-8">
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 justify-items-center max-w-sm mx-auto">
          {APPS.filter((app) => !app.hidden).map((app) => (
            <button
              key={app.id}
              onClick={() => launch(app)}
              className="flex flex-col items-center gap-2 cursor-pointer active:translate-y-0.5 transition-transform"
            >
              <app.Icon className="w-12 h-12 text-ink drop-shadow-[2px_2px_0_rgba(59,51,37,0.25)]" />
              <span className="text-xs font-anonymous text-ink">
                {app.label(c)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen app */}
      {activeApp && (
        <div className="app-zoom-in fixed inset-0 z-50 flex flex-col bg-panel">
          <div className="flex items-center justify-between px-4 h-12 bg-panel-soft border-b-2 border-line shrink-0">
            <span className="flex items-center gap-2 font-anonymous text-sm font-bold text-ink lowercase">
              <activeApp.Icon className="w-4 h-4 text-ink-soft" />
              {activeApp.label(c)}
            </span>
            <button
              onClick={() => setActiveId(null)}
              title={c.mobile.close}
              className="flex items-center justify-center w-8 h-8 bg-[#e25d33] border-2 border-line rounded-md cursor-pointer"
            >
              <FaXmark className="w-4 h-4 text-panel" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto os-scroll">
            <activeApp.Component />
          </div>
        </div>
      )}

      {toast && (
        <Toast key={toast.id} message={toast.text} onDone={() => setToast(null)} />
      )}
    </div>
    </LaunchContext.Provider>
  );
};

export default MobileLauncher;
