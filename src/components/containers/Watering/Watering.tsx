import IconButton from "src/components/UI/IconButton";
import { IoIosAdd } from "react-icons/io";
import WaterToggle from "./WaterToggle";
import WaterRuntime from "./WaterRuntime";
import { DateTime } from "luxon";
import CreateIntervalModal from "./CreateIntervalModal";
import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import { WeekDays } from "src/domain/WeekDays";
import { groupIntervals } from "src/utils/groupIntervals";
import { GroupedIntervals } from "src/domain/GroupedIntervals";

export default function Watering() {
  const [open, setOpen] = useState(false);
  const [isWatering, setIsWatering] = useState(false);
  const [intervals, setIntervals] = useState<GroupedIntervals>(
    groupIntervals([
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
      {
        startTime: DateTime.fromObject({ hour: 15, minute: 0 }),
        endTime: DateTime.fromObject({ hour: 15, minute: 30 }),
        dayOfWeek: "Friday",
      },
      {
        startTime: DateTime.fromObject({ hour: 16, minute: 0 }),
        endTime: DateTime.fromObject({ hour: 16, minute: 30 }),
        dayOfWeek: "Friday",
      },
      {
        startTime: DateTime.fromObject({ hour: 17, minute: 0 }),
        endTime: DateTime.fromObject({ hour: 17, minute: 30 }),
        dayOfWeek: "Friday",
      },
    ])
  );

  return (
    <>
      <div className="m-3 flex flex-col">
        <Tab.Group>
          <div className="text-center text-xl my-7 font-bold">
            Watering Schedule
          </div>
          <div>
            <WaterToggle
              value={isWatering}
              updateValue={() => setIsWatering(!isWatering)}
            />
            <div className="overflow-hidden h-20">
              <Tab.List className="flex flex-shrink-0 gap-4 overflow-x-scroll overflow-y-hidden">
                {WeekDays.map((day) => (
                  <Tab key={day} as={Fragment}>
                    {({ selected }) => (
                      <div
                        className={[
                          "font-semibold focus:outline-0 cursor-pointer text-center w-14 flex justify-center items-center h-16 my-4 py-4 px-2 flex-shrink-0 rounded-lg",
                          selected
                            ? "bg-[#202329] text-white"
                            : intervals[day].length > 0
                            ? "bg-[#E6F5FB]"
                            : "bg-[#F2F4F5]",
                        ].join(" ")}
                      >
                        {day.substring(0, 3)}
                      </div>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>
          </div>
          <div className="font-semibold mt-10 mb-2">Timeline</div>
          <div>
            <IconButton
              onClick={() => setOpen(true)}
              icon={<IoIosAdd className="text-white w-full h-full" />}
            />
          </div>
          <Tab.Panels className="mt-4">
            {WeekDays.map((day) => (
              <Tab.Panel key={day}>
                {intervals[day].map((interval, index) => (
                  <div key={index} className="mt-2">
                    <WaterRuntime
                      startTime={interval.startTime}
                      endTime={interval.endTime}
                    />
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <CreateIntervalModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
