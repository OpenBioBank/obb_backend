const Joi = require('joi')
const { nftSymbol } = require('./custom.validation')


const saveNFTInfo = {
    body: Joi.object().keys({
        nftSymbol: Joi.string().required().custom(nftSymbol),
        creator: Joi.string().required(),
        cid: Joi.string().required(),
        url: Joi.string().required(),
        agct: Joi.string().required(),
        gcContent: Joi.string().required()
    })
}

module.exports = {
    saveNFTInfo
}