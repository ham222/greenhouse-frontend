interface ThresholdBoxProps {
  title: String;
}

let ThresholdBox = ({ title }: ThresholdBoxProps): JSX.Element => {
  return (
    <>
      <div className="flex flex-col my-5">
        <h2 className="text-center font-semibold mt-4 mb-4 text-lg ">
          {title}
        </h2>
        <div className="flex mr-[2rem] ml-[calc(2rem+8vw)]">
          <div className="flex w-1/2">
            <p className="text-lg mr-2">Min</p>
            <input
              type="text"
              name=""
              id=""
              className="w-3/5 py-1 bg-[#EFEFEF] rounded-lg"
            />
          </div>
          <div className="flex w-1/2">
            <p className="text-lg mr-2">Max</p>
            <input
              type="text"
              name=""
              id=""
              className="w-3/5 py-1 bg-[#EFEFEF]  rounded-lg "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ThresholdBox;
