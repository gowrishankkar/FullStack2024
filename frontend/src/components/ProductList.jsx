import React from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  IconButton,
  Box,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { action } from "../redux/slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ProductList(props) {
  const { productList, currCategory} = props;
  const cartProducts = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  const dispatch = useDispatch();
  const handleAddProduct = (product) => {
    dispatch(action.addToCart({product}));
  };

  const handleDeleteProduct = (product) => {
    dispatch(action.deleteFromCart(product));
  };

  return (
    <>
      {productList == null ? (
        <h3> Loading...</h3>
      ) : (
        productList.map((product) => {
          return (
            <Card
              sx={{ width: 350, boxShadow: 3, borderRadius: 3 }}
              key={product.id}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.images[0]}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </Typography>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  Rs {product.price}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  mt={2}
                >
                  <IconButton
                    onClick={() => handleDeleteProduct(product)}
                    color="primary"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <PrintCount cartProducts={cartProducts} id={product.id} />
                  <IconButton
                    onClick={() => handleAddProduct(product)}
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          );
        })
      )}
    </>
  );
}
function PrintCount(props) {
  const { cartProducts, id } = props;
  let quantity = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == id) {
      quantity = cartProducts[i].indQuantity;
    }
  }
  return <div style={{ padding: "10px" }}>{quantity}</div>;
}

export default ProductList;
