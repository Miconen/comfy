const Discord = require("discord.js");
const fs = require("fs");

// TODO: Replace messaging with fancy embeds

class Comfy {
    constructor() {
        // TRUE for dev (Fewbewki Dev#0066)
        // FALSE for production (Fewbewki#7145)
        this.serverDev = true;
        this.ComfyGamble = require("./gambleFramework.js");
        this.ComfyUser = require("./userInstance.js");
        this.serverConfig = require("./config.json");
        this.serverCredentials = require("./credentials.json");
        this.serverCommandsList = fs.readdirSync("./commands/");
        this.serverCommands = {};
        this.serverUsers = [];


        this.serverPrefix = this.serverDev
            ? (this.serverPrefix = this.serverConfig.prefix_dev)
            : (this.serverPrefix = this.serverConfig.prefix);

        this.serverBot = new Discord.Client();

        this.loadAll();
        // this.loadAliases();
        this.startListen();
        // Ternary operator to login based on this.serverDev boolean
        this.serverDev
            ? this.serverBot.login(this.serverCredentials.token_dev)
            : this.serverBot.login(this.serverCredentials.token);
    }
    reply(msg, reply) {
        msg.reply(reply);
    }
    errorReply(msg, error) {
        msg.reply(`ERROR: ${error}`);
        console.log(`ERROR: ${error}`);
    }
    error(error) {
        return console.log(error);
    }
    load(command) {
        if (!command) this.error("No parameter set");
        delete require.cache[require.resolve(`./commands/${command}`)];
        this.serverCommands[command] = require(`./commands/${command}`);
        console.log(`LOADED: ${command}`);

        this.serverCommands[command].name = command;
        // Check if command has aliases to define
        if (!this.serverCommands[command].alias) return;
        this.loadAliases(command);
    }
    loadAll() {
        for (let i = 0; i < this.serverCommandsList.length; i++) {
            let item = this.serverCommandsList[i];
            if (item.match(/\.js$/)) {
                delete require.cache[require.resolve(`./commands/${item}`)];
                let commandName = item.slice(0, -3);
                // Add command and slice file extension off at .slice(0, -3)
                this.serverCommands[
                    commandName
                ] = require(`./commands/${item}`);
                this.serverCommands[commandName].name = commandName;
                console.log(`LOADED: ${this.serverCommands[commandName].name}`);
                // Check if command has aliases to define
                if (!this.serverCommands[commandName].alias) continue;
                this.loadAliases(commandName);
            }
        }
    }
    loadAliases(commandName) {
        // Adds new versions of command with different names
        for (
            let ii = 0;
            ii < this.serverCommands[commandName].alias.length;
            ii++
        ) {
            this.serverCommands[
                this.serverCommands[commandName].alias[ii]
            ] = Object.assign({}, this.serverCommands[commandName]);
            // Add a .isAlias property to alias objects so commands distinguish them
            // Help command uses this to prevent showing commands with same functionality with different names
            this.serverCommands[
                this.serverCommands[commandName].alias[ii]
            ].isAlias = true;
            // Distinguish which command this alias belongs to
            this.serverCommands[
                this.serverCommands[commandName].alias[ii]
            ].aliasOf = commandName;
            // Add command name property to object
            this.serverCommands[
                this.serverCommands[commandName].alias[ii]
            ].name = this.serverCommands[commandName].alias[ii];
            console.log(
                `-alias: ${this.serverCommands[
                    this.serverCommands[commandName].alias[ii]
                ].name
                }`
            );
        }
    }
    startListen() {
        // Catches messages
        this.serverBot.on("message", (msg) => {
            // Validate user input for easier handling
            if (
                msg.content[0] !== this.serverPrefix ||
                msg.content == this.serverPrefix ||
                msg.author.bot
            )
                return;
            // Input in sanitized in lowercase and with no prefix
            let input = msg.content
                .toLowerCase()
                .slice(this.serverPrefix.length);
            let args = input.split(" ");
            if (
                args[0] in this.serverCommands &&
                !this.serverCommands[args[0]].func
            )
                return this.errorReply(msg, "This command is not ready to use");

            // Instanciate a new user
            if (!this.serverUsers[msg.author]) {
                this.serverUsers[msg.author] = new this.ComfyUser(msg);
            }

            if (args[0] in this.serverCommands)
                this.serverCommands[args[0]].func(this, msg, args);
        });
        // When ready console log
        this.serverBot.on("ready", () => {
            this.serverBot.user.setActivity(`Prefix: ${this.serverPrefix}`);
            this.serverBot.user.setStatus("idle");
            console.log(
                `Logged: ${this.serverBot.user.tag}\nPrefix: ${this.serverPrefix}\nDev: ${this.serverDev}`
            );
        });
    }
}

const comfyBot = new Comfy();
