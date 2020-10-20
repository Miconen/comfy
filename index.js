const Discord = require('discord.js');
const fs = require('fs');
const getRepoInfo = require('git-repo-info');

// TODO: Add osu profile and recent play commands

Client = {
    // TRUE for dev (Fewbewki Dev#0066)
    // FALSE for production (Fewbewki#7145)
    dev: false,
    // Includes prefixes for dev and production version of the bots and allows for easy changes through the file
    config: require('./config.json'),
    // Bot tokens
    credentials: require("./credentials.json"),
    // Leaving as undefined cause it gets defined anyways on startup based on Client.dev boolean
    prefix: undefined,
    // Github repo information module
    gitformation: getRepoInfo(),
    // Game of thrones
    got: require('got'),
    // Error function
    error: (msg, error) => {
        msg.reply(error)
    },
    // Discord.js stuff
    bot: new Discord.Client(),
    // Load commands from commands folder
    load: (command) => {
        let commandsList = fs.readdirSync('./commands/');
        if (command) {
            if (commandsList.indexOf(`${command}`) >= 0) {
                delete require.cache[require.resolve(`./commands/${command}`)];
                Client.commands[command] = require(`./commands/${command}`);
            }
        } else {
            // This runs on initial load and sets Client.prefix to be the proper one based on Client.dev boolean
            if (!Client.prefix) Client.dev ? Client.prefix = Client.config.prefix_dev : Client.prefix = Client.config.prefix;

            // Add commands
            Client.commands = {};
            for (i = 0; i < commandsList.length; i++) {
                let item = commandsList[i];
                if (item.match(/\.js$/)) {
                    delete require.cache[require.resolve(`./commands/${item}`)];
                    let commandName = item.slice(0, -3);
                    // Add command and slice file extension off at .slice(0, -3)
                    Client.commands[commandName] = require(`./commands/${item}`);
                    Client.commands[commandName].name = commandName;
                }
            }
            // Add aliases of commands
            for (i = 0; i < commandsList.length; i++) {
                let item = commandsList[i];
                let aliasName = item.slice(0, -3);
                // Check if command has aliases to define
                if (!Client.commands[aliasName].alias) continue;

                // Adds new versions of command with different names
                for (var ii = 0; ii < Client.commands[aliasName].alias.length; ii++) {
                    Client.commands[Client.commands[aliasName].alias[ii]] = Object.assign({}, Client.commands[aliasName]);
                    // Add a .isAlias property to alias objects so commands distinguish them
                    // Help command uses this to prevent showing commands with same functionality with different names
                    Client.commands[Client.commands[aliasName].alias[ii]].isAlias = true;
                    // Distinguish which command this alias belongs to
                    Client.commands[Client.commands[aliasName].alias[ii]].aliasOf = aliasName;
                    // Add command name property to object
                    Client.commands[Client.commands[aliasName].alias[ii]].name = Client.commands[aliasName].alias[ii];
                }
            }
        }
    }
}

// Initiate commands for the first time on startup
Client.load();

// Catches messages
Client.bot.on('message', msg => {
    // Validate user input for easier handling
    if (msg.content[0] !== Client.prefix || msg.content == Client.prefix || msg.author.bot) return;
    // Input in sanitized in lowercase and with no prefix
    var input = msg.content.toLowerCase().slice(Client.prefix.length);
    var args = input.split(' ');
    if (args[0] in Client.commands) Client.commands[args[0]].func(Client, msg, args);
});

// When ready console log
Client.bot.on('ready', () => {
    console.log(`Logged: ${Client.bot.user.tag}\nPrefix: ${Client.prefix}\nDev: ${Client.dev}`);
});

// Ternary operator to login based on Client.dev boolean
Client.dev ? Client.bot.login(Client.credentials.token_dev) : Client.bot.login(Client.credentials.token);
