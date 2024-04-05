const fs = require('fs')
const { resolve } = require('path')
const pinataSDK = require('@pinata/sdk')
const config = require('../config/config')
const readline = require('readline')
const pinata = new pinataSDK({ pinataApiKey: config.pinantaCloud.apikey, pinataSecretApiKey: config.pinantaCloud.secret })

const saveToDist = async (files) => {
    let pnaParams = {
        str: ''
    }
    let filePath = resolve(`./uploads/${Date.now()}${files.originalname}`)
    const text = files.buffer.toString()
    fs.writeFileSync(filePath, files.buffer, (err) => {
        if(err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'upload faild')
        }
    })
    const readableStreamForFile = fs.createReadStream(filePath)

    const getPnaAGCT = await getPnaDetail(readableStreamForFile, pnaParams)
    const gcContent = calculateGCContent(pnaParams.str)
    const cid = await saveToPinata(readableStreamForFile)
    return {
        message: "upload success!",
        cid: cid['IpfsHash'],
        agct: getPnaAGCT['agctString'],
        gcContent,
        timestamp: Date.now()
    }
}

const saveToPinata = async (readableStreamForFile) => {
    const options = {
        pinataMetadata: {
            name: 'pna',
            keyvalues: {
                customKey: 'meta_pna'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    }

    const ipfsInfo = await pinata.pinFileToIPFS(readableStreamForFile, options)
    return ipfsInfo
}

const getPnaDetail = async(readableStreamForFile, pnaParams) => {
    let lineNumber = 0
    let gcString = ''
    let agctString = ''
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: readableStreamForFile,
            crlfDelay: Infinity
        })
        rl
            .on('line', (line) => {
                lineNumber += 1
                if (lineNumber == 2) {
                    gcString = line.toString()
                    resolve({agctString: gcString.slice(0, 16)})
                }
                if (lineNumber >= 2) {
                    pnaParams.str += line.toString().trim()
                }
            })
            .on('close', () => {
                console.log('close')
            })
    })
}

const calculateGCContent = (str) => {
    let cContent = str.split('C').length - 1
    let gContent = str.split('G').length - 1
    let cgContent = (((cContent + gContent)/ str.length) * 100).toFixed(2) + '%'
    return cgContent
}

const getGCContent = () => {
    const jsonData = fs.readFileSync(resolve(__dirname, './json/genomes.json'), 'utf-8')
    return JSON.parse(jsonData)
}

module.exports = {
    saveToDist,
    getGCContent
}