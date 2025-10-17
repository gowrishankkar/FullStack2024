import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ShoppingCart,
} from "@mui/icons-material";
import axios from "axios";
import urlConfig from "../../urlConfig";
import { useAuth } from "../../contexts/AuthProvider";
import Logo from "../../components/Logo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { loginAuthenticatedUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrMsg("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const userDetails = { email, password };
      const res = await axios.post(urlConfig.LOGIN_URL, userDetails, {
        withCredentials: true,
      });
      console.log("logged in user", res);
      const user = res.data.user;
      loginAuthenticatedUser({...user, _id: res.data.data._id});
      setLoading(false);
      setEmail("");
      setPassword("");
      navigate("/");
      sessionStorage.setItem("user", JSON.stringify({...user, _id: res.data.data._id}));
    } catch (err) {
      setErrMsg(err.response?.data?.message || err.message || "Login failed. Please try again.");
      console.log(err);
      setLoading(false);
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: '#f5f5f5',
          gap: 2,
        }}
      >
        <CircularProgress size={60} sx={{ color: '#FF6B5B' }} />
        <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
          Signing you in...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f5f5f5',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Left Section - Form */}
      <Grid container sx={{ width: '100%', m: 0, p: 0 }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: { xs: 3, md: 5 },
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            {/* Logo/Header */}
            <Box sx={{ mb: 4 }}>
              <Logo size="medium" />
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: '#1a1a1a',
                  mb: 2,
                  mt: 2,
                }}
              >
                Sign in
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                Welcome back to your account
              </Typography>
            </Box>

            {/* Error Alert */}
            {errMsg && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
                {errMsg}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f8f8f8',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#ccc', mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                size="small"
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f8f8f8',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#ccc', mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              variant="outlined"
              size="small"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              disabled={loading}
              sx={{
                py: 1.2,
                borderRadius: '20px',
                fontSize: '0.95rem',
                fontWeight: 600,
                background: '#FF6B5B',
                boxShadow: 'none',
                mb: 2,
                '&:hover': {
                  background: '#ff5a4a',
                  boxShadow: 'none',
                },
                '&:disabled': {
                  background: '#ccc',
                },
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'SIGN IN'}
            </Button>              {/* Sign Up Link */}
              <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: '#FF6B5B',
                      fontWeight: 600,
                      '&:hover': { textDecoration: 'underline' },
                      cursor: 'pointer',
                    }}
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Section - Illustration */}
        <Grid
          item
          xs={0}
          sm={0}
          md={7}
          sx={{
            background: 'linear-gradient(135deg, #FFE5D9 0%, #F5D5C0 100%)',
            display: { xs: 'none', sm: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Elements */}
          <Box
            sx={{
              position: 'absolute',
              width: 200,
              height: 200,
              backgroundColor: 'rgba(255, 107, 91, 0.1)',
              borderRadius: '50%',
              top: -50,
              right: -50,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: 150,
              height: 150,
              backgroundColor: 'rgba(255, 107, 91, 0.08)',
              borderRadius: '50%',
              bottom: 50,
              left: -30,
            }}
          />

          {/* Illustration Content */}
          <Box sx={{ textAlign: 'center', zIndex: 1, position: 'relative' }}>
            <Box
              sx={{
                fontSize: '120px',
                mb: 2,
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' },
                },
              }}
            >
              🛍️
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: '#1a1a1a',
                fontWeight: 700,
                mb: 1,
              }}
            >
              Welcome to Shopping
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                maxWidth: 300,
              }}
            >
              Find your favorite products and get amazing deals
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
