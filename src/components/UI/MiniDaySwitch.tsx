interface MiniDayProps {
  day: string;
  value: boolean;
  updateValue: (value: boolean) => any;
}

export default function MiniDay({ day, value, updateValue }: MiniDayProps) {
  const toggleCheck = () => {
    updateValue(!value);
  };

  return (
    <div
      onClick={() => toggleCheck()}
      className={[
        "w-8",
        "h-8",
        "rounded-lg",
        "cursor-pointer",
        "font-semibold",
        "grid",
        "duration-100",
        "select-none",
        "place-items-center",
        value ? "bg-[#202329]" : "bg-[#F2F4F5]",
        value ? "text-white" : "",
      ].join(" ")}
    >
      {day.charAt(0)}
    </div>
  );
}
