import React from 'react';
import { Container, List, ListItem, ListItemText, Button, Typography} from '@mui/material' ;

const CartPage=({cart}) => {
    return(
        <Container>
            <Typography variant ="h4">My Cart</Typography>
            <List>
                {cart.map((product, index)=>(
                    <ListItem key={index}>
                        <ListItemText primary={product.name} secondary={'Price: ${product.price)TL'}/>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary">Complete The Order</Button>
        </Container>
    );
};

export default CartPage;