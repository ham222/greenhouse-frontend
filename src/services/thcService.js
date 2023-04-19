import axios from "axios";

export default class thcService {
  async getTemperature() {
    let temperatureList;
    try {
      const response = await axios.get(`http://localhost:3100/api/temperature`);
      if (response.status !== 200) return [];

      temperatureList = response.data[0];
    } catch (error) {
      console.error(error);
      return [];
    }
    console.log(temperatureList);
    return temperatureList;
  }

  // getHumidity
  // getCo2
}
