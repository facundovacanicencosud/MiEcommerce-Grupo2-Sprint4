import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import style from "../navitemsearch.module.css";

const InputSearchNav = ({ logo }) => {
  const { setSearchQuery } = useContext(AppContext);
  const [controlInput, setControlInput] = useState("");

  useEffect(() => {
    if (!controlInput) {
      setSearchQuery(controlInput);
    }
  }, [controlInput]);

  return (
    <>
      <input
        onChange={(e) => setControlInput(e.target.value)}
        name="search"
        className={style.search_input}
        type="text"
        placeholder="Buscar productos"
      />
      <button
        type="submit"
        className={`${style.search_icon} ${style.search_form_search_icon}`}
      >
        <img src={logo} alt="Logo" />
      </button>
    </>
  );
};

export default InputSearchNav;
