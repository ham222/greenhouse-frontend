interface Props {
  updateValue: () => void;
}

export default function WaterToggle(props: Props) {
  return (
    <div className="flex justify-end">
      <button data-testid="water-toggle" onClick={props.updateValue}>
        <div className="bg-dark max-sm:justify-between max-sm:w-full rounded-lg text-white flex gap-3 items-center py-4 px-4 font-semibold">
          <div className="whitespace-nowrap">Manual Toggle</div>
        </div>
      </button>
    </div>
  );
}
