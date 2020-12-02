module.exports = {
    help: 'Check/test bot functionality',

    func: (Client, msg, args) => {
        if (args.length > 1) return Client.errorReply(msg, 'Too many arguments');
        Client.reply(msg, 'Hello World');
    }
}
