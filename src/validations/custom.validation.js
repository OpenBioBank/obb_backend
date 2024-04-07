const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id')
  }
  return value
}

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters')
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number')
  }
  return value
}

const nftSymbol = (value, helpers) => {
  console.log('nftSymbol==>', value)
  switch (value) {
    case 'phages':
      return value
      break;
    case 'viruses':
      return value
      break;
    case 'bacteria':
      return value
      break;
    case 'fungi':
      return value
      break;
    default:
      return helpers.message('Unsupported Symbol, Please check your incoming symbol')
      break;
  }
}

const mimetype = (value, helpers) => {
  console.log('nftSymbol==>', value)
  return value
}

module.exports = {
  nftSymbol,
  objectId,
  password,
  mimetype
}
