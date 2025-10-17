import React from "react";
import { Box, Typography } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";

const Logo = ({ size = "medium", variant = "full" }) => {
  const sizeMap = {
    small: { icon: 24, text: "0.9rem" },
    medium: { icon: 32, text: "1.2rem" },
    large: { icon: 48, text: "1.8rem" },
  };

  const { icon, text } = sizeMap[size];

  // Icon only variant (for navbar, favicons, etc.)
  if (variant === "icon") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: icon + 8,
          height: icon + 8,
          borderRadius: "50%",
          background: "#000000",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          '&:hover': {
            background: "#1d1d1f",
            transform: 'scale(1.05)',
          },
        }}
      >
        <ShoppingBag sx={{ fontSize: icon, color: "white" }} />
      </Box>
    );
  }

  // Full variant (with text)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        '&:hover': {
          opacity: 0.8,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: icon + 8,
          height: icon + 8,
          borderRadius: "50%",
          background: "#000000",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <ShoppingBag sx={{ fontSize: icon, color: "white" }} />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: text,
          fontWeight: 600,
          color: "#1d1d1f",
          letterSpacing: "-0.5px",
        }}
      >
        ShopHub
      </Typography>
    </Box>
  );
};

export default Logo;
