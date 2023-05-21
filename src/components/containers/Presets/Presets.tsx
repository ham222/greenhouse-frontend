import React from "react";
import ThresholdBox from "./ThresholdBox";
import ViewAllPresetsModal from "./ViewAllPresetsModal";
import Preset from "src/domain/Preset";
import Threshold from "src/domain/Threshold";
import PresetItem from "./PresetItem";
import axios from "axios";
import { useState } from "react";
import { displayNetworkError } from "src/utils/errorToast";
import { AxiosError } from "axios";
import { useGet } from "src/hooks/useGet";

export default function Presets() {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [refresh, setRefresh] = useState(false);

  const doRefresh = () => {
    setRefresh(!refresh);
  };

  const [title, setTitle] = useState("Create new");
  const presetListResponse = useGet<Preset[]>(`${API_URL}/preset`, refresh);

  const presetList = presetListResponse.data ?? [];

  const defaultPreset: Preset = new Preset(1, "", [
    new Threshold("Temperature", parseFloat(""), parseFloat("")),
    new Threshold("Humidity", parseFloat(""), parseFloat("")),
    new Threshold("Co2", parseFloat(""), parseFloat("")),
  ]);
  const [preset, setPreset] = useState<Preset>(defaultPreset);

  const changeCurrentPreset = (newPresetName: string) => {
    const newPreset =
      presetList.find(({ name }) => name === newPresetName) ?? defaultPreset;
    setPreset(newPreset);
    setTitle(newPresetName);
  };

  const [allPresetsModalOpen, setAllPresetsModalOpen] = useState(false);

  const updateThreshold = (threshold: Threshold) => {
    const newPreset = new Preset(preset.id, preset.name, preset.thresholds);
    const id = newPreset.thresholds.findIndex(
      ({ type }) => threshold.type === type
    );

    newPreset.thresholds[id] = threshold;
    setPreset(newPreset);
  };

  const addPreset = async () => {
    for (let i = 0; i < presetList.length; i++) {
      if (presetList[i].name === preset.name) {
        displayNetworkError("Preset names cannot be the same");
        return;
      }
    }
    try {
      let url = `${API_URL}/preset`;
      await axios.post(url, preset);
      doRefresh();
      displayNetworkError("Succesfully saved!");
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      displayNetworkError(axiosError.message);
    }
  };

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newPreset = new Preset(
      preset.id,
      evt.target.value,
      preset.thresholds
    );
    setPreset(newPreset);
  };

  if (presetListResponse.error != null) {
    displayNetworkError(presetListResponse.error.message);
  }

  const onSave = () => {
    if (preset.name === "") {
      displayNetworkError(`Preset name cannot be empty`);
      return;
    }

    for (let i = 0; i < preset.thresholds.length; i++) {
      let t = preset.thresholds[i];
      if (Number.isNaN(t.max) || Number.isNaN(t.min)) {
        displayNetworkError(`Min and max fields must be filled`);
        return;
      }
    }
    for (let i = 0; i < preset.thresholds.length; i++) {
      let t = preset.thresholds[i];
      if (t.max < t.min) {
        displayNetworkError(
          `Min value in ${t.type} cannot be bigger than max value`
        );

        return;
      }
    }

    addPreset();
  };

  return (
    <div className="m-2">
      <div className="lg:grid lg:grid-cols-10">
        <div className="lg:col-span-7 order-last">
          <h1 className="text-center text-2xl font-semibold my-8">
            {title} Preset
          </h1>
          <div className="flex flex-col items-center">
            <div className="flex my-5">
              <div className="flex justify-center sm:justify-start lg:justify-start items-center">
                <div>
                  <label
                    htmlFor="presetName"
                    className="block text-sm font-medium leading-3"
                  >
                    Preset name
                  </label>
                  <div className="mt-2">
                    <input
                      id="presetName"
                      name="presetName"
                      type="text"
                      onChange={handleNameChange}
                      value={preset.name}
                      className="block pl-3 w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neon sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              {preset?.thresholds.map((threshold) => (
                <ThresholdBox
                  updateValue={updateThreshold}
                  threshold={threshold}
                  key={threshold.type}
                ></ThresholdBox>
              ))}
            </div>

            <div className="flex justify-center w-full">
              <button
                className="bg-dark hover:bg-dark-light text-xl px-7 py-1.5 text-white rounded-lg ease-in-out duration-200"
                onClick={() => {
                  onSave();
                }}
              >
                Save
              </button>
            </div>
          </div>

          <div className="flex justify-center my-10">
            <button
              className="bg-dark text-white w-4/5 font-semibold
        py-4 rounded-3xl hover:bg-slate-700 ease-in-out duration-200 lg:hidden md:w-40"
              onClick={() => setAllPresetsModalOpen(true)}
            >
              See all presets
            </button>
          </div>
          <div className="lg:!hidden">
            <ViewAllPresetsModal
              onPresetClick={changeCurrentPreset}
              onCreateNewClick={() => {
                setPreset(defaultPreset);
                setTitle("Create new");
              }}
              open={allPresetsModalOpen}
              onClose={() => setAllPresetsModalOpen(false)}
              presets={presetList}
            />
          </div>
        </div>

        <div className="max-lg:hidden lg:col-span-3">
          <div className="text-center my-4 text-lg font-semibold">
            All Presets
          </div>
          <div className="flex ring-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 scrollbar-thumb-rounded-md ring-neutral-100 rounded-lg max-h-[50vh] overflow-y-auto gap-2 flex-col items-center">
            {presetList.map((item: Preset) => (
              <PresetItem
                onClick={changeCurrentPreset}
                key={item.id}
                presetName={item.name}
              ></PresetItem>
            ))}
          </div>
          <button
            className="bg-dark mt-4 w-full text-white font-semibold
            py-4 rounded-xl text-lg ease-in-out duration-300 hover:shadow-xl"
            onClick={() => {
              setPreset(defaultPreset);
              setTitle("Create new ");
            }}
          >
            Create new Preset
          </button>
        </div>
      </div>
    </div>
  );
}
