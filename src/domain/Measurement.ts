export default class Measurement {
  value: number;
  type: string;
  timestamp: number;
  constructor(value: number, type: string, timestamp: number) {
    this.value = value;
    this.type = type;
    this.timestamp = timestamp;
  }
}
