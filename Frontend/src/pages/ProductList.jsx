import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../componants/products/productCard";
import { fetchProducts, selectProducts } from "../store/products";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box p="84px 16px 48px 16px">
      <SimpleGrid minChildWidth="240px" spacing={4}>
        {productList.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
