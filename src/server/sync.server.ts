import { server } from "@rbxts/charm-sync";
import { atoms } from "shared/store/sync/atoms";
import { Events } from "./network";
import { filterPayload } from "shared/store/sync/utility/filter-payload";

const syncer = server({ atoms });

syncer.connect((player, payload) => {
	Events.sync(player, filterPayload(player, payload));
});

Events.init.connect((player) => {
	syncer.hydrate(player);
});
