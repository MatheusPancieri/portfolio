import { useEffect, useState } from "react";
import { LangProvider } from "../../os/i18n.jsx";
import { WindowsProvider } from "../../os/WindowManager.jsx";
import BootScreen from "../../os/BootScreen.jsx";
import Desktop from "../../os/Desktop.jsx";
import MobileLauncher from "../../os/MobileLauncher.jsx";

const HomePage = () => {
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

export default HomePage;
