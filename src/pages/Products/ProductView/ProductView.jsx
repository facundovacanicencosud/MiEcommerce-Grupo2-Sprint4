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

<<<<<<< HEAD
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
=======
  const [image, setImage] = useState([]); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/product/${id}`).then((response) => {
      setProduct(response.data);
      console.log(response)
    });
  }, []);


  const handleChange = (e) => {
    setImage(e.target.value);
    console.log(image)
  };


  const addImg = () => {
    axios
      .put(`${baseURL}/product`, {
        "images": [...product.images, image]
      })
      .then((response) => {
        setImage(response.data);
      });
  }

  
  const updateProduct = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    data.append('id', product.id)

    function replace(key, value) {
      if (key === 'id' || key === 'stock' || key === 'price') {
        let change = Number(value);
        return change;
      }
      return value;
    }
    let formObject = JSON.stringify(Object.fromEntries(data), replace)
    
    console.log(formObject);
    axios
      .put(`${baseURL}/product`, {
        formObject
      })
      .then((response) => {
        setProduct(response.data);
      });
  }

  const [stockNum, setStockNum] = useState(0)
  const handleSubtractOne = () => {
    setStockNum(stockNum - 1);
  };

  const handleAddOne = () => {
    setStockNum(stockNum + 1);
  };


  const deleteProduct = () => {
    axios
      .delete(`${baseURL}/product?id=${id}`)
      .then(() => {
        alert("Producto borrado!");
        setProduct(null)
      });
  }

  if (!product) return "No existe tal producto."


  const resetInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    this.setState({
      itemvalues: [{}]
    });
  };


  const imageList = product.images.map((index) => 
    <div>
      <img src={index} key={index} alt={product.title}/>
      <p>{index}</p>
      <button>Quitar</button>
    </div>
  )

  
>>>>>>> 5ee574e (fixing stuff)

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
<<<<<<< HEAD
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
=======
    <>
    <button onClick={deleteProduct}>Eliminar</button>

      <div className={style.container}>

        <div className={style.products}>
          <img src={product.images[0]}alt={product.title}/>
          <h2>{product.title}</h2>
          <h4>{product.price} Puntos Superclub</h4>
          <h4>{product.stock} Stock Disponible</h4>
        </div>

        <h2 className={style.headings}>Información</h2>
        <form onSubmit={updateProduct} className="productForm">
          <label htmlFor="nombre">Nombre</label><br />
          <input required
            className={style.inputs}
            type="text"
            name="title"
            placeholder="InputValue"
          /> <br /> 
          <label htmlFor="valor">Valor</label> <br />
          <input
            defaultValue={0}
            className={style.inputs}
            type="number"
            name="price"
            placeholder="InputValue"
          />
          <br />
          <label htmlFor="stock">Stock</label>
          <br />
          <div>
            <button onClick={handleSubtractOne}> - </button>
            <input
              value={stockNum}
              className={style.inputs}
              type="number"
              name="stock"
              placeholder="InputValue"
            />
            <button onClick={handleAddOne}> + </button> 
          </div>
          <div>
            <label htmlFor="descripcion">Descripción</label>
            <br />
            <input
              className={style.description}
              type="text"
              name="description"
              placeholder="InputValue"
            />
            <br /><br />
            <label htmlFor="tienda">Tienda</label>
            <br />
            <select
              className={style.inputs}
              type="text"
              name="category"
              placeholder="Select" >
              <option>Pepito store</option> 
            </select>
          </div>
          <button type="submit">Guardar</button>
        </form>

        <h3 className={style.headings}>Galería de Imágenes</h3>
          <div>
            <label htmlFor="imagen">Nueva Imagen</label><br />
            <input
              onChange={handleChange}
              value={image}
              className={style.inputs}
              type="picture"
              name="imagen"
              accept="image/*"
              placeholder="InputValue"
            /> <button onClick={addImg}>Agregar img</button>
          </div>
          <h4 className={style.headings}>Imágenes Actuales</h4>
          <div className={style.imageBanner}>
            {imageList}
          </div><br />
          <div>
            <button onClick={resetInputs}>CANCELAR</button>
          </div>
      </div>

    </>
  )};
>>>>>>> 5ee574e (fixing stuff)

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
