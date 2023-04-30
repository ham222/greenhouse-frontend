import DayPicker from "./DayPicker";

export default function Watering() {

    return (
    <div className="m-3">
      <div className="text-center my-8 font-bold">Watering Schedule</div>
      <div>
        <DayPicker/>
        <div className="flex justify-end mt-1 mr-2">{">>"}</div>
      </div>
    </div>
  );
}
