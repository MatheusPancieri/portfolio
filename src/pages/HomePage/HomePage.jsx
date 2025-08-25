import React from "react";
import Background from "../../components/Background/Background";
import Header from "../../components/Header/Header.jsx";
import AboutMe from "../../components/AboutMe/AboutMe.jsx";
import MyProjects from "../../components/MyProjects/MyProjects.jsx";
import Resume from "../../components/Resume/Resume.jsx";

const Home = () => {
  return (
    <Background>
      <Header />
      <AboutMe />
      <MyProjects />
      <Resume />
    </Background>
  );
};

export default Home;
