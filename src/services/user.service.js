const httpStatus = require('http-status')
const { User } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // if (await User.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  // }
  return new Promise((resolve) => {resolve(9)})
  // return User.create(userBody)
}

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options)
  return users
}


module.exports = {
  createUser,
  queryUsers
}
