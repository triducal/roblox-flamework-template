import { atom } from "@rbxts/charm";

export interface PlayerData {
	readonly money: number;
}

type PlayerDataMap = {
	readonly [K in string]?: PlayerData;
};

export const players = atom<PlayerDataMap>({});

export function getPlayerData(id: string) {
	return players()[id];
}

export function setPlayerData(id: string, playerData: PlayerData) {
	players((state) => ({
		...state,
		[id]: playerData,
	}));
}

export function deletePlayerData(id: string) {
	players((state) => ({
		...state,
		[id]: undefined,
	}));
}

export function updatePlayerData(id: string, updater: (data: PlayerData) => PlayerData) {
	players((state) => ({
		...state,
		[id]: state[id] && updater(state[id]!),
	}));
}
