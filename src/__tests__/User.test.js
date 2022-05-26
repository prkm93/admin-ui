import "@testing-library/jest-dom/extend-expect";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { config } from "../config/constant";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

const userResponse = [
    {
        "id": "1",
        "name": "Aaron Miles",
        "email": "aaron@mailinator.com",
        "role": "member"
    },
    {
        "id": "2",
        "name": "Aishwarya Naik",
        "email": "aishwarya@mailinator.com",
        "role": "member"
    },
    {
        "id": "3",
        "name": "Arvind Kumar",
        "email": "arvind@mailinator.com",
        "role": "admin"
    },
    {
        "id": "4",
        "name": "Caterina Binotto",
        "email": "caterina@mailinator.com",
        "role": "member"
    }
];

mock.onGet(`${config.url}`).reply(200, userResponse);

jest.useFakeTimers();

describe("User List Page", () => {
    
    const AppDOMTree = () => {
        return <App/>    
    }

    beforeEach(async () => {
        jest.clearAllMocks();

        await act(async () => {
            render(AppDOMTree());
        });
    });

    it("should have search box for searching users",  () => {
        const searchInput = screen.getByPlaceholderText(/search/i);
        expect(searchInput).toBeInTheDocument();
    });

    it("should make GET request for fetching user lists", () => {
        
        const getUserListCall = mock.history.get.find(
            (req) => req.url === `${config.url}`
        );

        expect(getUserListCall).toBeTruthy();
    });

    it("should render user lists table", () =>  {
        
        const userInputs = screen.queryAllByRole("textbox");
        
        // since 4 users and 3 input elements for each users, so total 4*3 = 12 input elements to be rendered + 1 input for searchbox
        expect(userInputs.length-1).toEqual(12);
    });

    it("should render values in userlist in DOM", () => {
        expect(screen.getByDisplayValue(/aaron miles/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/aaron@mailinator.com/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/admin/i)).toBeInTheDocument();
    });

    it("should have delete button", () =>  {
        const btn = screen.getByRole('button', { name: /delete selected/i});
        expect(btn).toBeInTheDocument();
    });

    it("should have pagination buttons", () => {
        const btn = screen.getByRole('button', { name: /\d/i}); // testing page buttons
        expect(btn).toBeInTheDocument();
    });
});