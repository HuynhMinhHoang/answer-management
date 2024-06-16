import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
import ImgEN from "../../assets/en.png";
import ImgVI from "../../assets/vi.png";
import "./Languages.scss";
const Languages = () => {
  const { i18n } = useTranslation();

  const handleTranslation = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <NavDropdown
      title={
        i18n.language === "VI" ? (
          <>
            <img src={ImgVI} alt="Vietnamese" className="language-icon" /> VN
          </>
        ) : (
          <>
            <img src={ImgEN} alt="English" className="language-icon" /> EN
          </>
        )
      }
      id="basic-nav-dropdown"
      className="languages"
    >
      <NavDropdown.Item
        onClick={() => {
          handleTranslation("VI");
        }}
      >
        <img src={ImgVI} alt="Vietnamese" className="language-icon" />{" "}
        Vietnamese
      </NavDropdown.Item>
      <NavDropdown.Item
        onClick={() => {
          handleTranslation("EN");
        }}
      >
        <img src={ImgEN} alt="English" className="language-icon" /> English
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default Languages;
