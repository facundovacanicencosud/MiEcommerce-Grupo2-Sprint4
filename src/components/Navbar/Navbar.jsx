import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./navbar.module.css";
import menuLogo from "../../assets/menu.svg";
import NavItemSearch from "./NavItems/NavItemSearch";

const Navbar = () => {
  const [searchBox, setSearchBox] = useState(false);
  const location = useLocation()
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        
        <div>
            <button className={style.navbar_menu_button}>
              <img src={menuLogo} alt="" />
            </button>
            <Link to={`/${"product"}`}>
                <span>{"Product"}</span>
            </Link>
        </div>
        {(location.pathname === "/products")&& <div className={style.search_box_and_add}>
            <NavItemSearch setOpen={setSearchBox} open={searchBox}/>
        </div>}
      </nav>
    </header>
  );
};

export default Navbar;
