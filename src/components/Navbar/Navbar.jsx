import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./navbar.module.css";
import menuLogo from "../../assets/menu.svg";
// import menuLogoWhite from "../../assets/menu-white.svg";
import NavItemSearch from "./NavItems/NavItemSearch";
import useScreen from "../../hooks/useScreen"
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const [searchBox, setSearchBox] = useState(false);
  const { setActiveSidebar } = useContext(AppContext);
  const location = useLocation();
  const {width} = useScreen();
  const changeSidebarButton = () =>{
    setActiveSidebar(x => !x)
  }
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        
        <div>
          {(width<1024) &&  
            <button onClick={changeSidebarButton} className={style.navbar_menu_button}>
              <img src={menuLogo} alt="" />
            </button>
          }
           
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
