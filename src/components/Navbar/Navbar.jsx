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
        {(!searchBox)?
            <>
                <div>
                    <Link to={`/${"product"}`}>
                        <span>{"Product"}</span>
                    </Link>
                </div>
                <div className={style.search_box_and_add}>
                    <NavItemSearch setOpen={setSearchBox} open={searchBox}/>
                </div>
            </>
        :
            <>
                <div  className={style.navbar_search_box} >
                    <NavItemSearch setOpen={setSearchBox} open={searchBox} />
                </div>
            </>
        }
      </nav>
    </header>
  );
};

export default Navbar;
