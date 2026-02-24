import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(email: string, password: string) {
  return api("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
}



export async function refreshAccessToken() {
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  const response = await api("/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível renovar token");
  }

  const data = await response.json();

  await AsyncStorage.setItem("accessToken", data.user.accessToken);

  return data.user.accessToken;
}