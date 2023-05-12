import Measurement from "src/domain/Measurement";

export const averageMeasurements = (
  measurements: Measurement[],
  durationInMilliseconds: number
): Measurement[] => {
  const averagedData = [];
  let sum: number = 0;
  let count: number = 0;
  let startTime: number = measurements[0].timestamp;

  for (let i = 0; i < measurements.length; i++) {
    const currentData = measurements[i];
    sum += parseFloat(currentData.value as unknown as string);
    count++;

    const elapsedTime = currentData.timestamp - startTime;
    if (elapsedTime >= durationInMilliseconds) {
      const averageValue = sum / count;
      const averagedMeasurement = new Measurement(
        Math.round(averageValue * 100) / 100,
        startTime
      );
      averagedData.push(averagedMeasurement);

      // Reset variables for the next group
      sum = 0;
      count = 0;
      startTime = currentData.timestamp;
    }
  }

  return averagedData;
};
