import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

type Status = 'atendimento' | 'resolvida' | 'cancelada';

export default function DetalheSolicitacao() {
  const { tipo, endereco, status, data } =
    useLocalSearchParams<{
      tipo: string;
      endereco: string;
      status: Status;
      data: string;
    }>();

  const STATUS = status as Status;

  function renderStatusBadge() {
    if (STATUS === 'atendimento') {
      return (
        <View style={[styles.badge, styles.badgeAtendimento]}>
          <Text style={[styles.badgeText, styles.textAtendimento]}>
            Em atendimento
          </Text>
        </View>
      );
    }

    if (STATUS === 'resolvida') {
      return (
        <View style={[styles.badge, styles.badgeResolvida]}>
          <Text style={[styles.badgeText, styles.textResolvida]}>
            Resolvida
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.badge, styles.badgeCancelada]}>
        <Text style={[styles.badgeText, styles.textCancelada]}>
          Cancelada
        </Text>
      </View>
    );
  }

  function renderStatusInfo() {
    if (STATUS === 'resolvida') {
      return (
        <View style={styles.card}>
          <Text style={styles.label}>✅ Solicitação resolvida</Text>
          <Text style={styles.value}>
            Problema solucionado em {data}.
          </Text>
        </View>
      );
    }

    if (STATUS === 'cancelada') {
      return (
        <View style={[styles.card, styles.cancelCard]}>
          <Text style={styles.label}>❌ Motivo do cancelamento</Text>
          <Text style={styles.value}>
            Solicitação cancelada por duplicidade ou
            por não atender aos critérios técnicos.
          </Text>
        </View>
      );
    }

    return null;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.tipo}>{tipo}</Text>
        {renderStatusBadge()}
      </View>

      {/* LOCAL */}
      <View style={styles.card}>
        <Text style={styles.label}>📍 Local do problema</Text>
        <Text style={styles.value}>{endereco}</Text>
      </View>

      {/* DESCRIÇÃO */}
      <View style={styles.card}>
        <Text style={styles.label}>📝 Descrição</Text>
        <Text style={styles.value}>
          Descrição detalhada do problema relatado pelo cidadão.
          Aqui futuramente virá do backend.
        </Text>
      </View>

      {/* FOTO */}
      <View style={styles.card}>
        <Text style={styles.label}>📷 Foto do problema</Text>
        <View style={styles.photoBox}>
          <Text style={styles.photoText}>Imagem enviada</Text>
        </View>
      </View>

      {/* STATUS EXTRA */}
      {renderStatusInfo()}

      {/* HISTÓRICO */}
      <View style={styles.card}>
        <Text style={styles.label}>📊 Histórico da solicitação</Text>

        <View style={styles.timelineItem}>
          <View style={styles.dotInactive} />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>
              Solicitação registrada
            </Text>
            <Text style={styles.timelineDate}>
              {data}
            </Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View
            style={[
              styles.dot,
              STATUS !== 'atendimento' && styles.dotInactive,
            ]}
          />
          <View style={styles.timelineContent}>
            <Text style={styles.timelineTitle}>
              Em atendimento
            </Text>
          </View>
        </View>

        {STATUS !== 'atendimento' && (
          <View style={styles.timelineItem}>
            <View
              style={[
                styles.dot,
                STATUS === 'resolvida'
                  ? styles.dotResolvida
                  : styles.dotCancelada,
              ]}
            />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>
                {STATUS === 'resolvida'
                  ? 'Solicitação resolvida'
                  : 'Solicitação cancelada'}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* BOTÃO */}
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
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  badgeAtendimento: {
    backgroundColor: '#FEF3C7',
  },
  textAtendimento: {
    color: '#92400E',
  },

  badgeResolvida: {
    backgroundColor: '#DCFCE7',
  },
  textResolvida: {
    color: '#166534',
  },

  badgeCancelada: {
    backgroundColor: '#FEE2E2',
  },
  textCancelada: {
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
    height: 150,
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
    gap: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginTop: 5,
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
