import userEvent from "@testing-library/user-event";
import ProductView from "./ProductView";
import { act, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { deleteProduct, getProduct } from "../../../utils/apiConfig";
import Navbar from "../../../components/Navbar/Navbar";

/* import ProductsList from "../ProductsList/ProductsList"; */


jest.mock("../../../utils/apiConfig");

const mockedValue = {
  searchQuery: "",
  setSearchQuery: jest.fn((value) => (mockedValue.searchQuery = value)),
  theme: false,
  deleting: true,
  setDeleting: jest.fn()
};

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      id: '9'
    }),
    useNavigate: () => jest.fn(),

  }
});
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

describe("Testing DeleteButton", () => {
  beforeEach(async () => {
    await act(async () => {
      getProduct.mockResolvedValue({
        data: producto,
      });
      deleteProduct.mockResolvedValue({
        status: 200,
      });
      render(
        <MemoryRouter initialEntries={['/products/9']}>
          <AppContext.Provider value={mockedValue}>
            <Navbar />
            <ProductView />
            {/* <ProductsList /> */}
          </AppContext.Provider>
        </MemoryRouter>
      );
    });
  });

  it('deletes the product page when clicked', async () => {

    // const deleteBtn = await screen.findByRole('button', { name: /eliminar/i })

    // act( () => userEvent.click(deleteBtn))
    // console.log(deleteProduct.mock)
    const deleteBtn2 = screen.queryAllByRole('button', { name: /eliminar/i }).at(1)
    act(() => userEvent.click(deleteBtn2))

    expect(deleteProduct).toHaveBeenCalled();
    expect(deleteProduct).toHaveBeenCalledWith(9);
  })
})
