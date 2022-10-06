import React from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import style from "./navbar.module.css";
import menuLogo from "../../assets/menu.svg";
// import menuLogoWhite from "../../assets/menu-white.svg";
import NavItemSearch from "./NavItems/NavItemSearch";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import NavItemLeft from "./NavItems/NavItemLeft";

const Navbar = () => {
  const [searchBox, setSearchBox] = useState(false);
  const { changeSidebarButton } = useContext(AppContext);
  const location = useLocation().pathname;
  const id = useParams().id;
  let navItemLeft;
  if (location === "/") {
    navItemLeft = <NavItemLeft url={"/"} text={"Hola Olivia!"} />;
  } else if (location === "/products" || location === "/products/") {
    navItemLeft = <NavItemLeft url={"/products"} text={"productos"} />;
  } else if (location === "/products/new") {
    navItemLeft = (
      <NavItemLeft
        url={"/products"}
        text={"productos"}
        seccion={"nuevo producto"}
      />
    );
  } else if (location.includes("/products/")) {
    navItemLeft = (
      <NavItemLeft url={"/products"} text={"productos"} seccion={`#${id}`} />
    );
  }

  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div>
          <button
            onClick={changeSidebarButton}
            className={style.navbar_menu_button}
          >
            <img src={menuLogo} alt="" />
          </button>

          {navItemLeft}
        </div>
        {(location === "/products" || location === "/products/") && (
          <div className={style.search_box_and_add}>
            <NavItemSearch setOpen={setSearchBox} open={searchBox} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
