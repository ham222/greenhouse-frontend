import LineChart from "./LineChart";
import Measurement from "src/domain/Measurement";
import { WiThermometer } from "react-icons/wi";
import { BsWater } from "react-icons/bs";
import { useEffect, useState } from "react";
import * as measurementService from "src/services/MeasurementService";

export default function Timeline() {
  const [temperature, setTemperature] = useState<Measurement[]>([]);
  const [humidity, setHumidity] = useState<Measurement[]>([]);
  const [co2, setCo2] = useState<Measurement[]>([]);
  const [threshold, setThreshold] = useState<Measurement[]>([]);

  useEffect(() => {
    const now = new Date().getTime() - 21_600_000;
    let mounted = true;
    measurementService.getTemperature(now).then((currentTemperature) => {
      if (mounted) {
        setTemperature(currentTemperature);
      }
    });

    measurementService.getHumidity(now).then((currentHumidity) => {
      if (mounted) {
        setHumidity(currentHumidity);
      }
    });

    measurementService.getCo2(now).then((currentCo2) => {
      if (mounted) {
        setCo2(currentCo2);
      }
    });
    measurementService.getCo2(now).then((currentCo2) => {
      if (mounted) {
        setCo2(currentCo2);
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
    <div className="m-3 flex flex-col gap-3">
      <LineChart
        measurements={co2}
        type="co2"
        bgColor={"#ffefde"}
        accentColor={"#FFDCB6"}
        icon={
          <div className="font-semibold">
            CO<sub>2</sub>
          </div>
        }
        maxThreshold={30}
        minThreshold={15}
      />

      <LineChart
        measurements={temperature}
        type="temperature"
        bgColor={"#feffde"}
        accentColor={"#f4f5bd"}
        icon={<WiThermometer className="w-full h-full" />}
        maxThreshold={30}
        minThreshold={15}
      />

      <LineChart
        measurements={humidity}
        type="humidity"
        bgColor={"#e6f5fb"}
        accentColor={"#b0d7e7"}
        icon={<BsWater className="w-full h-full" />}
        maxThreshold={80}
        minThreshold={15}
      />
    </div>
  );
}
