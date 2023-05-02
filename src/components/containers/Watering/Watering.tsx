import IconButton from "src/components/UI/IconButton";
import { IoIosAdd } from "react-icons/io";
import WaterToggle from "./WaterToggle";
import WaterRuntime from "./WaterRuntime";
import { DateTime } from "luxon";
import CreateIntervalModal from "./CreateIntervalModal";
import { Fragment, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { WeekDays } from "src/domain/WeekDays";
import { groupIntervals } from "src/utils/groupIntervals";
import { GroupedIntervals } from "src/domain/GroupedIntervals";
import ScheduleColumn from "./ScheduleColumn";

export default function Watering() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
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
        startTime: DateTime.fromObject({ hour: 9, minute: 9 }),
        endTime: DateTime.fromObject({ hour: 9, minute: 9 }),
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

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 640);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="m-3">
        <div className="text-center text-xl my-7 items-center justify-center lg:mb-4 lg:justify-left sm:flex font-bold">
          Watering Schedule
          <div className="hidden ml-5 sm:block">
            <IconButton
              onClick={() => setOpen(true)}
              icon={<IoIosAdd className="text-white w-full h-full" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6">
            <WaterToggle
              value={isWatering}
              updateValue={() => setIsWatering(!isWatering)}
            />
          </div>
        </div>

        {isMobile ? (
          <Tab.Group>
            <div className="overflow-hidden h-20">
              <Tab.List className="flex min-w-full justify-between flex-shrink-0 gap-4 overflow-x-scroll overflow-y-hidden">
                {WeekDays.map((day) => (
                  <Tab key={day} as={Fragment}>
                    {({ selected }) => (
                      <div
                        className={[
                          "font-semibold flex-grow focus:outline-0 cursor-pointer text-center w-14 flex justify-center items-center h-16 my-4 py-4 px-2 flex-shrink-0 rounded-lg",
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
            <div className="font-semibold mt-10 mb-2">Timeline</div>
            <div className="mt-3">
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
        ) : (
          <div className="grid grid-cols-7">
            {WeekDays.map((day) => (
              <ScheduleColumn day={day} intervals={intervals[day]} />
            ))}
          </div>
        )}
      </div>
      <CreateIntervalModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
