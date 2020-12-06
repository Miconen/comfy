class ComfyUser {
    constructor(msg) {
        this.clientUser = msg;
        this.clientInstances = {};
        this.clientCurrency;
        if (this.clientUser.id == '136856906139566081') {
            this.clientRole = 'admin';
        } else {
            this.clientRole = 'user';
        }
    }
    loadNewUser() {

    }
    getCurrency() {
        return this.clientCurrency;
    }
    setCurrency(amount) {
        this.clientCurrency = amount;
        // TODO: Save to database
    }
}

module.exports = ComfyUser;
