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
  Divider,
  Avatar,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ShoppingBag,
} from "@mui/icons-material";
import axios from "axios";
import urlConfig from "../../urlConfig";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          gap: 2,
        }}
      >
        <CircularProgress size={60} sx={{ color: 'white' }} />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 500 }}>
          Creating your account...
        </Typography>
      </Box>
    );
  }

  return (
    <div className="signupscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <i class="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Signup</p>
          </div>

          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="password">Confirm Password</label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            placeholder="Your ConfirmPassword.."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* <label for="phone">Contact Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your Contact Number.."
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /> */}

          <Link to="/signin" className="link">
            <span>Already have an account ?</span>
          </Link>

          <br />
          <input type="submit" value="Sign up" onClick={handleSubmit} />
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
