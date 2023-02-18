import React from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import { Link } from "react-router-dom";
import notFoundSvg from "../assets/images/not-found.svg";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div className="">
        <img src={notFoundSvg} alt="not found" />
        <h3>Ohh! Page not found</h3>
        <p>We can't seem to find this page you're lookinig for</p>
        <Link to={"/"}>Back to Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
