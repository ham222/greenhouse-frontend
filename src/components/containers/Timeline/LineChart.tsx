import React from "react";
import Chart from "react-apexcharts";
import ChartIcon from "./ChartIcon";
import Dropdown from "../../UI/Dropdown";
import capitalize from "../../../utils/capitalize";

export default function LineChart({
  measurements,
  bgColor,
  accentColor,
  icon,
}) {
  const series = [
    {
      name: capitalize(measurements[0].type),
      data: measurements.map(({ value }) => value),
    },
  ];
  const options = {
    chart: {
      fontFamily: "Sora",
      type: "line",
      zoom: {
        enabled: false,
      },
    },

    theme: {
      mode: "light",
      palette: "palette9",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: "#555555",
      width: "3",
    },

    xaxis: {
      categories: measurements.map(({ date }) => date),
    },
    yaxis: {},
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="bg-[#ffefde] p-2 font-sora shadow-sm max-sm:w-auto rounded-xl m-3"
    >
      <div className="flex items-center">
        <div>
          <ChartIcon bgColor={accentColor} icon={icon} />
        </div>
        <div className="flex-grow font-sora ml-2 text-xl font-semibold">
          {capitalize(measurements[0].type)}
        </div>
        <div>
          <Dropdown />
        </div>
      </div>
      <div className="xs:h-40 md:h-80">
        <Chart options={options} series={series} height={"100%"} />
      </div>
    </div>
  );
}
