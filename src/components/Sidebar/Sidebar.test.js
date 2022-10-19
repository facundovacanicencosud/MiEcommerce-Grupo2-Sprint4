import { act, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Navbar from "../Navbar/Navbar";
import Sidebar from "./Sidebar";

const mockedValue = {
  activeSidebar: false,
  setActiveSidebar: jest.fn(),
  setTheme: jest.fn(),
  theme: false,
};

describe("Test Sidebar", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={mockedValue}>
            <Navbar />
            <Sidebar />
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
  });

  /*  it("Sidebar hides when screen width is less than 1024px", () => {
    window = Object.assign(window, { innerWidth: 500 });
    expect(window.innerWidth).toBe(500);
    const sidebar = document.querySelector("aside");
    expect(sidebar).toHaveStyle({ left: -296 });
  });

  it("Sidebar hides when screen width is more than 1024px", () => {
    window = Object.assign(window, { innerWidth: 1025 });
    expect(window.innerWidth).toBe(1025);
    const sidebar = document.querySelector("aside");
    expect(sidebar).toHaveStyle({ left: 0 });
  }); */

  it("Test that sidebar appears when click", () => {
    const menuButton = document.querySelector("button");
    const sidebar = document.querySelector("aside");
  });
});
