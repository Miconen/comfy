// TODO: Remove sendCode and replace everything with fancy embeds

module.exports = {
    help: 'Help with commands',
    func: (Client, msg, args) => {
        if (args.length > 1) {
            if (args[1] in Client.commands && Client.commands[args[1]].help) {
                let help = `${Client.prefix + [args[1]]} :: ${Client.commands[args[1]].help}\n`;
                if (Client.commands[args[1]].help_detailed !== undefined) {

                    // TODO: Make this way of getting object lenght easier
                    Object.size = function(obj) {
                    let size = 0, key;
                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) size++;
                    }
                        return size;
                    };

                    let size = Object.size(Client.commands[args[1]].help_detailed);

                    for (var i = 0; i < size; i++) {

                        if (Client.commands[args[1]].help_detailed[i] !== undefined) {
                            help += `${Client.commands[args[1]].help_detailed[i]}\n`
                        } else {
                            break;
                        }
                    }
                }
                msg.channel.send(help);
            }
        } else {
            let help = `Type ${Client.prefix}help <command> for details\n`;
            for (var command in Client.commands) {
                help += `${Client.prefix + command} :: ${Client.commands[command].help}\n`;
            }
            msg.channel.send(help);
        }
    }
}
