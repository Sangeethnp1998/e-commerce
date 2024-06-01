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
      borderColor="gray.200"
      boxShadow="base"
      borderRadius="lg"
      overflow="hidden"
      background="gray.50"
      display="flex"
      flexDir="column"
    >
      <Image
        src={product.image}
        alt={product.name}
        h="200px"
        w="100%"
        objectFit="contain"
        backgroundColor="gray.300"
      />
      <Box
        p="4"
        display="flex"
        flexDir="column"
        flexGrow="1"
        justifyContent="space-between"
      >
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            {product.name}
          </Text>
          <Text fontSize="xl" color="teal.600" fontWeight="semibold">
            ${product.price}
          </Text>
        </Box>
        <Box mt="4">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="4"
          >
            <Box display="flex" alignItems="center">
              <Button
                borderWidth="1px"
                borderColor="gray.200"
                h="36px"
                w="36px"
                flexShrink="0"
                size="sm"
                onClick={handleDecrement}
                colorScheme="gray"
                rounded="50%"
                fontSize="large"
              >
                -
              </Button>
              <Text mx="2" fontSize="medium">
                {quantity}
              </Text>
              <Button
                borderWidth="1px"
                borderColor="gray.200"
                h="36px"
                w="36px"
                flexShrink="0"
                size="sm"
                onClick={handleIncrement}
                colorScheme="gray"
                rounded="50%"
                fontSize="large"
              >
                +
              </Button>
            </Box>
            <Button colorScheme="teal" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
