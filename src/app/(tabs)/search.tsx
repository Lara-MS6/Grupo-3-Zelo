import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  SafeAreaView, 
  StyleSheet, 
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { 
  Search as SearchIcon,
  Star,
  MapPin,
  SlidersHorizontal
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface Professional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  location: string;
  availableToday: boolean;
  availableSlots: string[];
}

const professionals: Professional[] = [
  {
    id: '1',
    name: 'Carlos Santos',
    specialty: 'Pintor',
    rating: 5.0,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'SP',
    availableToday: true,
    availableSlots: ['10:40', '12:40', '15:40'],
  },
  {
    id: '2',
    name: 'Carlos Santos',
    specialty: 'Pintor',
    rating: 5.0,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'SP',
    availableToday: true,
    availableSlots: ['10:40', '12:40', '15:40'],
  },
  {
    id: '3',
    name: 'Carlos Santos',
    specialty: 'Pintor',
    rating: 5.0,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'SP',
    availableToday: true,
    availableSlots: ['10:40', '12:40', '15:40'],
  },
  {
    id: '4',
    name: 'Ana Lima',
    specialty: 'Encanadora',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'SP',
    availableToday: true,
    availableSlots: ['09:00', '11:30', '14:00'],
  },
  {
    id: '5',
    name: 'Mariana Costa',
    specialty: 'Pintora',
    rating: 4.9,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    location: 'DF',
    availableToday: false,
    availableSlots: ['08:00', '10:00'],
  },
  {
    id: '6',
    name: 'João Pedro',
    specialty: 'Encanador',
    rating: 4.7,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    location: 'DF',
    availableToday: true,
    availableSlots: ['09:30', '13:00'],
  },
];

const specialties = ['Todos', 'Pintores', 'Encanadores', 'Eletricistas', 'Jardineiros', 'Limpeza'];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <View style={styles.starContainer}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={12} color="#EAB308" fill="#EAB308" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={12} color="#D1D5DB" />
      ))}
    </View>
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpecialty, setActiveSpecialty] = useState('Todos');

  const filteredProfessionals = professionals.filter((p) => {
    const matchSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpecialty = 
      activeSpecialty === 'Todos' || 
      p.specialty.toLowerCase().includes(activeSpecialty.toLowerCase().slice(0, -1));
    return matchSearch && matchSpecialty;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pesquisar por especialidade</Text>
      </View>

      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color="#6B7280" />
          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color="#5B21B6" />
        </TouchableOpacity>
      </View>

 

      {/* Lista de Profissionais */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredProfessionals.map((prof) => (
          <TouchableOpacity
            key={prof.id}
            style={styles.professionalCard}
            onPress={() => router.push(`/professional/${prof.id}`)}
            activeOpacity={0.8}
          >
            {/* Lado esquerdo - Foto */}
            <View style={styles.photoSection}>
              <View style={styles.photoContainer}>
                <Image source={{ uri: prof.image }} style={styles.photo} />
              </View>
              <Text style={styles.photoLabel}>Foto</Text>
            </View>

            {/* Lado direito - Informações */}
            <View style={styles.infoSection}>
              <Text style={styles.professionalName}>{prof.name}</Text>

              <View style={styles.ratingRow}>
                <Text style={styles.specialtyLabel}>{prof.specialty}</Text>
                <Text style={styles.separator}>|</Text>
                <StarRating rating={prof.rating} />
                <Text style={styles.ratingNumber}>{prof.rating.toFixed(1)}</Text>
              </View>

              {prof.availableToday && (
                <>
                  <Text style={styles.availabilityText}>
                    Horário disponível: Hoje
                  </Text>
                  <View style={styles.slotsContainer}>
                    {prof.availableSlots.map((slot, index) => (
                      <View key={index} style={styles.slotChip}>
                        <Text style={styles.slotText}>{slot}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              {!prof.availableToday && (
                <Text style={styles.noAvailabilityText}>
                  Disponível amanhã
                </Text>
              )}

              <View style={styles.locationRow}>
                <MapPin size={12} color="#6B7280" />
                <Text style={styles.locationText}>{prof.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

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
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
    gap: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  filterButton: {
    width: 42,
    height: 42,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialtiesScroll: {
    marginBottom: 16,
  },
  specialtiesContent: {
    paddingHorizontal: 24,
    gap: 8,
  },
  specialtyChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
  specialtyChipActive: {
    backgroundColor: '#5B21B6',
  },
  specialtyChipText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  specialtyChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  professionalCard: {
    flexDirection: 'row',
    backgroundColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C4C4C4',
  },
  photoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    width: 60,
  },
  photoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#9CA3AF',
    overflow: 'hidden',
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  photoLabel: {
    marginTop: 4,
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
  },
  professionalName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  specialtyLabel: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  separator: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  ratingNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 2,
  },
  availabilityText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
    marginBottom: 6,
  },
  slotsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  slotChip: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  slotText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
  },
  noAvailabilityText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
  },
  bottomSpace: {
    height: 24,
  },
});