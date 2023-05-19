import { Limit } from "./Limit";

const limitMap: Map<string, Limit> = new Map();

limitMap.set("Temperature", { min: -50, max: 60, round: 1 });
limitMap.set("Humidity", { min: 0, max: 100, round: 0 });
limitMap.set("Co2", { min: 0, max: 4095, round: 0 });

export default limitMap;
