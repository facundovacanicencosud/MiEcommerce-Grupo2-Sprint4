import React, {useContext} from "react";
import { useLocation, Link } from "react-router-dom";
import errorIcon from "../../assets/404-error.svg";
import styles from "./error.module.css";
import { AppContext } from "../../context/AppContext";

const Error = () => {
  const { theme } =
    useContext(AppContext);
  const params = useLocation().pathname;

  return (
    <div className={styles.error__container}>
      <img src={errorIcon} alt="Error Icon" className={`${styles.error__icon} ${
        theme ? styles.error__icon_dark : ""
      }`}/>
      <h1 className={styles.error__title}>404</h1>
      <h2 className={styles.error__subtitle}>Página no encontrada</h2>
      <div className={styles.error__description}>
        <p>
          Lo sentimos, la página "<b>{params}</b>" que estabas buscando no
          existe, o puede haber ocurrido un error. Regresa al <Link to="/">Inicio</Link> para seguir
          navegando o intenta nuevamente{" "}
        </p>
      </div>
    </div>
  );
};

export default Error;
