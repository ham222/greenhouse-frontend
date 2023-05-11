import { DateTime } from "luxon";

interface HourPickerProps {
  updateValue: (time: DateTime) => void;
  value: DateTime;
}

export default function HourPicker({ updateValue, value }: HourPickerProps) {
  const hours = value.toFormat("HH");
  const minutes = value.toFormat("mm");

  const leadingZero = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  const update = (hours: string, minutes: string) => {
    const time = DateTime.fromObject({
      hour: parseInt(hours),
      minute: parseInt(minutes),
    });

    updateValue(time);
  };

  const handleHours = (value: string) => {
    const intHours = parseInt(value);

    if (isNaN(intHours) || intHours < 0 || intHours > 23) {
      return;
    }

    const formattedHours = leadingZero(intHours);
    update(formattedHours, minutes);
  };

  const handleMinutes = (value: string) => {
    const intMinutes = parseInt(value);

    if (isNaN(intMinutes) || intMinutes < 0 || intMinutes > 59) {
      return;
    }

    const formattedMinutes = leadingZero(intMinutes);
    update(hours, formattedMinutes);
  };

  return (
    <div>
      <div className="flex justify-center items-center font-bold text-5xl">
        <div className="w-20">
          <input
            type="number"
            className="w-full min-w-0 block focus:outline-none focus:text-red-600 rounded-md border-0 text-gray-900 text-center ring-gray-300 placeholder:text-gray-400"
            value={hours}
            onChange={(e) => handleHours(e.target.value)}
            max="23"
            min="0"
            data-testid="hour-input"
          />
        </div>
        <div>:</div>
        <div className="w-20">
          <input
            type="number"
            className="w-full min-w-0 block focus:outline-none focus:text-red-600 rounded-md border-0 text-gray-900 text-center ring-gray-300 placeholder:text-gray-400"
            value={minutes}
            onChange={(e) => handleMinutes(e.target.value)}
            max="59"
            min="0"
            data-testid="minute-input"
          />
        </div>
      </div>
    </div>
  );
}
