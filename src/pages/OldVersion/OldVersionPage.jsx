import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { LINKS } from "../../utils/content.js";
import Background from "./components/Background/Background.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import AboutMe from "./components/AboutMe/AboutMe.jsx";
import MyProjects from "./components/MyProjects/MyProjects.jsx";
import Resume from "./components/Resume/Resume.jsx";

const OldVersionPage = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 975);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 975);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Background>
      {isMobile && (
        <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
          <p className="text-center text-lg font-['Anonymous_Pro']">
            This website is not yet optimized for mobile.
            <br />
          </p>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4"
          >
            <FaGithub className="text-4xl hover:text-gray-400 transition-colors" />
          </a>
        </div>
      )}
      {!isMobile && (
        <>
          <Sidebar />
          <AboutMe />
          <MyProjects />
          <Resume />
        </>
      )}
    </Background>
  );
};

export default OldVersionPage;
