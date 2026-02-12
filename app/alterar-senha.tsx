import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function AlterarSenha() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>

      <TextInput
        placeholder="Senha atual"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Nova senha"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirmar nova senha"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Atualizar senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancel}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F8',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },

  cancel: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6B7280',
  },
});
