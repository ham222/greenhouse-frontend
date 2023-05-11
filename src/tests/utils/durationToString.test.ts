import { Duration, Settings } from "luxon";
import durationToString from "src/utils/durationToString";

describe("durationToString", () => {
  Settings.defaultLocale = "en-us";
  it.each([
    [0, "0s"],
    [1000, "1s"],
    [60000, "1m"],
    [3600000, "1h"],
    [3599000, "59m, 59s"],
    [3600000, "1h"],
    [86399000, "23h, 59m, 59s"],
    [86400000, "1d"],
    [604799000, "6d, 23h, 59m, 59s"],
    [604800000, "1w"],
    [86399999999, "2y, 9m, 1d, 23h, 59m, 59s"],
  ])("for a duration of %i milliseconds returns %s", (input, output) => {
    const duration = Duration.fromMillis(input);
    const result = durationToString(duration);
    expect(result).toEqual(output);
  });

  it("should round down fractions of a second to the nearest whole number", () => {
    const duration = Duration.fromMillis(1600);
    const result = durationToString(duration);
    expect(result).toEqual("1s");
  });
});
