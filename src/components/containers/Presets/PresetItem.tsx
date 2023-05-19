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
        w-full p-4 max-w-[100vw] ease-in-out duration-300 border-b border-slate-200 border-collapse cursor-pointer"
      >
        <p className="text-dark text-sm truncate text-center ">{presetName}</p>
      </div>
    </>
  );
};

export default PresetItem;
