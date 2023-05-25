import React from "react";
import Threshold from "src/domain/Threshold";
import capitalize from "src/utils/capitalize";
import limitMap from "src/domain/TypeLimits";
import { Limit } from "src/domain/Limit";

interface ThresholdBoxProps {
  threshold: Threshold;
  updateValue: (state: Threshold) => void;
}

let ThresholdBox = ({
  threshold,
  updateValue,
}: ThresholdBoxProps): JSX.Element => {
  let limit: Limit;

  limit = limitMap.get(threshold.type.toLowerCase()) ?? {
    min: -9999,
    max: 9999,
    round: 0,
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      Math.round(parseFloat(evt.target.value) * Math.pow(10, limit.round)) /
      Math.pow(10, limit.round);

    const newThreshold = new Threshold(
      threshold.type,
      threshold.min,
      threshold.max
    );

    if (evt.target.name === "max") {
      newThreshold.max = Math.max(
        limit.min,
        Math.min(limit.max, Number(value))
      );
    } else {
      newThreshold.min = Math.max(
        limit.min,
        Math.min(limit.max, Number(value))
      );
    }

    updateValue(newThreshold);
  };
  return (
    <>
      <div className="flex lg:justify-center lg:items-center flex-col my-5 ">
        <div className="text-center justify-center font-semibold text-lg mb-4 lg:text-right">
          {capitalize(threshold.type)}
        </div>
        <div className="grid gap-2 grid-cols-2 mx-4 lg:gap-10">
          <div className="flex justify-center gap-3 items-center ">
            <div>
              <label
                htmlFor={`min-${threshold.type}`}
                className="block text-sm font-medium leading-3"
              >
                Min
              </label>
              <div className="mt-2">
                <input
                  id={`min-${threshold.type}`}
                  name="min"
                  type="number"
                  data-testid="min-input"
                  onChange={handleChange}
                  value={Number.isNaN(threshold.min) ? "" : threshold.min}
                  className="block pl-3 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neon sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 items-center">
            <div>
              <label
                htmlFor={`max-${threshold.type}`}
                className="block text-sm font-medium leading-3"
              >
                Max
              </label>
              <div className="mt-2">
                <input
                  id={`max-${threshold.type}`}
                  name="max"
                  type="number"
                  data-testid="max-input"
                  onChange={handleChange}
                  value={Number.isNaN(threshold.max) ? "" : threshold.max}
                  className="block pl-3 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neon sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThresholdBox;
