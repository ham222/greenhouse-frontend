import Modal from "src/components/UI/Modal";
import { useState } from "react";
import DurationPicker from "src/components/UI/DurationPicker";

interface RunWateringModalProps {
  open: boolean;
  onClose: () => void;
  onRun: (isOn: boolean, duration: number) => void;
}

export default function RunWateringModal({
  open,
  onClose,
  onRun,
}: RunWateringModalProps) {
  const [duration, setDuration] = useState(5);

  const isValid = (duration : number) => {
    return duration > 0 && Number.isInteger(duration);
  };

  const updateDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <Modal title={"Start watering system "} open={open} onClose={onClose}>
      <div>
        <DurationPicker value={duration} updateValue={updateDuration} />
      </div>
      <div className="px-4 py-3 flex flex-row-reverse sm:px-6">
        <button
          type="button"
          disabled={!isValid(duration)}
          className="inline-flex disabled:text-gray-300 max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-[#F2F4F5] px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
          onClick={() => {
            onRun(true, duration);
            onClose();
          }}
        >
          Confirm
        </button>
        <button
          type="button"
          className="inline-flex max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-[#F2F4F5] px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
