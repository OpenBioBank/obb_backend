const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { storageService } = require('../services')


const sampleCollection = catchAsync(async (req, res) => {
    const result = await storageService.saveToDist(req.files[0])
    console.log('result===>', result)
    res.status(httpStatus.OK).send(result)
})

module.exports = {
    sampleCollection
}