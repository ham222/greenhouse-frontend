import { Limit } from "./Limit";

const limitMap: Map<string, Limit> = new Map();

limitMap.set("temperature", { min: -50, max: 60, round: 1 });
limitMap.set("humidity", { min: 0, max: 100, round: 0 });
limitMap.set("co2", { min: 0, max: 4095, round: 0 });

export default limitMap;
