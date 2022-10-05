import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";
import NavItemSearch from "./NavItems/NavItemSearch";

const Navbar = () => {
  const [searchBox, setSearchBox] = useState(false);
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div>
          <Link to={`/${"product"}`}>
            <span>{"Product"}</span>
          </Link>
        </div>
        <div>
          <NavItemSearch open={searchBox}/>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
