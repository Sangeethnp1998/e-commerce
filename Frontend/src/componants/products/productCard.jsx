// ProductCard.js

import { Box, Image, Text, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, selectCartProducts } from "../../store/cart";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartProducts);

  const toast = useToast();
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      toast({
        title: "Please select a quantity",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    const cartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      quantity: quantity,
    };

    const exist = cart.filter((item) => item._id == product._id);

    if (exist.length) {
      toast({
        title: "This item is already in the cart",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } else {
      dispatch(addToCart(cartItem));

      toast({
        title: "Added to cart successfully",
        status: "success",
        duration: 500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      height="400px"
      w="160px"
      m="5px"
      background="#79caed"
    >
      <Image src={product.image} alt={product.name} h='200px' />
      <Box p="4">
        <Text fontSize="lg" fontWeight="semibold">
          {product.name}
        </Text>
        <Text>${product.price}</Text>
        <Box mt="2">
          <Button size="sm" onClick={handleDecrement}>
            -
          </Button>
          <Text display="inline-block" mx="2">
            {quantity}
          </Text>
          <Button size="sm" onClick={handleIncrement}>
            +
          </Button>
          <Button mt="2" colorScheme="teal" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
