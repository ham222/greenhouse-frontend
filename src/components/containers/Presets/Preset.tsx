import React from "react";
import { useState } from "react";
import ThresholdBox from "./ThresholdBox";
import ViewAllPresetsModal from "./ViewAllPresetsModal";
import PresetDomain from "src/domain/Preset";
import Threshold from "src/domain/Threshold";
import axios from "axios";

export default function Preset() {
  const [title, setTitle] = useState("Create new Preset");

  const [allPresetsModalOpen, setAllPresetsModalOpen] = useState(false);
  const [temperature, setTemperature] = React.useState({
    min: 0,
    max: 0,
  });
  const [humidity, setHumidity] = React.useState({
    min: 0,
    max: 0,
  });
  const [co2, setCo2] = React.useState({
    min: 0,
    max: 0,
  });
  const [presetName, setPresetName] = React.useState("");
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const addPreset = async () => {
    console.log("adding");
    const thresholds: Threshold[] = [
      new Threshold("Temperature", temperature.min, temperature.max),
      new Threshold("Humidity", humidity.min, humidity.max),
      new Threshold("Co2", co2.min, co2.max),
    ];
    const presetDomain: PresetDomain = new PresetDomain(presetName, thresholds);

    try {
      let url = `${API_URL}/preset`;
      const response = await axios.post(url, presetDomain);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (evt: any) => {
    if (evt.target.value === "") {
      return;
    }
    const value = String(evt.target.value);

    if (evt.target.name === "presetName") {
      setPresetName(value);
      console.log(value);
    }
  };

  return (
    <>
      <div className="flex flex-col align-items-center">
        <h1 className="text-center text-2xl font-semibold mt-4">{title}</h1>
        <div className="flex justify-start items-baseline ml-10">
          <h2 className="font-semibold mt-4 mr-4 mb-4 text-lg ">Preset Name</h2>
          <input
            type="text"
            name="presetName"
            id=""
            className="w-1/2 sm:w-78 py-1 bg-[#EFEFEF] rounded-lg"
            onChange={handleNameChange}
          />
        </div>
        <ThresholdBox
          title={"Temperature"}
          updateValue={setTemperature}
        ></ThresholdBox>
        <ThresholdBox
          title={"Humidity"}
          updateValue={setHumidity}
        ></ThresholdBox>
        <ThresholdBox title={"Co2"} updateValue={setCo2}></ThresholdBox>
      </div>
      <div className="flex justify-end ">
        <div className="mr-14">
          <button
            className="bg-[#D9D9D9] font-semibold text-xl px-7 py-1.5 rounded-lg hover:bg-stone-200 ease-in-out duration-200"
            onClick={() => {
              addPreset();
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <button
          className="bg-[#202329] text-white w-4/5 font-semibold
        py-4 rounded-3xl hover:bg-slate-700 ease-in-out duration-200 lg:hidden md:w-40"
          onClick={() => setAllPresetsModalOpen(true)}
        >
          See all presets
        </button>
      </div>
      <ViewAllPresetsModal
        open={allPresetsModalOpen}
        onClose={() => setAllPresetsModalOpen(false)}
      />
    </>
  );
}
