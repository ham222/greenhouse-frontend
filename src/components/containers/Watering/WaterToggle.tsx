import Toggle from "src/components/UI/Toggle";

export default function WaterToggle() {
  return (
    <div className="bg-[#202329] rounded-lg text-white items-center font-semibold py-6 px-4 flex justify-between">
      <div>Manual Toggle</div>
      <Toggle />
    </div>
  );
}
