import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { login as loginApi } from "../../services/auth.service";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<null | string>(null);

  const { login } = useAuth();

  const router = useRouter();

  async function handleLogin() {
    try {
        const data = await loginApi(email, password);

        await login(data.accessToken, data.refreshToken);

      } catch (error) {
        setErro("Erro ao conectar com servidor");
      }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Acesso do cidadão</Text>
      </View>

      <View style={styles.card}>
        {/* Inputs */}
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
        />

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Divisor */}
        <Text style={styles.dividerText}>Entrar com conta institucional</Text>

        <View style={styles.socialContainer}>
          {/* Google */}
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/images/google.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/images/govbr.png")}
              style={styles.govIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.links}>
          <TouchableOpacity onPress={() => router.push("/recuperar-senha")}>
            <Text style={styles.link}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/cadastro")}>
            <Text style={styles.linkPrimary}>Primeiro acesso</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 22,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#374151",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    elevation: 4,
  },

  input: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  dividerText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 14,
  },

  socialContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },

  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },

  govIcon: {
    width: 70,
    height: 28,
  },

  socialText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  links: {
    alignItems: "center",
  },

  link: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 4,
  },

  linkPrimary: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
});
