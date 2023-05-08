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
    <div className="bg-[#E6F5FB] flex justify-between sm:justify-center py-3 px-2 rounded-lg">
      <div className="font-semibold sm:flex lg:block flex-col justify-center items-center sm:text-xs md:text-sm">
        <span className="text-center">{startTime.toFormat("hh:mm")}</span> 
        <span className="text-center sm:max-lg:hidden"> - </span>
        <span className="text-center">{endTime.toFormat("hh:mm")}</span>
      </div>
      <div className="sm:hidden">
        Runtime:{" "}
        <span className="font-semibold">
          {durationToString(endTime.diff(startTime))}
        </span>
      </div>
    </div>
  );
}
