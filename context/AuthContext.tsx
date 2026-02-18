import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isAuthenticated: boolean;
   isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function loadAuth() {
    const token = await AsyncStorage.getItem("accessToken");
    console.log("TOKEN AO ABRIR:", token);
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }

  loadAuth();
}, []);


  async function handleLogin(accessToken: string, refreshToken: string) {
    console.log("LOGIN CONTEXT CHAMADO");
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);
  }

  async function handleLogout() {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    setIsAuthenticated(false);
  }

  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
