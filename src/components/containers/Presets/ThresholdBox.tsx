import React from "react";
import { useState, useEffect } from "react";

interface ThresholdBoxProps {
  title: String;
  updateValue: (state: any) => void;
}

let ThresholdBox = ({ title, updateValue }: ThresholdBoxProps): JSX.Element => {
  const [state, setState] = React.useState({
    min: 0,
    max: 0,
  });

  const handleChange = (evt: any) => {
    if (evt.target.value === "") {
      return;
    }
    const value = parseFloat(evt.target.value);
    if (evt.target.name === "max") {
      setState({ min: state.min, max: value });
      updateValue({ min: state.min, max: value });
    } else {
      setState({ max: state.max, min: value });
      updateValue({ min: state.min, max: value });
    }
  };

  return (
    <>
      <div className="flex flex-col my-5">
        <h2 className="text-center font-semibold text-lg ">{title}</h2>
        <div className="grid grid-cols-2 mx-10">
          <div className="flex justify-start gap-3 items-center">
            <p className="text-lg">Min</p>
            <div className="max-sm:w-1/2 w-56">
              <input
                type="number"
                name="min"
                id=""
                className="py-1 w-full bg-[#EFEFEF] rounded-lg"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 items-center">
            <p className="text-lg">Max</p>
            <div className="max-sm:w-1/2 w-56">
              <input
                type="number"
                name="max"
                id=""
                className="py-1 w-full bg-[#EFEFEF]  rounded-lg "
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThresholdBox;
