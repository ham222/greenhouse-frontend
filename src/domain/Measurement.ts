export default class Measurement {
  value: number;
  timestamp: number;
  constructor(value: number, timestamp: number) {
    this.value = value;
    this.timestamp = timestamp;
  }
}
