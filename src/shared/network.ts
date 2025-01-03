import { Networking } from "@flamework/networking";
import { SyncPayload } from "@rbxts/charm-sync";
import { GlobalAtoms } from "./store/sync/atoms";

interface ClientToServerEvents {
	init: () => void;
}

interface ServerToClientEvents {
	sync: (payload: SyncPayload<GlobalAtoms>) => void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
