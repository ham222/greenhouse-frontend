import LineChart from "./LineChart";
import { Measurement } from "../../../domain/Measurement";
import { WiThermometer } from "react-icons/wi";
import { BsWater } from "react-icons/bs";

export default function Timeline() {
  const measurements = [
    new Measurement(72, "temperature", new Date("2023-04-18T08:00:00")),
    new Measurement(68, "temperature", new Date("2023-04-18T09:00:00")),
    new Measurement(70, "temperature", new Date("2023-04-18T10:00:00")),
    new Measurement(71, "temperature", new Date("2023-04-18T11:00:00")),
    new Measurement(73, "temperature", new Date("2023-04-18T12:00:00")),
    new Measurement(70, "temperature", new Date("2023-04-18T13:00:00")),
    new Measurement(75, "temperature", new Date("2023-04-18T14:00:00")),
    new Measurement(72, "temperature", new Date("2023-04-18T15:00:00")),
    new Measurement(72, "temperature", new Date("2023-04-18T16:00:00")),
    new Measurement(30, "temperature", new Date("2023-04-18T17:00:00")),
    new Measurement(35, "temperature", new Date("2023-04-18T18:00:00")),
  ];

  return (
    <>
      <LineChart
        measurements={measurements}
        bgColor={"#ffefde"}
        accentColor={"#FFDCB6"}
        icon={
          <div className="font-semibold">
            CO<sub>2</sub>
          </div>
        }
      />

      <LineChart
        measurements={measurements}
        bgColor={"#feffde"}
        accentColor={"#f4f5bd"}
        icon={<WiThermometer className="w-full h-full" />}
      />

      <LineChart
        measurements={measurements}
        bgColor={"#e6f5fb"}
        accentColor={"#b0d7e7"}
        icon={<BsWater className="w-full h-full" />}
      />
    </>
  );
}
