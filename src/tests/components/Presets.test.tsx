import { fireEvent, render, screen } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { HashRouter } from "react-router-dom";
import Presets from "src/components/containers/Presets/Presets";
import Preset from "src/domain/Preset";
import Threshold from "src/domain/Threshold";

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
