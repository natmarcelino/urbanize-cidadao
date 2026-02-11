import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>Urbanize</Text>
          <Text style={styles.greeting}>Olá, Nathalia</Text>
          <Text style={styles.subtitle}>
            Veja o resumo das suas solicitações
          </Text>
        </View>

        <TouchableOpacity style={styles.notification}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* RESUMO */}
      <View style={styles.summaryGrid}>
        <ResumoCard
          title="Abertas"
          value="2"
          color="#DCFCE7"
          textColor="#166534"
          onPress={() =>
            router.push({
              pathname: '/(tabs)/minhas-solicitacoes',
              params: { status: 'aberta' },
            })
          }
        />

        <ResumoCard
          title="Em atendimento"
          value="1"
          color="#FEF3C7"
          textColor="#92400E"
          onPress={() =>
            router.push({
              pathname: '/(tabs)/minhas-solicitacoes',
              params: { status: 'em_atendimento' },
            })
          }
        />

        <ResumoCard
          title="Resolvidas"
          value="8"
          color="#DBEAFE"
          textColor="#1E40AF"
          onPress={() =>
            router.push({
              pathname: '/(tabs)/minhas-solicitacoes',
              params: { status: 'resolvida' },
            })
          }
        />

        <ResumoCard
          title="Canceladas"
          value="1"
          color="#FEE2E2"
          textColor="#991B1B"
          onPress={() =>
            router.push({
              pathname: '/(tabs)/minhas-solicitacoes',
              params: { status: 'cancelada' },
            })
          }
        />
      </View>

      {/* MAPA (PLACEHOLDER) */}
      <View style={styles.mapCard}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>🗺️ Mapa das solicitações</Text>
        </View>

        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Ver mapa completo</Text>
        </TouchableOpacity>
      </View>

      {/* ÚLTIMAS ATUALIZAÇÕES */}
      <View style={styles.updates}>
        <View style={styles.updatesHeader}>
          <Text style={styles.sectionTitle}>Últimas atualizações</Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/minhas-solicitacoes')}
          >
            <Text style={styles.seeMore}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.updateItem}>
          <Text style={styles.updateIcon}>💡</Text>

          <View style={{ flex: 1 }}>
            <Text style={styles.updateTitle}>
              Iluminação
              <Text style={styles.updateSubtitle}> • Jardim Nova Era</Text>
            </Text>
            <Text style={styles.updateStatus}>Em atendimento</Text>
          </View>

          <Text style={styles.updateDate}>Hoje, 09:15</Text>
        </View>
      </View>
    </ScrollView>
  );
}

/* CARD DE RESUMO */
function ResumoCard({
  title,
  value,
  color,
  textColor,
  onPress,
}: {
  title: string;
  value: string;
  color: string;
  textColor: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.summaryCard, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={[styles.summaryValue, { color: textColor }]}>
        {value}
      </Text>
      <Text style={styles.summaryTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },

  appName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#16A34A',
  },

  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },

  notification: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  notificationIcon: {
    fontSize: 18,
  },

  /* RESUMO */
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },

  summaryCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
  },

  summaryValue: {
    fontSize: 26,
    fontWeight: '800',
  },

  summaryTitle: {
    fontSize: 14,
    color: '#374151',
    marginTop: 2,
    fontWeight: '600',
  },

  /* MAPA */
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },

  mapPlaceholder: {
    height: 120,
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  mapText: {
    color: '#6B7280',
    fontWeight: '600',
  },

  mapButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },

  mapButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  /* ATUALIZAÇÕES */
  updates: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    elevation: 3,
    marginBottom: 30,
  },

  updatesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  seeMore: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },

  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  updateIcon: {
    fontSize: 20,
  },

  updateTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },

  updateSubtitle: {
    fontWeight: '400',
    color: '#6B7280',
  },

  updateStatus: {
    fontSize: 12,
    color: '#92400E',
    marginTop: 2,
    fontWeight: '600',
  },

  updateDate: {
    fontSize: 12,
    color: '#6B7280',
  },
});
