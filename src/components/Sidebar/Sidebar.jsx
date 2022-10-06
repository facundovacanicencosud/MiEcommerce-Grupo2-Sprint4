import React from 'react'
import styles from "./sidebar.module.css"
import logo from "../../assets/MiEcommerce.svg"
import homeIcon from "../../assets/home.svg"
import packageIcon from "../../assets/package-variant-closed.svg"
import storeIcon from "../../assets/store.svg"


const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.aside__logo}>
      <img className ={styles.logo} src={logo}/>
      </div>
      <div className={styles.aside__links}>
        <ul>
          <li className={styles.aside__link_selected}>
            <div className={styles.aside__link_logo}>
            <img src={homeIcon} /> 
            </div>
            <div className={styles.aside__link_title}>
            <p>
            Inicio
            </p>
            </div>
          </li>
          <li className>
            <div className={styles.aside__link_logo}>
            <img src={packageIcon} /> 
            </div>
            <div className={styles.aside__link_title}>
            <p>
            Productos
            </p>
            </div>
          </li>
          <li className>
            <div className={styles.aside__link_logo}>
            <img src={storeIcon} /> 
            </div>
            <div className={styles.aside__link_title}>
            <p>
            Tiendas
            </p>
            </div>
          </li>          
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar