import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // token loaded from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          console.warn("Token expired, logging out.");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser({ token, ...decoded });
        }
      } catch (error) {
        console.error("Invalid token, removing from storage:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // Periodically check if the token has expired.
  useEffect(() => {
    if (!user || !user.token) return;
    const interval = setInterval(() => {
      const currentTime = Date.now() / 1000;
      if (user.exp && user.exp < currentTime) {
        console.warn("Token expired during session, logging out.");
        logout();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [user]);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Received expired token, rejecting login.");
        return;
      }
      localStorage.setItem("token", token);
      setUser({ token, ...decoded });
    } catch (error) {
      console.error("Error decoding token during login:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
