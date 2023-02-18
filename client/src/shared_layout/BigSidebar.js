import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "../components/NavLinks";
import Logo from "../components/Logo.js";
import { useGlobalContext } from "../context/AppContext.js";

const BigSidebar = () => {
  const { showSidebar } = useGlobalContext();
  if (!showSidebar) {
    return (
      <Wrapper>
        <div className={"sidebar-container"}>
          <div className="content">
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
      <div className={"sidebar-container show-sidebar"}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
