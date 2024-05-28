// ProductCard.js

import { Box, Image, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  return (
    <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        height= 'fit-content' 
        w ='160px'
        m ='5px'
    >
      <Image src={product.image} alt={product.name} />
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
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;

