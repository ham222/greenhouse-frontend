import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Login from "src/components/containers/Login/Login";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Login", () => {
  it("renders", () => {
    render(
      <HashRouter>
        <Login />
      </HashRouter>
    );
  });

  it("updates values", async () => {
    render(
      <HashRouter>
        <Login />
      </HashRouter>
    );

    const emailInput = screen.getByRole("textbox", { name: /email address/i });
    const pwdInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "email@email" } });
    fireEvent.change(pwdInput, { target: { value: "123456" } });
  });

  it("submits when fields are correct", async () => {
    mockedAxios.post.mockResolvedValue("token");

    render(
      <HashRouter>
        <Login />
      </HashRouter>
    );

    const emailInput = screen.getByRole("textbox", { name: /email address/i });
    const pwdInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "email@email" } });
    fireEvent.change(pwdInput, { target: { value: "123456" } });

    fireEvent.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );
  });

  it("shows an error when failed", async () => {
    mockedAxios.post.mockImplementation(() => {
      throw new Error("incorrect login");
    });

    render(
      <HashRouter>
        <Login />
      </HashRouter>
    );

    const emailInput = screen.getByRole("textbox", { name: /email address/i });
    const pwdInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "email@email" } });
    fireEvent.change(pwdInput, { target: { value: "123456" } });

    fireEvent.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    expect(
      screen.getByText("Login failed: incorrect login")
    ).toBeInTheDocument();
  });
});
