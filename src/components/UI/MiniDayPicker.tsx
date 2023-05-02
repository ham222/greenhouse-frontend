import MiniDay from "./MiniDaySwitch";
import { WeekDay } from "src/domain/WeekDay";
import { DayPick } from "src/domain/DayPick";

interface MiniDayPickerProps {
  value: DayPick[];
  updateValue: (day: WeekDay, value: boolean) => void;
}

export default function MiniDayPicker({
  value,
  updateValue,
}: MiniDayPickerProps) {
  return (
    <div className="flex justify-center gap-4">
      {value.map(({ day }) => (
        <MiniDay
          key={day}
          value={value.find((dp) => dp.day === day)?.picked || false}
          updateValue={(value: boolean) => updateValue(day, value)}
          day={day}
        />
      ))}
    </div>
  );
}
