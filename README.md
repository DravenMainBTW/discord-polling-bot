# Discord Polling Bot
Discord bot made with JavaScript And MongoDB that allows owner to create multi option polls.

# Download
```
git clone https://github.com/DravenMainBTW/discord-polling-bot.git
```

# Install And Setup
**Note 1:** I am hosting this on Heroku but can quite easily be hosted on other platform. 

**Note 2:** This install assumes you are using yarn, if you are instead using NPM look up their verion of the commands.

**Note 3:** This install assumes you have a basic understand of Discord.js, MongoDB and JavaScript as I will not be explaining the basics of how to create a discord bot, this merely shows how to get the code up and working.


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
