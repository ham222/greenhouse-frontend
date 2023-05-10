import { DateTime } from "luxon";
import durationToString from "src/utils/durationToString";

interface WaterRuntimeProps {
  startTime: DateTime;
  endTime: DateTime;
}

export default function WaterRuntime({
  startTime,
  endTime,
}: WaterRuntimeProps) {
  return (
    <div
      data-testid="water-runtime"
      className="bg-[#E6F5FB] flex justify-between sm:justify-center py-3 px-2 rounded-lg"
    >
      <div className="font-semibold sm:flex md:block flex-col justify-center items-center sm:text-xs lg:text-sm">
        <span data-testid="start-time" className="text-center">
          {startTime.toFormat("HH:mm")}
        </span>
        <span className="text-center sm:max-md:hidden"> - </span>
        <span data-testid="end-time" className="text-center">
          {endTime.toFormat("HH:mm")}
        </span>
      </div>
      <div className="sm:hidden">
        Runtime:{" "}
        <span data-testid="duration" className="font-semibold">
          {durationToString(endTime.diff(startTime))}
        </span>
      </div>
    </div>
  );
}
