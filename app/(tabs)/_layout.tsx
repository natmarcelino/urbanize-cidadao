import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* NOVA SOLICITAÇÃO (BOTÃO CENTRAL) */}
      <Tabs.Screen
        name="nova-solicitacao"
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={styles.centerButton}>
              <Ionicons name="add" size={28} color="#FFFFFF" />
            </View>
          ),
        }}
      />

      {/* PERFIL */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 8,
    borderTopWidth: 0,
    elevation: 10,
  },

  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25, // faz ele subir
    elevation: 8,
  },
});
