import Measurement from "src/domain/Measurement";
import { averageMeasurements } from "src/utils/averageMeasurements";

describe("averageMeasurements", () => {
  it("should average measurements correctly", () => {
    const measurements = [
      new Measurement(5, 0),
      new Measurement(10, 100),
      new Measurement(15, 200),
      new Measurement(20, 300),
      new Measurement(25, 400),
    ];

    const durationInMilliseconds = 200;

    const expectedAveragedData = [
      new Measurement(7.5, 0),
      new Measurement(17.5, 200),
      new Measurement(25, 400),
    ];

    const result = averageMeasurements(measurements, durationInMilliseconds);

    console.log(result, expectedAveragedData);
    expect(result).toEqual(expectedAveragedData);
  });
});
