const Discord = require('discord.js');
const fs = require('fs');
const getRepoInfo = require('git-repo-info');

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
            Client.commands = {};
            for (i = 0; i < commandsList.length; i++) {
                let item = commandsList[i];
                if (item.match(/\.js$/)) {
                    delete require.cache[require.resolve(`./commands/${item}`)];
                    Client.commands[item.slice(0, -3)] = require(`./commands/${item}`);
                }
            }
        }
    }
}

// Initiate commands for the first time
Client.load();

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
