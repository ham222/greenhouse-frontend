import Preset from "src/domain/Preset";
import { displayToast } from "./displayToast";

export default function ValidatePreset(preset: Preset): boolean {
  if (preset.name === "") {
    displayToast(`Preset name cannot be empty`);
    return false;
  }

  for (let i = 0; i < preset.thresholds.length; i++) {
    let t = preset.thresholds[i];
    if (Number.isNaN(t.max) || Number.isNaN(t.min)) {
      displayToast(`Min and max fields must be filled`);
      return false;
    }
  }
  for (let i = 0; i < preset.thresholds.length; i++) {
    let t = preset.thresholds[i];
    if (t.max < t.min) {
      displayToast(`Min value in ${t.type} cannot be bigger than max value`);

      return false;
    }
  }
  return true;
}
