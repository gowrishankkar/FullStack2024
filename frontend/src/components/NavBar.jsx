import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import URL from "../urlConfig";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthProvider";
import logo from "../assets/logo.png";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const navigate = useNavigate();
  const { logoutAuthenticatedUser } = useAuth();
  const quantity = useSelector((store) => {
    return store.cartReducer.cartQuantity;
  });
  // const [cartCount, setCartCount] = useState(3); // Example cart count
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = (prop) => {
    setAnchorEl(null);
  };

  const logout = () => {
    logoutAuthenticatedUser();
    navigate("/login");
  };

  const handleMobileMenuClick = (event) => {
    setMobileMenu(event.currentTarget);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenu(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={handleMobileMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Logo */}
          <Box
            component="img"
            onClick={() => {
              navigate("/home");
            }}
            src={logo}
            alt="GSP"
            sx={{ width: 80, height: 80 }}
          />

          {/* Desktop Navigation */}
          <Grid
            item
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton color="inherit">
              <Badge
                badgeContent={quantity}
                color="error"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Bookings */}
            <IconButton
              color="inherit"
              onClick={() => {
                navigate("/bookings");
              }}
            >
              <ReceiptIcon />
            </IconButton>

            {/* User Profile */}
            <IconButton color="inherit" onClick={handleProfileClick}>
              <AccountCircleIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseProfileMenu}
        >
          <MenuItem onClick={() => navigate("/user")}>Profile</MenuItem>
          <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenu}
          open={Boolean(mobileMenu)}
          onClose={handleCloseMobileMenu}
        >
          <MenuItem onClick={handleCloseMobileMenu}>Home</MenuItem>
          <MenuItem onClick={handleCloseMobileMenu}>Products</MenuItem>
          <MenuItem onClick={handleCloseMobileMenu}>Contact</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
