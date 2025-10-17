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
    <>
      {productList == null ? (
        <h3> Loading...</h3>
      ) : (
        productList.map((product) => {
          const inCart = cartProducts.some(item => item.id === product.id);
          const cartItem = cartProducts.find(item => item.id === product.id);
          const quantity = cartItem ? cartItem.indQuantity : 0;

          return (
            <Card
              sx={{
                width: 320,
                boxShadow: 2,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                },
                cursor: 'pointer',
              }}
              key={product.id}
            >
              {/* Favorite Button */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
                size="small"
              >
                <FavoriteBorderIcon sx={{ color: '#ff6b6b' }} />
              </IconButton>

              {/* Product Image */}
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={product.images[0]}
                  alt={product.name}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                {/* New Badge */}
                <Chip
                  label="New"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: '#6C4EFF',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                {/* Product Title */}
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      '&:hover': { color: '#6C4EFF' }
                    }}
                  >
                    {product.title}
                  </Link>
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating
                    value={4.2}
                    precision={0.5}
                    size="small"
                    readOnly
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    (4.2)
                  </Typography>
                </Box>

                {/* Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#6C4EFF',
                      mr: 1
                    }}
                  >
                    Rs {product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.secondary'
                    }}
                  >
                    Rs {Math.round(product.price * 1.2)}
                  </Typography>
                  <Chip
                    label="20% OFF"
                    size="small"
                    sx={{
                      ml: 1,
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      fontSize: '0.7rem',
                      height: '20px'
                    }}
                  />
                </Box>

                {/* Add to Cart Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {quantity > 0 ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                      sx={{
                        backgroundColor: '#f5f5f5',
                        borderRadius: 2,
                        px: 2,
                        py: 1
                      }}
                    >
                      <IconButton
                        onClick={() => handleDeleteProduct(product)}
                        size="small"
                        sx={{
                          color: '#6C4EFF',
                          '&:hover': { backgroundColor: 'rgba(108, 78, 255, 0.1)' }
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                        {quantity}
                      </Typography>
                      <IconButton
                        onClick={() => handleAddProduct(product)}
                        size="small"
                        sx={{
                          color: '#6C4EFF',
                          '&:hover': { backgroundColor: 'rgba(108, 78, 255, 0.1)' }
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
                        backgroundColor: '#6C4EFF',
                        '&:hover': {
                          backgroundColor: '#5a3ed1',
                          transform: 'scale(1.02)'
                        },
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        flex: 1
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}

                  <Tooltip title="Quick View">
                    <IconButton
                      component={Link}
                      to={`/product/${product.id}`}
                      sx={{
                        color: '#666',
                        '&:hover': {
                          color: '#6C4EFF',
                          backgroundColor: 'rgba(108, 78, 255, 0.1)'
                        }
                      }}
                    >
                      <StarIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          );
        })
      )}
    </>
  );
}

export default ProductList;
