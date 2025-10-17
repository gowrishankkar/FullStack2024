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
  Tooltip,
} from "@mui/material";
import axios from "axios";
import URL from "../urlConfig";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { useAuth } from "../contexts/AuthProvider";
import logo from "../assets/logo.png";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "./Logo";

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
    <AppBar 
      position="static"
      sx={{
        background: 'linear-gradient(90deg, #ffffff 0%, #f5f5f7 100%)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid #e5e5e7',
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          sx={{ 
            display: { xs: "block", md: "none" },
            color: '#ff1e00',
            '&:hover': {
              backgroundColor: 'rgba(255, 30, 0, 0.1)',
            },
          }}
          aria-label="menu"
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
            onClick={() => {
              navigate("/");
            }}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Logo size="small" />
          </Box>

          {/* Desktop Navigation */}
          <Grid
            item
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* Home */}
            <Tooltip title="Home">
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  color: '#1d1d1f',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 30, 0, 0.1)',
                    color: '#ff1e00',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>

            {/* Shopping Cart */}
            <Tooltip title="Shopping Cart">
              <IconButton 
                onClick={() => {
                  navigate("/cart");
                }}
                sx={{
                  color: '#1d1d1f',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 30, 0, 0.1)',
                    color: '#ff1e00',
                  },
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <Badge
                  badgeContent={quantity}
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ff1e00',
                      color: '#ffffff',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Bookings/Orders */}
            <Tooltip title="Orders">
              <IconButton
                onClick={() => {
                  navigate("/bookings");
                }}
                sx={{
                  color: '#1d1d1f',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 30, 0, 0.1)',
                    color: '#ff1e00',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ReceiptIcon />
              </IconButton>
            </Tooltip>

            {/* User Profile */}
            <Tooltip title="Profile">
              <IconButton 
                onClick={handleProfileClick}
                sx={{
                  color: '#1d1d1f',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 30, 0, 0.1)',
                    color: '#ff1e00',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseProfileMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              borderRadius: '12px',
              minWidth: '200px',
              mt: 1,
            },
          }}
        >
          <MenuItem 
            onClick={() => {
              navigate("/user");
              handleCloseProfileMenu();
            }}
            sx={{
              color: '#1d1d1f',
              '&:hover': {
                backgroundColor: 'rgba(255, 30, 0, 0.08)',
              },
            }}
          >
            <AccountCircleIcon sx={{ mr: 1.5, color: '#ff1e00' }} />
            Profile
          </MenuItem>
          <MenuItem 
            onClick={() => logout()}
            sx={{
              color: '#1d1d1f',
              '&:hover': {
                backgroundColor: 'rgba(255, 30, 0, 0.08)',
              },
            }}
          >
            <LogoutIcon sx={{ mr: 1.5, color: '#ff1e00' }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenu}
          open={Boolean(mobileMenu)}
          onClose={handleCloseMobileMenu}
          PaperProps={{
            sx: {
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              borderRadius: '12px',
            },
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/");
              handleCloseMobileMenu();
            }}
            sx={{
              color: '#1d1d1f',
              '&:hover': {
                backgroundColor: 'rgba(255, 30, 0, 0.08)',
              },
            }}
          >
            <HomeIcon sx={{ mr: 1.5, color: '#ff1e00' }} />
            Home
          </MenuItem>
          <MenuItem 
            onClick={() => {
              navigate("/cart");
              handleCloseMobileMenu();
            }}
            sx={{
              color: '#1d1d1f',
              '&:hover': {
                backgroundColor: 'rgba(255, 30, 0, 0.08)',
              },
            }}
          >
            <Badge badgeContent={quantity} sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#ff1e00',
                color: '#ffffff',
              },
            }}>
              <ShoppingCartIcon sx={{ color: '#ff1e00' }} />
            </Badge>
            <Typography sx={{ ml: 1.5 }}>Cart</Typography>
          </MenuItem>
          <MenuItem 
            onClick={() => {
              navigate("/bookings");
              handleCloseMobileMenu();
            }}
            sx={{
              color: '#1d1d1f',
              '&:hover': {
                backgroundColor: 'rgba(255, 30, 0, 0.08)',
              },
            }}
          >
            <ReceiptIcon sx={{ mr: 1.5, color: '#ff1e00' }} />
            Orders
          </MenuItem>
          <MenuItem 
            onClick={() => {
              navigate("/user");
              handleCloseMobileMenu();
            }}
            sx={{
              color: '#1d1d1f',
              '&:hover': {
                backgroundColor: 'rgba(255, 30, 0, 0.08)',
              },
            }}
          >
            <AccountCircleIcon sx={{ mr: 1.5, color: '#ff1e00' }} />
            Profile
          </MenuItem>
          <MenuItem 
            onClick={() => {
              logout();
              handleCloseMobileMenu();
            }}
            sx={{
              color: '#1d1d1f',
              '&:hover': {
                backgroundColor: 'rgba(255, 30, 0, 0.08)',
              },
            }}
          >
            <LogoutIcon sx={{ mr: 1.5, color: '#ff1e00' }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
