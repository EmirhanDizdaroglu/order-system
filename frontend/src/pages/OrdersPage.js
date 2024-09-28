import React, {useState, useEffect} from 'react';
import {Container, Table, TableHead, TableRow, TableCell, TableBody, Typography} from '@mui/material';
import {getOrders} from '../services/orderService';

const OrdersPage=()=> { //definition of state for hold the data. 
    const[orders, setOrders] = useState([]);

    useEffect(()=>{
        getOrders().then(response =>{
            setOrders(response.data);
        }).catch(error=>{
            console.error(error);

        });
    }, []);
    return(
        <Container>
            <Typography variant="h4">Orders</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Situation</TableCell>
                        <TableCell>Products</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order=>(
                        <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.items.join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};
  
export default OrdersPage;