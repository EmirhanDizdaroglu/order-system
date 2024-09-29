import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card style={{ maxWidth: 345 }}>
      {/* Image kısmı eklendi */}
      {product.image && (
        <CardMedia
          component="img"
          height="140"
          image={product.image}  // Backend'den gelen image URL'si
          alt={product.name}     // Ürün adı alt metin olarak gösteriliyor
        />
      )}
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="h5">{product.price} TL</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
