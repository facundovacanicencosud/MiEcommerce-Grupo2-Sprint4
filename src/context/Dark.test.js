import { Contexto } from "./AppContext";
import Sidebar from "../components/Sidebar/Sidebar";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Testing dark mode in differents componentes", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Contexto>
          <Sidebar />
        </Contexto>
      </BrowserRouter>
    );
  });

  test("There is a dark mode button and it's false", () => {
    const inputChangeMode = screen.queryByRole("checkbox");
    expect(inputChangeMode).toBeInTheDocument();
    expect(inputChangeMode.checked).toBeFalsy();
  });

  test("User clicked the button and this change the mode", () => {
    const inputChangeMode = screen.queryByRole("checkbox");
    const sidebar = document.querySelector("aside");

    expect(inputChangeMode.checked).toBeFalsy();
    expect(sidebar.className).not.toMatch("dark-background");

    userEvent.click(inputChangeMode);

    expect(inputChangeMode.checked).toBeTruthy();
    expect(sidebar.className).toMatch("dark-background");
  });
});
