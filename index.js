const Discord = require('discord.js');
const fs = require('fs');
const getRepoInfo = require('git-repo-info');

Client = {
    // TRUE for dev (Fewbewki Dev#0066)
    // FALSE for production (Fewbewki#7145)
    dev: true,
    config: require('./config.json'),
    credentials: require("./credentials.json"),
    prefix: undefined,
    gitformation: getRepoInfo(),
    bot: new Discord.Client(),
    load: (command) => {
        let commandsList = fs.readdirSync('./commands/');
        if (command) {
            if (commandsList.indexOf(`${command}`) >= 0) {
                delete require.cache[require.resolve(`./commands/${command}`)];
                Client.commands[command] = require(`./commands/${command}`);
            }
        } else {

            if (Client.prefix == undefined) {
                if (Client.dev === true) Client.prefix = Client.config.prefix_dev;
                else Client.prefix = Client.config.prefix;
            }

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

Client.bot.on('ready', () => {
    console.log(`Logged in as ${Client.bot.user.tag}!`);
});

Client.bot.on('message', msg => {

    // Validate user input for easier handling
    if (msg.content[0] !== Client.prefix || msg.content == Client.prefix || msg.author.bot) return;
    // Input in sanitized in lowercase and with no prefix
    var input = msg.content.toLowerCase().slice(Client.prefix.length);
    var args = input.split(' ');
    if (args[0] in Client.commands) {
        Client.commands[args[0]].func(Client, msg, args);
    }
});

if (Client.dev === true) {
    Client.bot.login(Client.credentials.token_dev);
} else {
    Client.bot.login(Client.credentials.token);
}
