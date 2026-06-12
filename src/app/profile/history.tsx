import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, CheckCircle2, ChevronDown, Star } from 'lucide-react-native';

// Interface para tipagem dos serviços históricos
interface ServiceHistory {
  id: string;
  providerName: string;
  category: string;
  date: string;
  time: string;
  location: string;
  status: 'Concluído' | 'Cancelado';
  avatar: string;
  rating: number; // 0 significa ainda não avaliado
}

// Mock de dados baseado no layout solicitado
const MOCK_HISTORY: ServiceHistory[] = [
  {
    id: '1',
    providerName: 'Carlos Santos',
    category: 'Pintura',
    date: '10 de Maio',
    time: '14:00 horas',
    location: 'São Paulo',
    status: 'Concluído',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 0, // Sem avaliação inicial para mostrar as estrelas vazias do mock
  },
  {
    id: '2',
    providerName: 'Ana Lima',
    category: 'Limpeza',
    date: '05 de Maio',
    time: '10:00 horas',
    location: 'São Paulo',
    status: 'Concluído',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 4,
  },
  {
    id: '3',
    providerName: 'Ana Lima',
    category: 'Limpeza',
    date: '01 de Maio',
    time: '10:00 horas',
    location: 'São Paulo',
    status: 'Concluído',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
  }
];

export default function ServiceHistoryScreen(): React.JSX.Element {
  const router = useRouter();
  const [historyList, setHistoryList] = React.useState<ServiceHistory[]>(MOCK_HISTORY);

  // Ação para o botão Contratar Novamente
  const handleRehire = (providerName: string) => {
    Alert.alert('Contratar Novamente', `Iniciando novo pedido com ${providerName}...`);
  };

  // Ação para abrir os detalhes completos do serviço
  const handleViewDetails = (id: string) => {
    Alert.alert('Detalhes', `Abrindo detalhes do serviço #${id}`);
  };

  // Simular a mudança de nota ao clicar em uma estrela
  const handleRate = (id: string, score: number) => {
    setHistoryList(prev => prev.map(item => item.id === id ? { ...item, rating: score } : item));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho superior padrão Zelo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Serviços</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Histórico de Serviços</Text>

          {historyList.map((service) => (
            <View key={service.id} style={styles.card}>
              
              {/* Topo do Card: Foto, Info do Prestador e Ícone de Expansão */}
              <View style={styles.cardHeaderRow}>
                <Image source={{ uri: service.avatar }} style={styles.avatar} />
                
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{service.providerName}</Text>
                  <View style={styles.categoryRow}>
                    <View style={styles.statusDot} />
                    <Text style={styles.categoryText}>{service.category}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.expandButton}>
                  <ChevronDown size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <View style={styles.cardDivider} />

              {/* Meio do Card: Data, Hora e Localização */}
              <View style={styles.metaContainer}>
                <View style={styles.metaRow}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{service.date} - {service.time}</Text>
                </View>
                <View style={styles.metaRow}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{service.location}</Text>
                </View>
              </View>

              {/* Linha de Status e Ver Detalhes */}
              <View style={styles.actionsRow}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{service.status}</Text>
                  <CheckCircle2 size={14} color="#5B21B6" />
                </View>

                <TouchableOpacity 
                  onPress={() => handleViewDetails(service.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.detailsLink}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>

              {/* Rodapé do Card: Avaliação por Estrelas e Contratar Novamente */}
              <TouchableOpacity 
                style={styles.rehireButton}
                onPress={() => handleRehire(service.providerName)}
                activeOpacity={0.8}
              >
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity 
                      key={star} 
                      onPress={() => handleRate(service.id, star)}
                      disabled={service.rating > 0} // Trava após avaliar de primeira
                    >
                      <Star 
                        size={16} 
                        color={star <= service.rating ? "#F59E0B" : "#9CA3AF"} 
                        fill={star <= service.rating ? "#F59E0B" : "transparent"} 
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.rehireButtonText}>Contratar Novamente</Text>
              </TouchableOpacity>

            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerPlaceholder: {
    width: 40,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  // Estrutura dos cards baseada no modelo enviado
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E7EB',
  },
  providerInfo: {
    flex: 1,
    marginLeft: 14,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981', // Círculo verde do status
  },
  categoryText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  expandButton: {
    padding: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  metaContainer: {
    gap: 6,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5B21B6',
  },
  detailsLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    textDecorationLine: 'underline',
  },
  // Botão inferior mesclado com estrelas idêntico ao print
  rehireButton: {
    backgroundColor: '#E5E7EB', // Fundo cinza suave padrão
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  rehireButtonText: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '700',
  },
});