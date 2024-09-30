import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";

const App = () => {
  const [cart, setCart] = useState([]); // Sepet state'i

  return (
    <Router>
      <Routes>
        {/* ProductsPage (Ana Sayfa), sepete ürün ekleme */}
        <Route
          path="/"
          element={<ProductsPage cart={cart} setCart={setCart} />}
        />

        {/* CartPage, sepeti gösterme ve ürün çıkarma */}
        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} />} // setCart'ı CartPage'e geçiriyoruz
        />

        {/* OrdersPage, tamamlanan siparişler */}
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
