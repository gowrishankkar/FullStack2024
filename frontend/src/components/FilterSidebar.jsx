import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Chip,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

const FilterSidebar = ({
  products,
  filters,
  onFiltersChange,
  categories,
  onClearFilters
}) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 10000]);
  const [selectedRating, setSelectedRating] = useState(filters.rating || 0);
  const [selectedCategories, setSelectedCategories] = useState(filters.categories || []);
  const [selectedTypes, setSelectedTypes] = useState(filters.types || []);

  // Get unique types from products (assuming products have a 'type' field)
  const getUniqueTypes = () => {
    const types = products?.map(product => product.type).filter(Boolean) || [];
    return [...new Set(types)];
  };

  const types = getUniqueTypes();

  // Get price range from products
  const getPriceRange = () => {
    if (!products || products.length === 0) return [0, 10000];
    const prices = products.map(product => product.price);
    return [Math.min(...prices), Math.max(...prices)];
  };

  useEffect(() => {
    const [minPrice, maxPrice] = getPriceRange();
    setPriceRange([minPrice, maxPrice]);
  }, [products]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onFiltersChange({
      ...filters,
      priceRange: newValue
    });
  };

  const handleRatingChange = (event, newValue) => {
    setSelectedRating(newValue);
    onFiltersChange({
      ...filters,
      rating: newValue
    });
  };

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleTypeChange = (type) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(newTypes);
    onFiltersChange({
      ...filters,
      types: newTypes
    });
  };

  const handleClearAll = () => {
    const [minPrice, maxPrice] = getPriceRange();
    setPriceRange([minPrice, maxPrice]);
    setSelectedRating(0);
    setSelectedCategories([]);
    setSelectedTypes([]);
    onClearFilters();
  };

  const formatPrice = (value) => `Rs ${value}`;

  return (
    <Box
      sx={{
        width: 280,
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        borderRight: '1px solid #e0e0e0',
        p: 2,
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c1c1c1',
          borderRadius: '3px',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon sx={{ color: '#6C4EFF' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Filters
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={handleClearAll}
          startIcon={<ClearIcon />}
          sx={{
            textTransform: 'none',
            color: '#666',
            '&:hover': { color: '#6C4EFF' }
          }}
        >
          Clear All
        </Button>
      </Box>

      {/* Price Range Filter */}
      <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={getPriceRange()[0]}
              max={getPriceRange()[1]}
              sx={{
                color: '#6C4EFF',
                '& .MuiSlider-thumb': {
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: '0 0 0 8px rgba(108, 78, 255, 0.16)',
                  },
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {formatPrice(priceRange[0])}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatPrice(priceRange[1])}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Rating Filter */}
      <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Minimum Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Rating
              value={selectedRating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#6C4EFF',
                },
                '& .MuiRating-iconHover': {
                  color: '#5a3ed1',
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {selectedRating > 0 ? `${selectedRating} stars and above` : 'Any rating'}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Category Filter */}
      <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Categories
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categories?.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    sx={{
                      color: '#6C4EFF',
                      '&.Mui-checked': {
                        color: '#6C4EFF',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    {category}
                  </Typography>
                }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Type Filter */}
      {types.length > 0 && (
        <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Product Type
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {types.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      sx={{
                        color: '#6C4EFF',
                        '&.Mui-checked': {
                          color: '#6C4EFF',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {type}
                    </Typography>
                  }
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Active Filters Summary */}
      {(selectedCategories.length > 0 || selectedTypes.length > 0 || selectedRating > 0) && (
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Active Filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedCategories.map((category) => (
              <Chip
                key={category}
                label={category}
                size="small"
                onDelete={() => handleCategoryChange(category)}
                sx={{
                  backgroundColor: '#6C4EFF',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    '&:hover': {
                      color: '#e0e0e0',
                    },
                  },
                }}
              />
            ))}
            {selectedTypes.map((type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                onDelete={() => handleTypeChange(type)}
                sx={{
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    '&:hover': {
                      color: '#e0e0e0',
                    },
                  },
                }}
              />
            ))}
            {selectedRating > 0 && (
              <Chip
                label={`${selectedRating}+ stars`}
                size="small"
                onDelete={() => handleRatingChange(null, 0)}
                sx={{
                  backgroundColor: '#ffb74d',
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    '&:hover': {
                      color: '#e0e0e0',
                    },
                  },
                }}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FilterSidebar;