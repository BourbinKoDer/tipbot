const {Command} = require('discord-akairo')
const {Config}  = require('../utils')
const git       = require('git-rev-sync')


class PingCommand extends Command
{
    constructor()
    {
        super('version', {
            aliases  : ['version', 'v'],
            ratelimit: 1,
        })
    }

    async exec(message)
    {
        const embed = this.client.util.embed()
            .setColor(Config.get('colors.primary'))
            .setTitle(`${Config.get('token.symbol')} Tipbot version`)
            .setDescription('```' + git.tag(false) + '```')
        await message.reply(embed)
    }
}

module.exports = PingCommand