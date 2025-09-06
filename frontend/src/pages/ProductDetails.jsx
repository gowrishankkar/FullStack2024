import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import URL from "../urlConfig";
import { action } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Review from "../components/Review";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${URL.GET_PRODUCTS}/${id}`);
      if (response.status === 200) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const {
    name,
    price,
    description,
    images = [],
    reviews = [],
    averageRating,
    brand = "",
  } = product;

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    dispatch(action.addToCart({ product, quantity }));
    setQuantity(1);
  };

  const sampleReview = {
    user: "John Doe",
    rating: 5,
    comment: "Amazing product! Quality is top-notch and delivery was fast.",
    date: "2025-08-25",
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="450"
              image={images[0] || "https://via.placeholder.com/400"}
              alt={name}
              sx={{ objectFit: "contain" }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Brand : {brand}
            </Typography>
            <Rating
              name="star-rating"
              value={averageRating || 0}
              precision={0.5}
              readOnly
            />
            <Typography variant="h5" color="primary">
              Rs {price}
            </Typography>

            <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
              {description}
            </Typography>

            {/* Quantity Selector */}
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ mt: 3, width: "100px" }}
              inputProps={{ min: 1 }}
            />

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, display: "block" }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>

      {reviews?.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 4 }} direction={"column"}>
          <Grid item>
            <Typography variant="h5" gutterBottom>
              Reviews
            </Typography>
          </Grid>
          {reviews.map((review, index) => (
            <Grid item xs={12} key={index}>
              <Review review={review} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductDetails;
