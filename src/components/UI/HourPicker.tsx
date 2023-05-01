import { DateTime } from "luxon";
import { useState } from "react";

interface HourPickerProps {
  updateValue: (time: DateTime) => void;
  value: DateTime;
}

export default function HourPicker({
  updateValue,
  value,
}: HourPickerProps) {
  const [hours, setHours] = useState(value.toFormat("HH"));
  const [minutes, setMinutes] = useState(value.toFormat("mm"));

  const leadingZero = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const update = (hours: string, minutes: string) => {
    const time = DateTime.fromObject({
      hour: parseInt(hours),
      minute: parseInt(minutes),
    });

    updateValue(time);
    console.log(time.toObject());
  };

  const handleHours = (value: string) => {
    const intHours = parseInt(value);

    if (isNaN(intHours) || intHours < 0 || intHours > 23) {
      return;
    }

    const formattedHours = leadingZero(intHours);
    setHours(formattedHours);
    update(formattedHours, minutes);
  };

  const handleMinutes = (value: string) => {
    const intMinutes = parseInt(value);

    if (isNaN(intMinutes) || intMinutes < 0 || intMinutes > 59) {
      return;
    }

    const formattedMinutes = leadingZero(intMinutes);
    setMinutes(formattedMinutes);
    update(hours, formattedMinutes);
  };

  return (
    <div className="flex justify-center items-center font-bold text-5xl">
      <div>
        <input
          type="number"
          className="block w-18 focus:outline-none focus:text-red-600 rounded-md border-0 text-gray-900 text-center ring-gray-300 placeholder:text-gray-400"
          placeholder="00"
          value={hours}
          onChange={(e) => handleHours(e.target.value)}
          max="23"
          min="0"
        />
      </div>
      <div>:</div>
      <div>
        <input
          type="number"
          className="block w-18 focus:outline-none focus:text-red-600 rounded-md border-0 text-gray-900 text-center ring-gray-300 placeholder:text-gray-400"
          placeholder="00"
          value={minutes}
          onChange={(e) => handleMinutes(e.target.value)}
          max="59"
          min="0"
        />
      </div>
    </div>
  );
}
