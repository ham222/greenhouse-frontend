import { WiThermometer } from "react-icons/wi";
import IconButton from "src/components/UI/IconButton";

export default function WateringStatus() {
  const status = "OFF";
  const timeToWatering = "3m 23s";

  return (
    <div className="w-auto flex justify-between m-5 p-2 rounded-lg bg-[#F1F3F5]">
      <div className=" flex flex-col justify-between ">
        <div className="font-bold">Watering System: {status}</div>
        <div className="text-xs mt-2">Next watering in: {timeToWatering} </div>
      </div>
      <div className=" flex justify-end items-center">
        <IconButton
          onClick={() => {}}
          icon={<WiThermometer className="w-full h-full text-white" />}
        />
      </div>
    </div>
  );
}
