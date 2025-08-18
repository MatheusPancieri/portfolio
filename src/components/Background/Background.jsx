import React from "react";
import BackgroundImage from "../../assets/imgs/Background.png";

const Background = ({ children }) => {
  return (
    <div
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      className="bg-auto bg-clip-border min-h-screen md:bg-cover"
    >
      {children}
    </div>
  );
};

export default Background;
