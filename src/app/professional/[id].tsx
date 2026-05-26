import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, MapPin, BadgeCheck, Phone, MessageCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profissionaisDb = [
  {
    id: '1',
    name: 'Ricardo Elétrica',
    category: 'Reparos Residenciais',
    rating: 5.0,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    about: 'Especialista em fiação elétrica, instalação de painéis e manutenção residencial. Trabalho focado na segurança e agilidade para sua casa.',
    location: 'Brasília, DF',
    jobs: 142
  },
  {
    id: '2',
    name: 'Ana Pinturas',
    category: 'Reformas e Acabamentos',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    about: 'Pintora profissional com foco em acabamentos finos, texturas e pinturas externas. Transformo o seu ambiente com capricho e limpeza.',
    location: 'Cidade Ocidental, GO',
    jobs: 89
  }
];

export default function ProfessionalProfile() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const professional = profissionaisDb.find(p => p.id === id);

  if (!professional) {
    return (
      <View style={styles.notFound}>
        <Text>Profissional não encontrado.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Image
            source={{ uri: professional.image }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{professional.name}</Text>
            <View style={styles.verifiedContainer}>
              <BadgeCheck size={16} color="#FFFFFF" />
              <Text style={styles.verifiedText}>Perfil Verificado</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Avaliação</Text>
            <View style={styles.statValue}>
              <Star size={16} color="#EAB308" fill="#EAB308" />
              <Text style={styles.statText}>{professional.rating.toFixed(1)}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Serviços</Text>
            <Text style={styles.statText}>{professional.jobs}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Região</Text>
            <View style={styles.statValue}>
              <MapPin size={16} color="#5B21B6" />
              <Text style={styles.locationText}>{professional.location}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Sobre</Text>
        <Text style={styles.aboutText}>{professional.about}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.messageButton}>
          <MessageCircle size={20} color="#FFFFFF" />
          <Text style={styles.messageButtonText}>Mensagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.phoneButton}>
          <Phone size={20} color="#5B21B6" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#5B21B6',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  headerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#111827',
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    color: '#111827',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  aboutText: {
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 32,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageButton: {
    backgroundColor: '#5B21B6',
    flex: 1,
    marginRight: 8,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
  phoneButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});