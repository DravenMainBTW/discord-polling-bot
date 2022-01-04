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

          interaction.reply("Poll Created");
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

          interaction.reply(`POLL CLOSED, WINNER: ${winner}`);

          current_poll = [];
        } else {
          interaction.reply(
            "Please create a poll before you try to close one."
          );
        }
      } else if (commandName === "viewpoll") {
        if (current_poll.length !== 0) {
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
