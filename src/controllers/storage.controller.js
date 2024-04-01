const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const fs = require('fs')
const { resolve } = require('path')

const sampleCollection = catchAsync(async (req, res) => {
    let files = req.files[0]
    fs.writeFileSync(resolve(`./uploads/${Date.now()}${files.originalname}`), req.files[0].buffer, (err) => {
        console.error(error)
        if(err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'upload faild' })
        }
    })
    res.status(httpStatus.OK).send({ message: 'uploda success!' })
})

module.exports = {
    sampleCollection
}