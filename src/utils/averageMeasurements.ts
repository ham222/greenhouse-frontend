import Measurement from "src/domain/Measurement";

export const averageMeasurements = (
  measurements: Measurement[],
  durationInMilliseconds: number
): Measurement[] => {
  const averagedData: Measurement[] = [];

  measurements
    .reduce((map, curr) => {
      const span = Math.floor(curr.timestamp / durationInMilliseconds);

      if (!map.has(span)) {
        map.set(span, [curr]);
      } else {
        map.get(span)!.push(curr);
      }

      return map;
    }, new Map<number, Measurement[]>())
    .forEach((ms) => {
      averagedData.push(
        new Measurement(
          Math.round(
            (ms.reduce((total, { value }) => total + value, 0) / ms.length) *
              100
          ) / 100,
          ms[0].timestamp
        )
      );
    });

  return averagedData;
};
