const { Client } = require("discord.js");

class ComfyGamble {
    constructor(Client, msg, args) {
        this.msg = msg;
        this.game = args[1];
        this.stake = args[2];
        this.status;

        this.createMinigame(Client, args);
    }
    getStatus() {
        return this.status;
    }
    setStatus(newStatus) {
        this.status = newStatus;
    }
    getStake() {
        return this.stake;
    }
    setStake(Client, newStake) {
        Client.serverUsers[this.msg.author].setCurrency(Client.serverUsers[this.msg.author].getCurrency() - parseInt(newStake));
        this.stake = newStake;
    }
    createMinigame(Client, args) {
        this.setStake(Client, args[2]);
        this.setStatus('created');
    }
    leaveMinigame(Client) {
        Client.reply(this.msg, `Game left, lost ${this.getStake()} & ${Client.serverUsers[this.msg.author].getCurrency()} left`);
        delete Client.serverUsers[this.msg.author].clientInstances[this.game];
    }
}

module.exports = ComfyGamble;
