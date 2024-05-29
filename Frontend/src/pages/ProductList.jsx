import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../config/config";
import { ProductCard } from "../componants/products/productCard";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";

const getUser = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
};

const fetchProducts = async () => {
  const user = getUser();
  const headers = { Authorization: `Bearer ${user.token}` };

  const { data } = await axios.get(`${config.apiUrl}product/list`, { headers });
  return data;
};
const ProductList = () => {
  const [productList, setproductList] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    async function apiCall() {
      const products = await fetchProducts();
      setproductList(products.products);
    }
    apiCall();
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  return (
    <Box display="flex" flexFlow="wrap">
      {productList.map((product) => {
        return (
          <ProductCard
            key={product._id}
            product={product}
            cart={cart}
            setCart={setCart}
          />
        );
      })}
    </Box>
  );
};

export default ProductList;
