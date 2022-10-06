import style from "./navitemsearch.module.css";
import searchLogo from "../../../assets/magnify.svg";
import useScreen from "../../../hooks/useScreen";
import ButtonNavAddProd from "./ButtonsNav/ButtonNavAddProd";
import InputSearchNav from "./ButtonsNav/InputSearchNav";
const NavItemSearch = ({ open, setOpen }) => {
  const { width } = useScreen();
  const changeWidthSearch = () => {
    setOpen((x) => !x);
  };
  if (width > 468) {
    return (
      <>
        <form

          className={style.search_form}
        >
          <div className={style.search_form_div}>
            <InputSearchNav logo={searchLogo} />
          </div>

          <ButtonNavAddProd classCss={style.add_span} spanText="Agregar Producto" />
        </form>
      </>
    );
  } else {
    if (open) {
      return (
        <>
          <form

            className={style.search_form}
          >
            <div className={style.search_form_exit} onClick={changeWidthSearch}>
              <i className="fa-solid fa-xmark"></i>
            </div>

            <input
              name="search"
              className={style.search_input}
              type="text"
              placeholder="Buscar productos"
            />
            <button
              type="submit"
              className={`${style.search_icon} ${style.search_form_search_icon}`}
            >
              <img src={searchLogo} alt="" />
            </button>
          </form>
        </>
      );
    } else {
      return (
        <>
          <button className={style.search_icon} onClick={changeWidthSearch}>
            <img src={searchLogo} alt="" />
          </button>

          <>
            <ButtonNavAddProd classCss={style.add_icon} spanText="+" />
          </>
        </>
      );
    }
  }
};

export default NavItemSearch;
