import { render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import { BrowserRouter } from "react-router-dom";
import WateringStatus from "src/components/containers/Status/WateringStatus";
import durationToString from "src/utils/durationToString";

describe("Watering Status", () => {
  it("renders the correct status when online", () => {
    const nextWatering = DateTime.now().plus({ days: 1 }).diff(DateTime.now());
    render(
      <BrowserRouter>
        <WateringStatus isOnline={true} timeToWatering={nextWatering} />
      </BrowserRouter>
    );
    expect(screen.getByText("Water System: ON")).toBeInTheDocument();
  });

  it("renders the correct status when offline", () => {
    const nextWatering = DateTime.now().plus({ days: 1 }).diff(DateTime.now());
    render(
      <BrowserRouter>
        <WateringStatus isOnline={false} timeToWatering={nextWatering} />
      </BrowserRouter>
    );
    expect(screen.getByText("Water System: OFF")).toBeInTheDocument();
  });
});
