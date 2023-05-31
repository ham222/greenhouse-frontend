import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Watering from "src/components/containers/Watering/Watering";

describe("Watering", () => {
  it("renders", () => {
    render(
      <HashRouter>
        <Watering />
      </HashRouter>
    );
  });
});
