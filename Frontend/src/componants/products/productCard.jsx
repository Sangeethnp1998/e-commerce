// ProductCard.js

import { Box, Image, Text, Button,useToast} from '@chakra-ui/react';
import { useState } from 'react';

export const ProductCard = ({ product,cart,setCart }) => {
  const [quantity, setQuantity] = useState(0);
  const toast = useToast();
  
  // const handleIncrement = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };

  // const handleDecrement = () => {
  //   setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  // };

  const handleAddToCart = () => {

    const cartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      quantity: quantity
    }


    const exist = cart.filter((item)=> item._id == product._id);
 
    if(exist.length){
      toast({
        title: "This item is already in the cart",
        status:'warning',
        duration: 1000,
        isClosable :true,
        position:'top'
      })
    }
    else{


      setCart(cart=>[...cart,cartItem])

      toast({
        title: "Added to cart successfully",
        status:'success',
        duration: 500,
        isClosable :true,
        position:'top'
      })
      //adding to localStorage 
      localStorage.setItem('cart',JSON.stringify([...cart,cartItem]))
    }
  };

  return (
    <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        height= 'fit-content' 
        w ='160px'
        m ='5px'
        background='#79caed'
    >
      <Image src={product.image} alt={product.name} />
      <Box p="4">
        <Text fontSize="lg" fontWeight="semibold">
          {product.name}
        </Text>
        <Text>${product.price}</Text>
        <Box mt="2">
          {/* <Button size="sm" onClick={handleDecrement}>
            -
          </Button>
          <Text display="inline-block" mx="2">
            {quantity}
          </Text>
          <Button size="sm" onClick={handleIncrement}>
            +
          </Button> */}
          <Button mt="2" colorScheme="teal" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;

