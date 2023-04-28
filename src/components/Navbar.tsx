import { NavLink } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { BsFillBarChartFill, BsCalendar2Date } from "react-icons/bs";

export default function Navbar() {
  return (
    <nav className="w-auto bg-[#EFEFEF] h-20 flex  justify-around items-center fixed bottom-0 left-0 right-0 rounded-t-[1.25rem] lg:w-[8rem] lg:flex-col lg:right-auto lg:top-0 lg:h-auto lg:justify-start  lg:rounded-tl-none lg:rounded-r-[1.25rem]">
      <NavLink to="/" activeClassName="selected">
        <div className="flex flex-col items-center justify-items-end lg:mt-20 text-[#979797] hover:text-[#21252A] cursor-pointer ease-in-out duration-300">
          <BiHomeAlt className="text-4xl justify-items-center "></BiHomeAlt>
          <p>Home</p>
        </div>
      </NavLink>
      <Link to="/timeline">
        <div className="flex flex-col items-center justify-items-center lg:mt-12 text-[#979797] hover:text-[#21252A] cursor-pointer ease-in-out duration-300">
          <BsFillBarChartFill className="text-4xl "></BsFillBarChartFill>
          <p>Timeline</p>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-items-center lg:mt-12 text-[#979797] hover:text-[#21252A] cursor-pointer ease-in-out duration-300">
        <BsCalendar2Date className="text-4xl"></BsCalendar2Date>
        <p>Watering</p>
      </div>
    </nav>
  );
}
