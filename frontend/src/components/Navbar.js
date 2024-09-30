import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom"; // Yönlendirme için Link kullanıyoruz

const Navbar = ({ cartItems }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Product Shop
        </Typography>

        <IconButton color="inherit" component={Link} to="/cart">
          {" "}
          {/* CartPage'e yönlendirme */}
          <ShoppingCartIcon />
          <span>{cartItems.length}</span> {/* Sepetteki ürün sayısı */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
