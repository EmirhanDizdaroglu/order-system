import React from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Sepetten ürün çıkarma fonksiyonu
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart); // Güncellenmiş sepeti ayarlıyoruz
    console.log("Product removed from cart:", product);
  };

  // Siparişi tamamlama işlemi
  const completeOrder = () => {
    console.log("Order completed with products:", cart);
    setCart([]); // Sepeti temizle
    navigate("/orders"); // Siparişler sayfasına yönlendir
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <List>
            {cart.map((product, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={product.name}
                    secondary={`Price: ${product.price} TL`}
                  />
                  {/* Sepetten çıkarma butonu */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeFromCart(product)}
                  >
                    Remove
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          {/* Toplam fiyat hesaplama */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">
              Total:{" "}
              {cart
                .reduce((total, product) => total + product.price, 0)
                .toFixed(2)}{" "}
              TL
            </Typography>
          </Box>

          {/* Siparişi tamamlama butonu */}
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={completeOrder}
              fullWidth
            >
              Complete The Order
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
