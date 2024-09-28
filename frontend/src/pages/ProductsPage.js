import React, {useState, useEffect} from 'react';
import {Container, Grid} from '@mui/material';
import ProductCard from '../components/ProductCard';
import {getProducts } from '../services/productService';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] =useState([]);

    useEffect(()=> {
        getProducts().then(response=> {
            setProducts(response.data);
        }).catch(error=>{
            console.error(error);
        });
    }, []);

const addToCart=(product)=>{
    setCart([...cart, product]); //adding product to cart
};

return (
    <Container>
        <h1>Products</h1>
        <Grid container spacing={2}>
            {products.map(product=> (
                <Grid item key={product.id} xs={12} md={4}>
                    <ProductCard product={product} addToCart={addToCart} />
                    </Grid>
            ))}
        </Grid>
    </Container>
);
};
export default ProductsPage;