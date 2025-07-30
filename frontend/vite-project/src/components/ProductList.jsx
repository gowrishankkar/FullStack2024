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
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { action } from "../redux/slices/cartSlice";

function ProductList(props) {
  const { productList } = props;
  const cartProducts = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  const dispatch = useDispatch();
  const handleAddProduct = (product) => {
    dispatch(action.addToCart(product));
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
              sx={{ width: 300, boxShadow: 3, borderRadius: 2 }}
              key={product.id}
            >
              <CardMedia
                component="img"
                height="200"
                image={
                  product.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                }
                alt={name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  <Link to={`/product/${product.id}`}>{product.title}</Link>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ${product.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => handleDeleteProduct(product)}
                  sx={{ maxWidth: "3px", boxShadow: 3, borderRadius: 4 }}
                  //   disabled={quantity === 0}
                >
                  -
                </Button>

                <PrintCount cartProducts={cartProducts} id={product.id} />

                <Button
                  variant="contained"
                  onClick={() => handleAddProduct(product)}
                  sx={{ maxWidth: "3px", boxShadow: 3, borderRadius: 4 }}
                >
                  +
                </Button>
              </CardActions>
            </Card>
          );
        })
      )}
    </>
  );
}
function PrintCount(props) {
  const { cartProducts, id } = props;
  let quanitity = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id == id) {
      quanitity = cartProducts[i].indQuantity;
    }
  }
  return <div style={{ padding: "10px" }}>{quanitity}</div>;
}

export default ProductList;
