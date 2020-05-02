module.exports = {
    help: 'Check compatibility between two users',
    func: (Client, msg, args) => {
        if (args[1] !== undefined && args[2] !== undefined) {
            // TODO: Requires args 1 & 2 to be case sensitive but this gets sanitized in index.js when arguments get handled
            var user1 = Client.bot.users.find(user => user.username == args[2]).id;
            var user1 = Client.bot.users.find(user => user.username == args[1]).id;
            // TODO: Take two last numbers of user id and get a number between 1-100 out of it
            // If 100 then 100, if over 100, cute the first number
        }
    }
}
