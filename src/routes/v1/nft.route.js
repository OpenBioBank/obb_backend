const express = require('express')
const validate = require('../../middlewares/validate')
const NFTValidation = require('../../validations/nft.validation')
const NFTController = require('../../controllers/nft.controller')

const router = express.Router()

router.post('/saveNFTInfo', validate(NFTValidation.saveNFTInfo), NFTController.saveNFTInfo)
router.get('/getNFTInfo', NFTController.getNFTInfo)

module.exports = router