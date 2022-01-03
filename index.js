// Required imports
import { Client, Intents } from "discord.js";
import CONFIG from "./config_variables.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// On Ready
client.once("ready", () => {
  console.log(`=== Logged In As: ${client.user.tag} ===`);
});

// On Error
client.on("error", (error) => {
  console.log(`=== ERROR ===`);
  console.log("===", error, "===");
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;

    if (commandName === "ping") {
      await interaction.reply("Pong!");
    }
  }
});

client.login(CONFIG.DISCORD_TOKEN);
