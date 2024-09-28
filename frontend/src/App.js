import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';

const App=() =>{
  return (
    <Router>
      <Routes>
      <Route path="/cart" element ={<CartPage />}/>
        <Route path="/" element ={<ProductsPage />}/> 
        <Route path="/orders" element ={<OrdersPage />}/>
      </Routes>
    </Router>
  );
};

export default App;
