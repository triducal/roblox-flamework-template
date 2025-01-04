import { OnStart, Service } from "@flamework/core";
import { observe, subscribe } from "@rbxts/charm";
import { Players } from "@rbxts/services";
import { datastore } from "shared/store";
import { getPlayerData } from "shared/store/players";
import { abbreviator } from "shared/utility/number";

@Service({})
export class LeaderstatService implements OnStart {
	onStart(): void {
		observe(datastore.players, (_, name) => {
			const player = Players.FindFirstChild(name);

			if (!player) {
				return;
			}

			const leaderstats = new Instance("Folder");

			leaderstats.Name = "leaderstats";
			leaderstats.Parent = player;

			const money = new Instance("StringValue");

			money.Name = "💸 Money";
			money.Parent = leaderstats;

			const getMoney = () => {
				return getPlayerData(name)?.money ?? 0;
			};

			const unsubscribe = subscribe(getMoney, (value) => {
				money.Value = abbreviator.numberToString(math.floor(value));
			});

			return unsubscribe;
		});
	}
}
