const sql = require('sqlite');
const {
    CommandoClient,
    SQLiteProvider
} = require('discord.js-commando');
const path = require('path');
const config = require(__dirname + '../../bot-config.json');
const functions = require(__dirname + '/data/functions.js');

//Sets up the SQLite provider
sql.open(path.join(__dirname, "/db/settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
});

//Defines the Commando client variables
const client = new CommandoClient({
    commandPrefix: config.Prefix,
    owner: config.OwnerUserID,
    disableEveryone: false,
    unknownCommandResponse: false
});

//Registration of command groups
//TODO: Reimplement custom commands
client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
//.registerCommandsIn(path.join(__dirname, 'commands'));

//Error and warning handlers
client.on('error', (e) => console.error(e));
client.on('warn', (w) => console.warn(w));

//Defines what happens when client reaches a ready state
client.on('ready', () => {
    console.log(`Hey, commander. I'm good to go!\nIt is currently ${functions.Horologicus("Time")} on ${functions.Horologicus("Date")}.\nCurrently I am active in the following guilds`);
    console.log(client.guilds.map(g => "> " + g.name).join('\n'));
    process.on('unhandledRejection', console.error);
    client.user.setActivity({
        game: {
            name: "Championing the Mists",
            type: 0
        }
    });
});

client.login(config.Token).catch(error => {
    console.log('Sorry Commander, I cannot authentica.\n' + error);
});