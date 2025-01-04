import { CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "giveMoney",
	Aliases: ["gM"],
	Description: "Increase the Players Money",
	Group: "Admin",
	Args: [
		{
			Type: "player",
			Name: "player",
			Description: "Player",
		},
		{
			Type: "number",
			Name: "Amount",
			Description: "Amount",
		},
	],
});
