import { Link } from "react-router-dom";
import Preset from "src/domain/Preset";
import capitalize from "src/utils/capitalize";
interface Props {
  preset: Preset | null;
}
export default function PresetStatus({ preset }: Props) {
  if (preset == null) {
    preset = { id: -1, name: "No preset", thresholds: [] };
  }
  return (
    <Link to="/presets">
      <div className="group rounded-lg">
        <div className="flex flex-col p-3 rounded-t-lg duration-150 cursor-pointer group-hover:bg-slate-600 bg-slate-800">
          <div className="flex gap-3 items-center">
            <div className="flex font-bold text-white">
              Current preset: {preset.name}
            </div>
          </div>
        </div>
        <div className="flex text-white rounded-b-lg p-3 flex-row group-hover:bg-slate-500 duration-150 justify-between bg-slate-700">
          <div className="text-sm flex flex-col font-bold whitespace-nowrap">
            {preset.thresholds.map((t) => (
              <div className="grid grid-cols-3 gap-2" key={t.type}>
                <div className="text-right">{capitalize(t.type)}:</div>
                <div>Min: {t.min}</div>
                <div>Max: {t.max}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
