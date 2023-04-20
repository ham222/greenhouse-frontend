import axios from "axios";

export default async function getTemperature() {
  let temperatureList;
  try {
    const response = await axios.get(
      `http://localhost:3100/api/humidity?current`
    );
    if (response.status !== 200) return [];

    temperatureList = response.data;

    console.log(response.data);
  } catch (error) {
    console.error(error);
    return [];
  }
  return temperatureList;
}
