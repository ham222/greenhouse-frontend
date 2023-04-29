import CurrentValBox from "./CurrentValBox";
import { useEffect, useState } from "react";
import * as measurementService from "src/services/MeasurementService";
import WateringStatus from "./WateringStatus";

export default function Status() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [co2, setCo2] = useState<number | null>(null);
  const [date, setDate] = useState<number | null>(null);
  useEffect(() => {
    let mounted = true;
    measurementService.getCurrentTemperature().then((currentTemperature) => {
      if (mounted) {
        setTemperature(currentTemperature[0].value);
      }
    });

    measurementService.getCurrentHumidity().then((currentHumidity) => {
      if (mounted) {
        setHumidity(currentHumidity[0].value);
      }
    });

    measurementService.getCurrentCo2().then((currentCo2) => {
      if (mounted) {
        setCo2(currentCo2[0].value);
        setDate(currentCo2[0].timestamp);
      }
    });

    // productsAndServices.getProductsAndServicesLatest().then((e) => {
    //   setAll(e);
    // });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <CurrentValBox
        temperature={temperature?.toString() ?? ""}
        datetime={new Date(date ?? "").toLocaleString()}
        humidity={humidity?.toString() ?? ""}
        co2={co2?.toString() ?? ""}
      />
      <WateringStatus/>
    </>
  );
}
