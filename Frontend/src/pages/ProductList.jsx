import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { config } from '../config/config';
import { ProductCard } from '../componants/products/productCard';
import { Box, Container, SimpleGrid } from '@chakra-ui/react';

const getUser = ()=>{
    return JSON.parse(localStorage.getItem('userInfo'))
}

const fetchProducts = async() =>{
    const user = getUser();
    const headers = { 'Authorization': `Bearer ${user.token}` } 
    
    const { data } = await axios.get(`${config.apiUrl}product/list`,{ headers });
    return data;
}
const ProductList = () => {
    const [productList,setproductList] = useState([])
    useEffect(()=>{
        async function apiCall(){
            const products = await fetchProducts();
            setproductList(products.products)
        }
        apiCall()
    },[])
    return (
        <Box
            display='flex'
            flexFlow= 'wrap'
        >
            {/* <SimpleGrid columns={8} spacing={6} > */}
                {
                    productList.map((product)=>{
                        return <ProductCard product={product}/>
                    })
                }
            {/* </SimpleGrid> */}
        </Box>
       
    )
}

export default ProductList