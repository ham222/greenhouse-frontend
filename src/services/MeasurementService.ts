import axios from "axios";
import { Measurement } from "src/domain/Measurement";

class MeasurementService {
  async getCurrentTemperature(): Promise<Measurement[]> {
    return this.getTemperature(undefined, undefined, true);
  }

  async getTemperature(
    startTimestamp?: number,
    endTimestamp?: number,
    current: boolean = false
  ): Promise<Measurement[]> {
    let temperatureList;

    try {
      let url = `http://localhost:3100/api/temperature`;
      if (current) {
        url += "?current";
      } else {
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
      }
      console.log(url);
      const response = await axios.get(url);
      if (response.status !== 200) return [];

      temperatureList = response.data;

      console.log(response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
    return temperatureList;
  }

  async getCurrentHumidity(): Promise<Measurement[]> {
    return this.getHumidity(undefined, undefined, true);
  }

  async getHumidity(
    startTimestamp?: number,
    endTimestamp?: number,
    current: boolean = false
  ): Promise<Measurement[]> {
    let temperatureList;
    try {
      let url = `http://localhost:3100/api/humidity`;
      if (current) {
        url += "?current";
      } else {
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
      }
      console.log(url);
      const response = await axios.get(url);

      if (response.status !== 200) return [];

      temperatureList = response.data;

      console.log(response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
    return temperatureList;
  }

  async getCurrentCo2(): Promise<Measurement[]> {
    return this.getCo2(undefined, undefined, true);
  }

  async getCo2(
    startTimestamp?: number,
    endTimestamp?: number,
    current: boolean = false
  ): Promise<Measurement[]> {
    let temperatureList;
    try {
      let url = `http://localhost:3100/api/co2`;
      if (current) {
        url += "?current";
      } else {
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
      }
      console.log(url);
      const response = await axios.get(url);
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
