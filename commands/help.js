const {Command} = require('discord-akairo')
const {Config}  = require('../utils')

class HelpCommand extends Command
{
    constructor()
    {
        super('help', {
            aliases  : ['help'],
            ratelimit: 1,
        })
    }

    async exec(message)
    {
        const commands = this.client.util.embed()
            .setColor(Config.get('colors.primary'))
            .setTitle(`${Config.get('token.symbol')} Tip Bot Commands`)
            .addField(`${Config.get('prefix')}deposit`, `Shows your wallet address. If you have no wallet yet a new one will be created for you`)
            .addField(`${Config.get('prefix')}balance`, `Shows your wallet\'s balance`)
            .addField(`${Config.get('prefix')}getgas`, `The bot will send you some gas. This command only works if your gas balance is below 0.01 \nAlias: ${Config.get('prefix')}gasmeup`)
            .addField(`${Config.get('prefix')}send 100 0x89y92...38jhu283h9`, `Send ${Config.get('token.symbol')} to an external address`)
            .addField(`${Config.get('prefix')}sendmax 0x89y92...38jhu283h9`, `Send all of your ${Config.get('token.symbol')} to an external address`)
            .addField(`${Config.get('prefix')}tip 100 @user1`, `Send a tip to mentioned user\nAlias: ${Config.get('prefix')}gift ${Config.get('prefix')}give`)
            .addField(`${Config.get('prefix')}tipsplit 100 @user1 @user2`, `Split a tip among mentioned users\nAlias: ${Config.get('prefix')}split ${Config.get('prefix')}splitgift ${Config.get('prefix')}divide ${Config.get('prefix')}tipdivide ${Config.get('prefix')}dividetip`)
            .addField(`${Config.get('prefix')}tiprandom 100`, `Tip a random user from the last 20 messages\nAlias: ${Config.get('prefix')}giftrandom`)
            .addField(`${Config.get('prefix')}rain 100`, `Distribute a tip amongst the users of the last 20 messages`)
            .addField(`${Config.get('prefix')}tipstats`, `Display the tipping stats top 10\nAlias: ${Config.get('prefix')}tipstatistics`)
            .addField(`${Config.get('prefix')}legends`, `Display the legendary b??ta tipping top 10`)
            .addField(`${Config.get('prefix')}burn 100`, `Burn tokens`)
            .addField(`${Config.get('prefix')}burnstats`, `Display the burning stats top 10\nAlias: ${Config.get('prefix')}burnstatistics`)
            .addField(`${Config.get('prefix')}price`, `Display the current ${Config.get('token.symbol')} statistics\nAlias: ${Config.get('prefix')}stats ${Config.get('prefix')}statistics`)
            .addField(`${Config.get('prefix')}version`, `Show the current tipbot version\nAlias: ${Config.get('prefix')}v`)
            .addField(`${Config.get('prefix')}ping`, `Responds with "pong!" when the bot is online`)
            .addField(`${Config.get('prefix')}degen`, `Fake command the bot will react to with a ??? \n These commands are only available in #????degen-chat\nAlias: ${Config.get('prefix')}slarp ${Config.get('prefix')}slurp ${Config.get('prefix')}dip ${Config.get('prefix')}rug ${Config.get('prefix')}rugpull ${Config.get('prefix')}burnall`)
        await message.author.send(commands)

        const info = this.client.util.embed()
            .setColor(Config.get('colors.info'))
            .setTitle(`:information_source: Cooldown`)
            .setDescription(`In order to prevent spamming there is a cooldown period of ${parseFloat(Config.get('cooldown')) / 1000} seconds per command per user.`)
        await message.author.send(info)
    }
}

module.exports = HelpCommand