import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavItemSearch from "../../../components/Navbar/NavItems/NavItemSearch";
import { AppContext, Contexto } from "../../../context/AppContext";
import { getProducts } from "../../../utils/apiConfig";
import ProductsList from "./ProductsList";

//Mock getProducts
jest.mock("../../../utils/apiConfig");

const mockedValue = {
  searchQuery: "",
  setSearchQuery: jest.fn((value) => (mockedValue.searchQuery = value)),
  theme: false,
};

const products = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 1549,
    rating: {
      rate: 4.69,
      count: 354,
    },
    stock: 94,
    category: "smartphones",
    images: [
      "https://dummyjson.com/image/i/products/1/1.jpg",
      "https://dummyjson.com/image/i/products/1/2.jpg",
      "https://dummyjson.com/image/i/products/1/3.jpg",
      "https://dummyjson.com/image/i/products/1/4.jpg",
      "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
    ],
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    rating: {
      rate: 4.44,
      count: 126,
    },
    stock: 34,
    category: "smartphones",
    images: [
      "https://dummyjson.com/image/i/products/2/1.jpg",
      "https://dummyjson.com/image/i/products/2/2.jpg",
      "https://dummyjson.com/image/i/products/2/3.jpg",
      "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
    ],
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    rating: {
      rate: 4.09,
      count: 845,
    },
    stock: 36,
    category: "smartphones",
    images: ["https://dummyjson.com/image/i/products/3/1.jpg"],
  },
];

describe("Testing ProductList", () => {
  beforeEach(async () => {
    getProducts.mockResolvedValue({
      data: products,
    });
    await act(async () => {
      render(
        <BrowserRouter>
          <Contexto>
            <NavItemSearch />
            <ProductsList />
          </Contexto>
        </BrowserRouter>
      );
    });
  });

  it("Testing that list renders correctly", () => {
    const productTitle = screen.getByText(/iPhone X/i);
    const productsListItems = screen.getAllByRole("listitem");
    expect(productsListItems).toHaveLength(products.length);
    expect(productTitle).toBeInTheDocument();
  });

  it("Order products from lower to higher price", () => {
    const select = screen.getByRole("combobox");
    const option = screen.getByRole("option", { name: "Menor precio" });
    userEvent.selectOptions(select, option);

    expect(screen.getAllByRole("option").length).toBe(5);
    expect(option.selected).toBe(true);

    const products2 = [...products];
    products2.sort((product1, product2) => product1.price - product2.price);

    const firstElem = document.querySelectorAll(".productTitle");

    expect(firstElem[0].textContent).toEqual(products2[0].title);
  });

  it("Order products from higher to lower price", () => {
    const select = screen.getByRole("combobox");
    const option = screen.getByRole("option", { name: "Mayor precio" });
    userEvent.selectOptions(select, option);

    expect(screen.getAllByRole("option").length).toBe(5);
    expect(option.selected).toBe(true);

    const products2 = [...products];
    products2.sort((product1, product2) => product2.price - product1.price);

    const firstElem = document.querySelectorAll(".productTitle");

    expect(firstElem[0].textContent).toEqual(products2[0].title);
  });

  it("Order products from higher to lower rate", () => {
    const select = screen.getByRole("combobox");
    const option = screen.getByRole("option", { name: "Más valorados" });
    userEvent.selectOptions(select, option);

    expect(screen.getAllByRole("option").length).toBe(5);
    expect(option.selected).toBe(true);

    const products2 = [...products];
    products2.sort(
      (product1, product2) => product2.rating.rate - product1.rating.rate
    );

    const firstElem = document.querySelectorAll(".productTitle");

    expect(firstElem[0].textContent).toEqual(products2[0].title);
  });

  it("Order products from higher to lower count", () => {
    const select = screen.getByRole("combobox");
    const option = screen.getByRole("option", { name: "Más vendidos" });
    userEvent.selectOptions(select, option);

    expect(screen.getAllByRole("option").length).toBe(5);
    expect(option.selected).toBe(true);

    const products2 = [...products];
    products2.sort(
      (product1, product2) => product2.rating.count - product1.rating.count
    );

    const firstElem = document.querySelectorAll(".productTitle");

    expect(firstElem[0].textContent).toEqual(products2[0].title);
  });

  it("Test search", async () => {
    const searchInput = screen.getByPlaceholderText("Buscar...");
    userEvent.click(searchInput);
    await act(async () => {
      userEvent.type(searchInput, "samsung");
    });
    const firstElem = document.querySelector(".productTitle");
    expect(firstElem.textContent).toMatch(/samsung/i);
  });
});
