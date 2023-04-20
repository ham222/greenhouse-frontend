import axios from "axios";

export default async function getCo2() {
  let temperatureList;
  try {
    const response = await axios.get(
      `https://10.154.200.45:7071/Co2?current=true`
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
