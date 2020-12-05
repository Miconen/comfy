module.exports = {
    help: 'Haha money go brrr',
    help_detailed: ['Test test 123 gambling is good'],
    alias: ['casino'],
    games: ['blackjack'],
    func: (Client, msg, args) => {

        // Game not created
        if (!Client.serverUsers[msg.author].clientInstances[args[1]] && args.length == 3 && Client.serverCommands.gamble.games.includes(args[1])) {
            if (Client.serverUsers[msg.author].getCurrency() < args[2]) return Client.errorReply(msg, `Not enough money, you have: ${Client.serverUsers[msg.author].getCurrency()}`);
            // Instantiate new game for user
            Client.serverUsers[msg.author].clientInstances[args[1]] = new Client.ComfyGamble(
                Client,
                msg,
                args
            );
            Client.reply(msg, `Succesfully instantiated a new game for: ${args[2]} & ${Client.serverUsers[msg.author].getCurrency()} left`);
        }
        // Game already created
        else if (Client.serverUsers[msg.author].clientInstances[args[1]] && args.length == 2) {
            if (Client.serverCommands.gamble.games.includes(args[1])) return Client.errorReply(msg, 'Game already created');
            Client.reply(msg, 'Mid game stuff here');
        }
        // Leave game
        else if (Client.serverUsers[msg.author].clientInstances[args[1]] && args.length == 3 && args[2] == 'leave') {
            Client.serverUsers[msg.author].clientInstances[args[1]].leaveMinigame(Client);
        }
        // Unexpected input
        else {
            Client.errorReply(msg, "fuck you, learn to use the fucking program you fucking moron it's not that hard");
        }
    },
};
