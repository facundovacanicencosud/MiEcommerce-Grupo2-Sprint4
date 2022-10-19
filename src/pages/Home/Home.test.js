import { render, act, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { getProducts } from "../../utils/apiConfig";
import { AppContext } from "../../context/AppContext";


jest.mock("../../utils/apiConfig");

const mockedValue = {
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

const categorysObjects = [
  {
    title: "Products",
    num: products.length,
    link1: "/products",
    link2: "/products/new",
    logo: "/packageLogo",
  },
  {
    title: "Tiendas",
    num: 10,
    link1: "/store",
    link2: "/store/new",
    logo: "/storeLogo",
  },
];


describe("Testing Home page when there are categorys", () => {
  beforeEach(async () => {
    getProducts.mockResolvedValue({
      data: products
    });
    await act(() => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={mockedValue}>
            <Home />
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
  });


  it("First render in Home", () => {
    const categorys = screen.queryAllByRole("listitem");
    categorys.forEach((elem, index) => {
      let span = elem.querySelector("span");
      expect(parseInt(span.textContent)).toEqual(categorysObjects[index].num);
    });
  });

  it("Render Home with the light mode active", () => {
    const categorys = screen.queryAllByRole("listitem");
    categorys.forEach((elem) => {
      expect(elem.classList[1]).toEqual(undefined);
    });
  });

  it("Exist links in categorys", () => {
    const categorys = screen.queryAllByRole("listitem");
    categorys.forEach((elem, index) => {
      let anchor = elem.querySelector("a");
      expect(anchor.href).toEqual("http://localhost" + categorysObjects[index].link1);
      expect(anchor.textContent).toBe("Ver Listado");
      let anchor2 = elem.querySelector("a:last-child");
      expect(anchor2.href).toEqual("http://localhost" + categorysObjects[index].link2);
      expect(anchor2.textContent).toBe("Agregar Producto");
    });
  });
});


describe("Testing Home when initialize with dark mode theme", ()=>{

  beforeEach(async () => {
    mockedValue.theme = true;
    getProducts.mockResolvedValue({
      data: products
    });
    await act(() => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={mockedValue}>
            <Home />
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
  });
  it("Render Home with the dark mode active", () => {
    const categorys = screen.queryAllByRole("listitem");
    categorys.forEach((elem) => {
      expect(elem.classList[1]).toEqual("category_dark");
    });
  });
})