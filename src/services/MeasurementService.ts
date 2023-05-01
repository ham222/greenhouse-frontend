import axios from "axios";
import Measurement from "src/domain/Measurement";

export async function getCurrentTemperature(): Promise<Measurement[]> {
  let temperatureList;

  try {
    let url = `http://localhost:3100/api/temperature?current`;
    const response = await axios.get(url);
    if (response.status !== 200) return [];

    temperatureList = response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
  return temperatureList;
}

export async function getTemperature(
  startTimestamp?: number,
  endTimestamp?: number
): Promise<Measurement[]> {
  let temperatureList;

  try {
    let url = `http://localhost:3100/api/temperature`;

    if (startTimestamp !== undefined) {
      url += `?startTimestamp=${startTimestamp}`;
    }
    if (endTimestamp !== undefined) {
      if (startTimestamp !== undefined) {
        url += "&";
      } else {
        url += "?";
      }
      url += `endTimestamp=${endTimestamp}`;
    }
    const response = await axios.get(url);
    if (response.status !== 200) return [];

    temperatureList = response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
  return temperatureList;
}

export async function getCurrentHumidity(): Promise<Measurement[]> {
  let temperatureList;

  try {
    let url = `http://localhost:3100/api/humidity?current`;
    const response = await axios.get(url);
    if (response.status !== 200) return [];

    temperatureList = response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
  return temperatureList;
}

export async function getHumidity(
  startTimestamp?: number,
  endTimestamp?: number
): Promise<Measurement[]> {
  let temperatureList;
  try {
    let url = `http://localhost:3100/api/humidity`;

    if (startTimestamp !== undefined) {
      url += `?startTimestamp=${startTimestamp}`;
    }
    if (endTimestamp !== undefined) {
      if (startTimestamp !== undefined) {
        url += "&";
      } else {
        url += "?";
      }
      url += `endTimestamp=${endTimestamp}`;
    }
    const response = await axios.get(url);

    if (response.status !== 200) return [];

    temperatureList = response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
  return temperatureList;
}

export async function getCurrentCo2(): Promise<Measurement[]> {
  let temperatureList;

  try {
    let url = `http://localhost:3100/api/co2?current`;
    const response = await axios.get(url);
    if (response.status !== 200) return [];

    temperatureList = response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
  return temperatureList;
}

export async function getCo2(
  startTimestamp?: number,
  endTimestamp?: number
): Promise<Measurement[]> {
  let temperatureList;
  try {
    let url = `http://localhost:3100/api/co2`;
    if (startTimestamp !== undefined) {
      url += `?startTimestamp=${startTimestamp}`;
    }
    if (endTimestamp !== undefined) {
      if (startTimestamp !== undefined) {
        url += "&";
      } else {
        url += "?";
      }
      url += `endTimestamp=${endTimestamp}`;
    }
    const response = await axios.get(url);
    if (response.status !== 200) return [];

    temperatureList = response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
  return temperatureList;
}
