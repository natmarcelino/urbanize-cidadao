import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tela pública */}
      <Stack.Screen name="login" />

      {/* Grupo de tabs */}
      <Stack.Screen name="(tabs)" />

      {/* Outras telas */}
      <Stack.Screen name="editar-perfil" />
      <Stack.Screen name="alterar-senha" />
    </Stack>
  );
}
