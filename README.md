# Discord Polling Bot
Discord bot made with JavaScript and MongoDB that allows owner to create multi option polls.

# Download
```
git clone https://github.com/daniel-j-crewe/discord-polling-bot.git
```
# Pre Install Notes
**Note 1:** I am hosting this on Heroku but can quite easily be hosted on other platform or just ran locally if that is all that is required.

**Note 2:** This install assumes you are using yarn, if you are instead using NPM look up their verion of the commands.

**Note 3:** This install assumes you have an understand of Discord bots, MongoDB and JavaScript as I will not be explaining the basics, this merely shows how to get the code up and working.

# Install And Setup
This install and setup is split into two sections, the first explaining what needs to be done with regards to discord and the second explaing how to get the code itself running.

## Discord Setup
You will need to log on to the [Discord Developer Portal](https://discord.com/developers/applications) and create an application and then a bot within that. After invite the bot to your desired Discord server using this link:  
  
```
https://discord.com/api/oauth2/authorize?client_id=[YOUR_APP_ID]&permissions=67584&scope=applications.commands%20bot
```

Replacing `[YOUR_APP_ID]` with the application ID that is displayed under the "General Information" tab of your app.

## Code Setup
Once you have downloaded the repo and opened it in your code editor of choice run:
```
yarn install
```

You will then need to setup the `config_variables.js` file as follows:

 `MONGODB_URI`: The url used to connect to your mongoDB cluster.
 
 `MONGODB_DB`: The name of the database you are wanting to connect to.
 
 `MONGODB_COLLECTION`: The name of the collection you are wanting to connect to.
 
 `DISCORD_TOKEN`: The token generated under the "Bot" tab of your application in the discord developer portal.
 
 `CLIENT_ID`: The application ID of the app from the discord developer portal.
 
 `GUILD_ID`: The ID of the server you want the commands to work in.
 
 `OWNER`: The ID of the person you wish to give the ability to create, view and end polls.
 
 You should now be able to run the bot using:
 ```
 yarn start
 ```

# Limitation / Issues
Currently is only setup to manage one poll at a time, could quite easily be changed to allow mutliple to run. It has been creating using the / commands in Discord meaning that the bot will run on a server wide basis instead of a per channel basis. Also you currently have to manually set the owner in the `config_variables.js` folder, again this could quite easily be changed to per per role for example.
