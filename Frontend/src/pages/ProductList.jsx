import { Box } from "@chakra-ui/react";
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
    <Box display="flex" flexFlow="wrap" p="76px 16px 32px 16px">
      {productList.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </Box>
  );
};

export default ProductList;
