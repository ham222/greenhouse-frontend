import { BsArrowUp } from "react-icons/bs";
let CurrentValBox = () => {
  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="flex flex-col bg-[#BFFA00] rounded w-[85%] rounded-[0.625rem]">
          <div className="flex px-[3vw]">
            <div className="flex items-baseline">
              <h1 className="text-[3rem] font-semibold">21°C</h1>
              <BsArrowUp className="text-[2rem] "></BsArrowUp>
            </div>

            <div className="flex flex-col mt-[.5rem] ml-[1rem]">
              <h3>Your Greenhouse</h3>
              <h5>at 10:08 10/12/2023</h5>
            </div>
          </div>
          <div className="flex border-[#21252A] border-t-[3px] border-dashed px-[3vw]">
            <div className="flex flex-col">
              <h2>37%</h2>
              <h5>Humidity</h5>
            </div>
            <div className="flex flex-col ">
              <h2>20.5%</h2>
              <h5>
                CO<sub>2</sub>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CurrentValBox;
