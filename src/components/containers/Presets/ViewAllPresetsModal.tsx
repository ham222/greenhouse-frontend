import ModalSmallScreen from "src/components/UI/ModalSmallScreen";
import PresetItem from "./PresetItem";
import { useEffect, useState } from "react";
import DeleteModal from "src/components/UI/DeleteModal";

interface ViewAllPresetsModalProps {
  open: boolean;
  onClose: () => void;
  presets: any;
  onPresetClick: (id: number) => void;
  onCreateNewClick(): void;
  onDeletePreset: (id: number) => void;
}

export default function ViewAllPresetsModal({
  open,
  onClose,
  presets,
  onPresetClick,
  onCreateNewClick,
  onDeletePreset,
}: ViewAllPresetsModalProps) {
  let showAlert: boolean = false;
  const [openState, setOpenState] = useState(false);
  const [deleteId, setDeleteId] = useState(0);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) onClose();
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  return (
    <>
      <ModalSmallScreen
        title={"Choose a preset"}
        open={open}
        onClose={onClose}
        showAlert={showAlert}
      >
        <div className="justify-end flex flex-col gaitems-center ">
          {presets.map((item: any) => (
            <PresetItem
              onPresetClick={(name) => {
                onPresetClick(name);
                onClose();
              }}
              onDeletePreset={(id) => {
                setOpenState(true);
                setDeleteId(id);
              }}
              key={item.id}
              presetId={item.id}
              presetName={item.name}
            ></PresetItem>
          ))}
          <div className="flex flex-col mx-5 sm:flex-row justify-center sm:gap-10">
            <button
              className="bg-dark w-full sm:w-1/3 order-last text-white font-semibold
        p-3 rounded-xl mt-3 mb-4 text-lg hover:bg-slate-700 ease-in-out duration-200"
              onClick={() => {
                onCreateNewClick();
                onClose();
              }}
            >
              Create new Preset
            </button>
            <button
              className="bg-neutral-300 w-full sm:w-1/3 order-last text-dark font-semibold
        p-3 rounded-xl mt-3 mb-4 text-lg hover:bg-slate-700 ease-in-out duration-200"
              onClick={() => {
                onCreateNewClick();
                onClose();
              }}
            >
              Go Back
            </button>
          </div>
        </div>
        <DeleteModal
          open={openState}
          onConfirmDelete={() => onDeletePreset(deleteId)}
          onClose={() => setOpenState(false)}
        ></DeleteModal>
      </ModalSmallScreen>
    </>
  );
}
