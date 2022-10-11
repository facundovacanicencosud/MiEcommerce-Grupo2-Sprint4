import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../context/AppContext'
import style from "../../../pages/Home/home.module.css"

const Category = ({title,num,link1,link2, logo}) => {
  const {theme} = useContext(AppContext);
  return (
    <li className={`${style.category} ${theme? style.category_dark: ""}`}>
    <div>
      <img src={logo} alt="" />
      <div className={style.category_detail}>
        <p className={style.category_title}>
          <span>{num}</span> {title}
        </p>
        <div>
          <Link to={link1}>Ver Listado</Link>
          <Link to={link2}>Agregar Producto</Link>
        </div>
      </div>
    </div>
  </li>
  )
}

export default Category