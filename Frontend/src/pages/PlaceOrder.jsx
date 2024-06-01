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

const QuantitySelect = ({
  quantity,
  onIncrement,
  onDecrement,
  display = "flex",
  mt,
}) => (
  <Box display={display} alignItems="center">
    <Button
      borderWidth="1px"
      borderColor="gray.200"
      h="36px"
      w="36px"
      flexShrink="0"
      size="sm"
      onClick={onDecrement}
      colorScheme="gray"
      rounded="50%"
      fontSize="large"
      mt={mt}
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
      onClick={onIncrement}
      colorScheme="gray"
      rounded="50%"
      fontSize="large"
    >
      +
    </Button>
  </Box>
);

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

  const handleIncrement = (itemId, itemQuantity) => {
    handleQuantityChange(itemId, itemQuantity + 1);
  };

  const handleDecrement = (itemId, itemQuantity) => {
    handleQuantityChange(itemId, itemQuantity - 1);
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
                gridTemplateColumns={{
                  base: "1fr",
                  sm: "3fr 1fr",
                  md: "3fr repeat(3, 1fr)",
                }}
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
                  <Box ml="5">
                    <Text fontWeight="medium" fontSize="lg">
                      {item.name}
                    </Text>
                    <QuantitySelect
                      quantity={item.quantity}
                      onIncrement={() =>
                        handleIncrement(item._id, Number(item.quantity))
                      }
                      onDecrement={() =>
                        handleDecrement(item._id, Number(item.quantity))
                      }
                      display={{ base: "flex", md: "none" }}
                      mt="1"
                    />
                    <Text
                      display={{ base: "flex", md: "none" }}
                      justifySelf="center"
                      fontWeight="semibold"
                      fontSize="xl"
                      color="teal.600"
                      mt="1"
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <Button
                      display={{ base: "flex", sm: "none" }}
                      colorScheme="red"
                      onClick={() => handleRemoveFromCart(item._id)}
                      justifySelf="end"
                      mt="1"
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
                <QuantitySelect
                  quantity={item.quantity}
                  onIncrement={() =>
                    handleIncrement(item._id, Number(item.quantity))
                  }
                  onDecrement={() =>
                    handleDecrement(item._id, Number(item.quantity))
                  }
                  display={{ base: "none", md: "flex" }}
                />
                <Text
                  display={{ base: "none", md: "flex" }}
                  justifySelf="center"
                  fontWeight="semibold"
                  fontSize="xl"
                  color="teal.600"
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
                <Button
                  display={{ base: "none", sm: "flex" }}
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
        zIndex="10"
      >
        <Box
          maxW="960px"
          mx="auto"
          w="90%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <Box
            size="lg"
            borderRadius="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize={{ base: "lg", sm: "2xl" }} fontWeight="bold">
              Total:{" "}
              <Text display="inline" color="teal.600">
                ${calculateTotal().toFixed(2)}
              </Text>
            </Text>
          </Box>
          <Button
            onClick={handlePlaceOrder}
            colorScheme="teal"
            size="lg"
            w="50%"
            flexShrink="0"
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceOrder;
