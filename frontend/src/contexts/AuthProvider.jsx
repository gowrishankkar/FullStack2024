import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    const savedToken = sessionStorage.getItem("authToken");
    if (savedUser) {
      try {
        setAuthenticatedUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user", error);
        sessionStorage.removeItem("user");
      }
    }
    if (savedToken) {
      setAuthToken(savedToken);
    }
  }, []);

  const loginAuthenticatedUser = (userData, token) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    if (token) {
      sessionStorage.setItem("authToken", token);
      setAuthToken(token);
    }
    setAuthenticatedUser(userData);
  };

  const logoutAuthenticatedUser = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    setAuthenticatedUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        authToken,
        loginAuthenticatedUser,
        logoutAuthenticatedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
