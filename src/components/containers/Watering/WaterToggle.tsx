import Toggle, { ToggleProps } from "src/components/UI/Toggle";

interface WaterToggleProps extends ToggleProps {}

export default function WaterToggle(props: WaterToggleProps) {
  return (
    <div className="bg-[#202329] rounded-lg text-white items-center font-semibold py-6 px-4 flex justify-between">
      <div>Manual Toggle</div>
      <Toggle {...props} />
    </div>
  );
}
