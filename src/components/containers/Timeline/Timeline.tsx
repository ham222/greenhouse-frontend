import LineChart from "./LineChart";
import Measurement from "src/domain/Measurement";
import { WiThermometer } from "react-icons/wi";
import { BsWater } from "react-icons/bs";
import { useGet } from "src/hooks/useGet";
import { displayNetworkError } from "src/utils/errorToast";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export default function Timeline() {
  const co2Response = useGet<Measurement[]>(`${API_URL}/co2`);

  const humidityResponse = useGet<Measurement[]>(`${API_URL}/humidity`);

  const temperatureResponse = useGet<Measurement[]>(`${API_URL}/temperature`);

  if (co2Response.error != null) {
    displayNetworkError(co2Response.error.message);
  }
  if (humidityResponse.error != null) {
    displayNetworkError(humidityResponse.error.message);
  }
  if (temperatureResponse.error != null) {
    displayNetworkError(temperatureResponse.error.message);
  }
  return (
    <div className="m-3 flex flex-col gap-3">
      <LineChart
        measurements={co2Response.data}
        type="co2"
        bgColor={"#ffefde"}
        accentColor={"#FFDCB6"}
        icon={
          <div className="font-semibold">
            CO<sub>2</sub>
          </div>
        }
      />

      <LineChart
        measurements={temperatureResponse.data}
        type="temperature"
        bgColor={"#feffde"}
        accentColor={"#f4f5bd"}
        icon={<WiThermometer className="w-full h-full" />}
      />

      <LineChart
        measurements={humidityResponse.data}
        type="humidity"
        bgColor={"#e6f5fb"}
        accentColor={"#b0d7e7"}
        icon={<BsWater className="w-full h-full" />}
      />
    </div>
  );
}
