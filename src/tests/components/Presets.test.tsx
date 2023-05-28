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
});
