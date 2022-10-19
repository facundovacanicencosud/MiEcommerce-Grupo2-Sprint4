import { act, render, screen } from "@testing-library/react";
import UsersList from "../UsersList/UsersList";
import { getUsers } from "../../../utils/apiConfig";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

jest.mock("../../../utils/apiConfig");

const mockedValue = {
  searchQuery: "",
  setSearchQuery: jest.fn((value) => (mockedValue.searchQuery = value)),
  theme: false,
};

const allUsers = [
  {
    id: 0,
    isActive: true,
    createdAt: "2022-09-19T17:45:38.422Z",
    lastModified: "2022-09-19T17:45:38.422Z",
    firstname: "Arya",
    lastname: "Stark",
    email: "agirlhasnoname@digitalhouse.com",
    profilePicture:
      "https://live.staticflickr.com/5186/5759378955_3fc5792769_q.jpg",
  },
  {
    id: 1,
    isActive: true,
    createdAt: "2022-09-28T12:49:31.121Z",
    lastModified: "2022-09-28T12:49:31.121Z",
    firstname: "Facu",
    lastname: "Vacani",
    email: "facuvacani@gmail.com",
    profilePicture: "",
  },
  {
    id: 2,
    isActive: true,
    createdAt: "2022-09-28T13:23:23.798Z",
    lastModified: "2022-09-28T13:23:23.798Z",
    firstname: "Pibe",
    lastname: "Pibito",
    email: "pibe@gmail.com",
    profilePicture: "",
  },
  {
    id: 3,
    isActive: true,
    createdAt: "2022-09-28T13:34:07.230Z",
    lastModified: "2022-09-28T13:34:07.230Z",
    firstname: "PibeII",
    lastname: "Pibardo",
    email: "pibeII@gmail.com",
    profilePicture: "",
  },
];

describe("Testing UsersList", () => {
  beforeEach(async () => {
    getUsers.mockResolvedValue({
      data: allUsers,
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <BrowserRouter>
          <AppContext.Provider value={mockedValue}>
            <UsersList />
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
  });

  it("Testing users renders and checking user have correct link path", () => {
    const users = screen.getAllByRole("link");
    const user = screen.getByText("Arya Stark");
    const userLink = screen.getByRole("link", { name: /arya stark/i });
    expect(users).toHaveLength(allUsers.length);
    expect(user).toBeInTheDocument();
    console.log(userLink.id);
    expect(userLink.getAttribute("href")).toBe("/users/0");
  });
});
