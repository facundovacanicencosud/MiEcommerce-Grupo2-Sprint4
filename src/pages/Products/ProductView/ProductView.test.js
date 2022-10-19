import { act, render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { putProduct, getProduct } from "../../../utils/apiConfig";
import ProductView from "./ProductView";
import { AppContext } from "../../../context/AppContext";

const mockedNavigate = jest.fn();
//Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

//Mock fetchProduct
jest.mock("../../../utils/apiConfig");

const mockedValue = {
  theme: false,
};

const product = {
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
};

//Test product
const testProduct = {
  id: 2,
  title: "celular",
  description: "esto es un celu",
  price: 150,
  stock: 1000,
  images: [
    "https://dummyjson.com/image/i/products/2/1.jpg",
    "https://dummyjson.com/image/i/products/2/2.jpg",
    "https://dummyjson.com/image/i/products/2/3.jpg",
    "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
    "https://dummyjson.com/image/i/products/1/1.jpg",
  ],
};

describe("NewProductView Test", () => {
  beforeEach(async () => {
    getProduct.mockResolvedValue({ data: product });
    putProduct.mockResolvedValue({ data: testProduct });
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={mockedValue}>
            <ProductView />
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
  });

  it("Should render the form elements", () => {
    const inputTitle = screen.getByPlaceholderText(/titulo/i);
    const inputDescription = screen.getByPlaceholderText(/descripcion/i);
    const inputPrice = screen.getByPlaceholderText(/precio/i);
    const inputStock = screen.getByPlaceholderText(/stock/i);
    const inputCategory = screen.getByPlaceholderText(/select/i);
    const inputImages = screen.getByPlaceholderText(
      /ingrese URL de la imagen/i
    );
    const buttonSubmit = screen.getByRole("button", {
      name: /guardar/i,
    });
    const buttonCancel = screen.getByRole("button", {
      name: /cancelar/i,
    });

    expect(inputTitle).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputPrice).toBeInTheDocument();
    expect(inputStock).toBeInTheDocument();
    expect(inputCategory).toBeInTheDocument();
    expect(inputImages).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
  });

  it("On submit returns an object with the input values", async () => {
    //Get elements
    const inputTitle = screen.getByPlaceholderText(/titulo/i);
    const inputDescription = screen.getByPlaceholderText(/descripcion/i);
    const inputPrice = screen.getByPlaceholderText(/precio/i);
    const inputStock = screen.getByPlaceholderText(/stock/i);
    const inputImages = screen.getByPlaceholderText(
      /ingrese URL de la imagen/i
    );
    const buttonSubmit = screen.getByRole("button", {
      name: /guardar/i,
    });

    //User events
    userEvent.clear(inputTitle);
    userEvent.type(inputTitle, "celular");
    userEvent.clear(inputDescription);
    userEvent.type(inputDescription, "esto es un celu");
    userEvent.clear(inputPrice);
    userEvent.type(inputPrice, "150");
    userEvent.clear(inputStock);
    userEvent.type(inputStock, "1000");
    userEvent.type(
      inputImages,
      "https://dummyjson.com/image/i/products/1/1.jpg"
    );

    const uploadBtn = screen.getByAltText("Agregar Imagen");
    userEvent.click(uploadBtn);

    await act(async () => userEvent.click(buttonSubmit));

    expect(putProduct).toHaveBeenCalled();
    expect(putProduct).toHaveBeenCalledWith(testProduct);
  });

  it("Testing + and - buttons in stock input", () => {
    const addBtn = screen.getByRole("button", { name: "+" });
    const substractBtn = screen.getByRole("button", { name: "-" });
    const inputStock = screen.getByPlaceholderText(/stock/i);
    userEvent.click(addBtn);
    userEvent.click(addBtn);
    let testStock = product.stock;
    expect(inputStock).toHaveValue((testStock += 2));
    userEvent.click(substractBtn);
    expect(inputStock).toHaveValue((testStock -= 1));
  });

  it("Testing Upload button, it should render li element.", () => {
    //Arrange
    const inputImages = screen.getByPlaceholderText(
      /ingrese URL de la imagen/i
    );
    userEvent.type(inputImages, "https://dummyjson.com/image/i.jpg");
    const uploadBtn = screen.getByAltText("Agregar Imagen");
    const imagesList = screen.queryAllByRole("listitem");

    //Assertion
    expect(imagesList).toHaveLength(4);

    // Act
    userEvent.click(uploadBtn);

    const imagesList2 = screen.queryAllByRole("listitem");

    //Assertion
    expect(imagesList2).toHaveLength(5);
  });

  it("Testing delete button should remove it", () => {
    //Arrange
    const imageLi = screen.queryAllByRole("listitem").at(0);
    const imagesList = screen.queryAllByRole("listitem");

    const deleteBtn = screen
      .queryAllByRole("listitem")
      .at(0)
      .querySelector("button");

    //Assertion
    expect(imageLi).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(imagesList).toHaveLength(4);

    // Act
    userEvent.click(deleteBtn);

    //Assertion
    expect(imageLi).not.toBeInTheDocument();
    expect(deleteBtn).not.toBeInTheDocument();
    const imagesList2 = screen.queryAllByRole("listitem");
    expect(imagesList2).toHaveLength(3);
  });
});
