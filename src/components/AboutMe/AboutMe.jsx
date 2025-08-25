import React, { useState } from "react";
import locationIcon from "../../assets/imgs/icons8-local-24.png";
import GlareHover from "../AnimatedHover/GlareHover.jsx";

const AboutMe = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section
      id="sobre"
      className="flex justify-between items-center mx-auto w-full max-w-4xl py-4 mt-20"
    >
      <div>
        {/* Cabeçalho */}
        <div className="w-fit">
          <div className="flex items-end gap-2">
            <h1 className="text-6xl text-white whitespace-nowrap font-['Anonymous_Pro']">
              Matheus Pancieri
            </h1>
            <span className="block bg-white h-px w-32 -translate-y-[5px]"></span>
            <span className="text-white text-lg font-semibold translate-y-[2px]">
              20y
            </span>
          </div>

          {/* Conteúdo condicional */}
          <div className="mt-8 text-lg max-w-[700px] font-[Inter]">
            {activeTab === "about" && (
              <p className="text-white leading-loose">
                I'm a <strong>Computer Engineering student</strong> from{" "}
                <img
                  src={locationIcon}
                  alt="Location icon"
                  className="inline-block w-6 h-6 align-text-bottom filter invert"
                />{" "}
                Brazil, based in Campo Grande with experience in web development
                using{" "}
                <strong>
                  .NET, ASP.NET, EF Core, SQL, JavaScript, jQuery, HTML/CSS, and
                  Tailwind
                </strong>
                . I also design user interfaces in Figma, aiming for clean,
                responsive, and user-friendly layouts.
              </p>
            )}

            {activeTab === "contact" && (
              <div className="flex flex-col gap-4 text-left text-white">
                <a
                  href="https://github.com/MatheusPancieri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub: github.com/Matheus-Pancieri
                </a>
                <a
                  href="https://www.linkedin.com/in/matheus-pancieri-preza-da-silva-159923275/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn: linkedin.com/in/Matheus-Pancieri
                </a>
                <a href="mailto:matheuspancieri@outlook.com" className="hover:underline">
                  Email: matheuspancieri@outlook.com
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <ul className="flex gap-8 text-sm font-medium text-white">
            <li>
              <div
                onClick={() => setActiveTab("about")}
                className="cursor-pointer"
              >
                <GlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  className={`box-border border py-3 px-6 backdrop-blur-sm shadow-xl transition duration-300 hover:scale-110 hover:rounded-xs ${
                    activeTab === "about"
                      ? "border-white bg-white/10"
                      : "border-white/50"
                  }`}
                >
                  <span className="font-inter font-bold text-white">About</span>
                </GlareHover>
              </div>
            </li>

            <li>
              <div
                onClick={() => setActiveTab("contact")}
                className="cursor-pointer"
              >
                <GlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  className={`box-border border py-3 px-6 backdrop-blur-sm shadow-xl transition duration-300 hover:scale-110 hover:rounded-xs ${
                    activeTab === "contact"
                      ? "border-white bg-white/10"
                      : "border-white/50"
                  }`}
                >
                  <span className="font-inter font-bold text-white">
                    Contact
                  </span>
                </GlareHover>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
