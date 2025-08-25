// Header.jsx
import React from "react";
import assinaturaMatheus from "../../assets/imgs/assinaturaMatheus.svg";
import GlareHover from "../../components/AnimatedHover/GlareHover.jsx";

const Header = () => {
  return (
    <header className="flex justify-between items-center mx-auto w-full max-w-4xl py-8">
      <div>
        <img src={assinaturaMatheus} alt="Logo assinatura Matheus" />
      </div>
      <nav>
        <ul className="flex gap-8 text-sm font-medium text-white">
          <li>
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              className="box-border border border-white py-3 px-6 backdrop-blur-sm shadow-xl transition duration-300 hover:scale-110 hover:rounded-xs"
            >
              <a href="#about" className="font-inter font-bold text-white">
                About Me
              </a>
            </GlareHover>
          </li>
          <li>
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              className="box-border border border-white py-3 px-6 backdrop-blur-sm shadow-xl transition duration-300 hover:scale-110 hover:rounded-xs"
            >
              <a href="#projects" className="font-inter font-bold text-white">
                My Projects
              </a>
            </GlareHover>
          </li>
          <li>
            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              className="box-border border border-white py-3 px-6 backdrop-blur-sm shadow-xl transition duration-300 hover:scale-110 hover:rounded-xs"
            >
              <a href="" className="font-inter font-bold text-white">
                Computer
              </a>
            </GlareHover>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
