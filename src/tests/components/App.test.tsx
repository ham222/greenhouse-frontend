import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import App from "src/App";

describe("App", () => {
  it("renders", () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
  });
});
