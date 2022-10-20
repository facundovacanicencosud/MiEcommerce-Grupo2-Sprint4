import { act, render, screen } from "@testing-library/react";
import NewProductView from "./NewProductView";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createProduct } from "../../../utils/apiConfig";

//jest.mock("axios");

//Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

//Mock createProduct
jest.mock("../../../utils/apiConfig");

//jest.mock("../../../hooks/useForm")

describe("NewProductView Test", () => {
  beforeEach(() => {
    createProduct.mockResolvedValue(() => Promise.resolve({ status: 201 }));
    render(<NewProductView />, { wrapper: BrowserRouter });
  });

  it("Should render the form elements", () => {
    const inputTitle = screen.getByPlaceholderText(/nombre/i);
    const inputDescription = screen.getByPlaceholderText(/descripción/i);
    const inputPrice = screen.getByPlaceholderText(/precio/i);
    const inputRate = screen.getByPlaceholderText(/rate/i);
    const inputCount = screen.getByPlaceholderText(/count/i);
    const inputStock = screen.getByPlaceholderText(/stock/i);
    const inputCategory = screen.getByPlaceholderText(/categoría/i);
    const inputImages = screen.getByPlaceholderText(
      /ingrese URL de la imagen/i
    );
    const buttonSubmit = screen.getByRole("button", {
      name: /guardar producto/i,
    });

    expect(inputTitle).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputPrice).toBeInTheDocument();
    expect(inputRate).toBeInTheDocument();
    expect(inputCount).toBeInTheDocument();
    expect(inputStock).toBeInTheDocument();
    expect(inputCategory).toBeInTheDocument();
    expect(inputImages).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  it("On submit returns an object with the input values", async () => {
    //Test product
    const testProduct = {
      title: "celular",
      description: "esto es un celu",
      price: 150,
      rating: {
        rate: 4.5,
        count: 300,
      },
      stock: "01000",
      category: "smartphones",
      images: ["https://dummyjson.com/image/i/products/1/1.jpg"],
    };

    //Get elements
    const inputTitle = screen.getByPlaceholderText(/nombre/i);
    const inputDescription = screen.getByPlaceholderText(/descripción/i);
    const inputPrice = screen.getByPlaceholderText(/precio/i);
    const inputRate = screen.getByPlaceholderText(/rate/i);
    const inputCount = screen.getByPlaceholderText(/count/i);
    const inputStock = screen.getByPlaceholderText(/stock/i);
    const inputCategory = screen.getByPlaceholderText(/categoría/i);
    const inputImages = screen.getByPlaceholderText(
      /ingrese URL de la imagen/i
    );
    const buttonSubmit = screen.getByRole("button", {
      name: /guardar producto/i,
    });

    //User events
    userEvent.type(inputTitle, "celular");
    userEvent.type(inputDescription, "esto es un celu");
    userEvent.type(inputPrice, "150");
    userEvent.type(inputRate, "4.5");
    userEvent.type(inputCount, "300");
    userEvent.type(inputStock, "1000");
    userEvent.type(inputCategory, "smartphones");
    userEvent.type(
      inputImages,
      "https://dummyjson.com/image/i/products/1/1.jpg"
    );

    const uploadBtn = screen.getByRole("button", { name: "Cargar" });
    userEvent.click(uploadBtn);

    await act(async () => userEvent.click(buttonSubmit));

    expect(createProduct).toHaveBeenCalled();
    expect(createProduct).toHaveBeenCalledWith(testProduct);
  });

  it("Testing + and - buttons in stock input", () => {
    const addBtn = screen.getByRole("button", { name: "+" });
    const substractBtn = screen.getByRole("button", { name: "-" });
    const inputStock = screen.getByPlaceholderText(/stock/i);

    userEvent.click(addBtn);
    userEvent.click(addBtn);
    expect(inputStock).toHaveValue(2);
    userEvent.click(substractBtn);
    expect(inputStock).toHaveValue(1);
  });

  it("Testing Upload button, it should render li element. Delete button should remove it", () => {
    //Arrange
    const inputImages = screen.getByPlaceholderText(
      /ingrese URL de la imagen/i
    );
    userEvent.type(inputImages, "https://dummyjson.com/image/i.jpg");
    const uploadBtn = screen.getByRole("button", { name: "Cargar" });
    const liImage = screen.queryByText("https://dummyjson.com/image/i.jpg...");
    const image = screen.queryByAltText("https://dummyjson.com/image/i.jpg");
    const deleteBtn = screen.queryByRole("button", { name: "Quitar" });

    // Assertion
    expect(liImage).not.toBeInTheDocument();
    expect(image).not.toBeInTheDocument();
    expect(deleteBtn).not.toBeInTheDocument();

    // Act
    userEvent.click(uploadBtn);

    const liImage2 = screen.getByText("https://dummyjson.com/image/i....");
    const image2 = screen.queryByAltText("https://dummyjson.com/image/i.jpg");
    const deleteBtn2 = screen.queryByRole("button", { name: "Quitar" });

    //Assertion
    expect(liImage2).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
    expect(deleteBtn2).toBeInTheDocument();

    userEvent.click(deleteBtn2);

    const liImage3 = screen.queryByText("https://dummyjson.com/image/i.jpg...");
    const image3 = screen.queryByAltText("https://dummyjson.com/image/i.jpg");
    const deleteBtn3 = screen.queryByRole("button", { name: "Quitar" });

    //Assertion
    expect(liImage3).not.toBeInTheDocument();
    expect(image3).not.toBeInTheDocument();
    expect(deleteBtn3).not.toBeInTheDocument();
  });
});
