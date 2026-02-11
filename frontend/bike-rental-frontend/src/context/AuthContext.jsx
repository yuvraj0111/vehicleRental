import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data);
    setUser(res.data);
    navigate("/");
  };

  const signup = async (name, email, password) => {
    await api.post("/api/auth/register", {
      name,
      email,
      password
    });

    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
