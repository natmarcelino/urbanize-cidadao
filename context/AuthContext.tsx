import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (accessToken: string, refreshToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function loadAuth() {
    const [token, savedUser] = await Promise.all([
      AsyncStorage.getItem("accessToken"),
      AsyncStorage.getItem("user")
    ]);
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }

  loadAuth();
}, []);


async function handleLogin(accessToken: string, refreshToken: string, userData: User) {
  await AsyncStorage.setItem("accessToken", accessToken);
  await AsyncStorage.setItem("refreshToken", refreshToken);
  await AsyncStorage.setItem("user", JSON.stringify(userData)); // Salva o objeto user
  setUser(userData);
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
        user,
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
