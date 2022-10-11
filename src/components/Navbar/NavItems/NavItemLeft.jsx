import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../../../assets/chevron-right (1).svg";
import { AppContext } from "../../../context/AppContext";

const NavItemLeft = ({ url, text, seccion, username }) => {
  const { theme } = useContext(AppContext);
  return (
    <>
      {username ? (
        <Link to={url}>
          <span style={{ textTransform: "capitalize" }}>¡Hola {username}!</span>
        </Link>
      ) : (
        <Link to={url}>
          <span style={{ textTransform: "capitalize" }}>{text}</span>
        </Link>
      )}
      {seccion ? (
        <>
          <img
            src={arrowIcon}
            className={`arrow-nav-item-left ${theme ? "dark" : ""}`}
          />
          <span style={{ textTransform: "capitalize" }}>{seccion}</span>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NavItemLeft;
