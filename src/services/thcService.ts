import axios from "axios";

export async function getTemperature() {
  let temperatureList;
  try {
    const response = await axios.get(
      `http://localhost:3100/api/temperature?current`
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

export async function getHumidity() {
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

export async function getCo2() {
  let temperatureList;
  try {
    const response = await axios.get(`http://localhost:3100/api/co2?current`);
    if (response.status !== 200) return [];

    temperatureList = response.data;

    console.log(response.data);
  } catch (error) {
    console.error(error);
    return [];
  }
  return temperatureList;
}
