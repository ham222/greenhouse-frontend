import axios from "axios";
import { GroupedIntervals } from "src/domain/GroupedIntervals";
import Interval from "src/domain/Interval";
import { IntervalDto } from "src/domain/IntervalDto";
import { convertGroupedIntervalsToIntervalDtoArray } from "src/utils/intervalParser";

export async function getSchedule(): Promise<Interval[]> {
  let intervalDtos: IntervalDto[];
  let schedule: Interval[];
  try {
    let url = `http://localhost:3100/api/schedule`;
    const response = await axios.get(url);
    intervalDtos = response.data;
    schedule = intervalDtos.map((dto) => {
      return new Interval(dto.startTime, dto.endTime, dto.dayOfWeek);
    });
  } catch (error) {
    console.error(error);
    return [];
  }
  return schedule;
}

export async function postSchedule(
  intervals: GroupedIntervals
): Promise<boolean> {
  let schedule = convertGroupedIntervalsToIntervalDtoArray(intervals);
  try {
    let url = `http://localhost:3100/api/schedule`;
    await axios.post(url, schedule);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
