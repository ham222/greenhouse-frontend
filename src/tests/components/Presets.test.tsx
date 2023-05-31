import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Presets from "src/components/containers/Presets/Presets";

describe("Presets", () => {
  it("renders", () => {
    render(
      <HashRouter>
        <Presets />
      </HashRouter>
    );
  });

  it("renders on small screens", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 400,
      writable: true,
    });

    render(
      <HashRouter>
        <Presets />
      </HashRouter>
    );
  });

  it("renders without crashing", async () => {
    render(
      <HashRouter>
        <Presets />
      </HashRouter>
    );
  });
});
