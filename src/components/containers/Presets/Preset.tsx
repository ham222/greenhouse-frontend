import { useState } from "react";
import ThresholdBox from "./ThresholdBox";

export default function Preset() {
  const [title, setTitle] = useState("Create new Preset");

  return (
    <>
      <div className="flex flex-col align-items-center">
        <h1 className="text-center text-2xl font-semibold mt-4">{title}</h1>
        <ThresholdBox title={"Temperature"}></ThresholdBox>
        <ThresholdBox title={"Humidity"}></ThresholdBox>
        <ThresholdBox title={"Co2"}></ThresholdBox>
      </div>
      <div className="flex justify-end ">
        <div className="mr-14">
          <button className="bg-[#D9D9D9] font-semibold text-xl px-7 py-1.5 rounded-lg hover:bg-stone-200 ease-in-out duration-200">
            Save
          </button>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <button
          className="bg-[#202329] text-white w-4/5
        py-4 rounded-3xl hover:bg-slate-700 ease-in-out duration-200 md:hidden"
        >
          See all presets
        </button>
      </div>
    </>
  );
}
