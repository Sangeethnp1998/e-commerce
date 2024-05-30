// PlaceOrder.js

import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeFromCart,
  selectCartProducts,
  updateQuantity,
} from "../store/cart";

export const PlaceOrder = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartProducts);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
  };

  return (
    <Box
      width="90%"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box paddingTop="76px" paddingBottom="100px">
        <VStack spacing={4} align="stretch">
          {items.map((item) => (
            <HStack key={item._id} justifyContent="space-between">
              <Image src={item.image} borderRadius="full" boxSize="150px" />
              <Text>{item.name}</Text>
              <InputGroup size="sm" width="80px">
                <InputLeftAddon>Qty</InputLeftAddon>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item._id, parseInt(e.target.value, 10))
                  }
                />
              </InputGroup>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
              <Button
                colorScheme="red"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </Button>
            </HStack>
          ))}
        </VStack>
      </Box>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        width="100%"
        background="#87959c"
        p={4}
        display="flex"
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
            Total: ${calculateTotal().toFixed(2)}
          </Text>
        </Box>
        <Button colorScheme="teal" size="lg" p={4} w="50%" border="solid">
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default PlaceOrder;
