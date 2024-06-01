// PlaceOrder.js

import {
  Box,
  Text,
  Button,
  VStack,
  Image,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  clearCart,
  removeFromCart,
  selectCartProducts,
  updateQuantity,
} from "../store/cart";

export const PlaceOrder = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartProducts);
  const toast = useToast();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveFromCart = (itemId) => {
    toast({
      title: "Item removed from cart",
      status: "info",
      duration: 1000,
      isClosable: true,
      position: "top",
    });
    dispatch(removeFromCart(itemId));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Your order has been placed",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    dispatch(clearCart());
    navigate("/products");
  };

  return (
    <Box
      maxW="960px"
      w="90%"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box paddingTop="76px" paddingBottom="108px">
        <VStack spacing={4} align="stretch">
          {items.map((item, index) => (
            <Fragment key={item._id}>
              <Box
                display="grid"
                gridTemplateColumns="3fr repeat(3, 1fr)"
                alignItems="center"
                columnGap="4"
              >
                <Box display="flex" alignItems="center">
                  <Image
                    src={item.image}
                    borderRadius="lg"
                    bg="gray.300"
                    objectFit="contain"
                    boxSize="150px"
                  />
                  <Text ml="5" fontWeight="medium" fontSize="lg">
                    {item.name}
                  </Text>
                </Box>
                <Box display="flex" alignItems="center">
                  <Button
                    borderWidth="1px"
                    borderColor="gray.200"
                    h="36px"
                    w="36px"
                    flexShrink="0"
                    size="sm"
                    onClick={() =>
                      handleQuantityChange(item._id, Number(item.quantity) - 1)
                    }
                    colorScheme="gray"
                    rounded="50%"
                    fontSize="large"
                  >
                    -
                  </Button>
                  <Text mx="2" fontSize="medium">
                    {item.quantity}
                  </Text>
                  <Button
                    borderWidth="1px"
                    borderColor="gray.200"
                    h="36px"
                    w="36px"
                    flexShrink="0"
                    size="sm"
                    onClick={() =>
                      handleQuantityChange(item._id, Number(item.quantity) + 1)
                    }
                    colorScheme="gray"
                    rounded="50%"
                    fontSize="large"
                  >
                    +
                  </Button>
                </Box>
                <Text
                  justifySelf="center"
                  fontWeight="semibold"
                  fontSize="xl"
                  color="teal.600"
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
                <Button
                  colorScheme="red"
                  onClick={() => handleRemoveFromCart(item._id)}
                  justifySelf="end"
                >
                  Remove
                </Button>
              </Box>
              {index !== items.length - 1 ? (
                <Divider borderColor="gray.300" />
              ) : null}
            </Fragment>
          ))}
        </VStack>
      </Box>
      <Box
        borderTopWidth="1px"
        borderTopColor="gray.300"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        width="100%"
        background="gray.200"
        boxShadow="base"
        p={4}
        display="flex"
        alignItems="center"
        zIndex="10"
      >
        <Box
          size="lg"
          borderRadius="10px"
          w="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Total:{" "}
            <Text display="inline" color="teal.600">
              ${calculateTotal().toFixed(2)}
            </Text>
          </Text>
        </Box>
        <Button onClick={handlePlaceOrder} colorScheme="teal" size="lg" w="50%">
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default PlaceOrder;
