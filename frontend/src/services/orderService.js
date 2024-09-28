import axios from 'axios';

const API_URL='http://localhost:500/api/orders';

export const getOrders = () => axios.get(API_URL);
export const createOrder = (order) => axios.post(API_URL, order);