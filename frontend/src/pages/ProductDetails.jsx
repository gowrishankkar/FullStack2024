import { useState, useEffect } from "react";
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
  Box,
  Chip,
  IconButton,
  Divider,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Replay as ReturnIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import URL from "../urlConfig";
import { action } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Review from "../components/Review";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const cartProducts = useSelector((store) => store.cartReducer.cartProducts);
  const isInCart = cartProducts.some(item => item.id === id);

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
  }, [id]);

  const {
    name,
    price,
    description,
    images = [],
    reviews = [],
    averageRating,
    brand = "",
    categories = [],
    stock = 10,
  } = product;

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1);
    setQuantity(Math.min(value, stock)); // Don't allow more than stock
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, stock));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    dispatch(action.addToCart({ product, quantity }));
    setQuantity(1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Could add a toast notification here
    }
  };

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink component={Link} to="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <MuiLink component={Link} to="/" underline="hover" color="inherit">
            Products
          </MuiLink>
          <Typography color="text.primary">{name}</Typography>
        </Breadcrumbs>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: 'white',
            mb: 4
          }}
        >
          <Grid container>
            {/* Product Images */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3 }}>
                {/* Main Image */}
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    mb: 2,
                    backgroundColor: 'white',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="500"
                    image={images[selectedImage] || "https://via.placeholder.com/500"}
                    alt={name}
                    sx={{
                      objectFit: "contain",
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    display: 'flex',
                    gap: 1
                  }}>
                    <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                      <IconButton
                        onClick={toggleFavorite}
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            backgroundColor: 'white',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isFavorite ? (
                          <FavoriteIcon sx={{ color: '#ff6b6b' }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ color: '#666' }} />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Share product">
                      <IconButton
                        onClick={handleShare}
                        sx={{
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(10px)',
                          '&:hover': {
                            backgroundColor: 'white',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ShareIcon sx={{ color: '#666' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                    {images.map((image, index) => (
                      <Box
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        sx={{
                          minWidth: 80,
                          height: 80,
                          borderRadius: 2,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: selectedImage === index ? '2px solid #6C4EFF' : '2px solid transparent',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="100%"
                          image={image}
                          alt={`${name} ${index + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 4 }}>
                {/* Brand and Categories */}
                <Box sx={{ mb: 2 }}>
                  {brand && (
                    <Chip
                      label={brand}
                      variant="outlined"
                      sx={{
                        mr: 1,
                        mb: 1,
                        borderColor: '#6C4EFF',
                        color: '#6C4EFF',
                        fontWeight: 500,
                      }}
                    />
                  )}
                  {categories?.slice(0, 2).map((category, index) => (
                    <Chip
                      key={index}
                      label={category}
                      size="small"
                      sx={{
                        mr: 1,
                        mb: 1,
                        backgroundColor: '#f5f5f5',
                        color: '#666',
                      }}
                    />
                  ))}
                </Box>

                {/* Product Title */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 2,
                    color: '#1a1a1a',
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </Typography>

                {/* Rating and Reviews */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating
                      value={averageRating || 0}
                      precision={0.5}
                      readOnly
                      sx={{
                        color: '#ffb400',
                        '& .MuiRating-icon': {
                          fontSize: '1.2rem',
                        },
                      }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {averageRating?.toFixed(1) || '0.0'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    ({reviews?.length || 0} reviews)
                  </Typography>
                </Box>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#6C4EFF',
                      fontSize: '2rem',
                      mb: 1,
                    }}
                  >
                    Rs {price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                    }}
                  >
                    Rs {Math.round(price * 1.2)}
                  </Typography>
                  <Chip
                    label="20% OFF"
                    sx={{
                      ml: 1,
                      backgroundColor: '#ff6b6b',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>

                {/* Stock Status */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Availability:
                    <Badge
                      color={stock > 0 ? "success" : "error"}
                      variant="dot"
                      sx={{ ml: 1 }}
                    />
                    <Typography
                      component="span"
                      sx={{
                        ml: 1,
                        color: stock > 0 ? '#4caf50' : '#f44336',
                        fontWeight: 500,
                      }}
                    >
                      {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
                    </Typography>
                  </Typography>
                </Box>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: '#666',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                  }}
                >
                  {description}
                </Typography>

                {/* Quantity Selector */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Quantity
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}>
                      <IconButton
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        sx={{
                          borderRadius: 0,
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        inputProps={{
                          min: 1,
                          max: stock,
                          style: { textAlign: 'center', width: '60px' }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { border: 'none' },
                          },
                          '& .MuiOutlinedInput-input': {
                            textAlign: 'center',
                            fontWeight: 600,
                          },
                        }}
                      />
                      <IconButton
                        onClick={incrementQuantity}
                        disabled={quantity >= stock}
                        sx={{
                          borderRadius: 0,
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                          },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Max: {stock}
                    </Typography>
                  </Box>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    backgroundColor: '#6C4EFF',
                    '&:hover': {
                      backgroundColor: '#5a3ed1',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(108, 78, 255, 0.3)',
                    },
                    '&:disabled': {
                      backgroundColor: '#ccc',
                      color: '#666',
                    },
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(108, 78, 255, 0.2)',
                    width: '100%',
                  }}
                >
                  {isInCart ? 'Add More to Cart' : 'Add to Cart'}
                </Button>

                {/* Features */}
                <Box sx={{ mt: 4, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ShippingIcon sx={{ color: '#4caf50' }} />
                    <Typography variant="body2" color="text.secondary">
                      Free Shipping
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon sx={{ color: '#2196f3' }} />
                    <Typography variant="body2" color="text.secondary">
                      Secure Payment
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ReturnIcon sx={{ color: '#ff9800' }} />
                    <Typography variant="body2" color="text.secondary">
                      Easy Returns
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Additional Information */}
        <Grid container spacing={3}>
          {/* Product Details Accordion */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Product Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ lineHeight: 1.7, color: '#666' }}>
                    {description}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Divider />

              <Accordion sx={{ boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Shipping & Returns
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ '& > *': { mb: 2 } }}>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ShippingIcon sx={{ color: '#4caf50' }} />
                      Free shipping on orders over Rs 500
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ReturnIcon sx={{ color: '#ff9800' }} />
                      30-day return policy
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SecurityIcon sx={{ color: '#2196f3' }} />
                      Secure packaging and fast delivery
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>

          {/* Reviews Section */}
          <Grid item xs={12} md={4}>
            {reviews?.length > 0 && (
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Customer Reviews ({reviews.length})
                </Typography>
                <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {reviews.slice(0, 3).map((review, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Review review={review} />
                      {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                  ))}
                </Box>
                {reviews.length > 3 && (
                  <Button
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderColor: '#6C4EFF',
                      color: '#6C4EFF',
                      '&:hover': {
                        borderColor: '#5a3ed1',
                        backgroundColor: 'rgba(108, 78, 255, 0.04)',
                      },
                    }}
                  >
                    View All Reviews
                  </Button>
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetails;
