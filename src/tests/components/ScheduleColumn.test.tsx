import { describe } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import ScheduleColumn from "src/components/containers/Watering/ScheduleColumn";
import Interval from "src/domain/Interval";

describe("ScheduleColumn", () => {
  it("renders name of the weekday correctly", () => {
    render(<ScheduleColumn day="Monday" intervals={[]} />);

    expect(screen.getByTestId("short-day").textContent).toContain("Mon");
    expect(screen.getByTestId("long-day").textContent).toContain("Monday");
  });

  it("renders all water runtimes correctly", () => {
    const intervals: Interval[] = [
      {
        dayOfWeek: "Monday",
        weekDayIndex: 0,
        startTime: DateTime.fromFormat("12:34", "HH:mm"),
        endTime: DateTime.fromFormat("13:34", "HH:mm"),
      },
      {
        dayOfWeek: "Monday",
        weekDayIndex: 0,
        startTime: DateTime.fromFormat("13:20", "HH:mm"),
        endTime: DateTime.fromFormat("14:20", "HH:mm"),
      },
      {
        dayOfWeek: "Monday",
        weekDayIndex: 0,
        startTime: DateTime.fromFormat("15:30", "HH:mm"),
        endTime: DateTime.fromFormat("16:00", "HH:mm"),
      },
      {
        dayOfWeek: "Monday",
        weekDayIndex: 0,
        startTime: DateTime.fromFormat("17:00", "HH:mm"),
        endTime: DateTime.fromFormat("18:30", "HH:mm"),
      },
    ];

    render(<ScheduleColumn day="Monday" intervals={intervals} />);

    expect(screen.getAllByTestId("water-runtime").length).toBe(4);
  });
});
