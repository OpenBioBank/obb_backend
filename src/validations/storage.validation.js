const Joi = require('joi')

const sampleCollection = {
    files: Joi.array().length(1).items(
        Joi.object().keys({
            fieldname: Joi.string().required(),
            originalname: Joi.string(),
            encoding: Joi.string(),
            mimetype: Joi.string(),
            buffer: Joi.binary().required(),
            size: Joi.number()
        })
    ),
    body: Joi.object().keys({
        sampleType: Joi.string().required(),
        manufacturer: Joi.string().required(),
        code: Joi.string().required(),
    })
}

module.exports = {
    sampleCollection
}