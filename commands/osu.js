// TODO: Whole command lol
module.exports = {
    help: 'Commands related to the circle clicking game known as osu!',
    help_detailed: [
        'vitun meme'
    ],
    func: (Client, msg, args) => {
        function osuRequest(type, user, callback) {
            if (type == 'profile') var settings = 'get_user?u=' + user;
            if (type == 'recent') var settings = 'get_user_recent?u=' + user;
            var osuUrl = 'https://osu.ppy.sh/api/' + settings + '&k=' + Client.credentials.osuapi;

            (async () => {
                try {
                    const response = await got(osuUrl);
                    console.log(response);
                } catch (error) {
                    console.log(error.response);
                }
            })();
        }

        function osuRecentplay(xhttp) {

        }

        function osuProfile(xhttp) {

        }
        if (args.length == 1) {
            args[1] = args[0];
            return Client.commands.help.func(Client, msg, args);
        }

        if (args[1] == 'profile') {
            osuRequest('profile', args[2], osuProfile)
        }
    }
}
