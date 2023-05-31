import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface SessionContextProps {
  login: (newToken: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

interface SessionProviderProps {
  children: React.ReactNode;
}
const SessionContext = createContext<SessionContextProps>({
  login: () => {},
  logout: () => {},
  isLoggedIn: () => false,
});

export function SessionProvider({ children }: SessionProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    setToken(newToken);
  };

  const logout = () => {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("token");
    setToken(null);
  };

  const isLoggedIn = (): boolean => {
    return token != null;
  };

  const interceptor = axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [interceptor]);

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = undefined;
  }

  return (
    <SessionContext.Provider value={{ login, logout, isLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
}

export default function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
