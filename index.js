const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'uptime') {
    msg.reply(Math.round(process.uptime()) + " seconds");
  }
});

client.login(config.token);
