import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useGlobalContext } from "../context/AppContext";
import Logo from "../components/Logo.js";

const Navbar = () => {
  const { user, logoutUser, toggleSidebar } = useGlobalContext();
  const [showMenu, setMenu] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button className="btn" onClick={() => setMenu((t) => !t)}>
            <FaUserCircle />
            {user?.name || "User"}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showMenu ? "show-dropdown" : null}`}>
            <button onClick={logoutUser} className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
