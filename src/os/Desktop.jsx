import { useWindows } from "./WindowManager.jsx";
import { APPS } from "./apps.jsx";
import { LaunchContext } from "./LaunchContext.jsx";
import DesktopIcon from "./DesktopIcon.jsx";
import Window from "./Window.jsx";
import Taskbar from "./Taskbar.jsx";
import { useIconPositions } from "./useIconPositions.js";
import signature from "../assets/imgs/assinaturaMatheus.svg";

const Desktop = () => {
  const { windows, open } = useWindows();
  const { positions, move } = useIconPositions(APPS);

  const launch = (app, rect) => {
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
      {APPS.map((app) => (
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
    </div>
    </LaunchContext.Provider>
  );
};

export default Desktop;
