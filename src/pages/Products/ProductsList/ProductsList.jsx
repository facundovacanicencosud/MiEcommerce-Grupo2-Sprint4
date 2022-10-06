import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../utils/apiConfig";
import style from "./productsList.module.css";
import arrow from "../../../assets/chevron-right (1).svg";

const ProductsList = () => {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await getProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const onSearch = async ({ target }) => {
    const products = await getProducts();
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(target.value.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
    <div>
      <ul className={style.productList}>
        {isLoading ? (
          <li className={style.loaderContainer}>
            <span>Loading</span>
            <div className={style.spinner}></div>
          </li>
        ) : (
          products.length &&
          products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <li className={style.product}>
                <div>
                  <img src={product.images[product.images.length - 1]} alt="" />
                  <div className={style.productDetails}>
                    <p className={style.productTitle}>{product.title}</p>
                    <p className={style.productDescription}>#{product.id}</p>
                  </div>
                </div>
                <img className={style.arrow} src={arrow} alt="" />
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductsList;
