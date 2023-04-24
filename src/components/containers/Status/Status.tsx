import CurrentValBox from "./CurrentValBox";
import { useEffect, useState } from "react";
import MeasurementService from "src/services/MeasurementService";

export default function Status() {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [co2, setCo2] = useState(null);
  const [date, setDate] = useState(null);
  useEffect(() => {
    let mounted = true;
    const measurementService = new MeasurementService();
    measurementService.getTemperature().then((currentTemperature) => {
      if (mounted) {
        setTemperature(currentTemperature[0].value);
      }
    });

    measurementService.getHumidity().then((currentHumidity) => {
      if (mounted) {
        setHumidity(currentHumidity[0].value);
      }
    });

    measurementService.getCo2().then((currentCo2) => {
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
        temperature={temperature ?? ""}
        datetime={new Date(date ?? "").toLocaleString()}
        humidity={humidity ?? ""}
        co2={co2 ?? ""}
      ></CurrentValBox>
    </>
  );
}
