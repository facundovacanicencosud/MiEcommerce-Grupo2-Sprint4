// app.test.js
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import App from "./App";
import { getProducts, getUsers } from "./utils/apiConfig";

//Mock getProducts
jest.mock("./utils/apiConfig");

describe("Testing router", () => {
  beforeEach(async () => {
    getProducts.mockResolvedValue({
      data: [],
    });
    getUsers.mockResolvedValue({
      data: [],
    });
  });
  test("full app rendering/navigating", async () => {
    render(<App />, { wrapper: BrowserRouter });

    // verify page content for default route
    expect(screen.getByText(/hola olivia/i)).toBeInTheDocument();

    //Select and click on products page link
    const productLink = screen.getByText(/productos/i);
    await act(async () => userEvent.click(productLink));

    // verify page content for expected route after navigating
    expect(
      screen.getByText(/no se encontraron productos/i)
    ).toBeInTheDocument();

    //Select and click on users page link
    const userLink = screen.getByText(/usuarios/i);
    await act(async () => userEvent.click(userLink));

    // verify page content for expected route after navigating
    expect(screen.getByText(/no se encontraron usuarios/i)).toBeInTheDocument();

    //Select and click on users page link
    const storesLink = screen.getByText(/tiendas/i);
    await act(async () => userEvent.click(storesLink));

    // verify page content for expected route after navigating
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  test("landing on a bad page", () => {
    const badRoute = "/some/bad/route";

    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    // verify navigation to "no match" route
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
