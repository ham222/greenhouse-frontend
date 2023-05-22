import { GrFormClose } from "react-icons/gr";
interface PresetItemProps {
  presetName: string;
  presetId: number;
  onPresetClick: (id: number) => void;
  onDeletePreset: (id: number) => void;
}

let PresetItem = ({
  presetName,
  presetId,
  onPresetClick,
  onDeletePreset,
}: PresetItemProps): JSX.Element => {
  return (
    <>
      <div
        onClick={() => {
          onPresetClick(presetId);
        }}
        className="
        w-full p-4 max-w-[100vw] ease-in-out duration-300 border-b border-slate-200 border-collapse cursor-pointer flex justify-center"
      >
        <p className="text-dark text-sm truncate text-center ">{presetName}</p>

        <GrFormClose
          className="text-red-500"
          onClick={(evt) => {
            evt.stopPropagation();
            onDeletePreset(presetId);
          }}
        ></GrFormClose>
      </div>
    </>
  );
};

export default PresetItem;
