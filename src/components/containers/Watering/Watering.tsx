import IconButton from "src/components/UI/IconButton";
import { IoIosAdd } from "react-icons/io";
import WaterToggle from "./WaterToggle";
import WaterRuntime from "./WaterRuntime";
import { DateTime } from "luxon";
import CreateIntervalModal from "./CreateIntervalModal";
import { useState } from "react";
import { Interval } from "src/domain/Interval";
import { Tab } from "@headlessui/react";
import { WeekDays } from "src/domain/WeekDays";

export default function Watering() {
  const [open, setOpen] = useState(false);
  const [intervals, setIntervals] = useState<Interval[]>([
    {
      startTime: DateTime.fromObject({ hour: 5, minute: 0 }),
      endTime: DateTime.fromObject({ hour: 6, minute: 0 }),
      dayOfWeek: "Monday",
    },
    {
      startTime: DateTime.fromObject({ hour: 5, minute: 0 }),
      endTime: DateTime.fromObject({ hour: 6, minute: 0 }),
      dayOfWeek: "Wednesday",
    },
    {
      startTime: DateTime.fromObject({ hour: 5, minute: 0 }),
      endTime: DateTime.fromObject({ hour: 6, minute: 0 }),
      dayOfWeek: "Friday",
    },
  ]);

  return (
    <>
      <div className="m-3 flex flex-col">
        <div className="text-center text-xl my-7 font-bold">
          Watering Schedule
        </div>
        <div>
          <WaterToggle />
          <Tab.Group>
            <div className="overflow-hidden h-20">
              <Tab.List className="flex flex-shrink-0 gap-4 overflow-x-scroll overflow-y-hidden">
                {WeekDays.map((day) => (
                  <Tab
                    key={day}
                    className={[
                      "font-semibold",
                      "cursor-pointer",
                      "text-center",
                      "w-14",
                      "flex",
                      "justify-center",
                      "items-center",
                      "h-16",
                      "my-4",
                      "py-4",
                      "px-2",
                      "flex-shrink-0",
                      "rounded-lg",
                      intervals.find((interval) => interval.dayOfWeek === day)
                        ? "bg-[#E6F5FB]"
                        : "bg-[#F2F4F5]",
                    ].join(" ")}
                  >
                    {day.substring(0, 3)}
                  </Tab>
                ))}
              </Tab.List>
            </div>
          </Tab.Group>
        </div>
        <div className="font-semibold mt-10 mb-2">Timeline</div>
        <div>
          <IconButton
            onClick={() => setOpen(true)}
            icon={<IoIosAdd className="text-white w-full h-full" />}
          />
        </div>
        <div className="space-y-4 mt-4">
          <WaterRuntime
            startTime={DateTime.now()}
            endTime={DateTime.now().plus({ minutes: 15 })}
          />
        </div>
      </div>
      <CreateIntervalModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
