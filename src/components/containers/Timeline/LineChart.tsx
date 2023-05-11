import Chart from "react-apexcharts";
import ChartIcon from "src/components/UI/RectIcon";
import Dropdown from "src/components/UI/Dropdown";
import capitalize from "src/utils/capitalize";
import Measurement from "src/domain/Measurement";

interface LineChartProps {
  measurements: Measurement[] | null;
  type: string;
  bgColor: string;
  accentColor: string;
  icon: JSX.Element;
  minThreshold?: number;
  maxThreshold?: number;
}
export default function LineChart({
  measurements,
  type,
  bgColor,
  accentColor,
  icon,
  minThreshold,
  maxThreshold,
}: LineChartProps) {
  if (measurements == null) {
    measurements = [];
  }
  const series = [
    {
      name: capitalize(type),
      data: measurements.map(({ value }) => value),
    },
    ...(maxThreshold !== undefined
      ? [
          {
            name: "max",
            data: measurements.map((measurements) => maxThreshold),
          },
        ]
      : []),
    ...(minThreshold !== undefined
      ? [
          {
            name: "min",
            data: measurements.map((measurements) => minThreshold),
          },
        ]
      : []),
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      fontFamily: "Sora",
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    colors: ["#555555", "#00c91b", "#c91b00"],

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
      width: 3,
    },
    xaxis: {
      categories: measurements.map(
        ({ timestamp }) => new Date(timestamp).getHours() + "h"
      ),
    },
    yaxis: {},
  };
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="bg-[#ffefde] p-2 font-sora shadow-sm max-sm:w-auto rounded-xl"
    >
      <div className="flex items-center">
        <div>
          <ChartIcon bgColor={accentColor} icon={icon} />
        </div>
        <div className="flex-grow font-sora ml-2 text-xl font-semibold">
          {capitalize(type)}
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
