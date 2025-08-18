import React from "react";
import Background from "../../components/Background/Background";
import Header from "../../components/Header/Header.jsx";
import AboutMe from "../../components/AboutMe/AboutMe.jsx";
import MyProjects from "../../components/MyProjects/MyProjects.jsx";

const Home = () => {
  return (
    <Background>
      <Header />
      <AboutMe />
      <MyProjects />
    </Background>
  );
};

export default Home;
