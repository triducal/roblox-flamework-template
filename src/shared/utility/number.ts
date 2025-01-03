/* eslint-disable roblox-ts/no-any */
import Abbreviator from "@rbxts/abbreviate";

export const abbreviator = new Abbreviator();
abbreviator.setSetting("suffixTable", ["k", "m", "b"]);
abbreviator.setSetting("decimalPlaces", 2);
abbreviator.setSetting("stripTrailingZeroes", true);
