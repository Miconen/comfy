module.exports = {
    help: 'Show Uptime',
    help_detailed: [
        "!uptime seconds",
        "!uptime minutes",
        "!uptime hours",
        "!uptime days",
        "!uptime weeks",
        "!uptime months"
    ],
    func: (Client, msg, args) => {
        if (args.length > 2) return;
        switch (args[1]) {
            case 'seconds':
                var uptime = Math.round(process.uptime()) + " seconds"
                break;
            case 'minutes':
                var uptime = Math.round(process.uptime()) / 60 + " minutes"
                break;
            case 'hours':
                var uptime = Math.round(process.uptime()) / 3600 + " hours"
                break;
            case 'days':
                var uptime = Math.round(process.uptime()) / 86400 + " days"
                break;
            case 'weeks':
                var uptime = Math.round(process.uptime()) / 604800 + " weeks"
                break;
            case 'months':
                var uptime = Math.round(process.uptime()) / 2592000 + " months"
                break;
            default:
                var uptime = Math.round(process.uptime()) + " seconds"
        }

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
                    value: uptime
                }, ],
                timestamp: new Date(),
                footer: {
                    icon_url: Client.bot.user.avatarURL,
                    text: "Fewbewki"
                }
            }
        });
    }
}
