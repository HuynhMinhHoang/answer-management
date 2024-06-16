import React from "react";
import giftHomepage from "../../assets/gift-homepage.mp4";
import "./HomePage.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );

  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={giftHomepage} type="video/mp4" />
      </video>

      <div className="homepage-content">
        <div className="title-1">{t("homepage.tilte1")}</div>
        <div className="title-2">{t("homepage.tilte2")}</div>
        <div className="title-3">
          {isAuthenticated ? (
            <button onClick={() => navigate("/users")}>
              {t("homepage.tilte3")}
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>
              Get started—it's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
