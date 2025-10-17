import { useState, useEffect } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ProductList from "../components/ProductList";
import Categories from "../components/Categories";
import FilterSidebar from "../components/FilterSidebar";
import basicOps from "../utility/basicOps";
import { usePaginationContext } from "../contexts/PaginationContext";
import axios from "axios";
import URL from "../urlConfig";
import { Pagination, Stack, CircularProgress, Box, Grid, Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import HistoryIcon from "@mui/icons-material/History";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  ClickAwayListener,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Typography,
  Fade,
  Popper,
  Autocomplete,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setsortDir] = useState(0);
  const [currCategory, setCurrCategory] = useState("All categories");
  const { pageSize, pageNum, setPageNum } = usePaginationContext();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    rating: 0,
    categories: [],
    types: []
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Enhanced search states
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory') || '[]')
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    (async function () {
      setLoadingProducts(true);
      try {
        // const resp = await fetch(`https://fakestoreapi.com/products`)
        const productData = await axios.get(URL.GET_PRODUCTS);
        const productArr = productData.data.data;
        const productList = productArr.map((product) => {
          return {
            id: product._id,
            title: product.name,
            image: product.images[0],
            price: product.price,
            ...product,
          };
        });
        console.log(productList);
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, []);

  /**************getting all the categroies ********************/
  useEffect(() => {
    (async function () {
      setLoadingCategories(true);
      try {
        // const resp = await fetch(`https://fakestoreapi.com/products/categories`)
        const categories = await axios.get(URL.GET_CATEGORIES);
        console.log(categories);
        setCategories(categories.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    })();
  }, []);
  const object = basicOps(
    products,
    searchTerm,
    sortDir,
    currCategory,
    pageNum,
    pageSize,
    filters
  );
  const filteredSortedgroupByArr = object.filteredSortedgroupByArr;
  const totalPages = object.totalPages;

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPageNum(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    const [minPrice, maxPrice] = products.length > 0
      ? [Math.min(...products.map(p => p.price)), Math.max(...products.map(p => p.price))]
      : [0, 10000];

    setFilters({
      priceRange: [minPrice, maxPrice],
      rating: 0,
      categories: [],
      types: []
    });
    setCurrCategory("All categories");
    setPageNum(1);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Enhanced search functions
  const generateSuggestions = (query) => {
    if (!query.trim()) {
      setSearchSuggestions([]);
      return;
    }

    const suggestions = [];
    const lowerQuery = query.toLowerCase();

    // Product name matches
    const productMatches = products
      .filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 5)
      .map(product => ({
        type: 'product',
        text: product.name,
        subtitle: `Rs ${product.price}`,
        icon: '🛍️'
      }));

    // Category matches
    const categoryMatches = categories
      .filter(category => category.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .map(category => ({
        type: 'category',
        text: category,
        subtitle: 'Browse category',
        icon: '📂'
      }));

    suggestions.push(...productMatches, ...categoryMatches);
    setSearchSuggestions(suggestions);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPageNum(1);

    if (value.trim()) {
      setShowSuggestions(true);
      setSearchAnchorEl(event.currentTarget);
      generateSuggestions(value);
    } else {
      setShowSuggestions(false);
      setSearchSuggestions([]);
    }
  };

  const handleSearchSubmit = (searchValue) => {
    setSearchTerm(searchValue);
    setPageNum(1);
    setShowSuggestions(false);

    // Add to search history
    if (searchValue.trim()) {
      const newHistory = [searchValue, ...searchHistory.filter(item => item !== searchValue)].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'category') {
      setCurrCategory(suggestion.text);
      setSearchTerm("");
    } else {
      handleSearchSubmit(suggestion.text);
    }
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    setPageNum(1);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Popular searches for suggestions
  const popularSearches = [
    "electronics", "men's clothing", "women's clothing", "jewelry", "home decor"
  ];
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        style={{ alignItems: "center", marginTop: "10px" }}
      >
        <Grid item container alignItems="center" spacing={2} xs={3} md="auto">
          <Grid item>
            <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
              <Box sx={{ position: 'relative', width: { xs: 280, sm: 320, md: 350 } }}>
                <Paper
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearchSubmit(searchTerm);
                  }}
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "50px",
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    border: "2px solid transparent",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                      borderColor: "rgba(108, 78, 255, 0.3)",
                      transform: "translateY(-1px)",
                    },
                    "&:focus-within": {
                      boxShadow: "0 8px 30px rgba(108, 78, 255, 0.2)",
                      borderColor: "#6C4EFF",
                      background: "linear-gradient(135deg, #ffffff 0%, #fefefe 100%)",
                    },
                  }}
                >
                  <IconButton
                    type="submit"
                    sx={{
                      p: "8px",
                      color: isSearching ? "#6C4EFF" : "#666",
                      "&:hover": {
                        backgroundColor: "rgba(108, 78, 255, 0.1)",
                        color: "#6C4EFF",
                      },
                      transition: "all 0.2s ease",
                    }}
                    aria-label="search"
                  >
                    {isSearching ? (
                      <CircularProgress size={20} sx={{ color: "#6C4EFF" }} />
                    ) : (
                      <SearchIcon />
                    )}
                  </IconButton>

                  <InputBase
                    placeholder={isSearching ? "Listening..." : "Search products, brands, categories..."}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={(e) => {
                      if (searchTerm.trim()) {
                        setShowSuggestions(true);
                        setSearchAnchorEl(e.currentTarget);
                      }
                    }}
                    sx={{
                      ml: 1,
                      flex: 1,
                      fontSize: "0.95rem",
                      "& .MuiInputBase-input::placeholder": {
                        color: "#999",
                        opacity: 1,
                      },
                    }}
                    inputProps={{
                      "aria-label": "search products",
                      style: { padding: "8px 0" }
                    }}
                  />

                  <IconButton
                    onClick={handleClearSearch}
                    sx={{
                      p: "8px",
                      color: "#999",
                      "&:hover": {
                        color: "#666",
                        backgroundColor: "rgba(0,0,0,0.04)",
                      },
                    }}
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Paper>

                {/* Search Suggestions Dropdown */}
                <Popper
                  open={showSuggestions && (searchSuggestions.length > 0 || searchHistory.length > 0)}
                  anchorEl={searchAnchorEl}
                  placement="bottom-start"
                  transition
                  sx={{ zIndex: 1300 }}
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                      <Paper
                        sx={{
                          mt: 1,
                          minWidth: { xs: 280, sm: 320, md: 350 },
                          maxWidth: "100%",
                          maxHeight: 400,
                          overflow: 'auto',
                          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                          borderRadius: 3,
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        {/* Search Suggestions */}
                        {searchSuggestions.length > 0 && (
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                px: 2,
                                py: 1.5,
                                fontWeight: 600,
                                color: "#666",
                                fontSize: "0.8rem",
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                              }}
                            >
                              Suggestions
                            </Typography>
                            <List sx={{ py: 0 }}>
                              {searchSuggestions.map((suggestion, index) => (
                                <ListItem
                                  key={index}
                                  button
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  sx={{
                                    '&:hover': {
                                      backgroundColor: 'rgba(108, 78, 255, 0.08)',
                                    },
                                    transition: 'background-color 0.2s ease',
                                  }}
                                >
                                  <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Typography variant="body1">{suggestion.icon}</Typography>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {suggestion.text}
                                      </Typography>
                                    }
                                    secondary={
                                      <Typography variant="caption" color="text.secondary">
                                        {suggestion.subtitle}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}

                        {/* Search History */}
                        {searchHistory.length > 0 && searchSuggestions.length === 0 && (
                          <Box>
                            <Box sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              px: 2,
                              py: 1.5
                            }}>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 600,
                                  color: "#666",
                                  fontSize: "0.8rem",
                                  textTransform: "uppercase",
                                  letterSpacing: 0.5,
                                }}
                              >
                                Recent Searches
                              </Typography>
                              <IconButton
                                onClick={clearSearchHistory}
                                size="small"
                                sx={{
                                  color: "#999",
                                  "&:hover": { color: "#666" }
                                }}
                              >
                                <ClearIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <List sx={{ py: 0 }}>
                              {searchHistory.map((item, index) => (
                                <ListItem
                                  key={index}
                                  button
                                  onClick={() => handleSearchSubmit(item)}
                                  sx={{
                                    '&:hover': {
                                      backgroundColor: 'rgba(108, 78, 255, 0.08)',
                                    },
                                    transition: 'background-color 0.2s ease',
                                  }}
                                >
                                  <ListItemIcon sx={{ minWidth: 40 }}>
                                    <HistoryIcon sx={{ color: "#999", fontSize: 18 }} />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {item}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}

                        {/* Popular Searches */}
                        {searchSuggestions.length === 0 && searchHistory.length === 0 && (
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                px: 2,
                                py: 1.5,
                                fontWeight: 600,
                                color: "#666",
                                fontSize: "0.8rem",
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                              }}
                            >
                              Popular Searches
                            </Typography>
                            <Box sx={{ p: 2, pt: 0 }}>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {popularSearches.map((search, index) => (
                                  <Chip
                                    key={index}
                                    label={search}
                                    onClick={() => handleSearchSubmit(search)}
                                    size="small"
                                    sx={{
                                      backgroundColor: 'rgba(108, 78, 255, 0.1)',
                                      color: '#6C4EFF',
                                      '&:hover': {
                                        backgroundColor: 'rgba(108, 78, 255, 0.2)',
                                        transform: 'scale(1.05)',
                                      },
                                      transition: 'all 0.2s ease',
                                      cursor: 'pointer',
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Box>
            </ClickAwayListener>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
              <ArrowCircleUpIcon
                sx={{
                  color: "#1976d2",
                  fontSize: 40,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  "&:hover": {
                    color: "#1565c0",
                    transform: "scale(1.15) translateY(-2px)",
                    filter: 'drop-shadow(0 6px 12px rgba(25, 118, 210, 0.3))',
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
                onClick={() => {
                  setsortDir(1);
                  setPageNum(1);
                }}
                title="Sort by Price: Low to High"
              />
              <ArrowCircleDownIcon
                sx={{
                  color: "#dc004e",
                  fontSize: 40,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  "&:hover": {
                    color: "#c2185b",
                    transform: "scale(1.15) translateY(2px)",
                    filter: 'drop-shadow(0 6px 12px rgba(220, 0, 78, 0.3))',
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
                onClick={() => {
                  setsortDir(-1);
                  setPageNum(1);
                }}
                title="Sort by Price: High to Low"
              />
            </Box>
          </Grid>
          {/* Filter toggle button for mobile */}
          {isMobile && (
            <Grid item>
              <IconButton
                onClick={toggleSidebar}
                sx={{
                  backgroundColor: '#6C4EFF',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#5a3ed1',
                  },
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
        <Grid item xs={9} md="auto" sx={{ display: { xs: 'none', md: 'block' } }}>
          {loadingCategories ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={50}>
              <CircularProgress size={30} />
            </Box>
          ) : (
            <Categories
              categories={categories}
              setCurrCategory={setCurrCategory}
              currCategory={currCategory}
            />
          )}
        </Grid>
      </Grid>

      {/* Main content area with sidebar */}
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 200px)' }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <FilterSidebar
            products={products}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            categories={categories}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={toggleSidebar}
            sx={{
              '& .MuiDrawer-paper': {
                width: 280,
              },
            }}
          >
            <FilterSidebar
              products={products}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              categories={categories}
              onClearFilters={handleClearFilters}
            />
          </Drawer>
        )}

        {/* Main content */}
        <Box sx={{ flex: 1, p: 2 }}>
          {/* products will be there */}
          {loadingProducts ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={200}>
              <CircularProgress size={50} />
            </Box>
          ) : (
            <ProductList
              productList={filteredSortedgroupByArr}
              currCategory={currCategory}
            />
          )}
        </Box>
      </Box>

      {/* pagination */}
      <div className="pagination">
        <Stack spacing={2} alignItems="center" sx={{ mt: 5, mb: 4 }}>
          <Pagination
            count={totalPages}
            page={pageNum}
            onChange={(event, value) => setPageNum(value)}
            color="primary"
            size="large"
            sx={{
              '& .MuiPagination-ul': {
                gap: 0.5,
              },
              '& .MuiButtonBase-root': {
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '0.95rem',
                minWidth: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              '& .MuiButtonBase-root:not(.Mui-selected)': {
                backgroundColor: '#f5f5f5',
                color: '#666',
                border: '1.5px solid #e0e0e0',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                },
              },
              '& .MuiButtonBase-root.Mui-selected': {
                backgroundColor: '#1976d2',
                color: 'white',
                border: '1.5px solid #1565c0',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                },
              },
              '& .MuiButtonBase-root:disabled': {
                backgroundColor: '#fafafa',
                color: '#bdbdbd',
                border: '1.5px solid #e0e0e0',
                opacity: 0.6,
              },
            }}
            variant="outlined"
            shape="rounded"
          />
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#999',
              fontWeight: 500,
              letterSpacing: '0.5px',
              animation: 'textFadeIn 0.6s ease-out',
            }}
          >
            Page {pageNum} of {totalPages}
          </Typography>
        </Stack>
      </div>
    </>
  );
}

export default Home;
