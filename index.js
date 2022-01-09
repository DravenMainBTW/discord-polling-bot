// Required imports
import { Client, Intents } from "discord.js";
import CONFIG from "./config_variables.js";
import { MongoClient } from "mongodb";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Local Storage Of Current Running Poll
let current_poll = [];

// Connecting And Manipulating Data Saved To DB
const DB_CONNECT = async (data, remove = false) => {
  let client = await MongoClient.connect(CONFIG.MONGODB_URI);
  let collection = client
    .db(CONFIG.MONGODB_DB)
    .collection(CONFIG.MONGODB_COLLECTION);

  if (data && data.length > 0) {
    if (remove === true) {
      await collection.deleteOne({});
    }

    await collection.insertOne({ current_poll });
  } else if (data && data.length === 0 && remove === true) {
    await collection.deleteOne({});
  }

  let current_data = await collection.findOne({});

  if (current_data && current_data.current_poll) {
    current_poll = current_data.current_poll;
  }
};

// On Ready
client.once("ready", () => {
  console.log(`=== Logged In As: ${client.user.tag} ===`);
  DB_CONNECT().then(() => {
    console.log("=== Data Synced With Database ===");
  });
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

          DB_CONNECT(current_poll);

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
            if (item.votes.length > winner_total) {
              winner = item.title;
              winner_total = item.votes.length;
            }
          });

          if (winner !== "") {
            interaction.reply(`@everyone POLL CLOSED, WINNER: ${winner}`);
          } else {
            interaction.reply(`@everyone POLL CLOSED, NO WINNER`);
          }

          current_poll = [];

          DB_CONNECT([], true);
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
      if (current_poll && current_poll.length > 0) {
        let vote_list = [];
        let vote_index = 0;

        while (vote_index < 3) {
          const string = interaction.options.getString(
            `vote_${vote_index + 1}`
          );

          if (
            string &&
            parseFloat(string) > 0 &&
            parseFloat(string) <= current_poll.length
          ) {
            vote_list = [...vote_list, string];
          }
          vote_index++;
        }

        if (vote_list.length > 0) {
          let invalid_vote = false;

          vote_list
            .sort((a, b) => a - b)
            .forEach((item, index) => {
              if (vote_list[index - 1] && item === vote_list[index - 1]) {
                invalid_vote = true;
              }
            });

          if (invalid_vote === false) {
            current_poll.forEach((item, index) => {
              if (
                item.votes &&
                item.votes.findIndex(
                  (item_two) => item_two === interaction.user.id.toString()
                ) !== -1
              ) {
                let new_votes = item.votes;

                new_votes.splice(
                  item.votes.findIndex(
                    (item_two) => item_two === interaction.user.id.toString()
                  ),
                  1
                );

                current_poll[index].votes = new_votes;
              }
            });

            vote_list.forEach((item) => {
              current_poll[item - 1].votes = [
                ...current_poll[item - 1].votes,
                interaction.user.id.toString(),
              ];
            });

            DB_CONNECT(current_poll, true);

            interaction.reply("Your votes have been submitted.");
          } else {
            interaction.reply("You cannot vote for the same option twice.");
          }
        } else {
          interaction.reply("Error encountered while voting.");
        }
      } else {
        interaction.reply("There is currently not a poll running.");
      }
    }
  }
});

client.login(CONFIG.DISCORD_TOKEN);
