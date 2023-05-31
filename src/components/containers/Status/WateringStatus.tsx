import { AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import RectIcon from "src/components/UI/RectIcon";
import { Duration } from "luxon";

interface WateringStatusProps {
  isOnline: boolean;
  timeToWatering: Duration;
}

export default function WateringStatus({
  isOnline,
  timeToWatering,
}: WateringStatusProps) {
  const status = isOnline ? "ON" : "OFF";

  return (
    <Link data-testid="watering-status" to="/watering">
      <div className="p-3 rounded-lg hover:bg-dark-light duration-150 cursor-pointer bg-dark">
        <div>
          <RectIcon
            bgColor={"white"}
            icon={<AiOutlineCalendar className="w-full h-full" />}
          />
        </div>
        <div className="mt-3 flex text-white flex-col justify-between ">
          <div data-testid="current-watering-status" className="font-bold">
            Water System: {status}
          </div>
        </div>
      </div>
    </Link>
  );
}
