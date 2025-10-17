import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  ShoppingBag,
  Receipt,
  CalendarToday,
  Payment,
  LocalShipping,
  CheckCircle,
  Cancel,
  Schedule,
} from "@mui/icons-material";
import axios from "axios";
import URL from "../urlConfig";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const savedUser = sessionStorage.getItem("user");
  const parsedUser = JSON.parse(savedUser);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL.BOOKING}/user/${parsedUser._id}`, {
        withCredentials: true,
      });
      setBookings(response.data.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle />;
      case "pending":
        return <Schedule />;
      case "cancelled":
        return <Cancel />;
      default:
        return <Receipt />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress size={60} sx={{ color: "#6C4EFF" }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your bookings...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchBookings}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #6C4EFF 0%, #FF6B6B 100%)',
          color: 'white',
          p: 4,
          mb: 4,
          borderRadius: 3,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ShoppingBag sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          My Bookings
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Track your orders and purchase history
        </Typography>
      </Paper>

      {bookings.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: 3
          }}
        >
          <ShoppingBag sx={{ fontSize: 80, color: '#6C4EFF', mb: 2, opacity: 0.7 }} />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            No bookings yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven't made any purchases yet. Start shopping to see your bookings here!
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
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} key={booking._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Booking Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Receipt sx={{ color: '#6C4EFF', fontSize: 30 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Order #{booking._id.slice(-8).toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(booking.bookedAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      icon={getStatusIcon(booking.status)}
                      label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      color={getStatusColor(booking.status)}
                      variant="filled"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* Booking Details */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CalendarToday sx={{ color: '#6C4EFF', mr: 2 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Booking Date
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {formatDate(booking.bookedAt)}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Payment sx={{ color: '#6C4EFF', mr: 2 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Total Amount
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#6C4EFF' }}>
                            Rs {booking.priceAtBooking.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocalShipping sx={{ color: '#6C4EFF', mr: 2 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Items Ordered
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {booking.product.length} item{booking.product.length !== 1 ? 's' : ''}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          Payment ID:
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {booking.paymentOrderId || 'N/A'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Product List */}
                  {booking.product && booking.product.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        Items in this order:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {booking.product.map((product, index) => (
                          <Chip
                            key={index}
                            label={product.name || `Product ${product._id?.slice(-6) || index + 1}`}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: '#6C4EFF', color: '#6C4EFF' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        '&:hover': { backgroundColor: '#6C4EFF', color: 'white' }
                      }}
                    >
                      View Details
                    </Button>
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#6C4EFF',
                          '&:hover': { backgroundColor: '#5a3ed1' },
                          borderRadius: 2
                        }}
                      >
                        Download Invoice
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Summary Stats */}
      {bookings.length > 0 && (
        <Paper sx={{ p: 3, mt: 4, borderRadius: 3, backgroundColor: '#f8f9fa' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Booking Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#6C4EFF', fontWeight: 700 }}>
                  {bookings.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Orders
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 700 }}>
                  {bookings.filter(b => b.status === 'confirmed').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Confirmed
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 700 }}>
                  {bookings.filter(b => b.status === 'pending').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#f44336', fontWeight: 700 }}>
                  {bookings.filter(b => b.status === 'cancelled').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cancelled
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default Bookings;