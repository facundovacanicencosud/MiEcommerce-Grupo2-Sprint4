import React from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../../../assets/chevron-right (1).svg";

const NavItemLeft = ({ url, text, seccion }) => {
  return (
    <>
      <Link to={url}>
        <span style={{ textTransform: "capitalize" }}>{text}</span>
      </Link>
      {seccion ? (
        <>
          <img src={arrowIcon} style={{ filter: "invert(1)" }} />
          <span style={{ textTransform: "capitalize" }}>{seccion}</span>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default NavItemLeft;
