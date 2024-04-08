const fs = require('fs')
const { resolve, basename } = require('path')
const pinataSDK = require('@pinata/sdk')
const config = require('../config/config')
const readline = require('readline')
const pinata = new pinataSDK({ pinataApiKey: config.pinantaCloud.apikey, pinataSecretApiKey: config.pinantaCloud.secret })
const axios = require('axios')
const FormData = require('form-data')
const uuid = require('../utils/uuid');

const nftJsonTemplate = (name, symbol, creators) => {
    return {
        "name": name,
        "symbol": symbol,
        "image": "https://green-sad-canidae-844.mypinata.cloud/ipfs/Qmf5oXtVwkTAhaou7QxSTP17Ki8WASaW8Acc6yyaQ57TvT",
        "properties": {
            "files": [
              {
                "uri": "https://green-sad-canidae-844.mypinata.cloud/ipfs/Qmf5oXtVwkTAhaou7QxSTP17Ki8WASaW8Acc6yyaQ57TvT",
                "type": "image/png"
              }
            ],
            "creators": [
              {
                "address": creators,
                "share": 1
              }
            ],
            "category": null,
            "seed": uuid()
          }
    }
}

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {  
        if (err) {  
          console.error(`delete file: ${err}`)
        } else {  
          console.log(`${filePath} delete success`)
        }  
      });
}

const saveToDist = async (files, sampleType, address) => {
    let pnaParams = {
        str: ''
    }
    let fileName = `${Date.now()}${files.originalname}`
    let filePath = resolve(`./uploads/${fileName}`)
    let texts = files.buffer.toString('utf8')
    let newText = texts.toUpperCase()
    let newBuffer = Buffer.from(newText, 'utf8');

    let nftJson = nftJsonTemplate('biobank', sampleType, address)
    let nftJsonFile = filePath + '.json'

    console.log('filePath==>', filePath)
    console.log('nftJsonFile==>', nftJsonFile)
    fs.writeFileSync(nftJsonFile, JSON.stringify(nftJson), (err)=> {
        if(err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'upload faild')
        }
    })
    fs.writeFileSync(filePath, newBuffer, (err) => {
        if(err) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'upload faild')
        }
    })
    const readableStreamForFile = fs.createReadStream(filePath)

    await getPnaDetail(readableStreamForFile, pnaParams)
    const getPnaAGCT = pnaParams.str.slice(0, 96)
    const gcContent = calculateGCContent(pnaParams.str)

    const jsonStream = fs.createReadStream(nftJsonFile)
    const cid = await saveToPinata(jsonStream)
    sendFileEncrypt(filePath, cid['IpfsHash'])

    deleteFile(nftJsonFile)
    return {
        message: "upload success!",
        cid: cid['IpfsHash'],
        url: 'https://green-sad-canidae-844.mypinata.cloud/ipfs/' + cid['IpfsHash'],
        agct: getPnaAGCT,
        gcContent,
        timestamp: Date.now()
    }
}

const sendFileEncrypt = async(filePath, cid) => {
    const targetUrl = '47.238.200.142:3000/upload'
    const formData = new FormData();  
    const fileContent = fs.readFileSync(filePath)
     

    // 读取文件并添加到 FormData
    // formData.append('file', fs.createReadStream(filePath))
    formData.append('file', fileContent, basename(filePath))
    formData.append('cid', cid)

    await axios.post('http://47.238.200.142:3000/upload', formData, {
        headers: formData.getHeaders(),
    })
    deleteFile(filePath)
}

const saveToPinata = async (readableStreamForFile) => {
    const options = {
        pinataMetadata: {
            name: 'gene_nft',
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
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: readableStreamForFile,
            crlfDelay: Infinity
        })
        rl
            .on('line', (line) => {
                lineNumber += 1
                if (lineNumber == 2) {
                    resolve()
                }
                if (lineNumber >= 2) {
                    pnaParams.str += line.toString().toUpperCase().trim()
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