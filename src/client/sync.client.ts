import { client } from "@rbxts/charm-sync";
import { atoms } from "shared/store/sync/atoms";
import { Events } from "./network";

const syncer = client({ atoms });

Events.sync.connect((payload) => {
	syncer.sync(payload);
});

Events.init();
