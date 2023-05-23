import Threshold from "./Threshold";

export default class Preset {
  id: number;
  name: string;
  thresholds: Threshold[];

  constructor( id: number = -1, name: string, thresholds: Threshold[]) {
    this.id = id;
    this.name = name;
    this.thresholds = thresholds;
  }
}
