import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links.js";
import { useGlobalContext } from "../context/AppContext";

const NavLinks = () => {
  const { toggleSidebar } = useGlobalContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            key={id}
            onClick={toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
