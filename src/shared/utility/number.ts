/* eslint-disable roblox-ts/no-any */
import Abbreviator from "@rbxts/abbreviate";

export const abbreviator = new Abbreviator();
abbreviator.setSetting("suffixTable", ["k", "m", "b", "t", "qd", "qn", "sx", "sp", "oc", "n", "dc"]);
abbreviator.setSetting("decimalPlaces", 2);
abbreviator.setSetting("stripTrailingZeroes", true);
