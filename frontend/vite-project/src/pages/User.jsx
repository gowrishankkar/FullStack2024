import React, { useState } from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Avatar, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Leanne Graham",
    email: "leanne@example.com",
    role: "Admin",
    address: "123 Main Street, Warsaw, Poland",
    avatar: "https://via.placeholder.com/150",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated!");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, avatar: imageUrl });
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 500, mx: "auto", p: 3, textAlign: "center" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <label htmlFor="avatar-upload">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <IconButton component="span">
                <Avatar src={user.avatar} sx={{ width: 100, height: 100 }} />
                <CameraAltIcon sx={{ position: "absolute", color: "white", background: "black", borderRadius: "50%", padding: 0.5 }} />
              </IconButton>
            </label>
          </Grid>
        </Grid>

        <CardContent>
          {isEditing ? (
            <>
              <TextField
                label="Name"
                name="name"
                fullWidth
                variant="outlined"
                value={user.name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                value={user.email}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Role"
                name="role"
                fullWidth
                variant="outlined"
                value={user.role}
                onChange={handleInputChange}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Address"
                name="address"
                fullWidth
                variant="outlined"
                value={user.address}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="body1" color="text.secondary">{user.email}</Typography>
              <Typography variant="body2" color="text.secondary">{user.role}</Typography>
              <Typography variant="body2" color="text.secondary">{user.address}</Typography>

              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
