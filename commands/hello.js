module.exports = {
    help: 'Check/test bot functionality',
    help_detailed: {
        0: 'lorem',
        1: 'vitun',
        2: 'ipsum',
        3: 'perkele'
    },
    func: (Client, msg, args) => {
        msg.reply('Hello World');
    }
}
