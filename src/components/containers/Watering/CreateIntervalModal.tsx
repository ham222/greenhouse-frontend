import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { DateTime } from "luxon";
import HourPicker from "src/components/UI/HourPicker";
import Modal from "src/components/UI/Modal";
import durationToString from "src/utils/durationToString";
import MiniDayPicker from "src/components/UI/MiniDayPicker";
import { WeekDay } from "src/domain/WeekDay";
import { DayPick } from "src/domain/DayPick";
import Interval from "src/domain/Interval";
interface IntervalModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newIntervals: Interval[]) => void;
}

export default function CreateIntervalModal({
  open,
  onClose,
  onAdd,
}: IntervalModalProps) {
  const now = DateTime.now();
  const weekDays: WeekDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [startTime, setStartTime] = useState(
    DateTime.fromObject({
      hour: now.hour,
      minute: now.minute,
    })
  );
  const [endTime, setEndTime] = useState(
    DateTime.fromObject({
      hour: now.hour,
      minute: now.minute,
    }).plus({ minutes: 5 })
  );
  const [duration, setDuration] = useState(endTime.diff(startTime));

  const [dayPicks, setDayPicks] = useState<DayPick[]>(() =>
    weekDays.map((day) => ({ day, picked: false }))
  );

  const updateDayPicks = (day: WeekDay, value: boolean) => {
    setDayPicks((prev) =>
      prev.map((dp) => (dp.day === day ? { ...dp, picked: value } : dp))
    );
  };

  useEffect(() => {
    const difference = endTime.diff(startTime);

    setDuration(difference);
  }, [startTime, endTime]);

  const generateNewIntervals = () => {
    let format = "hh:mm:ss";
    let newIntervals: Interval[] = [];
    for (let i = 0; i < dayPicks.length; i++) {
      if (dayPicks[i].picked) {
        newIntervals.push(
          new Interval(startTime.toFormat(format), endTime.toFormat(format), i)
        );
      }
    }

    return newIntervals;
  };

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
              {/* LIMITATION TO ADDRESS: You cannot pick hours from two different days.*/}
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
            <div className="mt-8">
              <MiniDayPicker value={dayPicks} updateValue={updateDayPicks} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex  flex-row-reverse sm:px-6">
        <button
          type="button"
          disabled={!isValid() || !open}
          className="inline-flex disabled:text-gray-300 max-sm:basis-1/2 max-sm:mx-4 justify-center rounded-md bg-[#F2F4F5] px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
          onClick={() => {
            onAdd(generateNewIntervals());
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
