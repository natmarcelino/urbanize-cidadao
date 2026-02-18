import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export default function Perfil() {
  const router = useRouter();

  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.title}>Perfil</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* FOTO + NOME */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nathalia Gomes</Text>
      </View>

      {/* LISTA DE OPÇÕES */}
      <View style={styles.card}>
        <MenuItem icon="create-outline" label="Editar dados" />
        <MenuItem icon="location-outline" label="Endereços salvos" />
        <MenuItem icon="notifications-outline" label="Notificações" />
        <MenuItem
          icon="color-palette-outline"
          label="Tema"
          rightText="Claro / Escuro"
        />
        <MenuItem icon="help-circle-outline" label="Ajuda" />
        <MenuItem icon="document-text-outline" label="Termos de uso" />
      </View>

      {/* BOTÃO SAIR */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* COMPONENTE ITEM */
function MenuItem({
  icon,
  label,
  rightText,
}: {
  icon: any;
  label: string;
  rightText?: string;
}) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={20} color="#6B7280" />
        <Text style={styles.menuLabel}>{label}</Text>
      </View>

      <View style={styles.menuRight}>
        {rightText && <Text style={styles.menuRightText}>{rightText}</Text>}
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 8,
    marginBottom: 25,
  },

  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuLabel: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },

  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  menuRightText: {
    fontSize: 13,
    color: "#6B7280",
  },

  logoutButton: {
    backgroundColor: "#E57373",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 40,
  },

  logoutText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
