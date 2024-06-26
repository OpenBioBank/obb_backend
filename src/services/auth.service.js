const httpStatus = require('http-status')
const tokenService = require('./token.service')
const userService = require('./user.service')
const Token = require('../models/token.model')
const ApiError = require('../utils/ApiError')
const { tokenTypes } = require('../config/tokens')

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithPassword = async (email, password) => {
  const user = await userService.getUserByAccount(email)
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }
  return user
}

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false })
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  await refreshTokenDoc.remove()
}

module.exports = {
  loginUserWithPassword,
  logout
}
