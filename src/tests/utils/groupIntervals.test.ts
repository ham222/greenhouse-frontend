import { GroupedIntervals } from "src/domain/GroupedIntervals";
import Interval from "src/domain/Interval";
import { WeekDays } from "src/domain/WeekDays";
import {
  appendToGroupIntervals,
  groupIntervals,
  ungroupIntervals,
} from "src/utils/groupIntervals";

describe("Interval Grouping", () => {
  let intervals: Interval[];
  let groupedIntervals: GroupedIntervals;

  beforeEach(() => {
    intervals = [
      new Interval(2, "09:00:00", "12:00:00", WeekDays.indexOf("Tuesday")),
      new Interval(1, "09:00:00", "12:00:00", WeekDays.indexOf("Monday")),
    ];

    groupedIntervals = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };
  });

  test("should group and sort intervals correctly", () => {
    const result = groupIntervals(intervals);
    expect(result["Monday"]).toHaveLength(1);
    expect(result["Tuesday"]).toHaveLength(1);
  });

  test("should append to existing grouped intervals", () => {
    const newIntervals = [
      new Interval(3, "09:00:00", "12:00:00", WeekDays.indexOf("Wednesday")),
    ];
    const result = appendToGroupIntervals(newIntervals, groupedIntervals);
    expect(result["Wednesday"]).toHaveLength(1);
  });

  test("should ungroup intervals correctly", () => {
    const grouped = groupIntervals(intervals);
    const result = ungroupIntervals(grouped);
    expect(result).toHaveLength(2);
    expect(result[0].dayOfWeek).toEqual("Monday");
    expect(result[1].dayOfWeek).toEqual("Tuesday");
  });
});
