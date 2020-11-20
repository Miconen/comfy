const Discord = require('discord.js');
const fs = require('fs');
const getRepoInfo = require('git-repo-info');
var colors = require('colors');

// TODO: Replace messaging with fancy embeds

class Comfy {
    constructor() {
        // TRUE for dev (Fewbewki Dev#0066)
        // FALSE for production (Fewbewki#7145)
        this.devToggle = false;
        this.config = require('./config.json');
        this.credentials = require("./credentials.json");
        this.commandsList = fs.readdirSync('./commands/');
        this.commands = {};
        colors.setTheme({
            help: 'blue',
            warn: 'yellow',
            success: 'green',
            error: 'red'
        });

        this.prefix = this.dev ? this.prefix = this.config.prefix_dev : this.prefix = this.config.prefix;

        this.gitformation = getRepoInfo();
        this.bot = new Discord.Client();
        
        this.loadAll();
        // this.loadAliases();
        this.startListen();
        // Ternary operator to login based on this.dev boolean
        this.dev ? this.bot.login(this.credentials.token_dev) : this.bot.login(this.credentials.token);

    }
    errorReply(msg, error) {
        msg.reply(`ERROR: ${error}`);
        console.log(`ERROR: ${error}`.error);
    }
    error(error) {
        return console.log(error.error);
    }
    load(command) {
        if (!command) this.error('No parameter set');
        delete require.cache[require.resolve(`./commands/${command}`)];
        this.commands[command] = require(`./commands/${command}`);
        console.log(`LOADED: ${command}`.success);
        
        this.commands[command].name = command;
        // Check if command has aliases to define
        if (!this.commands[command].alias) return;
        this.loadAliases(command);
    }
    loadAll() {
        let i;
        for (let i = 0; i < this.commandsList.length; i++) {
            let item = this.commandsList[i];
            if (item.match(/\.js$/)) {
                delete require.cache[require.resolve(`./commands/${item}`)];
                let commandName = item.slice(0, -3);
                // Add command and slice file extension off at .slice(0, -3)
                this.commands[commandName] = require(`./commands/${item}`);
                this.commands[commandName].name = commandName;
                console.log(`LOADED: ${this.commands[commandName].name}`.success);
                // Check if command has aliases to define
                if (!this.commands[commandName].alias) continue;
                this.loadAliases(commandName);
            }
        }
    }
    loadAliases(commandName) {
        // Adds new versions of command with different names
        for (let ii = 0; ii < this.commands[commandName].alias.length; ii++) {
            this.commands[this.commands[commandName].alias[ii]] = Object.assign({}, this.commands[commandName]);
            // Add a .isAlias property to alias objects so commands distinguish them
            // Help command uses this to prevent showing commands with same functionality with different names
            this.commands[this.commands[commandName].alias[ii]].isAlias = true;
            // Distinguish which command this alias belongs to
            this.commands[this.commands[commandName].alias[ii]].aliasOf = commandName;
            // Add command name property to object
            this.commands[this.commands[commandName].alias[ii]].name = this.commands[commandName].alias[ii];
            console.log(`-alias: ${this.commands[this.commands[commandName].alias[ii]].name}`);
        }
    }
    startListen() {
        // Catches messages
        this.bot.on('message', msg => {
            console.log(`${msg.author}: ${msg.content}`);
            // Validate user input for easier handling
            if (msg.content[0] !== this.prefix || msg.content == this.prefix || msg.author.bot) return;
            // Input in sanitized in lowercase and with no prefix
            let input = msg.content.toLowerCase().slice(this.prefix.length);
            let args = input.split(' ');
            if (args[0] in this.commands) this.commands[args[0]].func(this, msg, args);
        });

        // When ready console log
        this.bot.on('ready', () => {
            console.log(`Logged: ${this.bot.user.tag}\nPrefix: ${this.prefix}\nDev: ${this.dev}`.help);
        });

    }
}

const comfyBot = new Comfy();