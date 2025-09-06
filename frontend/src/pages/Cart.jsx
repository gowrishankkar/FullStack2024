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
import axios from "axios";
import urlConfig from "../urlConfig";

const Cart = () => {
  const cart = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  const dispatch = useDispatch();
  const handleIncrease = (product) => {
    dispatch(action.addToCart({product}));
  };

  const handleDecrease = (product) => {
    dispatch(action.deleteFromCart(product));
  };

  const handleRemove = (product) => {
    dispatch(action.removeFromCart(product));
  };

  function loadScript() {
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = function () {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
      document.body.appendChild(script);
    });
  }

  const proceedCheckout = async () => {
    // to load the script
    try {
      await loadScript();
      const resp = await axios.post(
        urlConfig.BOOKING,
        {
          user: "userid",
          product: "67df9f7355aad7ce3d7eae85",
          priceAtBooking: 500,
        },
        {
          withCredentials: true,
        }
      );
      console.log(resp, "resp");

      // const resp = await
      //   fetch("http://localhost:3000/api/booking/",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         user: 'userid',
      //         product: 'product',
      //         priceAtBooking: 500
      //       }), // amount in rupees
      //     })
      // console.log(resp);
      const respJson = resp.data;
      const { id, currency, amount } = respJson.message;
      console.log(id, currency, amount);

      const options = {
        key: "rzp_test_31vDTPUmd3P4xY",
        currency,
        amount: amount.toString(),
        // id over here should be same
        order_id: id,
        name: "Payment",
        description: "Thanks for the payment",
        handler: function (response) {
          alert("payment id" + response.razorpay_payment_id);
          alert("order id " + response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Jasbir",
          email: "abc@gmail.com",
          phone_number: "9899999999",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (err) {
      alert(err.message);
    }
  };

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
                      Rs {item.price} x {item.indQuantity}
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
                  <IconButton onClick={() => handleRemove(item)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ mt: 3 }}>
            Total: Rs {totalPrice}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => proceedCheckout()}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
