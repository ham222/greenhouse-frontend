export class Measurement {
  value: number;
  type: string;
  date: Date;
  constructor(value: number, type: string, date: Date) {
    this.value = value;
    this.type = type;
    this.date = date;
  }
}
