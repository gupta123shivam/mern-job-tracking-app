import React from "react";
import logoSVG from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <img src={logoSVG} alt="jobfinder" className="logo" />
    </Link>
  );
};

export default Logo;
