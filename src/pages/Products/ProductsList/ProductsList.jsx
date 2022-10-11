import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../utils/apiConfig";
import style from "./productsList.module.css";
import arrow from "../../../assets/chevron-right (1).svg";
import { AppContext } from "../../../context/AppContext";
import FilterOptions from "../../../components/FilterOptions/FilterOptions";
import noImage from "../../../assets/no-image.svg";

const ProductsList = () => {
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery, theme } = useContext(AppContext);
  const [selectedFilter, setSelectedFilter] = useState("");
  const fetchProducts = async () => {
    const { data } = await getProducts();
    setProducts(data);
  };

  //Fetch all products
  useEffect(() => {
    try {
      fetchProducts();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Search products
  useEffect(() => {
    const onSearch = async (searchQuery) => {
      try {
        const { data: products } = await getProducts();
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    };
    onSearch(searchQuery);
  }, [searchQuery]);

  //Order products
  useEffect(() => {
    if (selectedFilter) {
      const filteredProducts = [...products].sort((a, b) => {
        if (selectedFilter === "menorPrecio") return a.price - b.price;
        if (selectedFilter === "mayorPrecio") return b.price - a.price;
        if (selectedFilter === "masValorados")
          return b.rating.rate - a.rating.rate;
        if (selectedFilter === "masVendidos")
          return b.rating.count - a.rating.count;
        return null;
      });
      setProducts(filteredProducts);
    } else {
      try {
        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line
  }, [selectedFilter]);

  return (
    <div className="lists-container">
      {products.length && !isLoading ? (
        <>
          <div className={style.productsListHeader}>
            <span>{products.length} productos |</span>
            <div className={style.filterContainer}>
              <span>Ordenar por:</span>
              <FilterOptions
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>
          </div>
          <ul className={style.productList}>
            {isLoading ? (
              <li className={style.loaderContainer}>
                <span>Loading</span>
                <div className={style.spinner}></div>
              </li>
            ) : (
              products.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <li
                    className={`${style.product} ${
                      theme ? style.product_dark : ""
                    }`}
                  >
                    <div>
                      <img
                        src={
                          product.images.length > 0
                            ? product.images[product.images.length - 1]
                            : noImage
                        }
                        alt={`${product.title}-picture`}
                      />
                      <div className={style.productDetails}>
                        <p className={style.productTitle}>{product.title}</p>
                        <p className={style.productDescription}>
                          #{product.id}
                        </p>
                      </div>
                    </div>
                    <img
                      className={`${style.arrow} ${
                        theme ? style.arrow_dark : ""
                      }`}
                      src={arrow}
                      alt=""
                    />
                  </li>
                </Link>
              ))
            )}
          </ul>
        </>
      ) : (
        <div className={style.noMatch}>
          <p>No se encontraron productos</p>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
