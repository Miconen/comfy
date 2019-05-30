const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const credentials = require("./credentials.json");

const getRepoInfo = require('git-repo-info');
const gitInfo = getRepoInfo();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    // Validate user input for easier handling
    if (msg.author.bot) return;
    if (msg.content[0] !== config.prefix) return;
    var input = msg.content.toLowerCase().slice(1);

    // Dump variables etc
    if (input === 'debug') {
        // Return if not Mico or Kaiku user ID
        console.log(msg.author.id);
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
                        value: "Raw: " + msg.content + " |  Validated: " + input,
                    },
                    {
                        // Uptime
                        name: "Uptime",
                        value: msg.reply(Math.round(process.uptime()) + " seconds"),
                    },
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "Fewbewki"
                }
            }
        });
    }


    // Github info
    if (input === 'github') {
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
    }

});

client.login(credentials.token);
