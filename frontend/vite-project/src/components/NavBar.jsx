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
} from "@mui/material";
import axios from "axios";
import URL from "../urlConfig";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthProvider";

const { logoutAuthenticatedUser } = useAuth();

const NavBar = () => {
  const navigate = useNavigate();
  const quantity = useSelector((store) => {
    return store.cartReducer.cartQuantity;
  });
  const [cartCount, setCartCount] = useState(3); // Example cart count
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

        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>

        {/* Desktop Navigation */}
        <Button
          color="inherit"
          onClick={() => {
            navigate("/home");
          }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Home
        </Button>
        {/* <Button color="inherit" sx={{ display: { xs: "none", md: "block" } }}>
          Products
        </Button>
        <Button color="inherit" sx={{ display: { xs: "none", md: "block" } }}>
          Contact
        </Button> */}

        {/* Cart Icon */}
        <IconButton color="inherit">
          <Badge
            badgeContent={cartCount}
            color="error"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* User Profile */}
        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircleIcon />
        </IconButton>

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
