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
        className="bg-[#ECFFAE]  w-4/5 
        py-4 rounded-3xl   ease-in-out duration-300 my-3 cursor-pointer hover:scale-105 hover:shadow-xl"
      >
        <p className="text-dark font-semibold text-2xl text-center ">
          {presetName}
        </p>
      </div>
    </>
  );
};

export default PresetItem;
