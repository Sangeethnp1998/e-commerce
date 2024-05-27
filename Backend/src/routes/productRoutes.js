const express = require('express')
const {
  addProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} = require('../controller/productController')
const {verifyToken} = require('../middlewares/verifyToken')

const router = express.Router()

//Add product
router.route('/add').post(verifyToken, addProduct)
//List product
router.route('/list').get(verifyToken, listProducts)
//Update product
router.route('/update/:id').put(verifyToken, updateProduct)
//Delete product
router.route('/delete/:id').delete(verifyToken, deleteProduct)

module.exports = router
