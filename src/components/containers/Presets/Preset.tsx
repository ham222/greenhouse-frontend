import React from "react";
import ThresholdBox from "./ThresholdBox";
import ViewAllPresetsModal from "./ViewAllPresetsModal";
import PresetDomain from "src/domain/Preset";
import Threshold from "src/domain/Threshold";
import PresetItem from "./PresetItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function Preset() {
  const [title, setTitle] = useState("Create new Preset");
  const [presetList, setPresetList] = useState<PresetDomain[]>([]);

  const defaultPreset: PresetDomain = new PresetDomain("Default", [
    new Threshold("Temperature", 0, 0),
    new Threshold("Co2", 0, 0),
    new Threshold("Humidity", 0, 0),
  ]);
  const [preset, setPreset] = useState<PresetDomain>(defaultPreset);

  const changeCurrentPreset = (newPresetName: string) => {
    const newPreset =
      presetList.find(({ name }) => name === newPresetName) ?? defaultPreset;
    setPreset(newPreset);
  };

  const [allPresetsModalOpen, setAllPresetsModalOpen] = useState(false);
  const [presetName, setPresetName] = React.useState("");
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const updateThreshold = (threshold: Threshold) => {
    const newPreset = new PresetDomain(preset.name, preset.thresholds);
    const id = newPreset.thresholds.findIndex(
      ({ type }) => threshold.type === type
    );
    console.log(id + " " + threshold);
    newPreset.thresholds[id] = threshold;
    console.log(id + " " + threshold);
    setPreset(newPreset);
  };

  const addPreset = async () => {
    try {
      let url = `${API_URL}/preset`;
      const response = await axios.post(url, preset);
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
    }
  };
  const itemRefs = useRef({});

  const fetchData = async () => {
    try {
      let url = `${API_URL}/preset`;
      const response = await axios.get(url);
      setPresetList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl font-semibold my-8">{title}</h1>

      <div className="md:flex md:flex-col md:items-center lg:flex-row lg:items-start">
        <div className=" md:w-4/5 lg:w-3/5 lg:border-r-stone-400 lg:border-r-2 lg:content-center lg:ml-[7vw]">
          <div className="flex flex-col">
            <div className="flex justify-start items-baseline ml-10  mt-5 md:mt-10 md:mb-5 lg:ml-0 lg:mt-0 ">
              <h2 className="font-semibold  mr-4 mb-4 text-lg  lg:text-left lg:ml-0 ">
                Preset Name
              </h2>
              <input
                type="text"
                name="presetName"
                id=""
                className="w-1/2 sm:w-72 py-1 bg-[#EFEFEF] rounded-lg"
                onChange={handleNameChange}
                value={preset?.name}
              />
            </div>
            {preset?.thresholds.map((threshold) => (
              <ThresholdBox
                updateValue={updateThreshold}
                threshold={threshold}
              ></ThresholdBox>
            ))}
            <div className="flex justify-end">
              <div className="mr-14">
                <button
                  className="bg-[#D9D9D9] font-semibold text-xl px-7 py-1.5 rounded-lg hover:bg-stone-200 ease-in-out duration-200"
                  onClick={() => {
                    addPreset();
                    fetchData();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-10">
            <button
              className="bg-[#202329] text-white w-4/5 font-semibold
        py-4 rounded-3xl hover:bg-slate-700 ease-in-out duration-200 lg:hidden md:w-40"
              onClick={() => setAllPresetsModalOpen(true)}
            >
              See all presets
            </button>
          </div>
          <div className="lg:hidden">
            <ViewAllPresetsModal
              onClick={changeCurrentPreset}
              open={allPresetsModalOpen}
              onClose={() => setAllPresetsModalOpen(false)}
              presets={presetList}
            />
          </div>
        </div>

        <div className="hidden lg:block w-2/5">
          <div className="flex flex-col items-center">
            <div className=" md:w-4/5 flex flex-col items-center">
              <div className="w-4/5">
                <h1 className="text-left text-2xl font-semibold">
                  All Presets
                </h1>
              </div>

              {presetList.map((item: any) => (
                <PresetItem
                  onClick={changeCurrentPreset}
                  key={item.name}
                  presetName={item.name}
                ></PresetItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
