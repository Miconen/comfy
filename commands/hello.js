module.exports = {
    help: 'Check/test bot functionality',

    func: (Client, msg, args) => {
        if (args.length > 1) return Client.error(msg, 'Too many arguments');
        msg.reply('Hello World');
    }
}
