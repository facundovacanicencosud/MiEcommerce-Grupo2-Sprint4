import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import style from "../navitemsearch.module.css";

const InputSearchNav = ({ logo, setOpen, open }) => {
  const { setSearchQuery, theme } = useContext(AppContext);
  const [controlInput, setControlInput] = useState("");

  useEffect(() => {
    if (!controlInput) {
      setSearchQuery(controlInput);
    }
    // eslint-disable-next-line
  }, [controlInput]);

  const clickButton = (e) =>{
    e.preventDefault();
    setOpen(true)
  }

  return (
    <>
      <input
        onChange={(e) => setControlInput(e.target.value)}
        name="search"
        className={`${style.search_input} ${open && style.search_input_mobile} ${theme?style.dark_search:""}`}
        type="text"
        placeholder="Buscar..."
      />
      <button
        onClick={(e) => clickButton(e)}
        className={`${style.search_icon} ${style.search_form_search_icon} ${
          open && style.search_form_mobile_icon
        } ${theme?style.search_icon_dark:""}`}
      >
        <img src={logo} alt="Logo" />
      </button>
    </>
  );
};

export default InputSearchNav;
