import { render, fireEvent, screen } from "@testing-library/react";
import ThresholdBox from "src/components/containers/Presets/ThresholdBox";
import Threshold from "src/domain/Threshold";
import capitalize from "src/utils/capitalize";

describe("ThresholdBox", () => {
  const threshold = new Threshold("type", 0, 10);
  const updateValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    render(<ThresholdBox threshold={threshold} updateValue={updateValue} />);

    expect(screen.getByTestId("min-input")).toBeInTheDocument();
    expect(screen.getByTestId("max-input")).toBeInTheDocument();
  });

  it("should render label component correctly", () => {
    render(<ThresholdBox threshold={threshold} updateValue={updateValue} />);

    expect(
      screen.getByText(`${capitalize(threshold.type)}`)
    ).toBeInTheDocument();
  });

  it("should update the threshold value on input change", () => {
    render(<ThresholdBox threshold={threshold} updateValue={updateValue} />);

    const minInput = screen.getByTestId("min-input");
    const maxInput = screen.getByTestId("max-input");

    fireEvent.change(minInput, { target: { value: "5" } });
    fireEvent.change(maxInput, { target: { value: "25" } });

    expect(updateValue).toHaveBeenCalledTimes(2);
    expect(updateValue).toHaveBeenNthCalledWith(1, {
      type: "type",
      min: 5,
      max: 10,
    });
    expect(updateValue).toHaveBeenNthCalledWith(2, {
      type: "type",
      min: 0,
      max: 25,
    });
  });

  it("should handle empty input gracefully", () => {
    render(<ThresholdBox threshold={threshold} updateValue={updateValue} />);

    const minInput = screen.getByTestId("min-input");
    const maxInput = screen.getByTestId("max-input");

    fireEvent.change(minInput, { target: { value: "" } });
    fireEvent.change(maxInput, { target: { value: "" } });

    expect(updateValue).toHaveBeenCalledTimes(2);
    expect(updateValue).toHaveBeenNthCalledWith(1, {
      type: "type",
      min: NaN,
      max: 10,
    });
    expect(updateValue).toHaveBeenNthCalledWith(2, {
      type: "type",
      min: 0,
      max: NaN,
    });
  });

  it("should handle default NaN value", () => {
    render(<ThresholdBox threshold={threshold} updateValue={updateValue} />);

    const minInput = screen.getByTestId("min-input");
    const maxInput = screen.getByTestId("max-input");

    fireEvent.change(minInput, { target: { value: NaN } });
    fireEvent.change(maxInput, { target: { value: NaN } });

    expect(updateValue).toHaveBeenCalledTimes(2);
    expect(updateValue).toHaveBeenNthCalledWith(1, {
      type: "type",
      min: NaN,
      max: 10,
    });
    expect(updateValue).toHaveBeenNthCalledWith(2, {
      type: "type",
      min: 0,
      max: NaN,
    });
  });

  it("should update temperature threshold value within limit boundaries", () => {
    const threshold = new Threshold("temperature", 0, 10);

    render(<ThresholdBox threshold={threshold} updateValue={updateValue} />);

    const minInput = screen.getByTestId("min-input");
    const maxInput = screen.getByTestId("max-input");

    fireEvent.change(minInput, { target: { value: "-500" } });
    fireEvent.change(maxInput, { target: { value: "500" } });

    expect(updateValue).toHaveBeenCalledTimes(2);
    expect(updateValue).toHaveBeenNthCalledWith(1, {
      type: "temperature",
      min: -50,
      max: 10,
    });
    expect(updateValue).toHaveBeenNthCalledWith(2, {
      type: "temperature",
      min: 0,
      max: 60,
    });
  });

  it("should update co2 threshold value within limit boundaries", () => {
    const threshold = new Threshold("Co2", 0, 10);

    render(<ThresholdBox threshold={threshold} updateValue={updateValue} />);

    const minInput = screen.getByTestId("min-input");
    const maxInput = screen.getByTestId("max-input");

    fireEvent.change(minInput, { target: { value: "-5000" } });
    fireEvent.change(maxInput, { target: { value: "5000" } });

    expect(updateValue).toHaveBeenCalledTimes(2);
    expect(updateValue).toHaveBeenNthCalledWith(1, {
      type: "Co2",
      min: 0,
      max: 10,
    });
    expect(updateValue).toHaveBeenNthCalledWith(2, {
      type: "Co2",
      min: 0,
      max: 4095,
    });
  });

  it("should update humidity threshold value within limit boundaries", () => {
    const threshold = new Threshold("Humidity", 0, 10);

    render(<ThresholdBox threshold={threshold} updateValue={updateValue} />);

    const minInput = screen.getByTestId("min-input");
    const maxInput = screen.getByTestId("max-input");

    fireEvent.change(minInput, { target: { value: "-500" } });
    fireEvent.change(maxInput, { target: { value: "500" } });

    expect(updateValue).toHaveBeenCalledTimes(2);
    expect(updateValue).toHaveBeenNthCalledWith(1, {
      type: "Humidity",
      min: 0,
      max: 10,
    });
    expect(updateValue).toHaveBeenNthCalledWith(2, {
      type: "Humidity",
      min: 0,
      max: 100,
    });
  });

  it("should handle NaN input value and change it to an empty string", () => {
    render(
      <ThresholdBox
        threshold={{ type: "test", min: NaN, max: NaN }}
        updateValue={updateValue}
      />
    );

    const minInput = screen.getByTestId("min-input") as HTMLInputElement;
    const maxInput = screen.getByTestId("max-input") as HTMLInputElement;

    expect(minInput.value).toBe("");
    expect(maxInput.value).toBe("");
  });
});
