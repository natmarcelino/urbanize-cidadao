import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function EditarPerfil() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} defaultValue="Nathalia Marcelino" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} defaultValue="nathalia@email.com" />

        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} defaultValue="(62) 99999-9999" />

        <Text style={styles.label}>CPF</Text>
        <TextInput style={styles.input} defaultValue="***.***.***-00" />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Endereço</Text>

        <Text style={styles.label}>CEP</Text>
        <TextInput style={styles.input} defaultValue="74000-000" />

        <Text style={styles.label}>Rua</Text>
        <TextInput style={styles.input} defaultValue="Rua das Acácias" />

        <Text style={styles.label}>Número</Text>
        <TextInput style={styles.input} defaultValue="123" />

        <Text style={styles.label}>Bairro</Text>
        <TextInput style={styles.input} defaultValue="Jardim Nova Era" />

        <Text style={styles.label}>Cidade</Text>
        <TextInput style={styles.input} defaultValue="Goiânia" />

        <Text style={styles.label}>Estado</Text>
        <TextInput style={styles.input} defaultValue="GO" />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111827',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 10,
  },

  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
  },

  button: {
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  cancelButton: {
    alignItems: 'center',
    marginTop: 16,
  },

  cancelText: {
    color: '#6B7280',
    fontWeight: '600',
  },
});
