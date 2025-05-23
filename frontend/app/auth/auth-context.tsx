import React, {createContext, useContext, useState, type ReactNode} from "react";
import {axiosPublic} from "~/api/axios";
import {endpoints} from "~/const/endpoints";

type AuthContextType = {
  username: string;
  isLoggedIn: boolean;
  token: string;
  login: (email: string, password: string) => Promise<string>;
  register: (username: string, email: string, password: string, passwordConfirm: string) => Promise<string>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const login = async (email: string, password: string): Promise<string> => {
    const response = await axiosPublic.post(endpoints.login,
      {email, password},
      {headers: {'Content-Type': 'application/json'}})

    if (response.status === 200) {
      setUsername(email);
      setToken(response.data.token);
      setIsLoggedIn(true);
      return "";
    } else {
      return response.data.detail
    }
  }

  const register = async (username: string, email: string, password: string, passwordConfirm: string): Promise<string> => {
    const response = await axiosPublic.post(endpoints.register,
      {email, username, password, passwordConfirm},
      {headers: {'Content-Type': 'application/json'}})

    if (response.status === 200) {
      setUsername(email);
      console.log(response.data.token);
      setToken(response.data.token);
      setIsLoggedIn(true);
      return "";
    } else {
      return response.data.detail
    }
  }

  const logout = () => {
    setUsername("");
    setToken("");
    setIsLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{username, isLoggedIn, token, login, register, logout}}>
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
