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
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) onClose();
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  const [openState, setOpenState] = useState(false);

  return (
    <>
      <ModalSmallScreen
        title={"Choose a preset"}
        open={open}
        onClose={onClose}
        showAlert={showAlert}
      >
        <div className="justify-end flex flex-col gaitems-center">
          <button
            className="bg-dark w-full order-last text-white font-semibold
        p-3 rounded-lg mt-3 mb-4 text-lg hover:bg-slate-700 ease-in-out duration-200"
            onClick={() => {
              onCreateNewClick();
              onClose();
            }}
          >
            Create new Preset
          </button>
          {presets.map((item: any) => (
            <PresetItem
              onPresetClick={(name) => {
                onPresetClick(name);
                onClose();
              }}
              onDeletePreset={(id) => {
                onDeletePreset(id);
                setOpenState(true);
              }}
              key={item.id}
              presetId={item.id}
              presetName={item.name}
            ></PresetItem>
          ))}
        </div>
        <DeleteModal
          open={openState}
          onClose={() => setOpenState(false)}
        ></DeleteModal>
      </ModalSmallScreen>
    </>
  );
}
