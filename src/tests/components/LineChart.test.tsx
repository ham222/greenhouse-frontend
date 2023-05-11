import { describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LineChart from "../../components/containers/Timeline/LineChart";
import { BsWater } from "react-icons/bs";
import Measurement from "../../domain/Measurement";
jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));
describe("LineChart", () => {
  it("renders title correctly", () => {
    const measurements = [
      new Measurement(72, new Date("2023-04-18T08:00:00").getTime()),
      new Measurement(68, new Date("2023-04-18T09:00:00").getTime()),
    ];
    render(
      <LineChart
        measurements={measurements}
        type="Humidity"
        bgColor={"#e6f5fb"}
        accentColor={"#b0d7e7"}
        icon={<BsWater className="w-full h-full" />}
      />
    );

    expect(screen.getByText("Humidity")).toBeInTheDocument();
  });
});
