import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { addProduct, updateProduct } from '../services/productService';

const ProductForm = ({ existingProduct, onSubmit }) => {
    const [name, setName] = useState(existingProduct ? existingProduct.name : '');
    const [description, setDescription] = useState(existingProduct ? existingProduct.description : '');
    const [category, setCategory] = useState(existingProduct ? existingProduct.category : '');
    const [price, setPrice] = useState(existingProduct ? existingProduct.price : '');
    const [image, setImage] = useState(existingProduct ? existingProduct.image : '');


    // existingProduct değiştiğinde formun doldurulmasını sağla
    useEffect(() => {
        if (existingProduct) {
            setName(existingProduct.name);
            setDescription(existingProduct.description);
            setCategory(existingProduct.category);
            setPrice(existingProduct.price);
            setImage(existingProduct.image);
        }
    }, [existingProduct]); // existingProduct değiştiğinde tetiklenir

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            category,
            price,
            image,
        };

        try {
            if (existingProduct) {
                await updateProduct(existingProduct.id, newProduct);
            } else {
                await addProduct(newProduct);
            }
            onSubmit(); // Başarılı olunca callback çağrısı
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                {existingProduct ? 'Update Product' : 'Add New Product'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Product Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            {existingProduct ? 'Update Product' : 'Add Product'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default ProductForm;
