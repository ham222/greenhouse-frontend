import { BsArrowUp } from "react-icons/bs";
interface CurrentValBoxProps {
  temperature: string;
  co2: string;
  humidity: string;
  datetime: string;
}
let CurrentValBox = ({
  temperature,
  co2,
  humidity,
  datetime,
}: CurrentValBoxProps): JSX.Element => {
  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div className="flex flex-col bg-neon max-w-[90%] h-[40%] rounded-[0.625rem] ">
          <div className="flex px-[3vw] py-[1vw] lg:py-[.7vw] ">
            <div className="flex items-baseline">
              <h1 className="text-[3rem] font-bold">{temperature}°C</h1>
              <BsArrowUp className="text-[2rem] "></BsArrowUp>
            </div>

            <div className="flex flex-col mt-[.7rem] ml-[1rem] ">
              <h3 className="font-bold">Your Greenhouse</h3>
              <h5 className="text-[.85rem]">at {datetime}</h5>
            </div>
          </div>
          <div className="flex border-[#21252A] border-t-[3px] border-dashed px-[3vw] py-[1vw] lg:py-[.7vw] ">
            <div className="flex flex-col">
              <h2 className="text-[1.2rem] font-bold">{humidity}%</h2>
              <h5>Humidity</h5>
            </div>
            <div className="flex flex-col ml-[10%]">
              <h2 className="text-[1.2rem] font-bold">{co2} ppm</h2>
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
