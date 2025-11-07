import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardMedia,
  IconButton,
  Box,
  Divider,
  Paper,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import { useSelector, useDispatch } from "react-redux";
import { action } from "../redux/slices/cartSlice";
import axios from "axios";
import urlConfig from "../urlConfig";

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

const Cart = () => {
  const navigate = useNavigate();
  const savedUser = sessionStorage.getItem("user");
  const parsedUser = JSON.parse(savedUser);
  const cart = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleIncrease = (product) => {
    dispatch(action.addToCart({ product }));
    setSnackbar({ open: true, message: "Item quantity increased", severity: "success" });
  };

  const handleDecrease = (product) => {
    dispatch(action.deleteFromCart(product));
    setSnackbar({ open: true, message: "Item quantity decreased", severity: "info" });
  };

  const handleRemove = (product) => {
    dispatch(action.removeFromCart(product));
    setSnackbar({ open: true, message: "Item removed from cart", severity: "warning" });
  };

  const clearCart = () => {
    dispatch(action.clearCart());
    setSnackbar({ open: true, message: "Cart cleared", severity: "info" });
  };

  const proceedCheckout = async (totalPrice) => {
    // to load the script
    console.log("proceedCheckout called", totalPrice, cart, parsedUser);

    try {
      await loadScript();
      const { name } = parsedUser;
      const productIds = cart.map((item) => item.id);
      // create order - backend - razorpay
      const resp = await axios.post(
        urlConfig.BOOKING,
        {
          user: name,
          product: productIds,
          priceAtBooking: Number(totalPrice),
        }
      );
      console.log(resp, "resp");

      const respJson = resp.data;
      const { id, currency, amount } = respJson.message;

      const options = {
        key: "rzp_test_31vDTPUmd3P4xY",
        currency,
        amount: amount.toString(),
        // id over here should be same
        order_id: id,
        name: "Payment",
        description: "Thanks for the payment",
        handler: async function (response) {
          try {
            await axios.post(urlConfig.BOOKING_VERIFY, {
              paymentOrderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            setSnackbar({
              open: true,
              message: "Payment verified successfully",
              severity: "success",
            });
            clearCart();
          } catch (verificationError) {
            console.error("Payment verification failed", verificationError);
            setSnackbar({
              open: true,
              message:
                "Payment verification failed. Please contact support with your payment ID.",
              severity: "error",
            });
          }
        },
        prefill: {
          name: "tester",
          email: "abc@gmail.com",
          phone_number: "9899999999",
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Unable to process payment. Please try again.",
        severity: "error",
      });
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.indQuantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const totalPrice = subtotal + shipping + tax;

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, sm: 3, md: 4 }, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6C4EFF 0%, #FF6B6B 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          Shopping Cart
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
        </Typography>
      </Box>

      {cart.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: 3
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 80, color: '#6C4EFF', mb: 2, opacity: 0.7 }} />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add some amazing products to your cart and start shopping!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#6C4EFF',
              '&:hover': { backgroundColor: '#5a3ed1' },
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
                  Cart Items
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={clearCart}
                  sx={{ borderRadius: 2, fontSize: { xs: '0.85rem', sm: '1rem' } }}
                >
                  Clear Cart
                </Button>
              </Box>

              {cart.map((item, index) => (
                <Card
                  key={item.id}
                  sx={{
                    mb: index < cart.length - 1 ? 2 : 0,
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <CardMedia
                          component="img"
                          image={item.images[0]}
                          alt={item.name}
                          sx={{
                            width: '100%',
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={5}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Rs {item.price.toLocaleString()} each
                        </Typography>
                        <Chip
                          label={`Rs ${(item.price * item.indQuantity).toLocaleString()}`}
                          sx={{
                            backgroundColor: '#6C4EFF',
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            p: 0.5
                          }}>
                            <IconButton
                              onClick={() => handleDecrease(item)}
                              size="small"
                              sx={{
                                color: '#6C4EFF',
                                '&:hover': { backgroundColor: 'rgba(108, 78, 255, 0.1)' }
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{
                              mx: 2,
                              fontWeight: 600,
                              minWidth: '30px',
                              textAlign: 'center'
                            }}>
                              {item.indQuantity}
                            </Typography>
                            <IconButton
                              onClick={() => handleIncrease(item)}
                              size="small"
                              sx={{
                                color: '#6C4EFF',
                                '&:hover': { backgroundColor: 'rgba(108, 78, 255, 0.1)' }
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          <IconButton
                            onClick={() => handleRemove(item)}
                            sx={{
                              color: '#ff6b6b',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: 2, position: { md: 'sticky' }, top: { md: 20 } }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
                Order Summary
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  <Typography variant="body1">Subtotal ({cart.length} items)</Typography>
                  <Typography variant="body1">Rs {subtotal.toLocaleString()}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1" sx={{ color: shipping === 0 ? '#4caf50' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : `Rs ${shipping}`}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  <Typography variant="body1">Tax (GST 18%)</Typography>
                  <Typography variant="body1">Rs {tax.toFixed(2)}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#6C4EFF', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    Rs {totalPrice.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => proceedCheckout(totalPrice)}
                sx={{
                  backgroundColor: '#6C4EFF',
                  '&:hover': {
                    backgroundColor: '#5a3ed1',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(108, 78, 255, 0.3)'
                  },
                  borderRadius: 2,
                  py: { xs: 1, sm: 1.5 },
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  mb: 2
                }}
              >
                Proceed to Checkout
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">Secure</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShippingIcon sx={{ color: '#2196f3', fontSize: 20 }} />
                  <Typography variant="caption" color="text.secondary">Fast Delivery</Typography>
                </Box>
              </Box>

              {subtotal < 500 && (
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  Add Rs {(500 - subtotal).toLocaleString()} more for FREE shipping!
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 2 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%', fontSize: '1rem', py: 2, px: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
