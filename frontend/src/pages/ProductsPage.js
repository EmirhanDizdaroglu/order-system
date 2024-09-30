import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import ProductForm from "../components/ProductForm";
import Navbar from "../components/Navbar"; // Sepet için Navbar bileşeni

const ProductsPage = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Güncelleme için
  const [filterText, setFilterText] = useState(""); // Filtreleme için text state
  const formRef = useRef(null); // Form alanı için ref

  useEffect(() => {
    getProducts()
      .then((response) => {
        setProducts(response); // response.data hatasını çözdük
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Filtrelenmiş ürünleri döndür
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFormSubmit = () => {
    getProducts()
      .then((response) => {
        setProducts(response); // Ürün eklendikten sonra listeyi güncelle
      })
      .catch((error) => {
        console.error("Error updating product list:", error);
      });
    setSelectedProduct(null); // Ürün güncellendikten sonra formu temizler
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Güncellemek için ürün seçme
    scrollToForm(); // Form alanına yönlendirme
  };

  const addToCart = (product) => {
    setCart([...cart, product]); // Sepete ekleme işlemi
    console.log("Product added to cart:", product);
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" }); // Sayfayı form alanına kaydır
  };

  return (
    <>
      {/* Sepet göstergesi için Navbar */}
      <Navbar cartItems={cart} />

      <Container>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>

        {/* Ürünleri filtrelemek için arama alanı */}
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        {/* Ürün ekleme butonu */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setSelectedProduct(null);
            scrollToForm(); // Form alanına yönlendirme
          }}
          style={{ marginBottom: "20px" }}
        >
          Add New Product
        </Button>

        {/* Ürünleri listeleme */}
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} md={4}>
              <ProductCard
                product={product}
                addToCart={addToCart} // Sepete ekleme fonksiyonu
              />
              {/* Düzenle butonu */}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEditProduct(product)}
              >
                Edit
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* "Add/Edit Product" Formu, sadece bir defa gösteriliyor */}
        <Box ref={formRef} sx={{ marginTop: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {selectedProduct ? "Edit Product" : "Add New Product"}
              </Typography>

              {/* Ürün ekleme ve güncelleme formu */}
              <ProductForm
                existingProduct={selectedProduct} // Seçili ürün formda gösterilsin
                onSubmit={handleFormSubmit}
              />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default ProductsPage;
