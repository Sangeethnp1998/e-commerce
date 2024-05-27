const User = require('../model/userModel')
const { generateToken } = require('../../auth/auth.js')

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please Enter all the fields')
    }
    const userExists = await User.findOne({
      email,
    })
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    const userObj = {
      name,
      email,
      password,
    }
    const user = await User.create(userObj)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, authUser }
