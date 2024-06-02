import React from "react";
import giftHomepage from "../../assets/gift-homepage.mp4";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={giftHomepage} type="video/mp4" />
      </video>

      <div className="homepage-content">
        <div className="title-1">Make forms worth filling out</div>
        <div className="title-2">
          Get more data—like signups, feedback, and anything else—with forms
          designed to be refreshingly different.
        </div>
        <div className="title-3">
          <button>Get started—it's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
