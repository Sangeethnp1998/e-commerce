const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const verifyToken = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      //decoded token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      error.message = 'Not authorized , token failed'
      res.status(401).send({
        message: error.message
      })
    }
  }

  if (!token) {
    res.status(401).send({
      message: 'Not authorized , No token provided',
    })
  }
}

module.exports = {verifyToken}
