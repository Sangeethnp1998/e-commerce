//importing libraries
const express = require('express')
require('colors')
const cors = require('cors')
const morgan = require('morgan')

//importing from modules
const { connectDB } = require('./db/db.js')
const {
  errorHandler,
  ResourceNotFound,
} = require('./src/middlewares/errorHandler.js')

// routes
const userRoutes = require('./src/routes/userRoutes.js')
const productRoutes = require('./src/routes/productRoutes.js')
const orderRoutes = require('./src/routes/orderRoutes.js')

//making DB connection
connectDB()

const app = express()

//Allow requests from all origins
app.use(cors())

app.use(express.json())

// Define custom log format
morgan.format('custom', (tokens, req, res) => {
  return [
    new Date().toISOString(),
    tokens.method(req, res),
    tokens.url(req, res),
    'Status:',
    tokens.status(req, res),
    'Content-Length:',
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    'IP:',
    req.ip,
    'User-Agent:',
    tokens['user-agent'](req, res),
  ].join(' ')
})

// Use custom log format
app.use(morgan('custom'))

app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)

app.use(errorHandler)
app.use(ResourceNotFound)

//checking the health route
app.get('/health', (req, res) => {
  res.send('API Running!')
})

module.exports = app
