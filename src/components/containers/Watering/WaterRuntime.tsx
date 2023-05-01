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
    <div className="bg-[#E6F5FB] flex justify-between py-3 px-2 rounded-lg">
      <div className="font-semibold">
        {startTime.toFormat("hh:mm")} - {endTime.toFormat("hh:mm")}
      </div>
      <div>
        Runtime:{" "}
        <span className="font-semibold">
          {durationToString(endTime.diff(startTime))}
        </span>
      </div>
    </div>
  );
}
