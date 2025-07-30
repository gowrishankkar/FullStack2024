import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { action } from "../redux/slices/cartSlice";

const Cart = () => {
  const cart = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
    const dispatch = useDispatch();
    const handleIncrease = (product) => {
      dispatch(action.addToCart(product));
    };
  
    const handleDecrease = (product) => {
      dispatch(action.deleteFromCart(product));
    };
  
    const handleRemove = (product) =>{
       dispatch(action.removeFromCart(product));
    }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.indQuantity,
    0
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card
                  sx={{ display: "flex", alignItems: "center", padding: 2 }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body1">
                      ${item.price} x {item.indQuantity}
                    </Typography>
                  </CardContent>
                  <Button
                    onClick={() => handleDecrease(item)}
                    variant="outlined"
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 2 }}>{item.indQuantity}</Typography>
                  <Button
                    onClick={() => handleIncrease(item)}
                    variant="outlined"
                  >
                    +
                  </Button>
                  <IconButton
                    onClick={() => handleRemove(item)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ mt: 3 }}>
            Total: ${totalPrice}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
