import { AiOutlineClose } from "react-icons/ai";
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
        w-full px-4 py-3 max-w-[100vw] ease-in-out duration-300 border-b border-slate-200 border-collapse cursor-pointer grid grid-cols-5 "
        data-testid={`preset-item-${presetId}`}
      >
        <div className="col-start-2 col-end-5 flex items-center justify-center ">
          <p className="text-dark text-sm truncate text-center ">
            {presetName}
          </p>
        </div>

        <div className="flex justify-end ">
          <AiOutlineClose
            className="text-red-500 text-2xl hover:text-red-200 ease-in-out duration-200 "
            onClick={(evt) => {
              evt.stopPropagation();
              onDeletePreset(presetId);
            }}
            data-testid={`delete-preset-button-${presetId}`}
          ></AiOutlineClose>
        </div>
      </div>
    </>
  );
};

export default PresetItem;
