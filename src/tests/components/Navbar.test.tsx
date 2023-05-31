import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Navbar from "src/components/Navbar";
import SessionHandler from "./utils/SessionHandler";
import { SessionProvider } from "src/components/SessionProvider";

describe("Navbar", () => {
  it("renders", () => {
    render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );
  });

  it("renders log in when logged out", () => {
    render(
      <HashRouter>
        <Navbar />
      </HashRouter>
    );

    expect(screen.getByText("Log in")).toBeInTheDocument();
  });
  it("renders log out when logged in", () => {
    SessionHandler.login("token");

    render(
      <HashRouter>
        <SessionProvider>
          <Navbar />
        </SessionProvider>
      </HashRouter>
    );

    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("logs out when clicked to log out", () => {
    SessionHandler.login("token");

    render(
      <HashRouter>
        <SessionProvider>
          <Navbar />
        </SessionProvider>
      </HashRouter>
    );

    fireEvent.click(screen.getByText("Log out"));

    expect(SessionHandler.isLoggedIn()).toBeFalsy();
  });

  it("does not log in when clicked to log in", () => {
    render(
      <HashRouter>
        <SessionProvider>
          <Navbar />
        </SessionProvider>
      </HashRouter>
    );

    fireEvent.click(screen.getByText("Log in"));

    expect(SessionHandler.isLoggedIn()).toBeFalsy();
  });
});
