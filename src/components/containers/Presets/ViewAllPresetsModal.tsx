import ModalSmallScreen from "src/components/UI/ModalSmallScreen";
import PresetItem from "./PresetItem";
import { useEffect, useState } from "react";
import PresetDomain from "src/domain/Preset";
import Threshold from "src/domain/Threshold";

interface ViewAllPresetsModalProps {
  open: boolean;
  onClose: () => void;
  presets: any;
  onPresetClick: (value: string) => void;
  onCreateNewClick(): void;
}

export default function ViewAllPresetsModal({
  open,
  onClose,
  presets,
  onPresetClick,
  onCreateNewClick,
}: ViewAllPresetsModalProps) {
  const [presetList, setPresetList] = useState<PresetDomain[]>([]);
  const defaultPreset: PresetDomain = new PresetDomain("", [
    new Threshold("Temperature", parseFloat(""), parseFloat("")),
    new Threshold("Co2", parseFloat(""), parseFloat("")),
    new Threshold("Humidity", parseFloat(""), parseFloat("")),
  ]);
  const [preset, setPreset] = useState<PresetDomain>(defaultPreset);

  const changeCurrentPreset = (newPresetName: string) => {
    const newPreset =
      presetList.find(({ name }) => name === newPresetName) ?? defaultPreset;
    setPreset(newPreset);
  };

  return (
    <>
      <ModalSmallScreen title={""} open={open} onClose={onClose}>
        <div className="flex flex-col items-center">
          <div className=" w-full  flex flex-col items-center md:w-4/5 lg:hidden">
            <button
              className="bg-dark text-white w-4/5 font-semibold
        py-4 rounded-3xl mt-3 mb-4 text-lg hover:bg-slate-700 ease-in-out duration-200 lg:hidden"
              onClick={() => {
                onCreateNewClick();
                onClose();
              }}
            >
              Create new Preset
            </button>
            {presets.map((item: any) => (
              <PresetItem
                onClick={(name) => {
                  onPresetClick(name);
                  onClose();
                }}
                key={item.name}
                presetName={item.name}
              ></PresetItem>
            ))}
          </div>
        </div>
      </ModalSmallScreen>
    </>
  );
}
