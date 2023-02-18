import mainSVG from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            I'm baby tousled coloring book flannel meh before they sold out
            aesthetic cred farm-to-table af scenester freegan bushwick pitchfork
            mumblecore gastropub. Umami DIY chia pork belly DSA selfies hell of
            palo santo 8-bit master cleanse. Trust fund heirloom meditation lyft
            etsy squid banjo ascot locavore.
          </p>
          <Link to={"/register"} className="btn btn-hero">
            Login / Register
          </Link>
        </div>
        {/* main-hero ing */}
        <img src={mainSVG} alt="hero hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
