import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
  Rating,
  Tooltip,
  Grid,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { action } from "../redux/slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

function ProductList(props) {
  const { productList } = props;
  const cartProducts = useSelector((store) => {
    return store.cartReducer.cartProducts;
  });
  const dispatch = useDispatch();
  const handleAddProduct = (product) => {
    dispatch(action.addToCart({ product }));
  };

  const handleDeleteProduct = (product) => {
    dispatch(action.deleteFromCart(product));
  };

  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 2, md: 3 } }}>
      {productList == null ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <Typography variant="h6" color="text.secondary">
            Loading...
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 3 }}
          sx={{
            justifyContent: {
              xs: "center",
              sm: "flex-start",
              md: "flex-start",
            },
          }}
        >
          {productList.map((product) => {
            const inCart = cartProducts.some((item) => item.id === product.id);
            const cartItem = cartProducts.find(
              (item) => item.id === product.id
            );
            const quantity = cartItem ? cartItem.indQuantity : 0;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 320,
                    minHeight: 420,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    borderRadius: 3,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                      borderColor: "rgba(108, 78, 255, 0.2)",
                    },
                    cursor: "pointer",
                  }}
                >
                  {/* Favorite Button */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      zIndex: 2,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,1)",
                        transform: "scale(1.1)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                      transition: "all 0.2s ease",
                    }}
                    size="small"
                  >
                    <FavoriteBorderIcon
                      sx={{ color: "#ff6b6b", fontSize: 20 }}
                    />
                  </IconButton>

                  {/* Product Image */}
                  <Box
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      height: 240,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      image={product.images[0]}
                      alt={product.name}
                      sx={{
                        transition: "transform 0.4s ease",
                        objectFit: "cover",
                        "&:hover": {
                          transform: "scale(1.08)",
                        },
                      }}
                    />
                    {/* New Badge */}
                    <Chip
                      label="New"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        backgroundColor: "#6C4EFF",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.7rem",
                        height: "24px",
                        zIndex: 2,
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      p: 2.5,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    {/* Product Title */}
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        lineHeight: 1.3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: "2.6rem",
                        color: "#1a1a1a",
                      }}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        {product.title}
                      </Link>
                    </Typography>

                    {/* Rating */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Rating
                        value={product.averageRating}
                        precision={0.5}
                        size="small"
                        readOnly
                        sx={{
                          color: "#ffb400",
                          "& .MuiRating-icon": {
                            fontSize: "1rem",
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.8rem" }}
                      >
                        {product.averageRating}
                      </Typography>
                    </Box>

                    {/* Price Section */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#6C4EFF",
                          fontSize: "1.1rem",
                        }}
                      >
                        Rs {product.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                          fontSize: "0.85rem",
                        }}
                      >
                        Rs {Math.round(product.price * 1.2)}
                      </Typography>
                      <Chip
                        label="20% OFF"
                        size="small"
                        sx={{
                          backgroundColor: "#ff6b6b",
                          color: "white",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          height: "20px",
                          px: 0.5,
                        }}
                      />
                    </Box>

                    {/* Spacer to push buttons to bottom */}
                    <Box sx={{ flex: 1 }} />

                    {/* Add to Cart Section */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: "auto",
                        pt: 1,
                      }}
                    >
                      {quantity > 0 ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          gap={0.5}
                          sx={{
                            backgroundColor: "#f8f9fa",
                            borderRadius: 2,
                            px: 1.5,
                            py: 0.75,
                            border: "1px solid #e9ecef",
                            minWidth: "100px",
                          }}
                        >
                          <IconButton
                            onClick={() => handleDeleteProduct(product)}
                            size="small"
                            sx={{
                              color: "#6C4EFF",
                              p: 0.5,
                              "&:hover": {
                                backgroundColor: "rgba(108, 78, 255, 0.1)",
                                transform: "scale(1.1)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              minWidth: "24px",
                              textAlign: "center",
                              fontSize: "0.9rem",
                              color: "#1a1a1a",
                            }}
                          >
                            {quantity}
                          </Typography>
                          <IconButton
                            onClick={() => handleAddProduct(product)}
                            size="small"
                            sx={{
                              color: "#6C4EFF",
                              p: 0.5,
                              "&:hover": {
                                backgroundColor: "rgba(108, 78, 255, 0.1)",
                                transform: "scale(1.1)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => handleAddProduct(product)}
                          sx={{
                            backgroundColor: "#6C4EFF",
                            "&:hover": {
                              backgroundColor: "#5a3ed1",
                              transform: "translateY(-1px)",
                              boxShadow: "0 4px 12px rgba(108, 78, 255, 0.3)",
                            },
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            py: 1,
                            px: 2,
                            flex: 1,
                            transition: "all 0.2s ease",
                            boxShadow: "0 2px 8px rgba(108, 78, 255, 0.2)",
                          }}
                        >
                          Add to Cart
                        </Button>
                      )}

                      <Tooltip title="Quick View" arrow>
                        <IconButton
                          component={Link}
                          to={`/product/${product.id}`}
                          sx={{
                            color: "#666",
                            border: "1px solid #e9ecef",
                            borderRadius: 2,
                            p: 1,
                            "&:hover": {
                              color: "#6C4EFF",
                              backgroundColor: "rgba(108, 78, 255, 0.1)",
                              borderColor: "#6C4EFF",
                              transform: "scale(1.05)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <StarIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

export default ProductList;
