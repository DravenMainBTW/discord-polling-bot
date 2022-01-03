import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import CONFIG from "./config_variables.js";

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
];

const rest = new REST({ version: "9" }).setToken(CONFIG.DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(CONFIG.CLIENT_ID, CONFIG.GUILD_ID), {
    body: commands,
  })
  .then(() => console.log("=== REGISTERED COMMANDS ==="))
  .catch((error) => {
    console.log("===", error, "===");
  });
