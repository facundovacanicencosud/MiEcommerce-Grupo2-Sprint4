import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../hooks/dataForm";
import axios from "axios";
import { getProducts } from "../../../utils/apiConfig";
import style from "./productView.module.css";

const ProductView = () => {
  const id = useParams().id;
  const showProduct = () => {
    return axios
      .get(`http://localhost:5000/api/product/${id}`, {})
      .then(({ data }) => {
        console.log(data);
        return JSON.stringify(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [productOnPage, setProductOnPage] = useState("");

  useEffect(() => {
    showProduct().then((randomData) => {
      setProductOnPage(randomData || "No existe el producto.");
    });
  }, []);

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
      setWarning("ERR0R");
    }
  };

  return (
    <div className={style.container}>
      <div>{productOnPage}</div>
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
        <label htmlFor="nombre">Nombre</label>
        <br />
        <input
          className={style.inputs}
          type="text"
          name="nombre"
          placeholder="Ingresar Nombre"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="calor">Valor</label>
        <br />
        <input
          className={style.inputs}
          type="number"
          name="valor"
          placeholder="Ingresar Valor"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="stock">Stock</label>
        <br />
        <input
          className={style.inputs}
          type="number"
          name="stock"
          placeholder="Ingresar Cantidad"
          onChange={handleChange}
        />
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <br />
          <input
            className={style.description}
            type="text"
            name="descripcion"
            placeholder="Ingresar Descripción"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="tienda">Tienda</label>
          <br />
          <select
            className={style.inputs}
            type="select"
            name="tienda"
            placeholder="Seleccionar"
            onChange={handleChange}
          />
        </div>

        <div>
          <h4 className={style.headings}>Imágenes Actuales</h4>
        </div>
        <div>
          <button type="submit">Guardar</button>
          <button>Cancelar</button>
          <div>{warning && <p>{warning}</p>}</div>
        </div>
      </form>
    </div>
  );
};

export default ProductView;
