import Threshold from "./Threshold";

export default class Preset {
  id: number;
  name: string;
  thresholds: Threshold[];

  constructor(name: string, thresholds: Threshold[], id: number = -1) {
    this.id = id;
    this.name = name;
    this.thresholds = thresholds;
  }
}
