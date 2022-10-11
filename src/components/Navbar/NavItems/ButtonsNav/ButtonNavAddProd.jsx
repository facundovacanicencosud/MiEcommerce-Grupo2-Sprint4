import { Link, useLocation } from "react-router-dom";

const ButtonNavAddProd = ({ classCss, spanText }) => {
  const location = useLocation().pathname;
  return (
    <Link to={`${location}/new`} className={classCss}>
      {spanText
        ? spanText
        : `Agregar ${location.slice(1) === "users" ? "Usuario" : "Producto"}`}
    </Link>
  );
};

export default ButtonNavAddProd;
