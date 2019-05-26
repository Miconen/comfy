const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

const getRepoInfo = require('git-repo-info');
const gitInfo = getRepoInfo();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (msg.content === 'uptime') {
    msg.reply(Math.round(process.uptime()) + " seconds");
  }

  if (msg.content === 'github') {
    msg.channel.send({embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Fewbewki Repo Info",
      url: "https://github.com/Microoo/fewbewki",
      description: "Cool description :).",
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

client.login(config.token);
