export default function DayPicker() {
  const weekDays: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      <div className="overflow-hidden h-20">
        <div className="flex flex-shrink-0 overflow-x-scroll overflow-y-hidden h-21">
          {weekDays.map((day) => (
            <div className="mr-4 font-semibold text-center w-14 flex justify-center items-center h-16 my-4 py-4 px-2 flex-shrink-0 rounded-lg bg-[#F2F4F5]">
              {day.substring(0, 3)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
