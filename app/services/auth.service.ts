import { api } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(email: string, password: string) {
  return api("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  await AsyncStorage.removeItem("token");
}

