import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

type Status = 'atendimento' | 'resolvida' | 'cancelada' | 'aberta';

type Solicitacao = {
  id: number;
  tipo: string;
  endereco: string;
  status: Status;
  data: string;
  latitude: number;
  longitude: number;
};

export default function Home() {

  const solicitacoes: Solicitacao[] = [
    {
      id: 1,
      tipo: 'Iluminação pública',
      endereco: 'Jardim Nova Era',
      status: 'atendimento',
      data: '22/04/2024',
      latitude: -16.6869,
      longitude: -49.2648,
    },
    {
      id: 2,
      tipo: 'Coleta de lixo',
      endereco: 'Rua das Acácias',
      status: 'resolvida',
      data: '21/04/2024',
      latitude: -16.69,
      longitude: -49.27,
    },
    {
      id: 3,
      tipo: 'Buraco na via',
      endereco: 'Av. das Árvores',
      status: 'cancelada',
      data: '18/04/2024',
      latitude: -16.68,
      longitude: -49.26,
    },
    {
      id: 4,
      tipo: 'Lote vago',
      endereco: 'Setor Central',
      status: 'aberta',
      data: '24/04/2024',
      latitude: -16.67,
      longitude: -49.25,
    },
  ];

  const abertas = solicitacoes.filter(s => s.status === 'aberta').length;
  const atendimento = solicitacoes.filter(s => s.status === 'atendimento').length;
  const resolvidas = solicitacoes.filter(s => s.status === 'resolvida').length;
  const canceladas = solicitacoes.filter(s => s.status === 'cancelada').length;

  const ultimaAtualizacao = solicitacoes[0];

  function getPinColor(status: Status) {
    switch (status) {
      case 'resolvida':
        return 'green';
      case 'cancelada':
        return 'red';
      case 'atendimento':
        return 'orange';
      default:
        return '#2563EB';
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>Urbanize</Text>
            <Text style={styles.greeting}>Olá, Nathalia 👋</Text>
            <Text style={styles.subtitle}>
              Veja o resumo das suas solicitações
            </Text>
          </View>

          <TouchableOpacity style={styles.notification}>
            <Text style={{ fontSize: 18 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* MÉTRICAS CLICÁVEIS */}
        <View style={styles.grid}>
          <MetricCard
            title="Abertas"
            value={abertas}
            color="#16A34A"
            onPress={() => router.push('/minhas-solicitacoes')}
          />
          <MetricCard
            title="Em atendimento"
            value={atendimento}
            color="#D97706"
            onPress={() => router.push('/minhas-solicitacoes')}
          />
          <MetricCard
            title="Resolvidas"
            value={resolvidas}
            color="#2563EB"
            onPress={() => router.push('/minhas-solicitacoes')}
          />
          <MetricCard
            title="Canceladas"
            value={canceladas}
            color="#DC2626"
            onPress={() => router.push('/minhas-solicitacoes')}
          />
        </View>

        {/* MAPA */}
        <View style={styles.mapCard}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -16.6869,
              longitude: -49.2648,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {solicitacoes.map(item => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.tipo}
                description={item.endereco}
                pinColor={getPinColor(item.status)}
              />
            ))}
          </MapView>

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => router.push('/explore')}
          >
            <Text style={styles.mapButtonText}>
              Ver mapa completo
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOTÃO PRINCIPAL DE ACESSO */}
        <TouchableOpacity
          style={styles.minhasButton}
          onPress={() => router.push('/minhas-solicitacoes')}
        >
          <Text style={styles.minhasButtonText}>
            📋 Ver minhas solicitações
          </Text>
        </TouchableOpacity>

        {/* ÚLTIMA ATUALIZAÇÃO */}
        <View style={styles.updatesCard}>
          <View style={styles.updateHeader}>
            <Text style={styles.sectionTitle}>Última atualização</Text>
            <TouchableOpacity
              onPress={() => router.push('/minhas-solicitacoes')}
            >
              <Text style={styles.link}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.updateItem}
            onPress={() =>
              router.push('/detalhe-solicitacao')
            }
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.updateTitle}>
                {ultimaAtualizacao.tipo}
              </Text>
              <Text style={styles.updateSubtitle}>
                {ultimaAtualizacao.endereco}
              </Text>
            </View>

            <Text style={styles.updateDate}>
              {ultimaAtualizacao.data}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

function MetricCard({
  title,
  value,
  color,
  onPress,
}: {
  title: string;
  value: number;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.metricCard} onPress={onPress}>
      <Text style={[styles.metricValue, { color }]}>
        {value}
      </Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  logo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#16A34A',
  },

  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },

  notification: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    elevation: 4,
  },

  metricValue: {
    fontSize: 28,
    fontWeight: '800',
  },

  metricTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    elevation: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },

  map: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 12,
  },

  mapButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },

  mapButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  minhasButton: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20,
  },

  minhasButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  updatesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    elevation: 4,
    marginBottom: 30,
  },

  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  link: {
    color: '#2563EB',
    fontWeight: '600',
  },

  updateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  updateTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  updateSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  updateDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
