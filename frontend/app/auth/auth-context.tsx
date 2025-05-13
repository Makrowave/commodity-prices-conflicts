import React, { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  username: string;
  isLoggedIn: boolean;
  token: string;
  login: (username: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const login = (username: string, password: string) => {
    setUsername(username);
    setToken("");
    setIsLoggedIn(true);
  }
  const logout = () => {
    setUsername("");
    setToken("");
    setIsLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ username, isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useTheme must be used within a AuthProvider");
  }
  return context;
};
