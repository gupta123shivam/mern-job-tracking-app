import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Navbar";
import { Logo } from "../components";

const Navbar = () => {
  return (
    <Wrapper>
      <Logo />
      <Link to="/">Dashboard</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/landing">Home</Link>
    </Wrapper>
  );
};

export default Navbar;
