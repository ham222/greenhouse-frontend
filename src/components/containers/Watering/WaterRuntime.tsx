import { DateTime } from "luxon";
import durationToString from "src/utils/durationToString";
import Button from "src/components/UI/TextButton";
import { useState } from "react";
import classNames from "classnames";
interface WaterRuntimeProps {
  startTime: DateTime;
  endTime: DateTime;
}

export default function WaterRuntime({
  startTime,
  endTime,
}: WaterRuntimeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <div
      data-testid="water-runtime"
      tabIndex={0}
      onFocus={() => open(true)}
      onBlur={() => open(false)}
      className="bg-[#E6F5FB] cursor-pointer relative rounded-lg"
    >
      <div className="flex justify-between shadow-md rounded-lg sm:justify-center py-3 px-2">
        <div className="font-semibold sm:flex lg:block flex-col justify-center items-center sm:text-xs lg:text-sm">
          <span data-testid="start-time" className="text-center">
            {startTime.toFormat("HH:mm")}
          </span>
          <span className="text-center sm:max-lg:hidden"> - </span>
          <span data-testid="end-time" className="text-center">
            {endTime.toFormat("HH:mm")}
          </span>
        </div>
        <div className="sm:hidden">
          Runtime:{" "}
          <span data-testid="duration" className="font-semibold">
            {durationToString(endTime.diff(startTime))}
          </span>
        </div>
      </div>
      <div
        className={classNames(
          { "rounded-b-lg": isOpen },
          { "h-12": isOpen },
          { "sm:max-xl:h-[5.5rem]": isOpen },
          { "h-0": !isOpen },
          { "rounded-b-lg": isOpen },
          "duration-300",
          "transition-[height]",
          "overflow-hidden",
          "grid",
          "items-start"
        )}
      >
        <div className="m-2 flex sm:max-xl:flex-col gap-2 justify-between">
          <div className="w-full h-full">
            <Button onClick={() => {}} text="Update" />
          </div>
          <div className="w-full h-full">
            <Button onClick={() => {}} text="Delete" />
          </div>
        </div>
      </div>
    </div>
  );
}
