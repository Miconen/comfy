const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const credentials = require("./credentials.json");

const getRepoInfo = require('git-repo-info');
const gitInfo = getRepoInfo();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const fewbewki = {
    // TRUE for dev (Fewbewki Dev#0066)
    // FALSE for production (Fewbewki#7145)
    dev: true,
    command: {
        debug: {
            // Command specific input handling
            handler: function(msg, inputArr) {
                fewbewki.command.debug.default(msg, inputArr);
            },
            default: function(msg, inputArr) {
                // Return if not Mico or Kaiku user ID
                if (msg.author.id != "136856906139566081" && msg.author.id != "133701588651999232") return;
                msg.channel.send({
                    embed: {
                        color: 3447003,
                        author: {
                            name: client.user.username,
                            icon_url: client.user.avatarURL
                        },
                        title: "https://github.com/Microoo/fewbewki",
                        url: "https://github.com/Microoo/fewbewki",
                        description: "Debug",
                        fields: [{
                                // Input & validated input
                                name: "Input",
                                value: "Input: " + msg.content + " |  Args: " + inputArr.length
                            },
                            {
                                // Uptime
                                name: "Uptime",
                                value: Math.round(process.uptime()) + " seconds"
                            },
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "Fewbewki"
                        }
                    }
                });
            },
        },
        github: {
            // Command specific input handling
            handler: function(msg, inputArr) {
                fewbewki.command.github.default(msg, inputArr);
            },
            default: function(msg, inputArr) {
            msg.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: "https://github.com/Microoo/fewbewki",
                    url: "https://github.com/Microoo/fewbewki",
                    // IDEA: Add random flavor text from array
                    description: "Cool description here :)",
                    fields: [{
                            name: "General",
                            value: "Branch: " + gitInfo.branch,
                        },
                        {
                            name: "Last Commit",
                            value: gitInfo.committer + " at " + gitInfo.committerDate + " _'" + gitInfo.commitMessage + "'_"
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "Fewbewki"
                    }
                }
            });
        },
        },
        compatibility: {
            handler: function(msg, inputArr) {
                function denyInput(msg, inputArr) {
                    fewbewki.command.compatibility.error(msg, inputArr);
                }
                if (inputArr <= 1 || inputArr[1][0] != '<') {
                    denyInput(msg, inputArr);
                } else {
                    fewbewki.command.compatibility.default(msg, inputArr);
                }
            },

            default: function(msg, inputArr) {
                var randomNumber = Math.floor(Math.random() * 100) + 1;
                msg.channel.send(msg.author + ' & ' + inputArr[1] + ' ' + randomNumber + '%');
            },

            error: function(msg, inputArr) {
                return msg.reply('Invalid input');
            }
        }
    },
};

var prefix;

if (fewbewki.dev === true) {
    prefix = config.prefix_dev;
} else {
    prefix = config.prefix;
}

client.on('message', msg => {

    // Validate user input for easier handling
    if (msg.author.bot) return;
    if (msg.content[0] !== prefix) return;
    var input = msg.content.toLowerCase().slice(1);
    var inputArr = input.split(' ');

    // Catch user input here and use to call from fewbewki object
    if (typeof fewbewki['command'][inputArr[0]]['handler'] === 'function') fewbewki['command'][inputArr[0]]['handler'].apply(null, [msg, inputArr]);

});

if (fewbewki.dev === true) {
    client.login(credentials.token_dev);
} else {
    client.login(credentials.token);
}
