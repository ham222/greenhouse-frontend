import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { DateTime } from "luxon";
import HourPicker from "src/components/UI/HourPicker";
import Modal from "src/components/UI/Modal";
import durationToString from "src/utils/durationToString";
import MiniDayPicker from "src/components/UI/MiniDayPicker";

interface IntervalModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateIntervalModal({
  open,
  onClose,
}: IntervalModalProps) {
  const now = DateTime.now();

  const [startTime, setStartTime] = useState(
    DateTime.fromObject({
      hour: now.hour,
      minute: now.minute,
    })
  );
  const [endTime, setEndTime] = useState(
    DateTime.fromObject({
      hour: now.hour,
      minute: now.minute + 5,
    })
  );
  const [duration, setDuration] = useState(endTime.diff(startTime));

  useEffect(() => {
    const difference = endTime.diff(startTime);

    setDuration(difference);
  }, [startTime, endTime]);

  const isValid = () => {
    return duration.as("milliseconds") > 0;
  };

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
            <div className="my-14 sm:flex sm:justify-between">
              <div>
                <HourPicker value={startTime} updateValue={setStartTime} />
              </div>
              <div className="mt-20 sm:ml-8 sm:mt-0">
                <HourPicker value={endTime} updateValue={setEndTime} />
              </div>
            </div>
            <div className="text-xl">
              Total time:{" "}
              <span className="font-semibold">
                {isValid() ? durationToString(duration) : "Invalid"}
              </span>
            </div>
            <div>
              <MiniDayPicker />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex  flex-row-reverse sm:px-6">
        <button
          type="button"
          disabled={!isValid()}
          className="inline-flex disabled:text-gray-300 max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-[#F2F4F5] px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
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
