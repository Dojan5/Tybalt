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
    .registerGroups([
        ['admin', 'Administrative Commands'],
        ['guild', 'Guild Specific Commands'],
        ['misc', 'Miscellaneous Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

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

//Code to be executed when the client disconnects
client.on('disconnect', (e) => {
    console.error(`Hey, commander. I lost connection on ${functions.Horologicus}`);
    console.error(e);
});

client.on('message', msg => {
    //TODO: *All* the stuff
});

client.on('guildMemberAdd', member => {
    //TODO: ALL the stuff here as well!
});

client.login(config.Token).catch(error => {
    console.log('Sorry Commander, I cannot authenticate.\n' + error);
});