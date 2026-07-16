import { useState } from "react";
import { useWindows } from "../../context/WindowManager.jsx";
import { useLang } from "../../context/i18n.jsx";
import { APPS } from "../apps/apps.jsx";
import { LaunchContext } from "../../context/LaunchContext.jsx";
import DesktopIcon from "../DesktopIcon/DesktopIcon.jsx";
import Window from "../Window/Window.jsx";
import Taskbar from "../Taskbar/Taskbar.jsx";
import Toast from "../Toast/Toast.jsx";
import { useIconPositions } from "../../utils/useIconPositions.js";
import signature from "../../assets/imgs/assinaturaMatheus.svg";

const Desktop = () => {
  const { c } = useLang();
  const { windows, open } = useWindows();
  const visibleApps = APPS.filter((app) => !app.hidden);
  const { positions, move } = useIconPositions(visibleApps);
  const [toast, setToast] = useState(null);

  const launch = (app, rect) => {
    if (app.copyText) {
      navigator.clipboard.writeText(app.copyText);
      setToast({ id: Date.now(), text: app.toast(c) });
      return;
    }
    if (app.external) {
      window.open(app.external, "_blank", "noopener,noreferrer");
      return;
    }
    open(app.id, app, rect);
  };

  return (
    <LaunchContext.Provider value={launch}>
    <div className="fixed inset-0 bg-desk overflow-hidden">
      <div className="grain-layer" />

      {/* Decorative signature watermark */}
      <img
        src={signature}
        alt=""
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-105 opacity-40 pointer-events-none select-none"
        draggable={false}
      />

      {/* Icons */}
      {visibleApps.map((app) => (
        <DesktopIcon
          key={app.id}
          app={app}
          x={positions[app.id]?.x ?? 16}
          y={positions[app.id]?.y ?? 24}
          onOpen={launch}
          onMove={move}
        />
      ))}

      {/* Windows */}
      {windows.map((win) => {
        const app = APPS.find((a) => a.id === win.id);
        return <Window key={win.id} win={win} app={app} />;
      })}

      <Taskbar />

      {toast && (
        <Toast key={toast.id} message={toast.text} onDone={() => setToast(null)} />
      )}
    </div>
    </LaunchContext.Provider>
  );
};

export default Desktop;
