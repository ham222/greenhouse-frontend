import IconButton from "src/components/UI/IconButton";
import { IoIosAdd } from "react-icons/io";
import DayPicker from "./DayPicker";
import WaterToggle from "./WaterToggle";
import WaterRuntime from "./WaterRuntime";
import { DateTime } from "luxon";

export default function Watering() {
  return (
    <div className="m-3 flex flex-col">
      <div className="text-center my-7 font-bold">Watering Schedule</div>
      <div>
        <WaterToggle />
        <DayPicker />
      </div>
      <div className="font-semibold mt-10 mb-2">Timeline</div>
      <div>
        <IconButton icon={<IoIosAdd className="text-white w-full h-full" />} />
      </div>
      <div className="space-y-4 mt-4">
        <WaterRuntime
          startTime={DateTime.now()}
          endTime={DateTime.now().plus({ minutes: 15 })}
        />
      </div>
    </div>
  );
}
