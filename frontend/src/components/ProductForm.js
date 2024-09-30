import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Alert } from "@mui/material";
import { addProduct, updateProduct } from "../services/productService";

const ProductForm = ({ existingProduct, onSubmit }) => {
  const [name, setName] = useState(existingProduct ? existingProduct.name : "");
  const [description, setDescription] = useState(
    existingProduct ? existingProduct.description : ""
  );
  const [category, setCategory] = useState(
    existingProduct ? existingProduct.category : ""
  );
  const [price, setPrice] = useState(
    existingProduct ? existingProduct.price : ""
  );
  const [image, setImage] = useState(
    existingProduct ? existingProduct.image : ""
  );
  const [loading, setLoading] = useState(false); // Loading durumu
  const [error, setError] = useState(null); // Hata durumu

  // existingProduct değiştiğinde formun doldurulmasını sağla
  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setDescription(existingProduct.description);
      setCategory(existingProduct.category);
      setPrice(existingProduct.price);
      setImage(existingProduct.image);
    }
  }, [existingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Hata durumu sıfırlanıyor

    const newProduct = {
      name,
      description,
      category,
      price,
      image,
    };

    try {
      if (existingProduct) {
        console.log("Updating product with ID:", existingProduct.id);
        await updateProduct(existingProduct.id, {
          ...newProduct,
          id: existingProduct.id,
        });
      } else {
        console.log("Adding new product");
        await addProduct(newProduct);
      }

      // Başarılı işlemden sonra formu sıfırla
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImage("");

      onSubmit(); // Başarılı olunca callback çağrısı
    } catch (error) {
      console.error("Error submitting product:", error);
      setError(error); // Hata mesajını kaydet
    } finally {
      setLoading(false); // Loading durumu sonlandırılıyor
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">
                Something went wrong: {error.message}
              </Alert>
            </Grid>
          )}
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
              inputProps={{ step: "0.01" }} // Ondalık sayı girişi için
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading} // Butonu işlem sırasında devre dışı bırak
            >
              {loading ? "Processing..." : existingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProductForm;
