import Modal from "src/components/UI/Modal";
import PresetItem from "./PresetItem";

interface ViewAllPresetsModalProps {
  open: boolean;
  onClose: () => void;
}

let ViewAllPresetsModal = ({
  open,
  onClose,
}: ViewAllPresetsModalProps): JSX.Element => {
  return (
    <>
      <Modal title={""} open={open} onClose={onClose}>
        <div className="flex flex-col items-center ">
          <button
            className="bg-[#202329] text-white w-4/5 font-semibold
        py-4 rounded-3xl mt-3 mb-4 text-lg hover:bg-slate-700 ease-in-out duration-200 md:hidden"
            onClick={() => onClose()}
          >
            Create new Preset
          </button>
          <PresetItem></PresetItem>
          <PresetItem></PresetItem>
          <PresetItem></PresetItem>
        </div>
      </Modal>
    </>
  );
};

export default ViewAllPresetsModal;
