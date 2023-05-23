import Threshold from "./Threshold";

export default class Preset {
  name: string;
  thresholds: Threshold[];
  id: number;

  constructor(name: string, thresholds: Threshold[], id: number = -1) {
    this.name = name;
    this.thresholds = thresholds;
    this.id = id;
  }
}
