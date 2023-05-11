import Toggle, { ToggleProps } from "src/components/UI/Toggle";

interface WaterToggleProps extends ToggleProps {}

export default function WaterToggle(props: WaterToggleProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-[#202329] max-sm:justify-between max-sm:w-full rounded-lg text-white flex gap-3 items-center py-4 px-4 font-semibold">
        <div className="whitespace-nowrap">Manual Toggle</div>
        <Toggle {...props} />
      </div>
    </div>
  );
}
