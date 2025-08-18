import React from "react";
import locationIcon from "../../assets/imgs/icons8-local-24.png";
import GlareHover from "../AnimatedHover/GlareHover.jsx";

const AboutMe = () => {
  return (
    <section
      id="sobre"
      className="flex justify-between items-center mx-auto w-full max-w-4xl py-4 mt-20"
    >
      <div>
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

          <p className="text-white mt-8 leading-loose text-lg max-w-[700px] font-[Inter]">
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
        </div>

        <div>
          <ul className="flex gap-8 text-sm font-medium text-white mt-10">
            <li id="About">
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
                  About
                </a>
              </GlareHover>
            </li>
            <li id="Contact">
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
                  Contact
                </a>
              </GlareHover>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
