import { Link } from "react-router-dom"

const ButtonNavAddProd = ({classCss, spanText}) => {
  return (
    <Link to={"/products/new"} className={classCss}>
        {spanText}
    </Link>
  )
}


export default ButtonNavAddProd
