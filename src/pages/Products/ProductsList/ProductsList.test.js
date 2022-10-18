import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { getProducts } from "../../../utils/apiConfig";
import ProductsList from "./ProductsList";

//Mock getProducts
jest.mock("../../../utils/apiConfig");

describe("Testing ProductList", () => {
  beforeEach(() => {
    getProducts.mockResolvedValue(() =>
      Promise.resolve([
        {
          id: 1,
          title: "iPhone 9",
          description: "An apple mobile which is nothing like apple",
          price: 549,
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
      ])
    );
    render(<ProductsList />, { wrapper: BrowserRouter });
  });

  it("Testing that list renders correctly", () => {
    screen.getByText(/iPhone X/i);
    screen.debug();
  });
});
