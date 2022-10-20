import Navbar from "./Navbar";
import { BrowserRouter, MemoryRouter, useParams } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import { AppContext } from "../../context/AppContext";
import userEvent from "@testing-library/user-event";

const mockedValue = {
    theme: false,
    setActiveSidebar: () => mockedValue.activeSidebar = !mockedValue.activeSidebar,
    activeSidebar: false,
    searchQuery: "",
    setSearchQuery: (value) => mockedValue.searchQuery = value
};

jest.mock('react-router-dom', () => {

    const originalModule = jest.requireActual('react-router-dom')

    return {
        esModule: true,
        ...originalModule,
        useParams: jest.fn()
    }

})

describe("Test navbar in home view", () => {
    beforeEach(async () => {
        useParams.mockReturnValue({ id: undefined })

        await act(() => render(
            <BrowserRouter>
                <AppContext.Provider value={mockedValue}>
                    <Navbar />
                </AppContext.Provider>
            </BrowserRouter>
        ))
    })
    it("Render navbar in home", () => {
        const navBar = screen.queryByRole("navigation");
        let nameUser = navBar.querySelector("span");
        //Seleccionamos el icono svg de flecha, que solo aparecerá cuando existe un id en el parametro
        let iconArrowProduct = navBar.querySelector(".arrow-nav-item-left");
        expect(navBar).toBeInTheDocument()
        //esperamos que no exista en el documento, ya que no estamos con un id en el parametro
        expect(iconArrowProduct).not.toBeInTheDocument();
        expect(nameUser.textContent).toBe("¡Hola Olivia!");
    })

    test("Click on button menu", () => {
        const navBar = screen.queryByRole("navigation");
        const buttonMenu = navBar.querySelector("button");
        expect(buttonMenu).toBeInTheDocument();
        userEvent.click(buttonMenu);
        expect(mockedValue.activeSidebar).toBeTruthy();
        userEvent.click(buttonMenu);
        expect(mockedValue.activeSidebar).toBeFalsy();
    })
    // it("Render navbar in products", ()=>{
    //     let navigate = useNavigate();
    //     navigate("/products");
    //     const navBar = screen.queryByRole("navigation");
    //     let nameUser = navBar.querySelector("span");
    //     expect(nameUser.textContent).toBe("Productos");
    // })

    // it("Click on search button to expland", ()=>{
    //     const navBar = screen.queryByRole("navigation");
    //     const buttonSearchMobile = navBar.querySelector("button");
    // })
})

describe("Test navbar in products page", () => {

    beforeEach(async () => {
        useParams.mockReturnValue({ id: undefined })

        await act(() => render(
            <MemoryRouter initialEntries={["/products"]}>
                <AppContext.Provider value={mockedValue}>
                    <Navbar />
                </AppContext.Provider>
            </MemoryRouter>
        ))
    })

    it("Render navbar in products", () => {
        const navBar = screen.queryByRole("navigation");
        let nameUser = navBar.querySelector("span");
        //Seleccionamos el icono svg de flecha, que solo aparecerá cuando existe un id en el parametro
        let iconArrowProduct = navBar.querySelector(".arrow-nav-item-left");
        //esperamos que no exista en el documento, ya que no estamos con un id en el parametro
        expect(iconArrowProduct).not.toBeInTheDocument();
        expect(nameUser.textContent).toBe("productos");

    })

    it("Click on search button to expaind", () => {
        const navBar = screen.queryByRole("navigation");
        const buttonSearchMobile = navBar.querySelector(".search_form_div button");
        let nameUser = navBar.querySelector("span");
        const inputSearch = screen.queryByPlaceholderText("Buscar...");
        expect(buttonSearchMobile).toBeInTheDocument();
        expect(inputSearch).toBeInTheDocument();
        expect(nameUser.textContent).toBe("productos")
        expect(inputSearch.classList[1]).toBe("false")
        userEvent.click(buttonSearchMobile);
        expect(inputSearch.classList[1]).toBe("search_input_mobile");
    })

    test("Usear search on input search with her is typeing", () => {
        const inputSearch = screen.queryByPlaceholderText("Buscar...");
        userEvent.type(inputSearch, "Iphone");
        expect(inputSearch.value).toBe("Iphone");
    })
})
describe("Test navbar in product view", () => {


    beforeEach(async () => {

        useParams.mockReturnValue({ id: 1 })

        await act(() => render(
            <MemoryRouter initialEntries={["/products/1"]}>
                <AppContext.Provider value={mockedValue}>
                    <Navbar />
                </AppContext.Provider>
            </MemoryRouter>
        ))
    })

    it("Render navbar in product view", () => {
        const navBar = screen.queryByRole("navigation");
        //Seleccionamos el icono svg de flecha, que solo aparecerá cuando existe un id en el parametro
        let iconArrowProduct = navBar.querySelector(".arrow-nav-item-left");
        let spanId = navBar.querySelector("div > span");
        //esperamos que si exista en el documento, ya que tenemos un parametro id
        expect(iconArrowProduct).toBeInTheDocument();
        expect(spanId.textContent).toBe("#" + useParams().id)
    })
    it("There is a delete button", () => {
        const navBar = screen.queryByRole("navigation");
        let deleteButton = navBar.querySelector(".navbar_right_button");
        expect(deleteButton).toBeInTheDocument();
    })

})
describe("Test navbar in product new", () => {


    beforeEach(async () => {

        useParams.mockReturnValue({ id: undefined })

        await act(() => render(
            <MemoryRouter initialEntries={["/products/new"]}>
                <AppContext.Provider value={mockedValue}>
                    <Navbar />
                </AppContext.Provider>
            </MemoryRouter>
        ))
    })

    it("Render navbar in product new", () => {
        const navBar = screen.queryByRole("navigation");
        //Seleccionamos el icono svg de flecha, que solo aparecerá cuando existe un id en el parametro
        let iconArrowProduct = navBar.querySelector(".arrow-nav-item-left");
        let spanId = navBar.querySelector("div > span");
        //esperamos que si exista en el documento, ya que tenemos un parametro id
        expect(iconArrowProduct).toBeInTheDocument();
        expect(spanId.textContent).toBe("nuevo producto")
    })

})


describe("Test navbar in users page", () => {

    beforeEach(async () => {
        useParams.mockReturnValue({ id: undefined })

        await act(() => render(
            <MemoryRouter initialEntries={["/users"]}>
                <AppContext.Provider value={mockedValue}>
                    <Navbar />
                </AppContext.Provider>
            </MemoryRouter>
        ))
    })

    it("Render navbar in users", () => {
        const navBar = screen.queryByRole("navigation");
        let nameUser = navBar.querySelector("span");
        //Seleccionamos el icono svg de flecha, que solo aparecerá cuando existe un id en el parametro
        let iconArrowProduct = navBar.querySelector(".arrow-nav-item-left");
        //esperamos que no exista en el documento, ya que no estamos con un id en el parametro
        expect(iconArrowProduct).not.toBeInTheDocument();
        expect(nameUser.textContent).toBe("usuarios");

    })

    it("Click on search button to expaind", () => {
        const navBar = screen.queryByRole("navigation");
        const buttonSearchMobile = navBar.querySelector(".search_form_div button");
        let nameUser = navBar.querySelector("span");
        const inputSearch = screen.queryByPlaceholderText("Buscar...");
        expect(buttonSearchMobile).toBeInTheDocument();
        expect(inputSearch).toBeInTheDocument();
        expect(nameUser.textContent).toBe("usuarios")
        expect(inputSearch.classList[1]).toBe("false")
        userEvent.click(buttonSearchMobile);
        expect(inputSearch.classList[1]).toBe("search_input_mobile");
    })

    test("Usear search on input search with her is typeing an user", () => {
        const inputSearch = screen.queryByPlaceholderText("Buscar...");
        userEvent.type(inputSearch, "Arya");
        expect(inputSearch.value).toBe("Arya");
    })
})