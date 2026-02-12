import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="editar-perfil" />
      <Stack.Screen name="alterar-senha" />
    </Stack>
  );
}
