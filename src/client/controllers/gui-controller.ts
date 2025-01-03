import { Controller, OnStart } from "@flamework/core";
import { mount } from "@rbxts/vide";

@Controller({})
export class GuiController implements OnStart {
	onStart(): void {
		mount(() => {});
	}
}
