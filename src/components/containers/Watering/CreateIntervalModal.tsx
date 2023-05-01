import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import HourPicker from "src/components/UI/HourPicker";
import Modal from "src/components/UI/Modal";

interface IntervalModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateIntervalModal({
  open,
  onClose,
}: IntervalModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white p-6">
        <div className="flex  items-center justify-center sm:items-start">
          <div className="mt-3 flex flex-col text-center sm:ml-4 sm:mt-0">
            <Dialog.Title
              as="h3"
              className="text-xl text-center font-semibold leading-6 text-gray-900"
            >
              New interval
            </Dialog.Title>
            <div className="mt-20 sm:flex sm:justify-between">
              <div>
                <HourPicker />
              </div>
              <div className="mt-20 sm:ml-8 sm:mt-0">
                <HourPicker />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex  flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-[#F2F4F5] px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
          onClick={() => onClose()}
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
