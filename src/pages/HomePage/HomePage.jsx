import React from "react";
import Background from "../../components/Background/Background";
import Header from "../../components/Header/Header.jsx";
import AboutMe from "../../components/AboutMe/AboutMe.jsx";
import MyProjects from "../../components/MyProjects/MyProjects.jsx";
import Resume from "../../components/Resume/Resume.jsx";

const Home = () => {
  return (
    <Background>
      {window.innerWidth < 768 && (
        <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-50">
          <p className="text-center text-lg">
            ⚠️ This website is not yet optimized for mobile.
            <br />
            Please access it from a desktop for the best experience.
          </p>
        </div>
      )}
      <Header />
      <AboutMe />
      <MyProjects />
      <Resume />
    </Background>
  );
};

export default Home;
