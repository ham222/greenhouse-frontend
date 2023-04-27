import { BiHomeAlt } from "react-icons/bi";
import { BsFillBarChartFill, BsCalendar2Date } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="w-auto bg-gray-100 h-20 flex justify-around  flex-wrap items-center shadow-md sticky top-[20vw]">
      <div className="flex flex-col items-center justify-items-end">
        <BiHomeAlt className="text-4xl justify-items-center"></BiHomeAlt>
        <p>Home</p>
      </div>
      <div className="flex flex-col items-center justify-items-center">
        <BsFillBarChartFill className="text-4xl "></BsFillBarChartFill>
        <p>Timeline</p>
      </div>
      <div className="flex flex-col items-center justify-items-center">
        <BsCalendar2Date className="text-4xl"></BsCalendar2Date>
        <p>Watering</p>
      </div>
    </nav>
  );
}
