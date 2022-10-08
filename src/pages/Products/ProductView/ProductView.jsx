import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./productView.module.css";


const ProductView = () => {

  const baseURL = "http://localhost:5000/api";
  const id = useParams().id

  const [image, setImage] = useState([]);
  const [product, setProduct] = useState(null);

  /*const initialValues = {
    id: {id},
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
  };*/

  useEffect(() => {
    axios.get(`${baseURL}/product/${id}`).then((response) => {
      setProduct(response.data);
      console.log(response)
    });
  }, []);

  const updateProduct = () => {
    axios
      .put(`${baseURL}/product`, {
        id: product.id,
        title: "Editado!!",
        price: 15
      })
      .then((response) => {
        setProduct(response.data);
      });
  }

  const deleteProduct = () => {
    axios
      .delete(`${baseURL}/product/${id}`)
      .then(() => {
        alert("Post deleted!");
        setProduct(null)
      });
  }

  if (!product) return "No existe tal producto."

  /* const eraseFields = () => {

  } */


  return (
    <>
    <button onClick={deleteProduct}>Eliminar</button>

      <div className={style.container}>
        <div className={style.products}>
            <h2>{product.title}</h2>
            <h2>{product.price}</h2>
            <h2>{product.stock}</h2>
            <img src={product.images[3]}alt={product.title}/>
        </div>

        <h2 className={style.headings}>Información</h2>
        <form />
          <label htmlFor="nombre">Nombre</label>
          <input
            className={style.inputs}
            type="text"
            name="title"
            placeholder="Ingresar Nombre"
          />
        </div>
          <label htmlFor="calor">Valor</label>
          <br />
          <input
            className={style.inputs}
            type="number"
            name="price"
            placeholder="Ingresar Valor"
          />
          <br />
          <label htmlFor="stock">Stock</label>
          <br />
          <input
            className={style.inputs}
            type="number"
            name="stock"
            placeholder="Ingresar Cantidad"
          />
          <div>
            <label htmlFor="descripcion">Descripción</label>
            <br />
            <input
              className={style.description}
              type="text"
              name="description"
              placeholder="Ingresar Descripción"
            />
            <br />
            <br />
            <label htmlFor="tienda">Tienda</label>
            <br />
            <input
              className={style.inputs}
              type="text"
              name="category"
              placeholder="Seleccionar"
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
            <button type="submit" onClick={updateProduct}>Guardar</button>
            {/* <button onClick={eraseFields}>Cancelar</button> */}
          </div>
    </>
  )};

export default ProductView;