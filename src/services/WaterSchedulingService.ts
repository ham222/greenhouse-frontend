import axios from "axios";
import Interval from "src/domain/Interval";
import { IntervalDto } from "src/domain/IntervalDto";
import { convertIntervalArrayToIntervalDtoArray } from "src/utils/intervalParser";

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

export async function postSchedule(intervals: Interval[]): Promise<boolean> {
  let schedule = convertIntervalArrayToIntervalDtoArray(intervals);
  try {
    let url = `http://localhost:3100/api/schedule`;
    await axios.post(url, schedule);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
