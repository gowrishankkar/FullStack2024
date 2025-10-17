import { useState, useEffect } from "react";
import "./theme/animations.css";
import "./theme/mobileOptimizations.css";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import User from "./pages/User";
import Bookings from "./pages/Bookings";
import PaginationProvider from "./contexts/PaginationContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AuthProvider from "./contexts/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a default Material-UI theme without Apple colors
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    setShowNavbar(
      location.pathname !== "/signup" && location.pathname !== "/login"
    );
  }, [location]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthProvider>
        <PaginationProvider>
          {showNavbar && <NavBar></NavBar>}
          <Routes>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route path="/" element={<Home></Home>}></Route>
            </Route>

            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route path="/cart" element={<Cart></Cart>}></Route>
            </Route>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route path="/bookings" element={<Bookings></Bookings>}></Route>
            </Route>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route
                path="/product/:id"
                element={<ProductDetails></ProductDetails>}
              >
                {" "}
              </Route>
            </Route>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route path="/user" element={<User></User>}>
                {" "}
              </Route>
            </Route>
            <Route element={<RequireAuth></RequireAuth>}>
              <Route path="/home" element={<Navigate to="/"></Navigate>}></Route>
            </Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}>
              {" "}
            </Route>
          </Routes>
        </PaginationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
