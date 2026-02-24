import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

export default function Home() {
  const solicitacoes = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.logo}>URBANIZE</Text>
          <Text style={styles.greeting}>Olá, Nathalia 👋</Text>
          <Text style={styles.subtitle}>
            Plataforma inteligente de monitoramento urbano
          </Text>
        </View>

        {/* INDICADORES SOBREPOSTOS */}
        <View style={styles.overlayCard}>

          <View style={styles.indicatorsRow}>
            <Indicator number="01" label="Abertas" color="#16A34A" />
            <Indicator number="01" label="Em andamento" color="#F59E0B" />
          </View>

          <View style={styles.indicatorsRow}>
            <Indicator number="01" label="Resolvidas" color="#3B82F6" />
            <Indicator number="01" label="Canceladas" color="#EF4444" />
          </View>

        </View>

        {/* BOTÃO AGORA ACIMA DO MAPA */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/minhas-solicitacoes')}
        >
          <Text style={styles.primaryButtonText}>
            Minhas Solicitações
          </Text>
        </TouchableOpacity>

        {/* MAPA */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>
            Monitoramento geográfico
          </Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -16.6869,
              longitude: -49.2648,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            {solicitacoes.map(item => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: -16.6869 + item.id * 0.002,
                  longitude: -49.2648 + item.id * 0.002,
                }}
              />
            ))}
          </MapView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function Indicator({
  number,
  label,
  color,
}: {
  number: string;
  label: string;
  color: string;
}) {
  return (
    <View style={styles.indicator}>
      <Text style={[styles.indicatorNumber, { color }]}>
        {number}
      </Text>
      <Text style={styles.indicatorLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F5F7',
  },

  hero: {
    backgroundColor: '#15803D',
    paddingTop: 70,
    paddingBottom: 100,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  logo: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },

  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 13,
    color: '#DCFCE7',
    marginTop: 6,
  },

  overlayCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    marginTop: -70,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 6,
  },

  indicatorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  indicator: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },

  indicatorNumber: {
    fontSize: 24,
    fontWeight: '800',
  },

  indicatorLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },

  primaryButton: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: '#0F172A',
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.5,
  },

  mapSection: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 40,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },

  map: {
    height: 220,
    borderRadius: 24,
  },
});