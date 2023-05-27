interface Props {
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
}: Props): JSX.Element => {
  return (
    <div
      data-testid="current-val-box"
      className="bg-[#bffa00] font-sora shadow-lg max-sm:w-auto grid rounded-xl grid-cols-9 grid-rows-5"
    >
      <div className="col-span-4 row-span-3 border-b border-black border-dashed text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold flex justify-center items-center py-5">
        {temperature}°C
      </div>
      <div className="col-span-5 row-span-3 border-b border-black border-dashed flex items-center justify-center">
        <div>
          <div className="text-lg sm:text-xl xl:text-2xl font-bold">
            Your Greenhouse
          </div>
          <div className="text-sm md:text-md xl:text-lg">at {datetime}</div>
        </div>
      </div>
      <div className="col-span-3 py-1 row-span-2 flex items-center justify-center">
        <div>
          <div className="font-bold text-2xl">{humidity}%</div>
          <div className="text-md">Humidity</div>
        </div>
      </div>
      <div className="col-span-3 row-span-2 flex items-center justify-center">
        <div>
          <div className="font-bold text-2xl">{co2} ppm</div>
          <div className="text-md">
            CO<sub>2</sub>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurrentValBox;
