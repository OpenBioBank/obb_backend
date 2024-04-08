const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const nftSchema = mongoose.Schema(
  {
    nftSymbol: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    cid: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    agct: {
      type: String,
      required: true,
    },
    gcContent: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  }
)

// add plugin that converts mongoose to json
nftSchema.plugin(toJSON)
nftSchema.plugin(paginate)

/**
 * @typedef NFT
 */
const NFT = mongoose.model('NFT', nftSchema)

module.exports = NFT
