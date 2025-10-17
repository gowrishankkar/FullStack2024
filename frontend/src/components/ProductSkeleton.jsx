import React from "react";
import {
  Card,
  Box,
  Skeleton,
  Grid,
} from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{
        display: "flex",
        justifyContent: "stretch",
        animation: `cardSlideUp 0.6s ease-out forwards`,
        "@keyframes cardSlideUp": {
          from: {
            opacity: 0,
            transform: "translateY(30px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Card
        sx={{
          width: "100%",
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Product Image Skeleton */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: 240,
            backgroundColor: "#e0e0e0",
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
            sx={{
              backgroundColor: "#f0f0f0",
            }}
          />
        </Box>

        {/* Card Content */}
        <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Title Skeleton */}
          <Skeleton
            variant="text"
            animation="wave"
            height={24}
            sx={{ mb: 1 }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            height={24}
            width="80%"
            sx={{ mb: 2 }}
          />

          {/* Rating Skeleton */}
          <Box sx={{ display: "flex", gap: 1, mb: 1.5, alignItems: "center" }}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={100}
              height={16}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              width={30}
              height={16}
            />
          </Box>

          {/* Price Skeleton */}
          <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
            <Skeleton
              variant="text"
              animation="wave"
              width={80}
              height={28}
              sx={{ mb: 1 }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              width={70}
              height={20}
            />
          </Box>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Button Skeleton */}
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={40}
            sx={{
              borderRadius: 2,
              backgroundColor: "#e8e8e8",
            }}
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default ProductSkeleton;
