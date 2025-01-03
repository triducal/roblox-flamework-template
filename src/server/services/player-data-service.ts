import { Service } from "@flamework/core";
import { createCollection, setConfig } from "@rbxts/lapis";
import { t } from "@rbxts/t";
import { defaultData } from "shared/config/player-data";
import { deletePlayerData, getPlayerData, PlayerData, setPlayerData, updatePlayerData } from "shared/store/players";
import { OnPlayerAdded, OnPlayerRemoving } from "./player-service";
import { Players, RunService } from "@rbxts/services";
import { effect } from "@rbxts/charm";
import DataStoreServiceMock from "@rbxts/lapis-mockdatastore";

if (RunService.IsStudio()) setConfig({ dataStoreService: new DataStoreServiceMock() });

@Service({})
export class PlayerDataService implements OnPlayerAdded, OnPlayerRemoving {
	private collection = createCollection<PlayerData>("v1", {
		defaultData,
		validate: t.interface({
			money: t.number,
		}),
	});

	onPlayerAdded(player: Player): void {
		this.loadPlayerData(player).catch((err) => {
			warn(`Failed to load document for player ${player.Name}: ${err}`);
			setPlayerData(player.Name, defaultData);
		});

		RunService.Heartbeat.Connect(() => {
			updatePlayerData(player.Name, (data) => ({
				...data,
				money: data.money + 1,
			}));
		});
	}

	onPlayerRemoving(player: Player): void {
		deletePlayerData(player.Name);
	}

	async loadPlayerData(player: Player) {
		const document = await this.collection.load(`${player.UserId}`, [player.UserId]);

		if (!player.IsDescendantOf(Players)) {
			document.close();
			return;
		}

		const unsubscribe = effect(() => {
			const data = getPlayerData(player.Name);

			if (data) {
				document.write(data);
			}
		});

		setPlayerData(player.Name, document.read());

		Promise.fromEvent(Players.PlayerRemoving, (left) => player === left)
			.then(() => unsubscribe())
			.then(() => document.close());
	}
}
