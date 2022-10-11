import React from "react";
import packageLogo from "../../assets/package-variant-closed.svg";
import storeLogo from "../../assets/store.svg";
import Category from "./Category/Category";

const Categorys = ({ products }) => {
  const categorys = [
    {
      title: "Products",
      num: products.length,
      link1: "/products",
      link2: "/products/new",
      logo: packageLogo,
    },
    {
      title: "Tiendas",
      num: 10,
      link1: "/store",
      link2: "/store/new",
      logo: storeLogo,
    },
  ];
  return (
    <>
      {categorys.map((elem) => (
        <Category {...elem} />
      ))}
    </>
  );
};

export default Categorys;
