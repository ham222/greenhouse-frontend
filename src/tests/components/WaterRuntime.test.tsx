import { fireEvent, render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import WaterRuntime from "src/components/containers/Watering/WaterRuntime";
import Interval from "src/domain/Interval";
import durationToString from "src/utils/durationToString";

describe("Water Runtime", () => {
  it("renders correctly", () => {
    const startTime = DateTime.fromObject({
      hour: 7,
      minute: 30,
      second: 24,
      millisecond: 10,
    });

    const endTime = DateTime.fromObject({
      hour: 19,
      minute: 3,
      second: 0,
      millisecond: 13,
    });

    render(
      <WaterRuntime
        interval={
          new Interval(
            0,
            startTime.toFormat("HH:mm:ss"),
            endTime.toFormat("HH:mm:ss"),
            0
          )
        }
      />
    );

    const renderedStart = screen.getByTestId("start-time");
    const renderedEnd = screen.getByTestId("end-time");
    const renderedDuration = screen.getByTestId("duration");

    expect(screen.getByTestId("drawer")).toHaveClass("h-0");
    expect(renderedStart.textContent).toBe("07:30");
    expect(renderedEnd.textContent).toBe("19:03");
    expect(renderedDuration.textContent).toBe(
      durationToString(endTime.diff(startTime))
    );
  });

  it("reveals option buttons onfocus", () => {
    const deleteMock = jest.fn();
    const updateMock = jest.fn();

    render(
      <WaterRuntime
        onDelete={deleteMock}
        onUpdate={updateMock}
        interval={new Interval(0, "23:00:00", "23:30:00", 6)}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    const updateButton = screen.getByRole("button", { name: "Update" });

    fireEvent.focusIn(screen.getByTestId("water-runtime"));
    expect(screen.getByTestId("drawer")).not.toHaveClass("h-0");

    expect(deleteButton).toBeVisible();
    expect(updateButton).toBeVisible();
  });

  it("has update button that fires onUpdate event", () => {
    const deleteMock = jest.fn();
    const updateMock = jest.fn();

    render(
      <WaterRuntime
        onDelete={deleteMock}
        onUpdate={updateMock}
        interval={new Interval(0, "23:00:00", "23:30:00", 6)}
      />
    );

    const updateButton = screen.getByRole("button", { name: "Update" });

    fireEvent.click(updateButton);

    expect(deleteMock).not.toHaveBeenCalled();
    expect(updateMock).toHaveBeenCalled();
  });

  it("has delete button that fires onDelete event", () => {
    const deleteMock = jest.fn();
    const updateMock = jest.fn();

    render(
      <WaterRuntime
        onDelete={deleteMock}
        onUpdate={updateMock}
        interval={new Interval(0, "23:00:00", "23:30:00", 6)}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });

    fireEvent.click(deleteButton);

    expect(deleteMock).toHaveBeenCalled();
    expect(updateMock).not.toHaveBeenCalled();
  });
});
