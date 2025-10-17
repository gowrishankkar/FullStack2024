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
          background: "linear-gradient(135deg, #FF6B5B 0%, #FF8566 100%)",
          cursor: "pointer",
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
          background: "linear-gradient(135deg, #FF6B5B 0%, #FF8566 100%)",
        }}
      >
        <ShoppingBag sx={{ fontSize: icon, color: "white" }} />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontSize: text,
          fontWeight: 700,
          background: "linear-gradient(135deg, #FF6B5B 0%, #FF8566 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        ShopHub
      </Typography>
    </Box>
  );
};

export default Logo;
