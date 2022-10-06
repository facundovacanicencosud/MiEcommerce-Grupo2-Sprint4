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
  const { activeSidebar, setActiveSidebar } = useContext(AppContext);
  const params = useLocation().pathname;

  const sidebarRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      e.target.id !== "hamburguerMenu"
    ) {
      setActiveSidebar(false);
      console.log();
    }
  };

  useEffect(() => {
    return document.addEventListener("click", handleClickOutside);
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${activeSidebar ? "sidebar_active" : ""}`}
    >
      <div className={styles.sidebar_top}>
        <div className={styles.sidebar_top__logo}>
          <img className={styles.sidebar_logo} src={logo} alt="logo" />
        </div>
        <div className={styles.sidebar_top__links}>
          <ul>
            <li
              className={
                params === "/" ? styles.sidebar_top__link_selected : ""
              }
            >
              <div className={styles.sidebar_top__link_logo}>
                <img src={homeIcon} alt="Icono home" />
              </div>
              <div className={styles.sidebar_top__link_title}>
                <Link to="/">Inicio</Link>
              </div>
            </li>
            <li
              className={
                params === "/products" ? styles.sidebar_top__link_selected : ""
              }
            >
              <div className={styles.sidebar_top__link_logo}>
                <img src={packageIcon} alt="Products icon" />
              </div>
              <div className={styles.sidebar_top__link_title}>
                <Link to="/products">Productos</Link>
              </div>
            </li>
            <li
              className={
                params === "/store" ? styles.sidebar_top__link_selected : ""
              }
            >
              <div className={styles.sidebar_top__link_logo}>
                <img src={storeIcon} alt="Stores icon" />
              </div>
              <div className={styles.sidebar_top__link_title}>
                <Link to="/store">Tiendas</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.sidebar_footer}>
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
