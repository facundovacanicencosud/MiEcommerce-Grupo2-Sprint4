import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import style from "./navbar.module.css";
import menuLogo from "../../assets/menu.svg";
import NavItemSearch from "./NavItems/NavItemSearch";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import NavItemLeft from "./NavItems/NavItemLeft";
import useScreen from "../../hooks/useScreen";
import { deleteProduct } from "../../utils/apiConfig";
import { useEffect } from "react";

const Navbar = () => {
  const [searchBox, setSearchBox] = useState(false);
  const { setActiveSidebar, theme } = useContext(AppContext);
  const navegar = useNavigate();
  const location = useLocation().pathname;
  const { width } = useScreen();
  const id = useParams().id;

  //cuando se desmonta navbar, el buscador en celulares tiene que volverse falso
  useEffect(()=>{
    return setSearchBox(false);
  },[location])

  let navItemLeft;
  //condicional para renderizar la parte del header de texto a la izquierda
  if (location === "/") {
    navItemLeft = <NavItemLeft url={"/"} username={"Olivia"} />;
  } else if (location === "/products" || location === "/products/") {
    navItemLeft = <NavItemLeft url={"/products"} text={"productos"} />;
  } else if (location === "/users" || location === "/users/") {
    navItemLeft = <NavItemLeft url={"/users"} text={"usuarios"} />;
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
  } else if (location === "/users/new") {
    navItemLeft = (
      <NavItemLeft url={"/users"} text={"usuarios"} seccion={"nuevo usuario"} />
    );
  } else if (location.includes("/users/")) {
    navItemLeft = (
      <NavItemLeft url={"/users"} text={"usuarios"} seccion={`#${id}`} />
    );
  }

  //función para borrar un producto
  const handleDelete = async () => {
    try {
      const deletedProduct = await deleteProduct(parseInt(id));
      if (deletedProduct.status === 200) {
        navegar("/products");
      } else {
        alert("Se produjo un error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={`${style.header} ${theme ? "dark-background" : ""}`}>
      <nav className={style.navbar}>
        <div>
          <button
            onClick={setActiveSidebar}
            className={
              theme ? style.navbar_menu_button_dark : style.navbar_menu_button
            }
          >
            <img src={menuLogo} alt="" id="hamburguerMenu" />
          </button>
          {width > 468
            ? navItemLeft
            : !searchBox? navItemLeft : ""}
        </div>
        {location === "/products" ||
        location === "/products/" ||
        location === "/users" ? (
          <div className={style.search_box_and_add}>
            <NavItemSearch setOpen={setSearchBox} open={searchBox} />
          </div>
        ) : location === "/products/new" || location === "users/new" ? (
          ""
        ) : location.includes("/products/") ? (
          <div style={{ position: "relative", right: 0 }}>
            <button
              onClick={handleDelete}
              className={style.navbar_right_button}
            >
              Eliminar
            </button>
          </div>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
};

export default Navbar;
