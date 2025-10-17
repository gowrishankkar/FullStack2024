import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  IconButton,
  Box,
  Paper,
  Divider,
  Chip,
  LinearProgress,
  Badge,
  Tooltip,
  Alert,
  Snackbar,
} from "@mui/material";
import URL from "../urlConfig";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useAuth } from "../contexts/AuthProvider";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const savedUser = sessionStorage.getItem("user");
  const parsedUser = JSON.parse(savedUser);

  const [user, setUser] = useState(parsedUser);
  const [userID, setUserID] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  // Get cart data for statistics
  const cartItems = useSelector((store) => store.cartReducer.cartProducts);
  const cartQuantity = cartItems.reduce((total, item) => total + item.indQuantity, 0);

  const onload = async () => {
    setUserID(parsedUser._id);
    if (userID || parsedUser._id) {
      try {
        const userResponse = await axios.get(`${URL.USER}/${userID || parsedUser._id}`);
        console.log("user", userResponse.data.data);
        setUser(userResponse.data.data);
      } catch (error) {
        console.error("Error loading user:", error);
        setSnackbar({ open: true, message: "Error loading profile", severity: "error" });
      }
    }
  };

  useEffect(() => {
    onload();
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(`${URL.USER}/${userID || parsedUser._id}`, user);
      setIsEditing(false);
      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
    } catch (err) {
      console.error("Error updating profile:", err);
      setSnackbar({ open: true, message: "Error updating profile", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, avatar: imageUrl });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Calculate profile completion
  const getProfileCompletion = () => {
    let completed = 0;
    let total = 4;
    if (user?.name) completed++;
    if (user?.email) completed++;
    if (user?.address) completed++;
    if (user?.avatar) completed++;
    return Math.round((completed / total) * 100);
  };

  const profileCompletion = getProfileCompletion();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #6C4EFF 0%, #FF6B6B 100%)',
          color: 'white',
          p: 4,
          mb: 4,
          borderRadius: 3,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1,
          }
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          My Profile
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Manage your account information and preferences
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Profile Avatar and Basic Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: 'center', p: 2 }}>
            <CardContent>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Tooltip title="Change Avatar">
                      <IconButton
                        sx={{
                          backgroundColor: '#6C4EFF',
                          color: 'white',
                          '&:hover': { backgroundColor: '#5a3ed1' }
                        }}
                        size="small"
                        component="label"
                      >
                        <CameraAltIcon fontSize="small" />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <Avatar
                    src={user?.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid #6C4EFF',
                      boxShadow: '0 8px 25px rgba(108, 78, 255, 0.3)'
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 60 }} />
                  </Avatar>
                </Badge>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user?.email}
              </Typography>

              {/* Profile Completion */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Profile Completion
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={profileCompletion}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(108, 78, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: profileCompletion === 100 ? '#4caf50' : '#6C4EFF',
                      borderRadius: 4,
                    }
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {profileCompletion}% Complete
                </Typography>
              </Box>

              <Chip
                label={user?.role || 'Customer'}
                sx={{
                  backgroundColor: '#6C4EFF',
                  color: 'white',
                  fontWeight: 500
                }}
              />
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Card sx={{ borderRadius: 2, textAlign: 'center', p: 2 }}>
                <ShoppingCartIcon sx={{ color: '#6C4EFF', fontSize: 30, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {cartQuantity}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Items in Cart
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ borderRadius: 2, textAlign: 'center', p: 2 }}>
                <StarIcon sx={{ color: '#ffd700', fontSize: 30, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  4.8
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Rating
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {isEditing ? 'Edit Profile' : 'Profile Information'}
                </Typography>
                {!isEditing && (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    sx={{
                      borderRadius: 2,
                      '&:hover': { backgroundColor: '#6C4EFF', color: 'white' }
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              {isEditing ? (
                <Box component="form" sx={{ '& .MuiTextField-root': { mb: 3 } }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        name="name"
                        fullWidth
                        variant="outlined"
                        value={user?.name || ''}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: <PersonIcon sx={{ color: 'action.active', mr: 1 }} />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        name="email"
                        fullWidth
                        variant="outlined"
                        value={user?.email || ''}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ color: 'action.active', mr: 1 }} />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Role"
                        name="role"
                        fullWidth
                        variant="outlined"
                        value={user?.role || ''}
                        onChange={handleInputChange}
                        disabled
                        InputProps={{
                          startAdornment: <WorkIcon sx={{ color: 'action.active', mr: 1 }} />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Address"
                        name="address"
                        fullWidth
                        variant="outlined"
                        value={user?.address || ''}
                        onChange={handleInputChange}
                        multiline
                        rows={2}
                        InputProps={{
                          startAdornment: <LocationOnIcon sx={{ color: 'action.active', mr: 1, mt: 1 }} />,
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      disabled={loading}
                      sx={{
                        backgroundColor: '#6C4EFF',
                        '&:hover': { backgroundColor: '#5a3ed1' },
                        borderRadius: 2,
                        px: 4
                      }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                      sx={{ borderRadius: 2, px: 4 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonIcon sx={{ color: '#6C4EFF', mr: 2 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Full Name
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {user?.name || 'Not provided'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EmailIcon sx={{ color: '#6C4EFF', mr: 2 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Email Address
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {user?.email || 'Not provided'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <WorkIcon sx={{ color: '#6C4EFF', mr: 2 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Role
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {user?.role || 'Customer'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LocationOnIcon sx={{ color: '#6C4EFF', mr: 2 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Address
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {user?.address || 'Not provided'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserProfile;
