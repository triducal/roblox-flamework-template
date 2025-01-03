import { Modding, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

export interface OnPlayerAdded {
	onPlayerAdded(player: Player): void;
}

export interface OnPlayerRemoving {
	onPlayerRemoving(player: Player): void;
}

@Service({})
export class PlayerService implements OnStart {
	onStart(): void {
		const joinedListeners = new Set<OnPlayerAdded>();
		const removedListeners = new Set<OnPlayerRemoving>();

		Modding.onListenerAdded<OnPlayerAdded>((object) => joinedListeners.add(object));
		Modding.onListenerAdded<OnPlayerRemoving>((object) => removedListeners.add(object));
		Modding.onListenerRemoved<OnPlayerAdded>((object) => joinedListeners.add(object));
		Modding.onListenerRemoved<OnPlayerRemoving>((object) => removedListeners.add(object));

		Players.PlayerAdded.Connect((player) => {
			for (const listener of joinedListeners) {
				task.spawn(() => listener.onPlayerAdded(player));
			}
		});

		Players.PlayerRemoving.Connect((player) => {
			for (const listener of removedListeners) {
				task.spawn(() => listener.onPlayerRemoving(player));
			}
		});

		for (const player of Players.GetPlayers()) {
			for (const listener of joinedListeners) {
				task.spawn(() => listener.onPlayerAdded(player));
			}
		}
	}
}
