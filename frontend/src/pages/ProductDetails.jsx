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
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import URL from "../urlConfig";
import { action } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

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

  const { name, price, description, images = [] } = product;


  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    dispatch(action.addToCart({ product, quantity }));
   setQuantity(1);
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
    </Container>
  );
};

export default ProductDetails;
