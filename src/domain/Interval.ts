import { DateTime } from "luxon";
import { WeekDay } from "./WeekDay";

export interface Interval {
    startTime: DateTime,
    endTime: DateTime,
    dayOfWeek: WeekDay
}
