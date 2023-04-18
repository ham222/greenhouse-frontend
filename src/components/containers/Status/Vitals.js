
export default function Vitals({ temperature, co2, humidity, datetime }) {
  return (
    <div className="bg-[#bffa00] font-sora shadow-lg max-sm:w-auto grid rounded-xl m-3 grid-cols-9 grid-rows-5">
      <div className="col-span-4 row-span-3 border-b border-black border-dashed text-4xl font-bold flex justify-center items-center py-5">
        {temperature}°C
      </div>
      <div className="col-span-5 row-span-3 border-b border-black border-dashed flex items-center justify-center ">
        <div>
          <div className="text-lg font-bold">Your Greenhouse</div>
          <div className="text-sm">at {datetime}</div>
        </div>
      </div>
      <div className="col-span-3 py-1 row-span-2 flex items-center justify-center ">
        <div>
          <div className="font-bold text-2xl">{humidity}%</div>
          <div className="text-sm">Humidity</div>
        </div>
      </div>
      <div className="col-span-3 row-span-2 flex items-center justify-center ">
        <div>
          <div className=" font-bold text-2xl">{co2}%</div>
          <div className="text-sm">
            CO<sub>2</sub>
          </div>
        </div>
      </div>
      <div className="col-span-3 row-span-2 " grid></div>
    </div>
  );
}
