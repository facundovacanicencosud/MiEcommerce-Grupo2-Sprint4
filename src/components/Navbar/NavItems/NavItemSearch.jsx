import style from "./navitemsearch.module.css";
import searchLogo from "../../../assets/magnify.svg";
import ButtonNavAddProd from "./ButtonsNav/ButtonNavAddProd";
import InputSearchNav from "./ButtonsNav/InputSearchNav";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const NavItemSearch = ({ setOpen, open }) => {
  const { setSearchQuery } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <form onChange={handleSubmit} className={style.search_form}>
        <div
          className={style.search_form_exit}
          style={!open ? { display: "none" } : {}}
          onClick={() => setOpen(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className={style.search_form_div}>
          <InputSearchNav logo={searchLogo} setOpen={setOpen} open={open} />
        </div>

        <ButtonNavAddProd classCss={style.add_span} />
        <ButtonNavAddProd classCss={style.add_icon} spanText="+" />
      </form>
    </>
  );
};

export default NavItemSearch;
