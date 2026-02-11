import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function DetalheSolicitacao() {
  const { status } = useLocalSearchParams<{
    status: 'atendimento' | 'cancelada' | 'resolvida';
  }>();

  function renderStatus() {
    if (status === 'atendimento') {
      return (
        <View style={[styles.statusBadge, styles.statusAtendimento]}>
          <Text style={[styles.statusText, styles.statusAtendimentoText]}>
            Em atendimento
          </Text>
        </View>
      );
    }

    if (status === 'resolvida') {
      return (
        <View style={[styles.statusBadge, styles.statusResolvida]}>
          <Text style={[styles.statusText, styles.statusResolvidaText]}>
            Resolvida
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.statusBadge, styles.statusCancelada]}>
        <Text style={[styles.statusText, styles.statusCanceladaText]}>
          Cancelada
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tipo}>💡 Iluminação pública</Text>
        {renderStatus()}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📍 Local do problema</Text>
        <Text style={styles.value}>
          Rua das Acácias, Jardim Nova Era
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📝 Descrição</Text>
        <Text style={styles.value}>
          Poste sem iluminação há mais de uma semana.
        </Text>
      </View>

      {status === 'resolvida' && (
        <View style={styles.card}>
          <Text style={styles.label}>✅ Solicitação resolvida</Text>
          <Text style={styles.value}>
            Problema solucionado em 25/04/2024 às 14:30.
          </Text>
        </View>
      )}

      {status === 'cancelada' && (
        <View style={[styles.card, styles.cancelCard]}>
          <Text style={styles.label}>❌ Motivo do cancelamento</Text>
          <Text style={styles.value}>
            Solicitação cancelada por duplicidade ou dados insuficientes.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>
          Voltar para minhas solicitações
        </Text>
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

  header: {
    marginBottom: 20,
  },

  tipo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },

  statusAtendimento: {
    backgroundColor: '#FEF3C7',
  },
  statusAtendimentoText: {
    color: '#92400E',
  },

  statusResolvida: {
    backgroundColor: '#DCFCE7',
  },
  statusResolvidaText: {
    color: '#166534',
  },

  statusCancelada: {
    backgroundColor: '#FEE2E2',
  },
  statusCanceladaText: {
    color: '#991B1B',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  cancelCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },

  value: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  photoBox: {
    height: 140,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoText: {
    fontWeight: '600',
    color: '#374151',
  },

  timelineItem: {
    flexDirection: 'row',
    marginTop: 14,
    alignItems: 'center',
    gap: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },

  dotInactive: {
    backgroundColor: '#9CA3AF',
  },

  dotResolvida: {
    backgroundColor: '#16A34A',
  },

  dotCancelada: {
    backgroundColor: '#DC2626',
  },

  timelineContent: {
    flex: 1,
  },

  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  timelineDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  backButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
  },
});
