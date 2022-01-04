import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import CONFIG from "./config_variables.js";

const commands = [
  new SlashCommandBuilder()
    .setName("createpoll")
    .setDescription("Creates a new poll")
    .addStringOption((option) =>
      option.setName("option_1").setDescription("Title for option 1")
    )
    .addStringOption((option) =>
      option.setName("option_2").setDescription("Title for option 2")
    )
    .addStringOption((option) =>
      option.setName("option_3").setDescription("Title for option 3")
    )
    .addStringOption((option) =>
      option.setName("option_4").setDescription("Title for option 4")
    )
    .addStringOption((option) =>
      option.setName("option_5").setDescription("Title for option 5")
    )
    .addStringOption((option) =>
      option.setName("option_6").setDescription("Title for option 6")
    )
    .addStringOption((option) =>
      option.setName("option_7").setDescription("Title for option 7")
    )
    .addStringOption((option) =>
      option.setName("option_8").setDescription("Title for option 8")
    )
    .addStringOption((option) =>
      option.setName("option_9").setDescription("Title for option 9")
    )
    .addStringOption((option) =>
      option.setName("option_10").setDescription("Title for option 10")
    ),
  new SlashCommandBuilder()
    .setName("closepoll")
    .setDescription("Closes the running poll"),
  new SlashCommandBuilder()
    .setName("viewpoll")
    .setDescription("Views the current poll"),
  new SlashCommandBuilder().setName("vote").setDescription("Votes in poll"),
];

const rest = new REST({ version: "9" }).setToken(CONFIG.DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(CONFIG.CLIENT_ID, CONFIG.GUILD_ID), {
    body: commands,
  })
  .then(() => console.log("=== REGISTERED COMMANDS ==="))
  .catch((error) => {
    console.log(error);
  });
