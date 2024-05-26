const Product = require('../model/productModel')
const verifyToken = require('../middlewares/verifyToken')

const addProduct = async (req,res,next)=>{
    try {
        let {
            name,
            description,
            price,
            category,
            stock,
            image
        } = req.body;

        if(!name || !description || !price || !category || !stock || !image){
            res.status(400);
            throw new Error("Please Enter all the fields");
        }

        const productExists = await Product.findOne({
            name 
        })
        if(productExists){
            res.status(400);
            throw new Error('Product already exists, please try updating it')
        }
        const productObj = {
            name : name.toLowerCase(),
            description,
            price,
            category,
            stock,
            image
        }
        const product = await Product.create(productObj);
        res.status(201).json({
            _id :product.id,
            name:product.name,
            stock:product.stock   
        })
    } catch (error) {
        next(error)
    }
}

const listProducts = async (req,res,next)=>{
    try {
        const products = await Product.find().select('-category');
        res.status(201).json({
              products
        })
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req,res,next)=>{
    try {
        let productId = req.params.id;
        let updates = req.body
        const updatedObject = await Product.findByIdAndUpdate(productId, { $set: updates }, { new: true, useFindAndModify: false });

        if (!updatedObject) {
            res.status(400);
            throw new Error("Item not found");
        }

        res.json(updatedObject);
    
    } catch (error) {
        next(error)
    }
}

const deleteProduct = async (req,res,next)=>{
    try {
        let productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            res.status(400);
            throw new Error('Product not found')
        }

        res.status(200).json({
            message :`Product with id ${productId} deleted successfully`
        });
    } catch (error) {
        next(error)
    }
}
module.exports = { addProduct,listProducts,updateProduct,deleteProduct}