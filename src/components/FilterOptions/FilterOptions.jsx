import style from "./FilterOptions.module.css";

function FilterOptions({ selectedFilter, setSelectedFilter }) {
  const options = [
    { value: "", text: " --Seleccione una opción--" },
    { value: "menorPrecio", text: "Menor precio" },
    { value: "mayorPrecio", text: "Mayor precio" },
    { value: "masValorados", text: "Más valorados" },
    { value: "masVendidos", text: "Más vendidos" },
  ];

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <select
      className={style.selectFilter}
      value={selectedFilter}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default FilterOptions;
