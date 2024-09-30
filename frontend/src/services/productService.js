import axios from "axios";

// Axios örneği oluşturuyoruz, zaman aşımı ve temel URL ile
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/products",
  timeout: 5000, // 5 saniyelik zaman aşımı
});

// Tüm ürünleri getirme (GET)
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response ? error.response.data : error.message);
    throw new Error("Unable to fetch products. Please try again later.");
  }
};

// Yeni ürün ekleme (POST)
export const addProduct = async (newProduct) => {
  try {
    const response = await axiosInstance.post('/', newProduct);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response ? error.response.data : error.message);
    throw new Error("Unable to add product. Please check your input and try again.");
  }
};

// Ürün güncelleme (PUT)
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axiosInstance.put(`/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response ? error.response.data : error.message);
    throw new Error("Unable to update product. Please try again later.");
  }
};

// Ürün silme (DELETE)
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response ? error.response.data : error.message);
    throw new Error("Unable to delete product. Please try again later.");
  }
};
