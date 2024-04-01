const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { authService, userService, tokenService } = require('../services')

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  res.status(httpStatus.OK).send({ user })
})

const login = catchAsync(async (req, res) => {
  const { account, password } = req.body
  const user = await authService.loginUserWithPassword(account, password)
  const tokens = await tokenService.generateAuthTokens(user)
  res.send({ user, tokens })
})

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  register,
  login,
  logout
}
