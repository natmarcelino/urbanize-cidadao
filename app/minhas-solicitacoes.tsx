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
      pathname: '/detalhe-solicitacao',
      params: {
        tipo: item.tipo,
        endereco: item.endereco,
        status: item.status,
        data: item.data,
      },
    });
  }

  function formatarData(status: StatusFiltro, data: string) {
    if (status === 'atendimento') return `Atualizado em ${data}`;
    if (status === 'resolvida') return `Resolvido em ${data}`;
    return `Cancelado em ${data}`;
  }

  function corStatus(status: StatusFiltro) {
    switch (status) {
      case 'atendimento':
        return '#F59E0B';
      case 'resolvida':
        return '#16A34A';
      case 'cancelada':
        return '#DC2626';
      default:
        return '#16A34A';
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Minhas solicitações</Text>
        <Text style={styles.subtitle}>
          Acompanhe o andamento das suas ocorrências
        </Text>
      </View>

      {/* FILTROS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {['todas','atendimento','resolvida','cancelada'].map((item) => {
          const ativo = filtro === item;
          const label =
            item === 'todas'
              ? 'Todas'
              : item === 'atendimento'
              ? 'Em atendimento'
              : item === 'resolvida'
              ? 'Resolvidas'
              : 'Canceladas';

          return (
            <TouchableOpacity
              key={item}
              style={[styles.filterChip, ativo && styles.filterChipActive]}
              onPress={() => setFiltro(item as StatusFiltro)}
            >
              <Text
                style={[
                  styles.filterText,
                  ativo && styles.filterTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* LISTA */}
      {listaFiltrada.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.92}
          onPress={() => abrirDetalhe(item)}
        >
          <View
            style={[
              styles.statusBar,
              { backgroundColor: corStatus(item.status) },
            ]}
          />

          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.tipo}>{item.tipo}</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
              <Text style={styles.data}>
                {formatarData(item.status, item.data)}
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 25,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
  },

  filtersContainer: {
    marginBottom: 15,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    marginRight: 10,
  },

  filterChipActive: {
    backgroundColor: '#16A34A',
  },

  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },

  filterTextActive: {
    color: '#FFFFFF',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    overflow: 'hidden',
  },

  statusBar: {
    width: 6,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  icon: {
    fontSize: 22,
  },

  tipo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  endereco: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 3,
  },

  data: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
  },

  chevron: {
    fontSize: 22,
    color: '#9CA3AF',
    marginLeft: 10,
  },
});
