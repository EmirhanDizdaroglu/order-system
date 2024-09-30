import axios from "axios";

// API'nin doğru adresi
const API_URL = "http://localhost:5000/api/orders";

// Tüm siparişleri getirme
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL); // GET isteği
    return response.data; // Gelen veri döndürülür
  } catch (error) {
    console.error("Error fetching orders:", error); // Hata kontrolü
    throw error;
  }
};

// Sipariş tamamlama (Complete Order)
export const completeOrder = async (order) => {
  try {
    const response = await axios.post(`${API_URL}/complete`, order); // POST isteği
    return response.data; // Gelen veri döndürülür
  } catch (error) {
    console.error("Error completing order:", error); // Hata kontrolü
    throw error;
  }
};
