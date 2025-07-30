import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Button, Grid, CardMedia, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductList from '../components/ProductList';
import { useSelector } from "react-redux";

const Cart = () => {
  const [cdart, setCart] = useState([
    { id: 1, name: "Leanne Graham", price: 200, quantity: 1, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Ervin Howell", price: 150, quantity: 2, image: "https://via.placeholder.com/100" },
  ]);

  const cart = useSelector((store) => { return store.cartReducer.cartProducts })

  const handleIncrease = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (id) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">Your cart is empty</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 1 }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body1">${item.price} x {item.quantity}</Typography>
                  </CardContent>
                  <Button onClick={() => handleDecrease(item.id)} variant="outlined">-</Button>
                  <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                  <Button onClick={() => handleIncrease(item.id)} variant="outlined">+</Button>
                  <IconButton onClick={() => handleRemove(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ mt: 3 }}>Total: ${totalPrice}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>Proceed to Checkout</Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
