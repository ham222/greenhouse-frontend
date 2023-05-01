import { DateTime } from "luxon";
import { useState } from "react";

export default function HourPicker() {
  const [hours, setHours] = useState(DateTime.now().toFormat("HH"));
  const [minutes, setMinutes] = useState(DateTime.now().toFormat("mm"));

  const leadingZero = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const handleHours = (value: string) => {
    const intHours = parseInt(value);

    if (isNaN(intHours) || intHours < 0 || intHours > 23) {
      return;
    }

    const formattedHours = leadingZero(intHours);
    setHours(formattedHours);
  };

  const handleMinutes = (value: string) => {
    const intMinutes = parseInt(value);

    if (isNaN(intMinutes) || intMinutes < 0 || intMinutes > 59) {
      return;
    }

    const formattedMinutes = leadingZero(intMinutes);
    setMinutes(formattedMinutes);
  };

  return (
    <div className="flex justify-center items-center font-bold gap-1 text-4xl">
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
