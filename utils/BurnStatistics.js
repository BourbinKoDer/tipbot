const {Sequelize} = require('sequelize');
const DB          = require('./DB')

/**
 * Add amount to burn ranking
 *
 * @return {Promise<void>}
 * @param username
 * @param amount
 */
module.exports.addAmountToRanking = async function (username, amount) {
    const ranking = await DB.burnRanks.findOne({where: {username: username}});

    if (ranking) {
        await DB.burnRanks.update({amount: parseFloat(ranking.amount + amount)}, {
            where: {
                username: username
            }
        });
    } else {
        await DB.burnRanks.create({
            username: username,
            amount  : amount,
        });
    }
}

/**
 * Get burners top ten
 *
 * @return {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
module.exports.getBurnersTopTen = async function () {
    return await DB.burnRanks.findAll({
        limit: 10,
        order: [[Sequelize.col('amount'), 'DESC']]
    });
}

/**
 * Get burn total
 *
 * @return {Promise<string>}
 */
module.exports.getBurnTotal = async function () {
    const result = await DB.burnRanks.findAll({
        attributes: ['amount', [Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
        raw       : true,
    });

    return parseFloat(result[0].total).toFixed(2);
}

/**
 * Get user burn amount
 *
 * @return {Promise<string>}
 */
module.exports.getUserBurnAmount = async function (username) {
    const result = await DB.burnRanks.findAll({
        where: {
            username: username
        },
        raw  : true,
        limit: 1,
    });

    return parseFloat(result[0].amount).toFixed(2);
}