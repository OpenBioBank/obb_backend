const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { nftService } = require('../services')
const pick = require('../utils/pick')


const saveNFTInfo = catchAsync(async (req, res) => {
    const result = await nftService.saveNFTRecord(req.body)
    res.status(httpStatus.OK).send({
        code: 200,
        data: result
    })
})

const getNFTInfo = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['nftSymbol',])
    const options = pick(req.query, ['limit', 'page'])
    options.sortBy = 'timestamp:desc'
    const result = await nftService.getNFTRecord(filter, options)
    res.status(httpStatus.OK).send({
        code: 200,
        data: result
    })
})

const getNFTByCreator = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['nftSymbol', 'creator'])
    const options = pick(req.query, ['limit', 'page'])
    options.sortBy = 'timestamp:desc'
    const result = await nftService.getNFTByCreator(filter, options)
    res.status(httpStatus.OK).send({
        code: 200,
        data: result
    })
})

module.exports = {
    saveNFTInfo,
    getNFTInfo,
    getNFTByCreator
}