const {Command}                            = require('discord-akairo')
const {Config, React, Wallet, Transaction} = require('../utils')

class SendCommand extends Command
{
    constructor()
    {
        super('send', {
            aliases  : ['send'],
            channel  : 'dm',
            ratelimit: 1,
            args     : [
                {
                    id     : 'amount',
                    type   : 'number',
                    default: 0
                },
                {
                    id     : 'to',
                    type   : 'string',
                    default: false
                }
            ]
        })
    }

    async exec(message, args)
    {
        await React.processing(message)

        if (!await Wallet.check(this, message, message.author.id)) {
            return
        }

        const amount = args.amount

        if (amount === 0) {
            await React.error(this, message, `Send amount incorrect`, `The send amount is wrongly formatted or missing`)
            return
        }
        if (amount < 0.01) {
            await React.error(this, message, `Send amount incorrect`, `The send amount is to low`)
            return
        }

        const wallet  = await Wallet.get(this, message, message.author.id)
        const balance = await Wallet.balance(wallet)
        const from    = wallet.address
        const to      = args.to

        if (parseFloat(amount + 0.001) > parseFloat(balance)) {
            await React.error(this, message, `Insufficient funds`, `The amount exceeds your balance + safety margin (0.001 ${Config.get('token.symbol')}). Use the \`${Config.get('prefix')}deposit\` command to get your wallet address to send some more ${Config.get('token.symbol')}. Or try again with a lower amount`)
            return
        }

        Transaction.addToQueue(this, message, from, to, amount).then(() => {
            Transaction.runQueue(this, message, message.author.id, true, false, true, false)
        })
    }
}

module.exports = SendCommand