import Modal from "src/components/UI/Modal";

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
        <div className="flex justify-center relative top-0">
          <button
            className="bg-[#202329] text-white w-4/5 font-semibold
        py-4 rounded-3xl hover:bg-slate-700 ease-in-out duration-200 md:hidden"
          >
            Create new Preset
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ViewAllPresetsModal;
