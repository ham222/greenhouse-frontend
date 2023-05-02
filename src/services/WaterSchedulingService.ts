import axios from "axios";
import Interval from "src/domain/Interval";

export async function getSchedule(): Promise<Interval[]> {
  let schedule;

  try {
    let url = `http://localhost:3100/api/schedule`;
    const response = await axios.get(url);
    if (response.status !== 200) return [];

    schedule = response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
  return schedule;
}

export async function postSchedule(schedule: Interval[]) {
  try {
    let url = `http://localhost:3100/api/schedule`;
    const response = await axios.post(url, schedule);
    if (response.status !== 200) return;
  } catch (error) {
    console.error(error);
    return;
  }
}
