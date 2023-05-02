import { NavLink } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { BsFillBarChartFill, BsCalendar2Date } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="w-[auto] bg-[#EFEFEF] h-20 flex  justify-around items-center fixed bottom-0 left-0 right-0 rounded-t-[1.25rem] md:w-[6rem] md:flex-col md:right-auto md:top-0 md:h-auto md:justify-start  md:rounded-tl-none md:rounded-r-[1.25rem] 2xl:w-[8rem]">
      <NavLink to="/">
        <div className="flex flex-col items-center justify-items-end md:mt-20 text-[#979797] hover:text-[#21252A] cursor-pointer ease-in-out duration-300">
          <BiHomeAlt className="text-4xl justify-items-center "></BiHomeAlt>
          <p>Home</p>
        </div>
      </NavLink>
      <NavLink to="/timeline">
        <div className="flex flex-col items-center justify-items-center md:mt-12 text-[#979797] hover:text-[#21252A] cursor-pointer ease-in-out duration-300">
          <BsFillBarChartFill className="text-4xl "></BsFillBarChartFill>
          <p>Timeline</p>
        </div>
      </NavLink>
      <NavLink to="/watering">
        <div className="flex flex-col items-center justify-items-center md:mt-12 text-[#979797] hover:text-[#21252A] cursor-pointer ease-in-out duration-300">
          <BsCalendar2Date className="text-4xl"></BsCalendar2Date>
          <p>Watering</p>
        </div>
      </NavLink>
    </nav>
  );
}
