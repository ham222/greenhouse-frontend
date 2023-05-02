import Interval from "./Interval";
import { WeekDay } from "./WeekDay";

export type GroupedIntervals = { [key in WeekDay]: Interval[] };
