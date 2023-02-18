import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { useGlobalContext } from "../context/AppContext";
import Logo from "../components/Logo.js";
import { FaTimes } from "react-icons/fa";
import NavLinks from "../components/NavLinks.js";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useGlobalContext();
  if (!showSidebar) {
    return (
      <Wrapper>
        <div className="sidebar-container">
          <div className="content">
            <button className="close-btn" onClick={toggleSidebar}>
              <FaTimes />
            </button>
            <header>
              <Logo />
            </header>
            <NavLinks />
          </div>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
