import React, { useState, useRef } from "react";
import {
  Chip,
  Stack,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Badge,
  Paper
} from "@mui/material";
import { usePaginationContext } from "../contexts/PaginationContext";
import {
  Category,
  ShoppingBag,
  Devices,
  Checkroom,
  Home,
  SportsSoccer,
  LocalFlorist,
  Restaurant,
  ChevronLeft,
  ChevronRight,
  AllInclusive
} from "@mui/icons-material";

function Categories(props) {
  const { categories, setCurrCategory, currCategory } = props;
  const [selected, setSelected] = useState("All categories");
  const { setPageNum } = usePaginationContext();
  const scrollRef = useRef(null);

  const handleChange = (category) => {
    setSelected(category);
    setCurrCategory(category);
    setPageNum(1);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Category icon mapping
  const getCategoryIcon = (category) => {
    const iconMap = {
      "All categories": <AllInclusive sx={{ fontSize: 18 }} />,
      "electronics": <Devices sx={{ fontSize: 18 }} />,
      "jewelery": <LocalFlorist sx={{ fontSize: 18 }} />,
      "men's clothing": <Checkroom sx={{ fontSize: 18 }} />,
      "women's clothing": <Checkroom sx={{ fontSize: 18 }} />,
      "home": <Home sx={{ fontSize: 18 }} />,
      "sports": <SportsSoccer sx={{ fontSize: 18 }} />,
      "food": <Restaurant sx={{ fontSize: 18 }} />,
      "books": <Category sx={{ fontSize: 18 }} />,
      "toys": <ShoppingBag sx={{ fontSize: 18 }} />,
    };
    return iconMap[category.toLowerCase()] || <Category sx={{ fontSize: 18 }} />;
  };

  let updatedCategories = ["All categories", ...categories];

  return (
    <Box sx={{ py: 2, position: 'relative' }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          mb: 2,
          fontWeight: 600,
          color: '#333',
          fontSize: '1.1rem'
        }}
      >
        Shop by Category
      </Typography>

      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Left scroll button */}
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: -10,
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease',
            display: { xs: 'none', md: 'flex' }
          }}
          size="small"
        >
          <ChevronLeft />
        </IconButton>

        {/* Categories container */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 1.5,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            px: 2,
            py: 1,
            mx: { xs: 0, md: 4 },
            justifyContent: { xs: 'flex-start', md: 'center' }
          }}
        >
          {updatedCategories.map((category, index) => {
            const isSelected = currCategory === category;

            return (
              <Tooltip
                key={category}
                title={category}
                arrow
                placement="top"
              >
                <Chip
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {getCategoryIcon(category)}
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {category}
                      </Typography>
                    </Box>
                  }
                  clickable
                  onClick={() => handleChange(category)}
                  sx={{
                    borderRadius: "25px",
                    fontWeight: 500,
                    px: 2,
                    py: 1.5,
                    minHeight: '40px',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.85rem",
                    background: isSelected
                      ? 'linear-gradient(135deg, #6C4EFF 0%, #FF6B6B 100%)'
                      : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    color: isSelected ? "#fff" : "#333",
                    border: isSelected ? 'none' : '1px solid #e0e0e0',
                    boxShadow: isSelected
                      ? '0 4px 15px rgba(108, 78, 255, 0.3)'
                      : '0 2px 8px rgba(0,0,0,0.05)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: isSelected ? 'scale(1.05)' : 'scale(1.02)',
                      boxShadow: isSelected
                        ? '0 6px 20px rgba(108, 78, 255, 0.4)'
                        : '0 4px 12px rgba(0,0,0,0.1)',
                      background: isSelected
                        ? 'linear-gradient(135deg, #5a3ed1 0%, #e64545 100%)'
                        : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    },
                    '&:active': {
                      transform: 'scale(0.98)',
                    },
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                    '@keyframes slideIn': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(20px) scale(0.9)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0) scale(1)',
                      },
                    },
                  }}
                />
              </Tooltip>
            );
          })}
        </Box>

        {/* Right scroll button */}
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: -10,
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease',
            display: { xs: 'none', md: 'flex' }
          }}
          size="small"
        >
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Category indicator */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: '#666',
            fontWeight: 500,
            px: 2,
            py: 0.5,
            backgroundColor: 'rgba(108, 78, 255, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(108, 78, 255, 0.2)'
          }}
        >
          Currently viewing: <strong>{currCategory}</strong>
        </Typography>
      </Box>
    </Box>
  );
}

export default Categories;
