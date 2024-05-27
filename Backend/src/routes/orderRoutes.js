const express = require('express')
const {verifyToken} = require('../middlewares/verifyToken')
const {
  createOrder,
  listOrders,
  updateOrder,
  deleteOrder,
} = require('../controller/orderController')

const router = express.Router()

//create Order
router.route('/add').post(verifyToken, createOrder)
//List Orders
router.route('/list/:orderId?').get(verifyToken, listOrders)
//Update Order
router.route('/update/:orderId').put(verifyToken, updateOrder)
//Delete Order
router.route('/delete/:orderId').delete(verifyToken, deleteOrder)

module.exports = router
