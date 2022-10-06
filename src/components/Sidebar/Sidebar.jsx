import React from 'react'
import styles from "./sidebar.module.css"
import logo from "../../assets/MiEcommerce.svg"
import homeIcon from "../../assets/home.svg"
import packageIcon from "../../assets/package-variant-closed.svg"
import storeIcon from "../../assets/store.svg"
import profileIcon from "../../assets/ProfileBtn.svg"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'


const Sidebar = () => {

  const {activeSidebar, setActiveSidebar} = useContext(AppContext);
  return (
    <aside className={`${styles.sidebar} ${activeSidebar? "sidebar_active": ""}`}>
      <div className={styles.sidebar_top}>
      <div className={styles.sidebar_top__logo}>
      <img className ={styles.sidebar_logo} src={logo}/>
      </div>
      <div className={styles.sidebar_top__links}>
        <ul>
          <li className={styles.sidebar_top__link_selected}>
            <div className={styles.sidebar_top__link_logo}>
            <img src={homeIcon} /> 
            </div>
            <div className={styles.sidebar_top__link_title}>
              <Link to="/">
              Inicio
              </Link>
            </div>
          </li>
          <li>
            <div className={styles.sidebar_top__link_logo}>
            <img src={packageIcon} /> 
            </div>
            <div className={styles.sidebar_top__link_title}>
            <Link to="/products">
              Productos
              </Link>
            </div>
          </li>
          <li>
            <div className={styles.sidebar_top__link_logo}>
            <img src={storeIcon} /> 
            </div>
            <div className={styles.sidebar_top__link_title}>
            <Link to="/store">
              Tiendas
              </Link>
            </div>
          </li>          
        </ul>
      </div>
      </div>
      <div className={styles.sidebar_footer}>
      <div className={styles.sidebar_footer_user_card}>
            <div className={styles.sidebar_footer_user_card_img}>
            <img src={profileIcon} /> 
            </div>
            <div className={styles.sidebar_footer__link_title}>
            <p>
            Olivia
            </p>
            </div>
          </div> 
      </div>
    </aside>
  )
}

export default Sidebar