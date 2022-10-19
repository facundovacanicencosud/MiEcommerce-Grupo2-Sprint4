import userEvent from "@testing-library/user-event";
import ProductView from "./ProductView";
import { act, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavItemSearch from "../../../components/Navbar/NavItems/NavItemSearch";
import { AppContext } from "../../../context/AppContext";
import { deleteProduct } from "../../../utils/apiConfig";

/* import ProductsList from "../ProductsList/ProductsList"; */


jest.mock("../../../utils/apiConfig");

const mockedValue = {
    searchQuery: "",
    setSearchQuery: jest.fn((value) => (mockedValue.searchQuery = value)),
    theme: false,
  };

const producto =
    {
        "id": 9,
        "title": "Compu Geimer",
        "description": "sdasdasd",
        "price": 1000,
        "rating": {
            "rate": 4.54,
            "count": 274
        },
        "stock": 50,
        "category": "Pepito store",
        "images": [
            "https://unsplash.com/photos/rNYCrcjUnOf"
        ]
    }

describe("Testing ProductList", () => {
    beforeEach(async () => {
      deleteProduct.mockResolvedValue({ data: producto });
      await act(async () => {
        render(
          <BrowserRouter>
            <AppContext.Provider value={mockedValue}>
              <NavItemSearch />
              <ProductView />
            </AppContext.Provider>
          </BrowserRouter>
        );
      });
    });

    it('deletes the product page when clicked', async () => {
      render(<ProductView />)
      await screen.findByText(/Compu Geimer/i)
      const deleteBtn = await screen.findByText(/Eliminar/i)

      userEvent.click(deleteBtn)
      expect(screen.queryByText(/Compu Geimer/i)).not.toBeInTheDocument()
      
      /* it('removes the product from product list', async () => {
        render(<ProductsList />)
        await screen.findByRole('p', { text: /Compu Geimer/i })
        expect(screen.queryByText(/Compue Geimer/i)).not.toBeInTheDocument()
      }) */
    })
    
  });