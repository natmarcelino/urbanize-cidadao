import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Perfil() {

  // 🔹 Estado da imagem
  const [avatar, setAvatar] = useState(
    'https://i.pravatar.cc/150?img=47'
  );

  // 🔹 Função para selecionar imagem
  async function selecionarImagem() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos acessar sua galeria.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity onPress={selecionarImagem}>
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <Text style={styles.name}>Nathalia Marcelino</Text>
        <Text style={styles.email}>nathalia@email.com</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Usuário verificado</Text>
        </View>
      </View>

      {/* ESTATÍSTICAS */}
      <View style={styles.statsContainer}>
        <StatCard label="Solicitações" value="12" />
        <StatCard label="Resolvidas" value="8" />
        <StatCard label="Em andamento" value="2" />
      </View>

      {/* INFORMAÇÕES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações pessoais</Text>

        <InfoItem label="Telefone" value="(62) 99999-9999" />
        <InfoItem label="Endereço" value="Goiânia - GO" />
        <InfoItem label="CPF" value="***.***.***-00" />
      </View>

      {/* CONFIGURAÇÕES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>

        <MenuItem
          title="Editar perfil"
          onPress={() => router.push('/editar-perfil')}
        />

        <MenuItem
          title="Alterar senha"
          onPress={() => router.push('/alterar-senha')}
        />

        <MenuItem
          title="Notificações"
          onPress={() => alert('Tela de notificações em breve')}
        />

        <MenuItem
          title="Sair da conta"
          danger
          onPress={() => {
            alert('Usuário deslogado');
            router.replace('/login');
          }}
        />
      </View>

    </ScrollView>
  );
}

/* COMPONENTES AUXILIARES */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function MenuItem({
  title,
  danger,
  onPress,
}: {
  title: string;
  danger?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text
        style={[
          styles.menuText,
          danger && { color: '#DC2626' },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  email: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  badge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 8,
  },

  badgeText: {
    fontSize: 12,
    color: '#166534',
    fontWeight: '600',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  statCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    padding: 14,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#16A34A',
  },

  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 14,
    color: '#111827',
  },

  infoItem: {
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  menuItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
});
