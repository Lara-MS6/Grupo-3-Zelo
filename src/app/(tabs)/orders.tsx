import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Image
} from 'react-native';
import { 
  Home, 
  ClipboardList, 
  Search, 
  MessageSquare, 
  User,
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Loader
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

type OrderStatus = 'Em andamento' | 'Concluído' | 'Cancelado';

interface Order {
  id: string;
  professionalName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: OrderStatus;
  professionalImage: string;
  isFavorite: boolean;
}

const orders: Order[] = [
  {
    id: '2',
    professionalName: 'Carlos Santos',
    service: 'pintura',
    date: '10 de Maio',
    time: '14:00 horas',
    location: 'São Paulo, SP',
    status: 'Em andamento',
    professionalImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    isFavorite: true,
  },
  {
    id: '3',
    professionalName: 'Ana Lima',
    service: 'limpeza',
    date: '09 de Maio',
    time: '16:00 horas',
    location: 'São Paulo, SP',
    status: 'Concluído',
    professionalImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    isFavorite: false,
  },
  {
    id: '4',
    professionalName: 'Mariana Costa',
    service: 'design de interiores',
    date: '15 de Maio',
    time: '10:00 horas',
    location: 'Brasília, DF',
    status: 'Em andamento',
    professionalImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    isFavorite: true,
  },
  {
    id: '5',
    professionalName: 'João Pedro',
    service: 'reparo hidráulico',
    date: '08 de Maio',
    time: '09:00 horas',
    location: 'Taguatinga, DF',
    status: 'Concluído',
    professionalImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    isFavorite: false,
  },
  {
    id: '6',
    professionalName: 'Fernanda Oliveira',
    service: 'jardinagem',
    date: '05 de Maio',
    time: '08:00 horas',
    location: 'Cidade Ocidental, GO',
    status: 'Concluído',
    professionalImage: 'https://randomuser.me/api/portraits/women/22.jpg',
    isFavorite: true,
  },
  {
    id: '7',
    professionalName: 'Roberto Silva',
    service: 'reforma',
    date: '12 de Maio',
    time: '13:00 horas',
    location: 'São Paulo, SP',
    status: 'Cancelado',
    professionalImage: 'https://randomuser.me/api/portraits/men/12.jpg',
    isFavorite: false,
  },
  {
    id: '8',
    professionalName: 'Patrícia Mendes',
    service: 'limpeza',
    date: '18 de Maio',
    time: '15:00 horas',
    location: 'Brasília, DF',
    status: 'Em andamento',
    professionalImage: 'https://randomuser.me/api/portraits/women/55.jpg',
    isFavorite: false,
  },
  {
    id: '9',
    professionalName: 'Lucas Andrade',
    service: 'eletricista',
    date: '03 de Maio',
    time: '11:00 horas',
    location: 'São Paulo, SP',
    status: 'Concluído',
    professionalImage: 'https://randomuser.me/api/portraits/men/88.jpg',
    isFavorite: false,
  },
  {
    id: '10',
    professionalName: 'Camila Rocha',
    service: 'pintura',
    date: '20 de Maio',
    time: '08:30 horas',
    location: 'Taguatinga, DF',
    status: 'Cancelado',
    professionalImage: 'https://randomuser.me/api/portraits/women/33.jpg',
    isFavorite: true,
  },
];

const statusConfig = {
  'Em andamento': {
    color: '#10B981',
    icon: Loader,
    bgColor: '#ECFDF5',
    textColor: '#059669',
  },
  'Concluído': {
    color: '#6B7280',
    icon: CheckCircle2,
    bgColor: '#F3F4F6',
    textColor: '#4B5563',
  },
  'Cancelado': {
    color: '#EF4444',
    icon: XCircle,
    bgColor: '#FEF2F2',
    textColor: '#DC2626',
  },
};

const statusFilters: { label: OrderStatus | 'Todos'; color: string }[] = [
  { label: 'Todos', color: '#5B21B6' },
  { label: 'Em andamento', color: '#10B981' },
  { label: 'Concluído', color: '#6B7280' },
  { label: 'Cancelado', color: '#EF4444' },
];

export default function OrdersScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'Todos'>('Todos');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '2', '4', '6', '10']));

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredOrders = activeFilter === 'Todos' 
    ? orders 
    : orders.filter((o) => o.status === activeFilter);

  const getActionButton = (status: OrderStatus) => {
    switch (status) {
      case 'Em andamento':
        return (
          <TouchableOpacity style={styles.chatButton}>
            <MessageSquare size={14} color="#5B21B6" />
            <Text style={styles.chatButtonText}>Falar no chat</Text>
          </TouchableOpacity>
        );
      case 'Concluído':
        return (
          <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText}>Avaliar</Text>
          </TouchableOpacity>
        );
      case 'Cancelado':
        return (
          <TouchableOpacity style={styles.rebookButton}>
            <Text style={styles.rebookButtonText}>Reagendar</Text>
          </TouchableOpacity>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pedidos</Text>
      </View>

      {/* Filtros de Status */}
      <View style={styles.filtersContainer}>
        {statusFilters.map((filter) => (
          <TouchableOpacity
            key={filter.label}
            style={[
              styles.filterChip,
              activeFilter === filter.label && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter(filter.label)}
          >
            <View
              style={[
                styles.filterDot,
                { backgroundColor: filter.color },
                activeFilter === filter.label && styles.filterDotActive,
              ]}
            />
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.label && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Pedidos */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.map((order) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          const isFav = favorites.has(order.id);

          return (
            <View key={order.id} style={styles.orderCard}>
              {/* Linha superior: Avatar + Nome + Coração */}
              <View style={styles.cardTop}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: order.professionalImage }}
                    style={styles.avatar}
                  />
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.professionalName}>
                    {order.professionalName}
                  </Text>
                  <View style={styles.serviceRow}>
                    <View
                      style={[
                        styles.serviceDot,
                        { backgroundColor: config.color },
                      ]}
                    />
                    <Text style={styles.serviceText}>{order.service}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => toggleFavorite(order.id)}
                  style={styles.heartButton}
                >
                  <Heart
                    size={20}
                    color={isFav ? '#EF4444' : '#D1D5DB'}
                    fill={isFav ? '#EF4444' : 'transparent'}
                  />
                </TouchableOpacity>
              </View>

              {/* Divisor */}
              <View style={styles.divider} />

              {/* Informações do pedido */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.infoText}>
                    {order.date} - {order.time}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.infoText}>{order.location}</Text>
                </View>
              </View>

              {/* Rodapé do card: Status + Ação */}
              <View style={styles.cardFooter}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: config.bgColor },
                  ]}
                >
                  <StatusIcon size={14} color={config.textColor} />
                  <Text
                    style={[
                      styles.statusText,
                      { color: config.textColor },
                    ]}
                  >
                    {order.status}
                  </Text>
                </View>
                {getActionButton(order.status)}
              </View>
            </View>
          );
        })}

        {/* Espaço no final */}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Bottom Navigation */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  // Filtros
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterChipActive: {
    backgroundColor: '#F3E8FF',
    borderColor: '#5B21B6',
  },
  filterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  filterDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  filterText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#5B21B6',
    fontWeight: '600',
  },
  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 16,
  },
  // Cards
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  nameContainer: {
    flex: 1,
    marginLeft: 14,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  serviceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  serviceText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  heartButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 14,
  },
  infoRow: {
    marginBottom: 6,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  // Botões de ação
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    gap: 6,
  },
  chatButtonText: {
    color: '#5B21B6',
    fontWeight: '600',
    fontSize: 13,
  },
  rateButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#5B21B6',
  },
  rateButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  rebookButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  rebookButtonText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 13,
  },
  bottomSpace: {
    height: 100,
  },
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 20,
  },
  navItem: {
    padding: 8,
    alignItems: 'center',
  },
});