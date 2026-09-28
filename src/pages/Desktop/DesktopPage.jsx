import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LangProvider } from "../../context/i18n.jsx";
import { EDITOR_LINKS } from "../../utils/editorContent.js";
import { ProfileContext } from "../../context/ProfileContext.jsx";
import { WindowsProvider } from "../../context/WindowManager.jsx";
import { NotesProvider } from "../../context/NotesContext.jsx";
import ProfileSelect from "../../components/ProfileSelect/ProfileSelect.jsx";
import BootScreen from "../../components/BootScreen/BootScreen.jsx";
import Desktop from "../../components/Desktop/Desktop.jsx";
import MobileLauncher from "../../components/MobileLauncher/MobileLauncher.jsx";

const TITLES = {
  dev: "Matheus Pancieri | Developer",
  editor: "Matheus Pancieri | Video Editor",
};

// profile comes from the route ("/dev", "/editor"); null on "/" shows the
// welcome screen, which navigates to the chosen one.
const DesktopPage = ({ profile }) => {
  const navigate = useNavigate();
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

  useEffect(() => {
    document.title = TITLES[profile] ?? "Matheus Pancieri | Portfolio";
  }, [profile]);

  // On editor.matheuspancieri.dev "/" is the editor profile itself, so the
  // welcome screen lives on the main domain.
  const logOff = () => {
    if (window.location.hostname.startsWith("editor.")) window.location.href = EDITOR_LINKS.devPortfolio;
    else navigate("/");
  };

  const finishBoot = () => {
    sessionStorage.setItem("os-booted", "1");
    setBooted(true);
  };

  return (
    <ProfileContext.Provider value={{ profile: profile ?? "dev", logOff }}>
      <LangProvider>
        {profile ? (
          // Keyed by profile so switching starts a clean session: open
          // windows and the selected project belong to the old profile.
          <WindowsProvider key={profile}>
            <NotesProvider>
              <div>
                {isMobile ? <MobileLauncher /> : <Desktop />}
                {!booted && <BootScreen onDone={finishBoot} />}
              </div>
            </NotesProvider>
          </WindowsProvider>
        ) : (
          <ProfileSelect onSelect={(id) => navigate(`/${id}`)} />
        )}
      </LangProvider>
    </ProfileContext.Provider>
  );
};

export default DesktopPage;
