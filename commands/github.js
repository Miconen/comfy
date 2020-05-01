module.exports = {
    help: 'Info about github',
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
                // IDEA: Add random flavor text from array
                description: "Cool description here :)",
                fields: [{
                        name: "General",
                        value: "Branch: " + Client.gitformation.branch,
                    },
                    {
                        name: "Last Commit",
                        value: Client.gitformation.committer + " at " + Client.gitformation.committerDate + " _'" + Client.gitformation.commitMessage + "'_"
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
