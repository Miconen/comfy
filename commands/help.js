module.exports = {
    help: 'Help with commands',
    alias: [
        'commands'
    ],
    func: (Client, msg, args) => {
        if (args.length > 2) Client.errorReply(msg, 'Too many arguments (for now)');
        if (args.length == 2) {
            if (args[1] in Client.commands && Client.commands[args[1]].help) {
                let help = `${Client.prefix + [args[1]]} :: ${Client.commands[args[1]].help}\n`;

                if (Client.commands[args[1]].help_detailed !== undefined) {
                    let size = Client.commands[args[1]].help_detailed;
                    for (var i = 0; i < size.length; i++) {
                        if (Client.commands[args[1]].help_detailed[i]) {
                            help += `${Client.commands[args[1]].help_detailed[i]}\n`;
                        } else {
                            break;
                        }
                    }
                }
                msg.channel.send(help);
            }
        }
        if (args.length == 1) {
            let help = `Type ${Client.prefix}help <command> for details\n`;
            for (var command in Client.commands) {
                if (!Client.commands[command].isAlias) help += `${Client.prefix + command} :: ${Client.commands[command].help}\n`;
            }
            msg.channel.send(help);
        }
    }
}
