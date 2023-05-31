import Preset from "src/domain/Preset";
import { displayWarningToast } from "./displayToast";

export default function ValidatePreset(preset: Preset): boolean {
  if (preset.name === "") {
    displayWarningToast(`Preset name cannot be empty`);
    return false;
  }

  for (let i = 0; i < preset.thresholds.length; i++) {
    let t = preset.thresholds[i];
    if (Number.isNaN(t.max) || Number.isNaN(t.min)) {
      displayWarningToast(`Min and max fields must be filled`);
      return false;
    }
  }
  for (let i = 0; i < preset.thresholds.length; i++) {
    let t = preset.thresholds[i];
    if (t.max < t.min) {
      displayWarningToast(
        `Min value in ${t.type} cannot be bigger than max value`
      );

      return false;
    }
  }
  return true;
}
