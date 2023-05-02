import { Duration } from "luxon";

export default function durationToString(duration: Duration): string {
  //Rescale is performed twice. Once to shift miliseconds to all needed units, second time to remove empty miliseconds attribute after rounding it down to 0
  return duration.rescale().set({ milliseconds: 0 }).rescale().toHuman({
    unitDisplay: "narrow",
    listStyle: "narrow",
    useGrouping: false,
    maximumFractionDigits: 0,
  });
}
