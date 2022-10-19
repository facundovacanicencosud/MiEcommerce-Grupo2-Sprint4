import React, { useRef, useContext, useEffect } from "react";
import styles from "./sidebar.module.css";
import logo from "../../assets/MiEcommerce.svg";
import homeIcon from "../../assets/home.svg";
import packageIcon from "../../assets/package-variant-closed.svg";
import storeIcon from "../../assets/store.svg";
import profileIcon from "../../assets/ProfileBtn.svg";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { activeSidebar, setActiveSidebar, theme, setTheme } =
    useContext(AppContext);
  const params = useLocation().pathname;

  const sidebarRef = useRef(null);
  const inputCheck = useRef();

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "dark") {
        setTheme(true);
      } else {
        setTheme(false);
      }
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);
  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      e.target.id !== "hamburguerMenu"
    ) {
      setActiveSidebar(false);
    }
  };

  const handleClickInside = () => {
    setActiveSidebar(false);
  };

  const changeTheme = () => {
    setTheme((x) => !x);
    !theme
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${activeSidebar ? "sidebar_active" : ""} ${
        theme ? "dark-background" : ""
      }`}
    >
      <div className={styles.sidebar_top}>
        <div className={styles.sidebar_top__logo}>
          <img className={styles.sidebar_logo} src={logo} alt="logo" />
        </div>
        <div className={styles.sidebar_top__links}>
          <ul>
            <li
              className={
                params === "/" && theme
                  ? styles.sidebar_top__link_selected_dark
                  : params === "/"
                  ? styles.sidebar_top__link_selected
                  : ""
              }
            >
              <div className={styles.sidebar_top__link_logo}>
                <img
                  src={homeIcon}
                  className={theme ? "dark-icon" : ""}
                  alt="Icono home"
                />
              </div>
              <div className={styles.sidebar_top__link_title}>
                <Link
                  onClick={handleClickInside}
                  to="/"
                  className={theme ? "dark-color" : ""}
                >
                  Inicio
                </Link>
              </div>
            </li>
            <li
              className={
                params === "/products" && theme
                  ? styles.sidebar_top__link_selected_dark
                  : params === "/products"
                  ? styles.sidebar_top__link_selected
                  : ""
              }
            >
              <div className={styles.sidebar_top__link_logo}>
                <img
                  className={theme ? "dark-icon" : ""}
                  src={packageIcon}
                  alt="Products icon"
                />
              </div>
              <div className={styles.sidebar_top__link_title}>
                <Link
                  onClick={handleClickInside}
                  to="/products"
                  className={theme ? "dark-color" : ""}
                >
                  Productos
                </Link>
              </div>
            </li>
            <li
              className={
                params === "/users" && theme
                  ? styles.sidebar_top__link_selected_dark
                  : params === "/users"
                  ? styles.sidebar_top__link_selected
                  : ""
              }
            >
              <div className={styles.sidebar_top__link_logo}>
                <img
                  className={theme ? "dark-icon" : ""}
                  src={storeIcon}
                  alt="Stores icon"
                />
              </div>
              <div className={styles.sidebar_top__link_title}>
                <Link
                  onClick={handleClickInside}
                  to="/users"
                  className={theme ? "dark-color" : ""}
                >
                  Usuarios
                </Link>
              </div>
            </li>
            <li
              className={
                params === "/store" && theme
                  ? styles.sidebar_top__link_selected_dark
                  : params === "/store"
                  ? styles.sidebar_top__link_selected
                  : ""
              }
            >
              <div className={styles.sidebar_top__link_logo}>
                <img
                  className={theme ? "dark-icon" : ""}
                  src={storeIcon}
                  alt="Stores icon"
                />
              </div>
              <div className={styles.sidebar_top__link_title}>
                <Link
                  onClick={handleClickInside}
                  to="/store"
                  className={theme ? "dark-color" : ""}
                >
                  Tiendas
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.sidebar_footer}>
        <label className="switch">
          <input
            ref={inputCheck}
            className={`switch-input ${theme ? "dark" : ""}`}
            type="checkbox"
            onChange={changeTheme}
            checked={theme}
          />
          <span className={`slider round ${theme ? "dark" : ""}`}></span>
        </label>
        <Link to="/profile">
          <div className={styles.sidebar_footer_user_card}>
            <div className={styles.sidebar_footer_user_card_img}>
              <img src={profileIcon} alt="Profile icon" />
            </div>
            <div className={styles.sidebar_footer__link_title}>
              <p>Olivia</p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
