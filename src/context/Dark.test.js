import { AppContext } from "./AppContext";
import Sidebar from "../components/Sidebar/Sidebar";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockedValue = {
    theme: false,
    setTheme: jest.fn(()=> mockedValue.theme = !mockedValue.theme),
    activeSidebar: true,
    setActiveSidebar: jest.fn(),
}



describe("Testing dark mode in differents componentes",()=>{
    beforeEach(()=>{
        render(
            <BrowserRouter>
                <AppContext.Provider value={mockedValue}>
                    <Sidebar />
                </AppContext.Provider>
            </BrowserRouter>
        );

    });

    test("There is a dark mode button and it's false", ()=>{
        const inputChangeMode = screen.queryByRole("checkbox");
        expect(inputChangeMode).toBeInTheDocument();
        expect(inputChangeMode.checked).toBeFalsy();
    })
    test("User clicked the button and this change the mode", ()=>{
        const inputChangeMode = screen.queryByRole("checkbox");
        const sidebar = document.querySelector("aside");
        fireEvent.change(inputChangeMode, {target: {checked:true}});
        expect(inputChangeMode.checked).toBeTruthy();
        // expect(mockedValue.theme).toBeTruthy();

    })
});