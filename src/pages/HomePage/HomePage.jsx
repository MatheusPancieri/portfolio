import React, { useState, useEffect } from "react";
import Background from "../../components/Background/Background";
import Header from "../../components/Header/Header.jsx";
import AboutMe from "../../components/AboutMe/AboutMe.jsx";
import MyProjects from "../../components/MyProjects/MyProjects.jsx";
import Resume from "../../components/Resume/Resume.jsx";
import { FaGithub } from "react-icons/fa";
const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // função para checar largura
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 975);
    };

    checkMobile(); // checa ao montar
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
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
            href="https://github.com/MatheusPancieri"
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
          <Header />
          <AboutMe />
          <MyProjects />
          <Resume />
        </>
      )}
    </Background>
  );
};

export default Home;
