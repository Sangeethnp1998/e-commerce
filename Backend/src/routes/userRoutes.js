const express = require('express')
const { registerUser, authUser } = require('../controller/userController')

const router = express.Router()

//Registering a user without authentication
router.route('/').post(registerUser)

//login API
router.post('/login', authUser)

module.exports = router
