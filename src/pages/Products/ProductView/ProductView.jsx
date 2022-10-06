
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../hooks/dataForm";
import axios from "axios";
import style from "./productView.module.css";


const ProductView = () => {

  const useAxios = () => {
    const url = 'http://localhost:5000/api/product/1';
    axios.get(url, {
    })
    .then(function (response) {
      console.log(response);
    })
  }

  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [warning, setWarning] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    price: 0,
    rating: {
      rate: 0,
      count: 0,
    },
    stock: 0,
    category: "",
    images: [],
  };

  const { data, handleChange } = useForm(initialValues);

  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:5000/api/product",
        data
      );
      if (response === 200) {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
      setWarning("ERR0R");
    }
  };

  return (
  <div className={style.container}>
    <div className={style.products}>
      <h2>Titulo</h2>
      <img alt="product"></img>
      <h4>5000</h4>
        <p>Puntos</p>
      <h4>1000</h4>
        <p>Stock</p>
    </div>
      <h2 className={style.headings}>Información</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label><br/>
        <input className={style.inputs}
          type="text"
          name="nombre"
          placeholder="Ingresar Nombre"
          onChange={handleChange}
        /><br/>
        <label htmlFor="calor">Valor</label><br/>
        <input className={style.inputs}
          type="number"
          name="valor"
          placeholder="Ingresar Valor"
          onChange={handleChange}
        /><br/>
        <label htmlFor="stock">Stock</label><br/>
        <input className={style.inputs}
          type="number"
          name="stock"
          placeholder="Ingresar Cantidad"
          onChange={handleChange}
        />
        <div>
          <label htmlFor="descripcion">Descripción</label><br/>
          <input className={style.description}
            type="text"
            name="descripcion"
            placeholder="Ingresar Descripción"
            onChange={handleChange}
          /><br/><br/>
          <label htmlFor="tienda">Tienda</label><br/>
          <select className={style.inputs}
            type="select"
            name="tienda"
            placeholder="Seleccionar"
            onChange={handleChange}
          />
        </div>
        <h3 className={style.headings}>Galería de Imágenes</h3>
        <div>
          <label htmlFor="imagen">Nueva Imagen</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <h4 className={style.headings}>Imágenes Actuales</h4>
        </div>
        <div>
          <button type="submit">Guardar</button>
          <button onClick={useAxios}>Cancelar</button>
          <div>{warning && <p>{warning}</p>}</div>
        </div>
      </form>
    </div>
    
  )
}

export default ProductView;