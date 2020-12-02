module.exports = {
    help: 'Haha money go brrr',
    help_detailed: [
        'Test test 123 gambling is good',
    ],
    alias: [
        'casino'
    ],
    instances: [],
    games: [
        'blackjack'
    ],
    func: (Client, msg, args) => {
        // No arguments
        if (args.length == 1) {
            args[1] = args[0];
            return Client.commands.help.func(Client, msg, args);
        }
        // Catch duplicate instancing
        if (Client.commands.gamble.instances[msg.author] && Client.commands.gamble.games.includes(args[1])) return Client.errorReply(msg, `Already ${Client.commands.gamble.instances[msg.author].getStatus()} a game of ${Client.commands.gamble.instances[msg.author].getGame()}`);
        
        if (Client.commands.gamble.instances[msg.author] && args.length == 2) {
            switch (args[1]) {
                case 'leave':
                    Client.commands.gamble.instances[msg.author].leaveMinigame();
                    break;
                case 'status':
                    Client.reply(msg, `${Client.commands.gamble.instances[msg.author].getStatus()} a game of ${Client.commands.gamble.instances[msg.author].getGame()}`);
                    break;
                case 'game':
                    Client.reply(msg, `${Client.commands.gamble.instances[msg.author].getStatus()} a game of ${Client.commands.gamble.instances[msg.author].getGame()}`);
                    break;
                default:
                    Client.commands.help.func(Client, msg, args);
                    break;
            }
        }

        if(Client.commands.gamble.games.includes(args[1]) && args.length == 2) Client.reply(msg, `Specify amount to gamble "${Client.prefix}gamble <minigame> <amount>"`);
        // Instanciate new game for user
        if(Client.commands.gamble.games.includes(args[1]) && args.length == 3) {
            class Gamble {
                constructor() {
                    this.client = Client;
                    this.msg = msg;

                    this.createMinigame();
                }
                getGame() {
                    return this.game;
                }
                setGame(newGame) {
                    this.game = newGame;
                }
                getStatus() {
                    return this.status;
                }
                setStatus(newStatus) {
                    this.status = newStatus;
                }
                setStake(newStake) {
                    this.stake = newStake;
                }
                getStake() {
                    return this.stake;
                }
                createMinigame() {
                    this.setGame(args[1]);
                    this.setStake(args[2]);
                    this.setStatus('created');
                }
                leaveMinigame() {
                    Client.reply(msg, 'Game deleted');
                    delete Client.commands.gamble.instances[msg.author];
                }
            }
            Client.commands.gamble.instances[msg.author] = new Gamble(Client, msg, args);
            console.log(`New instance created for: ${msg.author}`);
            // Add reply for new game created
        }
    }
}