import { WiThermometer } from "react-icons/wi";
import { Link } from "react-router-dom";
import RectIcon from "src/components/UI/RectIcon";

export default function WateringStatus() {
  const status = "OFF";
  const timeToWatering = "3h 3min 23s";

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
            Next watering in:{" "}
            <span className="font-bold whitespace-nowrap">
              {timeToWatering}
            </span>{" "}
          </div>
        </div>
      </div>
    </Link>
  );
}
