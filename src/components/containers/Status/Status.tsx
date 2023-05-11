import CurrentValBox from "./CurrentValBox";
import { useEffect, useState } from "react";
import WateringStatus from "./WateringStatus";
import { DateTime } from "luxon";
import { useGet } from "src/hooks/useGet";
import Measurement from "src/domain/Measurement";
import { displayNetworkError } from "src/utils/errorToast";
const API_URL = process.env.REACT_APP_API_BASE_URL;
export default function Status() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [co2, setCo2] = useState<number | null>(null);
  const [date, setDate] = useState<number | null>(null);

  const co2Response = useGet<Measurement[]>(`${API_URL}/co2?current`);

  const humidityResponse = useGet<Measurement[]>(`${API_URL}/humidity?current`);

  const temperatureResponse = useGet<Measurement[]>(
    `${API_URL}/temperature?current`
  );

  if (co2Response.error != null) {
    displayNetworkError(co2Response.error.message);
  }
  if (humidityResponse.error != null) {
    displayNetworkError(humidityResponse.error.message);
  }
  if (temperatureResponse.error != null) {
    displayNetworkError(temperatureResponse.error.message);
  }
  useEffect(() => {
    let mounted = true;
    if (mounted && temperatureResponse.data != null) {
      setTemperature(temperatureResponse.data[0].value);
    }
    if (mounted && co2Response.data != null) {
      setCo2(co2Response.data[0].value);
      setDate(co2Response.data[0].timestamp);
    }
    if (mounted && humidityResponse.data != null) {
      setHumidity(humidityResponse.data[0].value);
    }
    return () => {
      mounted = false;
    };
  }, [co2Response, humidityResponse, temperatureResponse]);

  return (
    <div className="m-3 flex flex-col gap-3">
      <CurrentValBox
        temperature={temperature?.toString() ?? ""}
        datetime={new Date(date ?? "").toLocaleString()}
        humidity={humidity?.toString() ?? ""}
        co2={co2?.toString() ?? ""}
      />
      <WateringStatus
        isOnline={true}
        timeToWatering={DateTime.now()
          .plus({
            hours: 2,
            minutes: 34,
            seconds: 20,
          })
          .diff(DateTime.now())}
      />
    </div>
  );
}
