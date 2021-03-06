const {Harmony}            = require('@harmony-js/core')
const {ChainType, ChainID} = require('@harmony-js/utils')
const {BigNumber}          = require('bignumber.js')
const artifact             = require('../artifact.json')
const axios                = require('axios')
const Config               = require('./Config')

/**
 * Get Viper info
 *
 * @return {Promise<RTCIceCandidatePair>}
 */
exports.viperInfo = async function () {
    const response = await axios({
        url   : 'https://graph.viper.exchange/subgraphs/name/venomprotocol/venomswap',
        method: 'post',
        data  : {
            query: `
                {         
                    pair(id: "${Config.get('token.viper_pair_id')}") {
                    token0 {
                        id
                        symbol
                        name
                    }
                        token0Price
                        token1Price
                        volumeUSD
                        txCount
                    }
                }
            `
        }
    })

    return response.data.data.pair
}

/**
 * Get ONE price
 *
 * @return {Promise<string>}
 */
exports.onePrice = async function () {
    const response = await axios({
        url   : 'https://api.binance.com/api/v3/ticker/price?symbol=ONEUSDT',
        method: 'GET',
    })

    return parseFloat(response.data.price).toFixed(6)
}

/**
 * Get volume
 *
 * @return {Promise<string>}
 */
exports.volume = async function () {
    const response = await axios({
        url   : 'https://graph.viper.exchange/subgraphs/name/venomprotocol/venomswap',
        method: 'post',
        data  : {
            query: `
                {
                  tokenDayDatas(first: 1, orderBy: date, orderDirection: desc, where: {token: "0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4"}) {
                    date
                    priceUSD
                    totalLiquidityUSD
                    dailyVolumeUSD
                  }
                }
            `
        }
    })

    return parseFloat(response.data.data.tokenDayDatas[0].dailyVolumeUSD).toFixed(6)
}

/**
 * Get circulating supply
 *
 * @return {Promise<number>}
 */
exports.circulatingSupply = async function () {
    const graveyard = [
        '0x000000000000000000000000000000000000dead',
        '0x48a30b33ebd0afac1d8023e06e17372c21c0fb18',
        '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
        '0xbb4972a578266e0800d98f4248d057d6f6cde2bf',
    ]
    const hmy       = new Harmony(
        Config.get('token.rpc_url'),
        {
            chainType: ChainType.Harmony,
            chainId  : ChainID.HmyMainnet,
        },
    )
    const contract  = hmy.contracts.createContract(artifact.abi, Config.get('token.contract_address'))

    let graveyardAmount = 0
    for (let i = 0; i < graveyard.length; i++) {
        const weiBalance = await contract.methods.balanceOf(graveyard[i]).call()
        graveyardAmount  = parseFloat(graveyardAmount) + parseFloat(BigNumber(weiBalance).dividedBy(Math.pow(10, Config.get('token.decimals'))))
    }

    return 450000000 - parseFloat(graveyardAmount)
}

/**
 * Get total supply
 *
 * @return {Promise<number>}
 */
exports.totalSupply = async function () {
    const graveyard = [
        '0x000000000000000000000000000000000000dead',
        '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
    ]
    const hmy       = new Harmony(
        Config.get('token.rpc_url'),
        {
            chainType: ChainType.Harmony,
            chainId  : ChainID.HmyMainnet,
        },
    )
    const contract  = hmy.contracts.createContract(artifact.abi, Config.get('token.contract_address'))

    let graveyardAmount = 0
    for (let i = 0; i < graveyard.length; i++) {
        const weiBalance = await contract.methods.balanceOf(graveyard[i]).call()
        graveyardAmount  = parseFloat(graveyardAmount) + parseFloat(BigNumber(weiBalance).dividedBy(Math.pow(10, Config.get('token.decimals'))))
    }

    return 450000000 - parseFloat(graveyardAmount)
}

/**
 * Mochi price
 *
 * @return {Promise<*>}
 */
exports.mochiPrice = async function () {
    const response = await axios({
        url   : 'https://info.freyala.com/api/exchange-rates/xya_1usdc',
        method: 'get',
    })

    return response.data.rates.buy_rate
}