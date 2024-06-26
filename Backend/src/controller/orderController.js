const Order = require('../model/orderModel')
const Product = require('../model/productModel')

//create Order
const createOrder = async (req, res, next) => {
  try {
    const cartProducts = req.body.cart;
    const orderPromises = cartProducts.map(async(cart) => {
      const { product, quantity } = cart
      const userId = req.user._id
      const productExists = await Product.findById(product)
      const totalAmount = quantity * productExists.price
      const order = await Order.create({
        user: userId,
        product,
        quantity,
        totalAmount
      })
      const populatedOrder = await Order.findById(order._id)
      .populate('user', '_id')
      .populate('product', 'name -_id')

      const orderObject = {
        _id: order.id,
        order: populatedOrder,
      }
      // orders.push(orderObject)
      return orderObject
    });
    
    // Wait for all order promises to resolve
    const orders = await Promise.all(orderPromises);

    res.status(201).json({
      orders
    })
  } catch (error) {
    next(error)
  }
}

//list orders
const listOrders = async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    let orders
    if (orderId) {
      console.log('1')
      orders = await Order.findById(orderId)
        .populate('user', 'email') // Populate user details
        .populate('product', 'name') // Populate product name
      console.log('2')
    } else {
      orders = await Order.find()
        .populate('user', 'email') // Populate user details
        .populate('product', 'name') // Populate product name
    }

    res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}

//update Order
const updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    let order = await Order.findById(orderId).populate('product', 'price') // Populate product name

    if (!order) {
      res.status(400)
      throw new Error('Order not found')
    }
    //updating the total amount if change in quantity
    const totalAmount = req.body.quantity
      ? order.product.price * req.body.quantity
      : order.totalAmount
    order = await Order.findByIdAndUpdate(
      orderId,
      { ...req.body, totalAmount },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'email') // Populate user details
      .populate('product', 'name price') // Populate product name

    res.status(200).json({
      _id: order.id,
      order: order,
    })
  } catch (error) {
    next(error)
  }
}

//Delete Order
const deleteOrder = async (req, res, next) => {
  try {
    let orderId = req.params.orderId
    const deletedOrder = await Order.findByIdAndDelete(orderId)

    if (!deletedOrder) {
      res.status(400)
      throw new Error('Order not found')
    }

    res.status(200).json({
      message: `Order with id ${orderId} deleted successfully`,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { createOrder, listOrders, updateOrder, deleteOrder }
