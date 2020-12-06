class ComfyQuery {
    constructor() {
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mico.ywdmj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        this.client;
    }
    dbInsert(user) {
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.client.connect((err, db) => {
            if (err) throw err;
            var dbo = db.db("Comfy");
            var myobj = { id: user.clientUser.id, username: user.clientUser.username, ComfyUser: user };
            dbo.collection("userData").insertOne(myobj, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    }
    dbQuery(Client, query) {
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.client.connect((err, db) => {
            if (err) throw err;
            var dbo = db.db("Comfy");
            dbo.collection("userData").find(query).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                result.forEach(element => {
                    Client.serverUsers[element.id] = new Client.ComfyUser(element.ComfyUser.clientUser);
                    Client.serverUsers[element.id].setCurrency(element.ComfyUser.clientCurrency);
                });
            });
        });
    }
    dbUpdate() {
        // TODO: Functionality
    }
}

module.exports = ComfyQuery;