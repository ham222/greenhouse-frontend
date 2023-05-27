export default class MeasurementDto {
  value: number;
  date: number;
  constructor(value: number, date: number) {
    this.value = value;
    this.date = date;
  }
}
