import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import HourPicker from "src/components/UI/HourPicker";
import Modal from "src/components/UI/Modal";
import durationToString from "src/utils/durationToString";
import IntervalDto from "src/domain/IntervalDto";
import Interval from "src/domain/Interval";
interface IntervalModalProps {
  open: boolean;
  toUpdate: Interval;
  onClose: () => void;
  onUpdate: (dto: IntervalDto) => void;
}

export default function UpdateIntervalModal({
  open,
  toUpdate,
  onClose,
  onUpdate,
}: IntervalModalProps) {
  useEffect(() => {
    setStartTime(
      DateTime.fromObject({
        hour: toUpdate.startTime.hour,
        minute: toUpdate.startTime.minute,
      })
    );
    setEndTime(
      DateTime.fromObject({
        hour: toUpdate.endTime.hour,
        minute: toUpdate.endTime.minute,
      })
    );
  }, [toUpdate]);

  const [startTime, setStartTime] = useState(
    DateTime.fromObject({
      hour: toUpdate.startTime.hour,
      minute: toUpdate.startTime.minute,
    })
  );
  const [endTime, setEndTime] = useState(
    DateTime.fromObject({
      hour: toUpdate.endTime.hour,
      minute: toUpdate.endTime.minute,
    })
  );

  const isValid = () => {
    return duration.as("milliseconds") > 0;
  };

  const duration = endTime.diff(startTime);

  return (
    <Modal title={"Update interval"} open={open} onClose={onClose}>
      <div className="bg-white p-6">
        <div className="flex items-center justify-center sm:items-start">
          <div className="mt-3 flex flex-col text-center sm:ml-4 sm:mt-0">
            <div className="mb-14 sm:flex sm:justify-between">
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
          </div>
        </div>
      </div>
      <div className="px-4 py-2 text-gray-500 text-center">
        Please note! <br />
        The watering schedule will be updated at midnight.
      </div>
      <div className="px-4 py-3 flex flex-row-reverse sm:px-6">
        <button
          type="button"
          disabled={!isValid() || !open}
          className="inline-flex disabled:text-gray-300 max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
          onClick={() => {
            onUpdate(
              new IntervalDto(
                toUpdate.id,
                startTime,
                endTime,
                toUpdate.weekDayIndex
              )
            );
            onClose();
          }}
        >
          Confirm
        </button>
        <button
          type="button"
          className="inline-flex max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
