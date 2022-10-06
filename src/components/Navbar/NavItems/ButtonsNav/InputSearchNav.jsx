import style from "../navitemsearch.module.css";

const InputSearchNav = ({logo}) => {
  return (
    <>
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
        <img src={logo} alt="" />
      </button>
    </>
  );
};

export default InputSearchNav;
