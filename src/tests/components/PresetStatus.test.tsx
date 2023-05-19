import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PresetStatus from "src/components/containers/Status/PresetStatus";
import capitalize from "src/utils/capitalize";
const tempName = "temperature";
const tempMin = 27.5;
const tempMax = 32.2;
const co2Name = "co2";
const co2Min = 12;
const co2Max = 20;
const humidityName = "humidity";
const humidityMin = 60.5;
const humidityMax = 87.5;
const presetName = "default preset";
const preset = {
  id: 1,
  name: presetName,
  thresholds: [
    {
      type: tempName,
      min: tempMin,
      max: tempMax,
    },
    {
      type: humidityName,
      min: humidityMin,
      max: humidityMax,
    },
    {
      type: co2Name,
      min: co2Min,
      max: co2Max,
    },
  ],
};
describe("Watering Status", () => {
  it("renders the correct preset name when provided with preset", () => {
    render(
      <BrowserRouter>
        <PresetStatus preset={preset} />
      </BrowserRouter>
    );
    expect(
      screen.getByText(`Current preset: ${presetName}`)
    ).toBeInTheDocument();
  });

  it.each([tempMin, co2Min, humidityMin])(
    "renders min threshold when provided with it",
    (value) => {
      render(
        <BrowserRouter>
          <PresetStatus preset={preset} />
        </BrowserRouter>
      );
      expect(screen.getByText(`Min: ${value}`)).toBeInTheDocument();
    }
  );
  it.each([tempMax, co2Max, humidityMax])(
    "renders max threshold when provided with it",
    (value) => {
      render(
        <BrowserRouter>
          <PresetStatus preset={preset} />
        </BrowserRouter>
      );
      expect(screen.getByText(`Max: ${value}`)).toBeInTheDocument();
    }
  );
  it.each([tempName, co2Name, humidityName])(
    "renders the correct threshold name when preset is provided",
    (value) => {
      render(
        <BrowserRouter>
          <PresetStatus preset={preset} />
        </BrowserRouter>
      );
      expect(screen.getByText(`${capitalize(value)}:`)).toBeInTheDocument();
    }
  );
  it("renders the correct preset name when preset is null", () => {
    render(
      <BrowserRouter>
        <PresetStatus preset={null} />
      </BrowserRouter>
    );
    expect(screen.getByText("Current preset: No preset")).toBeInTheDocument();
  });
});
