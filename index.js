// Required imports
import { Client, Intents } from "discord.js";
import CONFIG from "./config_variables.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

let current_poll = [];

// On Ready
client.once("ready", () => {
  console.log(`=== Logged In As: ${client.user.tag} ===`);
});

// On Error
client.on("error", (error) => {
  console.log(`=== ERROR ===`);
  console.log(error);
});

// On Command Usage
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;

    if (interaction.user.id.toString() === CONFIG.OWNER) {
      if (commandName === "createpoll") {
        if (current_poll.length === 0) {
          let poll_list = [];
          let index = 0;

          while (index < 10) {
            const string = interaction.options.getString(`option_${index + 1}`);

            if (string) {
              poll_list = [...poll_list, { title: string, votes: [] }];
            }
            index++;
          }

          current_poll = poll_list;

          interaction.reply(
            `@everyone A New Poll Has Been Created:${poll_list.map(
              (item, index) => `\n${index + 1}. ${item.title}`
            )}`
          );
        } else {
          interaction.reply(
            "Please close the existing poll before starting a new one."
          );
        }
      } else if (commandName === "closepoll") {
        if (current_poll.length !== 0) {
          let winner_total = 0;
          let winner = "";

          current_poll.forEach((item) => {
            if (winner_total < item.votes.length) {
              winner = item.title;
            }
          });

          if (winner !== "") {
            interaction.reply(`POLL CLOSED, WINNER: ${winner}`);
          } else {
            interaction.reply(`POLL CLOSED, NO WINNER`);
          }

          current_poll = [];
        } else {
          interaction.reply(
            "Please create a poll before you try to close one."
          );
        }
      } else if (commandName === "viewpoll") {
        if (current_poll.length !== 0) {
          const private_bool = interaction.options.getBoolean(`private`);

          interaction.reply({
            content: `Current Poll:${current_poll.map(
              (item, index) =>
                `\n${index + 1}. ${item.title} - ${item.votes.length}`
            )}`,
            ephemeral: private_bool ? true : false,
          });
        } else {
          interaction.reply("Please create a poll before you try to view one.");
        }
      }
    } else {
      interaction.reply(
        "You lack required permissions to complete this command."
      );
    }

    if (commandName === "vote") {
    }
  }
});

client.login(CONFIG.DISCORD_TOKEN);
