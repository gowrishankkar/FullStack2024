import React, { useState } from "react";
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

const ProductDetails = ({ product = {} }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("myParam");
  const params = new URLSearchParams(location.search);
  console.log("myParam", myParam, urlParams, params);
  const { name, price, description, image } = product;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    alert(`${quantity} ${name}(s) added to cart!`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={image || "https://via.placeholder.com/400"}
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
              ${price}
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
