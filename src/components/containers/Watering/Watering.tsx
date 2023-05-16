import IconButton from "src/components/UI/IconButton";
import { IoIosAdd } from "react-icons/io";
import WaterToggle from "./WaterToggle";
import WaterRuntime from "./WaterRuntime";
import { Duration } from "luxon";
import CreateIntervalModal from "./CreateIntervalModal";
import { Fragment, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { WeekDays } from "src/domain/WeekDays";
import { groupIntervals } from "src/utils/groupIntervals";
import { GroupedIntervals } from "src/domain/GroupedIntervals";
import ScheduleColumn from "./ScheduleColumn";
import Interval from "src/domain/Interval";
import RunWateringModal from "./RunWateringModal";
import { useGet } from "src/hooks/useGet";
import axios, { AxiosError } from "axios";
import { IntervalDto } from "src/domain/IntervalDto";
import { displayNetworkError } from "src/utils/errorToast";
import { CreateIntervalDto } from "src/domain/CreateIntervalDto";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function Watering() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const [intervalModalOpen, setIntervalModalOpen] = useState(false);
  const [durationModalOpen, setDurationModalOpen] = useState(false);
  const [isWatering, setIsWatering] = useState(false);
  const [intervals, setIntervals] = useState<GroupedIntervals>(
    groupIntervals([])
  );
  const getToggleResponse = useGet<{ state: boolean }>(
    `${API_URL}/watering-system/toggle`
  );

  if (getToggleResponse.error != null) {
    displayNetworkError(getToggleResponse.error.message);
  }

  useEffect(() => {
    let mounted = true;
    if (mounted && getToggleResponse.data != null) {
      setIsWatering(getToggleResponse.data.state);
    }
    return () => {
      mounted = false;
    };
  }, [getToggleResponse.data]);

  const runWateringService = async (isOn: boolean, duration: number) => {
    let success = true;
    try {
      let url = `${API_URL}/watering-system/toggle`;
      await axios.post(url, {
        state: isOn,
        duration: Duration.fromObject({ minutes: duration }).as("milliseconds"),
      });
    } catch (error) {
      success = false;
      const axiosError = error as AxiosError;
      displayNetworkError(axiosError.message);
    }

    if (success) {
      setIsWatering(isOn);
    }
  };

  const toggleWatering = () => {
    if (!isWatering) {
      setDurationModalOpen(true);
    } else {
      runWateringService(false, 0);
    }
  };

  const setSchedule = (intervals: IntervalDto[]) => {
    setIntervals(
      groupIntervals(
        intervals.map((dto) => {
          return new Interval(
            dto.id,
            dto.startTime,
            dto.endTime,
            dto.dayOfWeek
          );
        })
      )
    );
  };

  const intervalResponse = useGet<IntervalDto[]>(`${API_URL}/schedule`);
  useEffect(() => {
    let mounted = true;
    if (mounted && intervalResponse.data != null) {
      let intervalDtos: IntervalDto[];
      intervalDtos = intervalResponse.data;
      setSchedule(intervalDtos);
    }
    return () => {
      mounted = false;
    };
  }, [intervalResponse.data]);

  if (intervalResponse.error != null) {
    displayNetworkError(intervalResponse.error.message);
  }

  const updateInterval = async (id: number) => {};

  const deleteInterval = async (id: number) => {};

  const addInverval = async (newIntervals: CreateIntervalDto[]) => {
    try {
      let url = `${API_URL}/schedule`;
      const result = await axios.post(url, newIntervals);
      setSchedule(result.data as IntervalDto[]);
    } catch (error) {
      const axiosError = error as AxiosError;
      displayNetworkError(axiosError.message);
    }
  };
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
              onClick={() => setIntervalModalOpen(true)}
              icon={<IoIosAdd className="text-white w-full h-full" />}
            />
          </div>
        </div>

        <WaterToggle value={isWatering} updateValue={() => toggleWatering()} />

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
                onClick={() => setIntervalModalOpen(true)}
                icon={<IoIosAdd className="text-white w-full h-full" />}
              />
            </div>
            <Tab.Panels className="mt-4">
              {WeekDays.map((day) => (
                <Tab.Panel key={day}>
                  {intervals[day].map((interval, index) => (
                    <div key={index} className="mt-2">
                      <WaterRuntime
                        onUpdate={updateInterval}
                        onDelete={deleteInterval}
                        interval={interval}
                      />
                    </div>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        ) : (
          <div className="grid gap-3 grid-cols-7">
            {WeekDays.map((day) => (
              <ScheduleColumn
                onUpdate={updateInterval}
                onDelete={deleteInterval}
                key={day}
                day={day}
                intervals={intervals[day]}
              />
            ))}
          </div>
        )}
      </div>
      <CreateIntervalModal
        onAdd={addInverval}
        open={intervalModalOpen}
        onClose={() => setIntervalModalOpen(false)}
      />
      <RunWateringModal
        onRun={runWateringService}
        open={durationModalOpen}
        onClose={() => setDurationModalOpen(false)}
      />
    </>
  );
}
