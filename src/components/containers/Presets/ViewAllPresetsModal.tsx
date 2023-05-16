import ModalSmallScreen from "src/components/UI/ModalSmallScreen";
import PresetItem from "./PresetItem";
import { useEffect, useState } from "react";
import axios from "axios";
import PresetDomain from "src/domain/Preset";
import Threshold from "src/domain/Threshold";

const API_URL = process.env.REACT_APP_API_BASE_URL;

interface ViewAllPresetsModalProps {
  open: boolean;
  onClose: () => void;
  presets: any;
  onClick: (value: string) => void;
}

export default function ViewAllPresetsModal({
  open,
  onClose,
  presets,
  onClick,
}: ViewAllPresetsModalProps) {
  return (
    <>
      <ModalSmallScreen title={""} open={open} onClose={onClose}>
        <div className="flex flex-col items-center">
          <div className=" w-full  flex flex-col items-center md:w-4/5 lg:hidden">
            <button
              className="bg-[#202329] text-white w-4/5 font-semibold
        py-4 rounded-3xl mt-3 mb-4 text-lg hover:bg-slate-700 ease-in-out duration-200 lg:hidden"
              onClick={() => onClose()}
            >
              Create new Preset
            </button>
            {presets.map((item: any) => (
              <PresetItem
                onClick={onClick}
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
