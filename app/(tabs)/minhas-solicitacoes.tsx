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
  status: 'atendimento' | 'resolvida' | 'cancelada';
};

export default function MinhasSolicitacoes() {
  const [filtro, setFiltro] = useState<StatusFiltro>('todas');

  const solicitacoes: Solicitacao[] = [
    {
      id: 1,
      tipo: 'Iluminação pública',
      icon: '💡',
      endereco: 'Jardim Nova Era',
      data: 'Atualizado em 22/04/2024',
      status: 'atendimento',
    },
    {
      id: 2,
      tipo: 'Coleta de lixo',
      icon: '🗑️',
      endereco: 'Rua das Acácias',
      data: 'Resolvido em 21/04/2024',
      status: 'resolvida',
    },
    {
      id: 3,
      tipo: 'Buraco na via',
      icon: '🕳️',
      endereco: 'Av. das Árvores',
      data: 'Cancelado em 18/04/2024',
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
        status: item.status,
        tipo: item.tipo,
        endereco: item.endereco,
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

  function renderStatus(status: string) {
    if (status === 'atendimento') {
      return (
        <View style={[styles.status, styles.statusAtendimento]}>
          <Text style={[styles.statusText, styles.statusAtendimentoText]}>
            Em atendimento
          </Text>
        </View>
      );
    }

    if (status === 'resolvida') {
      return (
        <View style={[styles.status, styles.statusResolvida]}>
          <Text style={[styles.statusText, styles.statusResolvidaText]}>
            Resolvida
          </Text>
        </View>
      );
    }

    return (
      <View style={[styles.status, styles.statusCancelada]}>
        <Text style={[styles.statusText, styles.statusCanceladaText]}>
          Cancelada
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas solicitações</Text>
        <Text style={styles.subtitle}>
          Acompanhe o andamento das solicitações
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderFiltro('Todas', 'todas')}
        {renderFiltro('Em atendimento', 'atendimento')}
        {renderFiltro('Resolvidas', 'resolvida')}
        {renderFiltro('Canceladas', 'cancelada')}
      </ScrollView>

      {listaFiltrada.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => abrirDetalhe(item)}
        >
          <View style={styles.cardHeader}>
            <View style={styles.tipoContainer}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.tipo}>{item.tipo}</Text>
            </View>
            {renderStatus(item.status)}
          </View>

          <Text style={styles.endereco}>{item.endereco}</Text>
          <Text style={styles.data}>{item.data}</Text>
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
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    marginRight: 8,
  },
  filterButtonAtivo: {
    backgroundColor: '#4CAF50',
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
    borderRadius: 18,
    padding: 16,
    marginTop: 14,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 18,
  },
  tipo: {
    fontSize: 16,
    fontWeight: '700',
  },
  endereco: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
  },
  data: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusAtendimento: { backgroundColor: '#FEF3C7' },
  statusAtendimentoText: { color: '#92400E' },
  statusResolvida: { backgroundColor: '#DCFCE7' },
  statusResolvidaText: { color: '#166534' },
  statusCancelada: { backgroundColor: '#FEE2E2' },
  statusCanceladaText: { color: '#991B1B' },
});
