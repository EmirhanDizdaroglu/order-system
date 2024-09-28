import React from 'react';
import { Card, CardContent, Button, Typography} from '@mui/material';

const ProductCard=({product, addToCart})=> {
    return(
        <Card>
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">{product.description}</Typography>
                <Typography variant="h5">{product.price}TL</Typography>
                <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(product)}>
                    Add To Cart
                </Button>
            </CardContent>
        </Card>
    );
};
export default ProductCard;