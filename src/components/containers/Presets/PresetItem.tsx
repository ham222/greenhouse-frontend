import { GrFormClose } from "react-icons/gr";
interface PresetItemProps {
  presetName: string;
  onClick: (name: string) => void;
}

let PresetItem = ({ presetName, onClick }: PresetItemProps): JSX.Element => {
  return (
    <>
      <div
        onClick={() => {
          onClick(presetName);
        }}
        className="
        w-full p-4 max-w-[100vw] ease-in-out duration-300 border-b border-slate-200 border-collapse cursor-pointer flex justify-center"
      >
        <p className="text-dark text-sm truncate text-center ">{presetName}</p>
        <GrFormClose className="text-red-500"></GrFormClose>
      </div>
    </>
  );
};

export default PresetItem;
