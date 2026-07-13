import { useEffect, useState } from "react";
import { LangProvider } from "../../context/i18n.jsx";
import { WindowsProvider } from "../../context/WindowManager.jsx";
import BootScreen from "../../components/BootScreen/BootScreen.jsx";
import Desktop from "../../components/Desktop/Desktop.jsx";
import MobileLauncher from "../../components/MobileLauncher/MobileLauncher.jsx";

const DesktopPage = () => {
  const [booted, setBooted] = useState(
    () => sessionStorage.getItem("os-booted") === "1"
  );
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < 768
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const finishBoot = () => {
    sessionStorage.setItem("os-booted", "1");
    setBooted(true);
  };

  return (
    <LangProvider>
      <WindowsProvider>
        <div>
          {isMobile ? <MobileLauncher /> : <Desktop />}
          {!booted && <BootScreen onDone={finishBoot} />}
        </div>
      </WindowsProvider>
    </LangProvider>
  );
};

export default DesktopPage;
