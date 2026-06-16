import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin, Heart, ChevronRight } from 'lucide-react-native';

// Lista de profissionais simulada seguindo os dados do seu app Zelo
const MOCK_FAVORITOS = [
  {
    id: '1',
    name: 'Ricardo Elétrica',
    category: 'Reparos Residenciais',
    rating: 5.0,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Brasília, DF',
  },
  {
    id: '2',
    name: 'Ana Pinturas',
    category: 'Reformas e Acabamentos',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'Cidade Ocidental, GO',
  }
];

export default function FavoritesScreen(): React.JSX.Element {
  const router = useRouter();
  const [favorites, setFavorites] = useState(MOCK_FAVORITOS);

  // Função para remover da lista visual quando clica no coração vermelho
  const handleRemoveFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho superior com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profissionais Favoritos</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Heart size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>Nenhum profissional favoritado ainda.</Text>
            </View>
          ) : (
            favorites.map((professional) => (
              <TouchableOpacity
                key={professional.id}
                style={styles.card}
                onPress={() => router.push(`/professional/${professional.id}`)}
                activeOpacity={0.8}
              >
                {/* Imagem do profissional */}
                <Image source={{ uri: professional.image }} style={styles.avatar} />

                {/* Informações centrais */}
                <View style={styles.infoContainer}>
                  <Text style={styles.name} numberOfLines={1}>
                    {professional.name}
                  </Text>
                  <Text style={styles.category} numberOfLines={1}>
                    {professional.category}
                  </Text>

                  {/* Localização */}
                  <View style={styles.metaRow}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.metaText}>{professional.location}</Text>
                  </View>

                  {/* Nota/Estrela */}
                  <View style={styles.ratingRow}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>
                      {professional.rating.toFixed(1)}
                    </Text>
                  </View>
                </View>

                {/* Ações da direita: Coração vermelho preenchido e seta */}
                <View style={styles.rightActions}>
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => handleRemoveFavorite(professional.id)}
                    activeOpacity={0.6}
                  >
                    <Heart size={22} color="#EF4444" fill="#EF4444" />
                  </TouchableOpacity>
                  <ChevronRight size={18} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            ))
          )}
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
  },
  // Estilo dos cards brancos arredondados idênticos ao resto do app
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
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
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5B21B6',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  rightActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
    paddingLeft: 8,
  },
  heartButton: {
    padding: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
});