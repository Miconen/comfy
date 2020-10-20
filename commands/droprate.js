module.exports = {
    help: 'Primitive way to roll for a drop',
    alias: [
        "dropchance",
        "drop",
        "kc"
    ],
    // Written in a hurry and might be buggy af
    func: (Client, msg, args) => {
        var maxRolls = 10000;
        function rollRng(rolls, chance) {
            if (!rolls || !chance) return Client.error(msg, 'Invalid arguments');
            if (rolls > maxRolls) return Client.error(msg, 'Max amount of rolls is ' + maxRolls);
            for (i = 0; i < rolls; i++) {
                var rngDrop = Math.floor(Math.random() * chance) + 1;
                if (rngDrop == 1) {
                    var dropRateX = i / chance;
                    return msg.channel.send("Drop at kc: " + i + " | " + dropRateX.toFixed(2) + "x the drop rate");
                };
            };
            return msg.channel.send("No drop :(");
        };
        rollRng(args[1], args[2]);
    }
}
