const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { storageService } = require('../services')


const sampleCollection = catchAsync(async (req, res) => {
    const result = await storageService.saveToDist(req.files[0], req.body.sampleType, req.body.address, req.body.desc)
    res.status(httpStatus.OK).send({
        code: 200,
        data: result
    })
})

const getGenomes = catchAsync(async (req, res) => {
    const result = await storageService.getGCContent()
    res.status(httpStatus.OK).send({
        code: 200,
        data: result
    })
})

module.exports = {
    sampleCollection,
    getGenomes
}