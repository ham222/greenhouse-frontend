export default class Threshold {
  type: string;
  min: number;
  max: number;

  constructor(type: string, min: number, max: number) {
    this.type = type;
    this.max = max;
    this.min = min;
  }
}
