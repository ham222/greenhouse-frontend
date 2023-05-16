import { render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import React from "react";
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

    expect(renderedStart.textContent).toBe("07:30");
    expect(renderedEnd.textContent).toBe("19:03");
    expect(renderedDuration.textContent).toBe(
      durationToString(endTime.diff(startTime))
    );
  });
});
