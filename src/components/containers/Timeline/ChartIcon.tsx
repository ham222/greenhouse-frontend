interface ChartIconProps {
  bgColor: string;
  icon: React.ReactNode;
}
export default function ChartIcon({ bgColor, icon }: ChartIconProps) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="w-10 h-10 p-1 rounded-xl bg-[#FFDCB6] flex justify-center items-center "
    >
      {icon}
    </div>
  );
}
