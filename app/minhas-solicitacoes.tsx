import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

type StatusFiltro = 'todas' | 'atendimento' | 'resolvida' | 'cancelada';

type Solicitacao = {
  id: number;
  tipo: string;
  icon: string;
  endereco: string;
  data: string;
  status: StatusFiltro;
};

export default function MinhasSolicitacoes() {
  const [filtro, setFiltro] = useState<StatusFiltro>('todas');

  const solicitacoes: Solicitacao[] = [
    {
      id: 1,
      tipo: 'Iluminação pública',
      icon: '💡',
      endereco: 'Jardim Nova Era',
      data: '22/04/2024',
      status: 'atendimento',
    },
    {
      id: 2,
      tipo: 'Coleta de lixo',
      icon: '🗑️',
      endereco: 'Rua das Acácias',
      data: '21/04/2024',
      status: 'resolvida',
    },
    {
      id: 3,
      tipo: 'Buraco na via',
      icon: '🕳️',
      endereco: 'Av. das Árvores',
      data: '18/04/2024',
      status: 'cancelada',
    },
  ];

  const listaFiltrada =
    filtro === 'todas'
      ? solicitacoes
      : solicitacoes.filter(item => item.status === filtro);

  function abrirDetalhe(item: Solicitacao) {
    router.push({
      pathname: '/(tabs)/detalhe-solicitacao',
      params: {
        tipo: item.tipo,
        endereco: item.endereco,
        status: item.status,
        data: item.data,
      },
    });
  }

  function renderFiltro(label: string, value: StatusFiltro) {
    const ativo = filtro === value;

    return (
      <TouchableOpacity
        style={[styles.filterButton, ativo && styles.filterButtonAtivo]}
        onPress={() => setFiltro(value)}
      >
        <Text style={[styles.filterText, ativo && styles.filterTextAtivo]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderStatusBadge(status: StatusFiltro) {
    if (status === 'atendimento') {
      return (
        <View style={[styles.badge, styles.badgeAtendimento]}>
          <Text style={[styles.badgeText, styles.textAtendimento]}>
            Em atendimento
          </Text>
        </View>
      );
    }

    if (status === 'resolvida') {
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

  function renderData(status: StatusFiltro, data: string) {
    if (status === 'atendimento') return `Atualizado em ${data}`;
    if (status === 'resolvida') return `Resolvido em ${data}`;
    return `Cancelado em ${data}`;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Minhas solicitações</Text>
        <Text style={styles.subtitle}>
          Acompanhe o andamento das solicitações
        </Text>
      </View>

      {/* FILTROS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderFiltro('Todas', 'todas')}
        {renderFiltro('Em atendimento', 'atendimento')}
        {renderFiltro('Resolvidas', 'resolvida')}
        {renderFiltro('Canceladas', 'cancelada')}
      </ScrollView>

      {/* LISTA */}
      {listaFiltrada.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => abrirDetalhe(item)}
        >
          <View style={styles.cardTop}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.tipo}>{item.tipo}</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
            </View>

            {renderStatusBadge(item.status)}
          </View>

          <Text style={styles.data}>
            {renderData(item.status, item.data)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 20,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    marginRight: 8,
  },

  filterButtonAtivo: {
    backgroundColor: '#16A34A',
  },

  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },

  filterTextAtivo: {
    color: '#FFFFFF',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginTop: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  icon: {
    fontSize: 18,
  },

  tipo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  endereco: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  data: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 10,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 11,
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
});
