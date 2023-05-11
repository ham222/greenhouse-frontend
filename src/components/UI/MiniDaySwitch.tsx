import classNames from "classnames";

interface MiniDayProps {
  day: string;
  value: boolean;
  updateValue: (value: boolean) => void;
}

export default function MiniDaySwitch({
  day,
  value,
  updateValue,
}: MiniDayProps) {
  const toggleCheck = () => {
    updateValue(!value);
  };

  return (
    <div data-testid={day+"-switch"}
      onClick={() => toggleCheck()}
      className={classNames(
        "w-8",
        "h-8",
        "rounded-lg",
        "cursor-pointer",
        "font-semibold",
        "grid",
        "duration-100",
        "select-none",
        "place-items-center",
        {
          "bg-[#202329]": value,
          "bg-[#F2F4F5]": !value,
          "text-white": value,
        }
      )}
    >
      {day.charAt(0)}
    </div>
  );
}
