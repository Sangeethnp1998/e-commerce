const mongoose = require('mongoose')
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name should not exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [
        2000,
        'Product description should not exceed 2000 characters',
      ],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      maxlength: [5, 'Product price should not exceed 5 characters'],
      default: 0.0,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: [
        'Electronics',
        'Books',
        'Clothing',
        'Home',
        'Beauty',
        'Sports',
        'Automotive',
        'Other',
      ],
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      maxlength: [5, 'Product stock should not exceed 5 characters'],
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
