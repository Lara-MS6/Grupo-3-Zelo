import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Search, Star, MapPin, Crown, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { getSession } from '../../lib/auth';

const profissionais = [
  {
    id: '1',
    name: 'Ricardo Elétrica',
    category: 'Reparos Residenciais',
    rating: 5.0,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Brasília, DF',
    jobs: 142,
    isPrime: true
  },
  {
    id: '2',
    name: 'Ana Pinturas',
    category: 'Reformas e Acabamentos',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'Cidade Ocidental, GO',
    jobs: 89,
    isPrime: false
  },
  {
    id: '3',
    name: 'Carlos Hidráulica',
    category: 'Reparos Residenciais',
    rating: 4.9,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    location: 'Taguatinga, DF',
    jobs: 203,
    isPrime: true
  },
  {
    id: '4',
    name: 'Mariana Design',
    category: 'Design de Interiores',
    rating: 4.7,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    location: 'Brasília, DF',
    jobs: 56,
    isPrime: false
  },
];

const categorias = [
  'Todos',
  'Reparos',
  'Reformas',
  'Limpeza',
  'Design',
  'Jardinagem'
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getSession().then(session => {
      if (session?.name) {
        setUserName(session.name);
      }
    });
  }, []);

  const profissionaisFiltrados = profissionais.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoriaAtiva === 'Todos' ||
      p.category.toLowerCase().includes(categoriaAtiva.toLowerCase());
    return matchSearch && matchCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com Prime */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>
                Olá, {userName || 'Visitante'}
              </Text>
              <Text style={styles.title}>Zelo</Text>
            </View>
            <TouchableOpacity
              style={styles.primeButton}
              onPress={() => router.push('/subscription')}
            >
              <Crown size={18} color="#5B21B6" />
              <Text style={styles.primeButtonText}>Prime</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barra de Busca */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Buscar serviço..."
            style={styles.searchInput}
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#5B21B6" />
          </TouchableOpacity>
        </View>

        {/* Categorias */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                categoriaAtiva === cat && styles.categoryChipActive
              ]}
              onPress={() => setCategoriaAtiva(cat)}
            >
              <Text style={[
                styles.categoryText,
                categoriaAtiva === cat && styles.categoryTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Seção Disponibilidade Imediata */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Disponibilidade Imediata</Text>
          <TouchableOpacity>
            <Text style={styles.verTodos}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Profissionais */}
        <View style={styles.professionalsList}>
          {profissionaisFiltrados.map((prof) => (
            <TouchableOpacity
              key={prof.id}
              style={styles.card}
              onPress={() => router.push(`/professional/${prof.id}`)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: prof.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{prof.name}</Text>
                  {prof.isPrime && (
                    <View style={styles.primeBadge}>
                      <Crown size={12} color="#FFFFFF" />
                    </View>
                  )}
                </View>
                <Text style={styles.cardCategory}>{prof.category}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#EAB308" fill="#EAB308" />
                    <Text style={styles.ratingText}>{prof.rating.toFixed(1)}</Text>
                    <Text style={styles.jobsText}>({prof.jobs})</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.locationText}>{prof.location}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seção Profissionais Prime */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Profissionais Prime</Text>
          <TouchableOpacity onPress={() => router.push('/subscription')}>
            <Text style={styles.verTodos}>Assinar Prime</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.primeBanner}>
          <Crown size={32} color="#5B21B6" />
          <View style={styles.primeBannerContent}>
            <Text style={styles.primeBannerTitle}>Tenha prioridade total</Text>
            <Text style={styles.primeBannerText}>
              Acesso imediato aos melhores profissionais da sua região
            </Text>
          </View>
          <TouchableOpacity
            style={styles.primeBannerButton}
            onPress={() => router.push('/subscription')}
          >
            <Text style={styles.primeBannerButtonText}>Saiba mais</Text>
          </TouchableOpacity>
        </View>

        {/* Espaço no final */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    color: '#6B7280',
    fontSize: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#5B21B6',
    marginTop: 4,
  },
  primeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    boxShadow: '0px 2px 8px rgba(91, 33, 182, 0.15)',
  },
  primeButtonText: {
    color: '#5B21B6',
    fontWeight: '700',
    fontSize: 14,
  },
  // Busca
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    padding: 4,
  },
  // Categorias
  categoriesScroll: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipActive: {
    backgroundColor: '#5B21B6',
    borderColor: '#5B21B6',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Seções
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  verTodos: {
    color: '#5B21B6',
    fontWeight: '600',
    fontSize: 14,
  },
  // Cards
  professionalsList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)',
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  cardContent: {
    marginLeft: 16,
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  primeBadge: {
    backgroundColor: '#5B21B6',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 14,
  },
  jobsText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: '#6B7280',
    fontSize: 12,
  },
  // Banner Prime
  primeBanner: {
    backgroundColor: '#F3E8FF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    alignItems: 'center',
  },
  primeBannerContent: {
    alignItems: 'center',
    marginVertical: 12,
  },
  primeBannerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5B21B6',
    marginBottom: 4,
  },
  primeBannerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  primeBannerButton: {
    backgroundColor: '#5B21B6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  primeBannerButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  bottomSpace: {
    height: 32,
  },
});