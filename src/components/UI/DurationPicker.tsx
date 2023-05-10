interface DurationProps {
  updateValue: (duration: number) => void;
  value: number;
}

export default function DurationPicker({ updateValue, value }: DurationProps) {
  const handleDuration = (value: string) => {
    const duration = (value === "") ? 0 : parseInt(value);

    if (isNaN(duration) || duration < 0 || duration > 600) {
      return;
    }

    updateValue(duration);
  };

  return (
    <div>
      <div className="flex justify-center items-center font-bold text-5xl">
        <div className="w-24">
          <input
            type="number"
            className="w-full min-w-0 block focus:outline-none focus:text-red-600 rounded-md border-0 text-gray-900 text-center ring-gray-300 placeholder:text-gray-400"
            value={value.toString()}
            onChange={(e) => handleDuration(e.target.value)}
            max="600"
            min="0"
            placeholder="0"
            data-testid="minute-duration"
          />
        </div>
        <div> minute{value !== 1 ? "s" : ""} </div>
      </div>
    </div>
  );
}
