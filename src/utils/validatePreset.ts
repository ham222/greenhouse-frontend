import Preset from "src/domain/Preset";
import { displayNetworkError } from "./errorToast";

export default function ValidatePreset(preset: Preset): boolean {
  if (preset.name === "") {
    displayNetworkError(`Preset name cannot be empty`);
    return false;
  }

  for (let i = 0; i < preset.thresholds.length; i++) {
    let t = preset.thresholds[i];
    if (Number.isNaN(t.max) || Number.isNaN(t.min)) {
      displayNetworkError(`Min and max fields must be filled`);
      return false;
    }
  }
  for (let i = 0; i < preset.thresholds.length; i++) {
    let t = preset.thresholds[i];
    if (t.max < t.min) {
      displayNetworkError(
        `Min value in ${t.type} cannot be bigger than max value`
      );

      return false;
    }
  }
  return true;
}
