module.exports = {
    help: 'Show Uptime',
    func: (Client, msg, args) => {
        msg.channel.send({
    embed: {
        color: 3447003,
        author: {
            name: Client.bot.user.username,
            icon_url: Client.bot.user.avatarURL
        },
        title: "https://github.com/Microoo/fewbewki",
        url: "https://github.com/Microoo/fewbewki",
        description: "Uptime",
        fields: [{
                // Uptime
                name: "Uptime",
                value: Math.round(process.uptime()) + " seconds"
            },
        ],
        timestamp: new Date(),
        footer: {
            icon_url: Client.bot.user.avatarURL,
            text: "Fewbewki"
        }
    }
});
    }
}
