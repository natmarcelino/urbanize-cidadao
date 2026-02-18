import { useAuth } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {

  const { isAuthenticated, isLoading } = useAuth();
const router = useRouter();

useEffect(() => {
  if (isLoading) return;

  if (isAuthenticated) {
    router.replace("/(tabs)/home");
  }
}, [isAuthenticated, isLoading]);


  return <Stack screenOptions={{ headerShown: false }} />;
}
