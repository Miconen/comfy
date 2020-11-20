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
        if (args.length > 2) return Client.errorReply(msg, 'Too many arguments, try !help uptime');
        var uptime = Math.round(process.uptime());
        switch (args[1]) {
            case 'seconds':
                uptime = uptime.toFixed(2) + " seconds";
                break;
            case 'minutes':
                uptime = (uptime / 60).toFixed(2) + " minutes";
                break;
            case 'hours':
                uptime = (uptime / 3600).toFixed(2) + " hours";
                break;
            case 'days':
                uptime = (uptime / 86400).toFixed(2) + " days";
                break;
            case 'weeks':
                uptime = (uptime / 604800).toFixed(2) + " weeks";
                break;
            case 'months':
                uptime = (uptime / 2592000).toFixed(2) + " months";
                break;
            default:
                uptime = (uptime / 3600).toFixed(2) + " hours";
        }

        msg.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: Client.bot.user.username,
                    icon_url: Client.bot.user.avatarURL
                },
                title: "https://github.com/Miconen/comfy",
                url: "https://github.com/Miconen/comfy",
                description: "Uptime",
                fields: [{
                    // Uptime
                    name: "Uptime",
                    value: uptime
                }, ],
                timestamp: new Date(),
                footer: {
                    icon_url: Client.bot.user.avatarURL,
                    text: "Comfy"
                }
            }
        });
    }
};
