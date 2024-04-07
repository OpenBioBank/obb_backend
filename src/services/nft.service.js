const { NFT } = require('../models');

const saveNFTRecord = async ({nftSymbol, creator, cid, url, agct, gcContent} = params) => {
    NFT.create({
        nftSymbol,
        creator,
        cid,
        url,
        gcContent,
        agct,
        timestamp: Date.now()
    })
    
    return {
        message: "save success!",
        data: []
    }
}

const getNFTRecord = async (params, options) => {
    const tokenRes = await NFT.paginate(params, options)
    return {
        message: "",
        data: tokenRes
    }
}

const getNFTByCreator = async (params, options) => {
    const tokenRes = await NFT.paginate(params, options)
    return {
        message: "",
        data: tokenRes
    }
}

module.exports = {
    saveNFTRecord,
    getNFTRecord,
    getNFTByCreator
}