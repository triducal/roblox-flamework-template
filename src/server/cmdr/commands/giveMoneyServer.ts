import { CommandContext } from "@rbxts/cmdr";
import { updatePlayerData } from "shared/store/players";

export = function (context: CommandContext, player: Player, amount: number) {
	updatePlayerData(player.Name, (data) => ({
		...data,
		money: data.money + amount,
	}));
};
