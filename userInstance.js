class ComfyUser {
    constructor(msg) {
        this.clientUserID = msg.author;
        this.clientInstances = {};
        this.clientCurrency = 500;
        if (this.clientUserID.id == '136856906139566081') {
            this.clientRole = 'admin';
        } else {
            this.clientRole = 'user';
        }
    }
    getCurrency() {
        return this.clientCurrency;
    }
    setCurrency(amount) {
        this.clientCurrency = amount;
    }
}

module.exports = ComfyUser;
