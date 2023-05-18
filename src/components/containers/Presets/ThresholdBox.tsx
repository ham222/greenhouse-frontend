import React from "react";
import { useState, useEffect } from "react";
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

  if (limitMap.has(threshold.type)) {
    limit = limitMap.get(threshold.type) ?? { min: -9999, max: 9999 };
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(evt.target.value);

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

      updateValue(newThreshold);
    } else {
      newThreshold.min = Math.max(
        limit.min,
        Math.min(limit.max, Number(value))
      );

      updateValue(newThreshold);
    }
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row my-5 ">
        <h2 className="text-center font-semibold text-lg lg:w-28 lg:text-right">
          {capitalize(threshold.type)}
        </h2>
        <div className="grid grid-cols-2 mx-10 lg:gap-10">
          <div className="flex justify-start gap-3 items-center ">
            <p className="text-lg">Min</p>
            <div className="max-sm:w-1/2 w-32">
              <input
                type="number"
                name="min"
                id=""
                className="py-1 w-full bg-[#EFEFEF] rounded-lg"
                onChange={handleChange}
                value={Number.isNaN(threshold.min) ? "" : threshold.min}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 items-center">
            <p className="text-lg">Max</p>
            <div className="max-sm:w-1/2 w-32">
              <input
                type="number"
                name="max"
                id=""
                className="py-1 w-full bg-[#EFEFEF]  rounded-lg "
                onChange={handleChange}
                value={Number.isNaN(threshold.max) ? "" : threshold.max}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThresholdBox;
