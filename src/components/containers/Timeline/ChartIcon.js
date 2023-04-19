
export default function ChartIcon({bgColor, icon}) {
  return (
    <div style={{backgroundColor:bgColor}} className="w-10 h-10 p-1 rounded-xl bg-[#FFDCB6] flex justify-center items-center ">
      {icon}
    </div>
  );
}
