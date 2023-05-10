interface DurationProps {
  updateValue: (duration: number) => void;
  value: number;
}

export default function DurationPicker({ updateValue, value }: DurationProps) {
  const handleDuration = (value: string) => {
    const duration = value === "" ? 0 : parseInt(value);

    if (isNaN(duration) || duration < 0 || duration > 600) {
      return;
    }

    updateValue(duration);
  };

  return (
    <div>
      <div className="flex my-10 justify-center items-center  ">
        <div className="text-center text-3xl">Runtime:</div>
        <div className="w-16 mx-2 text-3xl font-bold">
          <input
            type="number"
            className="w-full min-w-0 focus:outline-none focus:text-red-600 block rounded-md border-0 text-gray-900 text-center ring-1 ring-gray-300 placeholder:text-gray-400"
            value={value.toString()}
            onChange={(e) => handleDuration(e.target.value)}
            max="600"
            min="0"
            placeholder="0"
            data-testid="minute-duration"
          />
        </div>
        <div className=" text-3xl"> min </div>
      </div>
    </div>
  );
}
