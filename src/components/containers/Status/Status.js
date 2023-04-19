import CurrentValBox from "./CurrentValBox";
import { useEffect, useState } from "react";
import getTemperature from "../../../services/thcService";

export default function Status() {
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        let mounted = true;
        getTemperature().then((currentTemperature) => {
            if (mounted) {
                setTemperature(currentTemperature.value);
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
