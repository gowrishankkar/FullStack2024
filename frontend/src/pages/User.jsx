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
} from "@mui/material";
import URL from "../urlConfig";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useAuth } from "../contexts/AuthProvider";

const UserProfile = () => {
  const savedUser = sessionStorage.getItem("user");
  const parsedUser = JSON.parse(savedUser);

  const [user, setUser] = useState(parsedUser);
  const [userID, setUserID] = useState("");

  const onload = async () => {
    setUserID(parsedUser._id);
    if (userID || parsedUser._id) {
      const user = await axios.get(`${URL.USER}/${userID || parsedUser._id}`);
      console.log("user", user.data.data);
      setUser(user.data.data);
    }
  };
  useEffect(() => {
    onload();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await axios.patch(`${URL.USER}/${userID || parsedUser._id}`, user);
      alert("Profile updated!");
    } catch (err) {
      alert(err);
      console.log("err", err);
    }
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
            <IconButton component="span">
              <Avatar src={user?.avatar} sx={{ width: 100, height: 100 }} />
            </IconButton>
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.address}
              </Typography>

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
