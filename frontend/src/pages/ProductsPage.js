import React, {useState, useEffect} from 'react';
import {Container, Grid, Button, Typography} from '@mui/material';
import ProductCard from '../components/ProductCard';
import {getProducts } from '../services/productService';
import ProductForm from '../components/ProductForm';


const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] =useState([]);
    const [selectedProduct, setSelectedProduct]=useState(null);//güncelleme için

    useEffect(()=> {
        getProducts().then(response=> {
            setProducts(response); //response.data hatasını çözdük
        }).catch(error=>{
            console.error(error);
        });
    }, []);

    const handleFormSubmit=()=>{
        getProducts().then(response=>{
            setProducts(response);//ürün eklendikten sonra update
            }).catch(error => {
                console.error('Error updating product list:', error);
            });
            setSelectedProduct(null); // Ürün güncellendikten sonra formu temizler
        
    };
    const handleEditProduct=(product)=>{
        setSelectedProduct(product);//güncellemek için ürün seçme
    };

    const addToCart=(product)=>{
        setCart([...cart, product]); //adding product to cart
};

return (
    <Container>
        <Typography variant="h4" gutterBottom>Products</Typography>
        {/*ürünleri listeleme*/}
        <Grid container spacing={2}>
            {products.map(product=> (
                <Grid item key={product.id} xs={12} md={4}>
                    <ProductCard 
                    product={product}
                    addToCart={addToCart}
                    />
                    {/*Düzenle butonu*/}
                    <Button
                    variant="outlined"
                    color="primary"
                    onClick={()=>handleEditProduct(product)}
                    >
                        Edit
                        </Button>
                        </Grid>
            ))}
        </Grid>
        <Typography variant="h5" gutterBottom>New Product/Edit Product</Typography>

    {/*Ürün ekleme ve güncelleme formu*/}
    <ProductForm
        existingProduct={selectedProduct} //seçili ürün formda gösterilsin
        onSubmit={handleFormSubmit}
        />
    </Container>
);
};
export default ProductsPage;