module.exports = {
    help: 'Help with commands',
    alias: [
        'commands'
    ],
    func: (Client, msg, args) => {
        if (args.length > 2) Client.errorReply(msg, 'Too many arguments (for now)');
        if (args.length == 2) {
            if (args[1] in Client.serverCommands && Client.serverCommands[args[1]].help) {
                let help = `${Client.serverPrefix + [args[1]]} :: ${Client.serverCommands[args[1]].help}\n`;

                if (Client.serverCommands[args[1]].help_detailed !== undefined) {
                    let size = Client.serverCommands[args[1]].help_detailed;
                    for (var i = 0; i < size.length; i++) {
                        if (Client.serverCommands[args[1]].help_detailed[i]) {
                            help += `${Client.serverCommands[args[1]].help_detailed[i]}\n`;
                        } else {
                            break;
                        }
                    }
                }
                msg.channel.send(help);
            }
        }
        if (args.length == 1) {
            let help = `Type ${Client.serverPrefix}help <command> for details\n`;
            for (var command in Client.serverCommands) {
                if (!Client.serverCommands[command].isAlias) help += `${Client.serverPrefix + command} :: ${Client.serverCommands[command].help}\n`;
            }
            msg.channel.send(help);
        }
    }
}
