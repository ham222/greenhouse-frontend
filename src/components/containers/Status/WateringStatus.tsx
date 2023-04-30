import { WiThermometer } from "react-icons/wi";
import { Link } from "react-router-dom";
import RectIcon from "src/components/UI/RectIcon";
import { DateTime, Duration, DurationUnits } from "luxon";

interface WateringStatusProps {
  isOnline: boolean;
  nextWatering: DateTime;
}

export default function WateringStatus({
  isOnline,
  nextWatering,
}: WateringStatusProps) {
  const status = isOnline ? "ON" : "OFF";

  //Rescale is performed twice. Once to shift miliseconds to all needed units, second time to remove empty miliseconds attribute after rounding it down to 0
  const timeToWatering = nextWatering
    .diff(DateTime.now())
    .rescale()
    .set({ milliseconds: 0 })
    .rescale()
    .toHuman({ unitDisplay: "narrow", listStyle: "narrow", useGrouping: false, maximumFractionDigits: 0 });

  return (
    <Link to="/watering">
      <div className="m-5 p-3 rounded-lg hover:bg-slate-700 duration-150 cursor-pointer bg-[#202329]">
        <div>
          <RectIcon
            bgColor={"white"}
            icon={<WiThermometer className="w-full h-full" />}
          />
        </div>
        <div className="mt-3 flex text-white flex-col justify-between ">
          <div className="font-bold">Water System: {status}</div>
          <div className="text-xs mt-2">
            Next watering in:
            <span className="font-bold whitespace-nowrap">
              {" "}
              {timeToWatering}
            </span>{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}
