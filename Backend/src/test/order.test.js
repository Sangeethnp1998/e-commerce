const supertest = require('supertest')

const Order = require('../model/orderModel')
const Product = require('../model/productModel')
const User = require('../model/userModel')
// const {verifyToken} = require('../middlewares/verifyToken')

jest.mock('../../db/db', () => ({
  connectDB: jest.fn(),
}))
jest.mock('../model/orderModel')
jest.mock('../model/productModel')
jest.mock('../model/userModel')
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({
    id: '2222',
  }),
}))

const app = require('../../app')

const url = '/api/order'

describe('order', () => {
  let body
  let request
  let order
  beforeAll(() => {
    request = supertest(app)
    order = {
      _id: '1111',
      user: '2222',
      product: '1234',
      quantity: 2,
      totalAmount: 200,
    }
  })

  beforeEach(() => {
    body = {
      product: '1234',
      quantity: 10,
    }
    jest.clearAllMocks()
  })

  it('should create an order', async () => {
    const product = { _id: '1234', price: 100, name: 'test_product' }
    const user = { _id: '2222', name: 'test_user' }
    // const order = {
    //   _id: '1111',
    //   user: '2222',
    //   product: '1234',
    //   quantity: 2,
    //   totalAmount: 200,
    // };
    const mockSelect = jest.fn().mockResolvedValue(user)
    const mockOrderPopulate = jest.fn().mockReturnThis()

    User.findById.mockReturnValue({
      select: mockSelect,
    })
    Product.findById.mockResolvedValue(product)
    Order.create.mockResolvedValue(order)

    Order.findById.mockResolvedValue({
      ...order,
      populate: jest.fn().mockResolvedValue({
        user: { _id: '2222' },
        product: { name: 'test_product' },
      }),
    })

    Order.findById.mockReturnValue({
      populate: mockOrderPopulate,
    })

    const response = await request
      .post(`${url}/add`)
      .set('Authorization', 'Bearer mocktoken')
      .send({
        product: '1234',
        quantity: 2,
      })
    expect(response.status).toBe(201)
    expect(Product.findById).toHaveBeenCalledWith('1234')
    expect(Order.findById).toHaveBeenCalledWith('1111')
    expect(User.findById).toHaveBeenCalledWith('2222')
    expect(mockSelect).toHaveBeenCalledWith('-password')
  })

  it('should list a single order', async () => {
    let orderId = 'mockID'
    const mockOrderPopulate = jest.fn().mockReturnThis()

    Order.findById.mockResolvedValue({
      order,
    })
    Order.findById.mockReturnValue({
      populate: mockOrderPopulate,
    })

    const response = await request
      .get(`${url}/list/${orderId}`)
      .set('Authorization', 'Bearer mocktoken')
    expect(response.status).toBe(200)
    expect(Order.findById).toHaveBeenCalledWith('mockID')
    expect(mockOrderPopulate).toHaveBeenCalledWith('user', 'email')
    expect(mockOrderPopulate).toHaveBeenCalledWith('product', 'name')
  })
})
