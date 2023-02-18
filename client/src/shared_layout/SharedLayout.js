import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/SharedLayout.js";
import { SmallSidebar, BigSidebar, Navbar } from "./index.js";
import { useGlobalContext } from "../context/AppContext";

const SharedLayout = () => {
  const { user, showSidebar } = useGlobalContext();
  return (
    <>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default SharedLayout;
