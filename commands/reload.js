module.exports = {
    help: 'Reload all or specific command using command names as the argument',
    func: (Client, msg, args) => {
        if (args.length > 2) return Client.error(msg, 'Too many arguments');
        if (msg.author.id != "136856906139566081") return;
        console.log('Something got reloaded');
        if (args.length > 1) Client.load(args[1]);
        else Client.load();
    }
}
