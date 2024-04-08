const Joi = require('joi')
const { mimetype } = require('./custom.validation')

const sampleCollection = {
    files: Joi.array().length(1).items(
        Joi.object().keys({
            fieldname: Joi.string().required(),
            originalname: Joi.string(),
            encoding: Joi.string(),
            mimetype: Joi.string().custom(mimetype),
            buffer: Joi.binary().required(),
            size: Joi.number()
        })
    ),
    body: Joi.object().keys({
        sampleType: Joi.string().required(),
        manufacturer: Joi.string().required(),
        address: Joi.string().required(),
        desc: Joi.string(),
    })
}

module.exports = {
    sampleCollection
}