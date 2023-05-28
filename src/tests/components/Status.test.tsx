import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Status from "src/components/containers/Status/Status";
import axios from "axios";

jest.mock("react-apexcharts", () =>
  jest.fn(() => {
    return null;
  })
);
jest.mock("apexcharts", () => ({
  exec: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve("uri");
    });
  }),
}));

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Status", () => {
  window.ResizeObserver = ResizeObserver;

  mockedAxios.get.mockImplementation(() => {
    throw new Error();
  });
  it("renders", () => {
    render(
      <HashRouter>
        <Status />
      </HashRouter>
    );
  });
});
