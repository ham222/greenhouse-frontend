import Interval from "src/domain/Interval";
import { WeekDay } from "src/domain/WeekDay";
import WaterRuntime from "./WaterRuntime";

interface ScheduleColumnProps {
  day: WeekDay;
  intervals: Interval[];
  onUpdate?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function ScheduleColumn({
  day,
  intervals,
  onUpdate = () => {},
  onDelete = () => {},
}: ScheduleColumnProps) {
  return (
    <div>
      <div className="my-4 font-semibold text-center">
        <span data-testid="short-day" className="md:hidden">
          {day.substring(0, 3)}
        </span>
        <span data-testid="long-day" className="hidden md:inline">
          {day}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {intervals.map((interval, index) => (
          <WaterRuntime
            onDelete={onDelete}
            onUpdate={onUpdate}
            key={index}
            interval={interval}
          />
        ))}
      </div>
    </div>
  );
}
