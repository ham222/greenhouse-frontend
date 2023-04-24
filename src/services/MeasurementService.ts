import axios from "axios";

class MeasurementService {
  async getTemperature() {
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
  async getHumidity() {
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
  async getCo2() {
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
}

export default MeasurementService;
