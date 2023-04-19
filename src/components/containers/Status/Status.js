import CurrentValBox from "./CurrentValBox";
import { useEffect, useState } from "react";
import thcService from "../../../services/thcService";

export default function Status() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    let mounted = true;
    thcService.getTemperature().then((currentTemperature) => {
      if (mounted) {
        setTemperature(currentTemperature);
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
        temperature={temperature}
        datetime={new Date().toLocaleTimeString()}
        humidity={37}
        co2={22.5}
      ></CurrentValBox>
    </>
  );
}
