import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Status from "src/components/containers/Status/Status";
import axios, { AxiosError } from "axios";
import { useGet } from "src/hooks/useGet";
import { useMeasurements } from "src/hooks/useMeasurements";
import { displayErrorToast } from "src/utils/displayToast";
import Preset from "src/domain/Preset";

jest.mock("src/hooks/useGet", () => ({
  __esModule: true,
  useGet: jest.fn(),
}));

jest.mock("src/hooks/useMeasurements", () => ({
  __esModule: true,
  useMeasurements: jest.fn(),
}));

jest.mock("src/utils/displayToast", () => ({
  __esModule: true,
  displayErrorToast: jest.fn(),
}));

const mockUseGet = useGet as jest.MockedFunction<typeof useGet>;
const mockUseMeasurements = useMeasurements as jest.MockedFunction<
  typeof useMeasurements
>;
const mockDisplayToast = displayErrorToast as jest.MockedFunction<
  typeof displayErrorToast
>;

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
  afterEach(() => {
    jest.resetAllMocks();
  });

  window.ResizeObserver = ResizeObserver;

  mockedAxios.get.mockImplementation(() => {
    throw new Error();
  });

  it("renders correctly when all API requests are successful", async () => {
    mockUseGet.mockReturnValue({
      data: new Preset("Preset 1", []),
      error: null,
      loading: false,
    });
    mockUseMeasurements.mockReturnValue({
      data: [],
      error: null,
      loading: false,
    });

    render(
      <HashRouter>
        <Status />
      </HashRouter>
    );

    // Verify that certain texts are displayed
    expect(screen.getByText("Current preset: Preset 1")).toBeInTheDocument();
    // More assertions can be added here.
  });

  it("handles errors correctly", async () => {
    const error = {
      message: "Custom error message",
      config: {
        method: "get",
        baseURL: "https://example.com/api",
        url: "/data",
        headers: {
          "Content-Type": "application/json",
        },
      },
      code: "SOME_ERROR_CODE",
      request: {}, // Empty request object
      response: {
        // Sample response object
        status: 404,
        statusText: "Not Found",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          error: "Resource not found",
        },
      },
    } as AxiosError;

    mockUseGet.mockReturnValue({
      data: null,
      error: error,
      loading: false,
    });
    mockUseMeasurements.mockReturnValue({
      data: [],
      error: error,
      loading: false,
    });

    render(
      <HashRouter>
        <Status />
      </HashRouter>
    );

    // Verify that displayToast is called with the correct message
    expect(mockDisplayToast).toHaveBeenCalledWith("Custom error message");
  });
});
