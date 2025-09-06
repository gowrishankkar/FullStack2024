import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({});

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) setAuthenticatedUser(JSON.stringify(savedUser));
  }, []);

  const loginAuthenticatedUser = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setAuthenticatedUser(userData);
  };

  const logoutAuthenticatedUser = () => {
    sessionStorage.removeItem("user");
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
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
