const express = require('express')
const validate = require('../../middlewares/validate')
const storageValidation = require('../../validations/storage.validation')
const storageController = require('../../controllers/storage.controller')
const multer = require('multer')
const upload = multer()

const router = express.Router()

router.post('/sampleCollection', upload.array('files'), validate(storageValidation.sampleCollection), storageController.sampleCollection)

module.exports = router