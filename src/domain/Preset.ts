import Threshold from "./Threshold";

export default class Preset{
    name: string;
    thresholds: Threshold[];

    constructor(name:string, thresholds: Threshold[]){
        this.name = name;
        this.thresholds = thresholds;
    }
}