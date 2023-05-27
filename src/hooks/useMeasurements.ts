import Measurement from "src/domain/Measurement";
import MeasurementDto from "src/domain/MeasurementDto";
import { useGet } from "./useGet";
function useMeasurements(url: string, dependency?: boolean) {
  const { data, loading, error } = useGet<MeasurementDto[]>(url, dependency);

  console.log(data);

  const measurements =
    data?.map((dto) => new Measurement(dto.value, dto.date * 1000)) ?? null;

  console.log(measurements);

  return { data: measurements, loading, error };
}

export { useMeasurements };
