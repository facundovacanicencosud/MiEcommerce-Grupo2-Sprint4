import Navbar from "./Navbar";
import {BrowserRouter, useNavigate} from "react-router-dom";
import { act, render, screen } from "@testing-library/react";
import {AppContext} from "../../context/AppContext";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

const mockedValue = {
    theme: false,
    setActiveSidebar: ()=> mockedValue.activeSidebar = !mockedValue.activeSidebar,
    activeSidebar: false
  };

describe("Test navbar", ()=>{
    beforeEach(()=>{
        act(()=>render(
            <BrowserRouter>
                <AppContext.Provider value={mockedValue}>
                    <Navbar />
                </AppContext.Provider>
            </BrowserRouter>
        ))
    })
    it("Render navbar in home", ()=>{
        const navBar = screen.queryByRole("navigation");
        let nameUser = navBar.querySelector("span");
        expect(nameUser.textContent).toBe("¡Hola Olivia!");
    })

    test("Click on button menu", ()=>{
        const navBar = screen.queryByRole("navigation");
        const buttonMenu = navBar.querySelector("button");
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
})