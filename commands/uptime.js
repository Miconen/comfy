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
    alias: [
        "runtime"
    ],
    func: (Client, msg, args) => {
        if (args.length > 2) return Client.error(msg, 'Too many arguments, try !help uptime');
        var uptime = Math.round(process.uptime());
        switch (args[1]) {
            case 'seconds':
                uptime = uptime + " seconds";
                break;
            case 'minutes':
                uptime = uptime / 60 + " minutes";
                break;
            case 'hours':
                uptime = uptime / 3600 + " hours";
                break;
            case 'days':
                uptime = uptime / 86400 + " days";
                break;
            case 'weeks':
                uptime = uptime / 604800 + " weeks";
                break;
            case 'months':
                uptime = uptime / 2592000 + " months";
                break;
            default:
                uptime = uptime + " seconds";
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
                    value: parseInt(uptime).toFixed(2)
                }, ],
                timestamp: new Date(),
                footer: {
                    icon_url: Client.bot.user.avatarURL,
                    text: "Fewbewki"
                }
            }
        });
    }
};
