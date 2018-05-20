const {
    Command
} = require('discord.js-commando');

module.exports = class PingCider extends Command {
    constructor(client) {
        super(client, {
            name: 'cider',
            group: 'misc',
            memberName: 'cider',
            description: 'Give your ol\' pal some cider. This command exists solely as a ping command.',
            examples: ['none']
        });
    }

    run(msg) {
        var Quips = [
            `Thank you, commander. That sure hit the spot.`,
            `Cider? I always have time for a drink with a good friend.`,
            `Thanks cub, that was delicious.`,
            `Aah. A nice mug of cider with a good friend, doesn't get better than that.`,
            `Sweet, sparkly, quenching. Thank you, commander.`,
            `Apple cider? Thank you, commander! You know me all too well.`,
            `Brimstone's breeches, that was delicious. Thank you, my friend.`,
            `Tribune's tail, that hit the spot. Next one's on me.`,
            `Finally taking me up on that promise, eh old friend?`,
            'Ah, thanks for that, Commander.'
        ];
        return msg.say(Quips[Math.floor(Math.random() * Quips.length)]);
    }
}