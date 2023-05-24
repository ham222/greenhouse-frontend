import React from "react";
import ThresholdBox from "./ThresholdBox";
import ViewAllPresetsModal from "./ViewAllPresetsModal";
import Preset from "src/domain/Preset";
import Threshold from "src/domain/Threshold";
import PresetItem from "./PresetItem";
import axios from "axios";
import { useState } from "react";
import { displayToast } from "src/utils/displayToast";
import { AxiosError } from "axios";
import { useGet } from "src/hooks/useGet";
import DeleteModal from "./DeleteModal";
import validatePreset from "src/utils/validatePreset";

export default function Presets() {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [refresh, setRefresh] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [allPresetsModalOpen, setAllPresetsModalOpen] = useState(false);

  const [updating, setUpdating] = useState(false);
  const [title, setTitle] = useState("Create new");

  const presetListResponse = useGet<Preset[]>(`${API_URL}/preset`, refresh);
  const presetList = presetListResponse.data ?? [];

  const currentPresetResponse = useGet<Preset>(
    `${API_URL}/current-preset`,
    refresh
  );

  const currentPreset =
    presetList.find(({ id }) => id === currentPresetResponse.data?.id) ??
    new Preset("", [
      new Threshold("Temperature", parseFloat(""), parseFloat("")),
      new Threshold("Humidity", parseFloat(""), parseFloat("")),
      new Threshold("Co2", parseFloat(""), parseFloat("")),
    ]);

  const defaultPreset: Preset = currentPreset;
  const [preset, setPreset] = useState<Preset>(defaultPreset);

  if (presetListResponse.error != null) {
    displayToast(presetListResponse.error.message);
  }

  const doRefresh = () => {
    setRefresh(!refresh);
  };

  const changeCurrentPreset = (presetId: number) => {
    const newPreset =
      presetList.find(({ id }) => id === presetId) ?? defaultPreset;
    setPreset(newPreset);
    setTitle(newPreset.name);
    setUpdating(true);
  };

  const resetPresetToDefault = () => {
    const clear = new Preset("", [
      new Threshold("Temperature", parseFloat(""), parseFloat("")),
      new Threshold("Humidity", parseFloat(""), parseFloat("")),
      new Threshold("Co2", parseFloat(""), parseFloat("")),
    ]);
    setPreset(clear);
    setTitle("Create new");
    setUpdating(false);
  };

  const deletePreset = async (presetId: number) => {
    try {
      await axios.delete(`${API_URL}/preset/${presetId}`);
      resetPresetToDefault();
      doRefresh();
    } catch (error) {
      console.error("Error deleting preset:", error);
    }
  };

  const updateThreshold = (threshold: Threshold) => {
    const newPreset = new Preset(preset.name, preset.thresholds, preset.id);
    const id = newPreset.thresholds.findIndex(
      ({ type }) => threshold.type === type
    );

    newPreset.thresholds[id] = threshold;
    setPreset(newPreset);
  };

  const addPreset = async () => {
    for (let i = 0; i < presetList.length; i++) {
      if (presetList[i].name === preset.name) {
        displayToast("Preset names cannot be the same");
        return;
      }
    }
    try {
      let url = `${API_URL}/preset`;
      await axios.post(url, preset);
      doRefresh();
      displayToast("Successfully saved");
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      displayToast(axiosError.message);
    }
  };

  const setPresetAsCurrrent = async () => {
    if (preset.name === currentPreset.name) {
      displayToast("This preset is already applied!");
      return;
    }
    try {
      let url = `${API_URL}/current-preset`;
      await axios.post(url, preset);
      doRefresh();
      displayToast("Successfully changed current preset!");
    } catch (error) {
      const axiosError = error as AxiosError;
      displayToast(axiosError.message);
    }
  };

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newPreset = new Preset(
      evt.target.value,
      preset.thresholds,
      preset.id
    );
    setPreset(newPreset);
  };

  const onSave = () => {
    if (!validatePreset(preset)) {
      return;
    }

    addPreset();
  };
  const onUpdate = async () => {
    if (!validatePreset(preset)) {
      return;
    }
    for (let i = 0; i < presetList.length; i++) {
      if (
        presetList[i].name === preset.name &&
        presetList[i].id !== preset.id
      ) {
        displayToast("Preset names cannot be the same");
        return;
      }
    }
    try {
      let url = `${API_URL}/preset/${preset.id}`;
      await axios.put(url, preset);
      setTitle(preset.name);
      doRefresh();
      displayToast("Succesfully saved!");
    } catch (error) {
      console.error(error);
      const axiosError = error as AxiosError;
      displayToast(axiosError.message);
    }
  };

  return (
    <div className="m-2">
      <div className="lg:grid lg:grid-cols-10">
        <div className="lg:col-span-7 order-last">
          <h1 className="text-center text-2xl font-semibold my-8">
            {title.includes("preset") ? title : title + " preset"}
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

            <div className="flex justify-evenly w-full">
              <button
                className="bg-dark hover:bg-dark-light text-xl px-7 py-1.5 text-white rounded-lg ease-in-out duration-200"
                onClick={() => {
                  if (updating) {
                    onUpdate();
                  } else {
                    onSave();
                  }
                }}
              >
                {updating ? "Update" : "Save"}
              </button>
              <button
                className="bg-dark hover:bg-dark-light text-xl px-7 py-1.5 text-white rounded-lg ease-in-out duration-200 disabled:bg-neutral-400"
                disabled={
                  (presetList.find((p) => p.id === preset.id) ? false : true) ||
                  preset.id === currentPreset.id
                }
                onClick={() => {
                  setPresetAsCurrrent();
                }}
              >
                {preset.id === currentPreset.id ? "Applied" : "Apply"}
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
                setUpdating(false);
                resetPresetToDefault();
                setTitle("Create new");
              }}
              onDeletePreset={deletePreset}
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
                onPresetClick={changeCurrentPreset}
                presetId={item.id}
                onDeletePreset={(id) => {
                  setOpenDeleteModal(true);
                  setDeleteId(id);
                }}
                key={item.id}
                presetName={item.name}
              ></PresetItem>
            ))}
          </div>
          <button
            className="bg-dark mt-4 w-full text-white font-semibold
            py-4 rounded-xl text-lg ease-in-out duration-300 hover:shadow-xl"
            onClick={() => {
              resetPresetToDefault();
              setTitle("Create new");
              setUpdating(false);
            }}
          >
            Create new Preset
          </button>
        </div>
      </div>
      <DeleteModal
        open={openDeleteModal}
        onConfirmDelete={() => {
          deletePreset(deleteId);
          resetPresetToDefault();
        }}
        onClose={() => setOpenDeleteModal(false)}
      ></DeleteModal>
    </div>
  );
}
