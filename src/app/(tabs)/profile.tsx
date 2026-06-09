import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  LogOut, 
  User, 
  Mail, 
  Phone, 
  ChevronRight,
  CreditCard,
  Heart,
  MapPin,
  Clock,
  Settings,
  HelpCircle,
  Crown
} from 'lucide-react-native';

// Mock de dados do usuário
const MOCK_USER = {
  id: '1',
  name: 'Brenda Melo',
  email: 'brenda.melo.silva15@gmail.com',
  phone: '(61) 99661-9692',
  location: 'Brasília, DF',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  isPrime: false,
  totalOrders: 12,
  rating: 4.8,
  coupons: 3,
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular fetch de dados
    const timer = setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // CORRIGIDO: Rotas mapeadas para as telas corretas fora de (tabs)
  const menuItems = [
    { id: 'data', icon: User, text: 'Meus Dados', route: '/profile/edit' },
    { id: 'payment', icon: CreditCard, text: 'Formas de Pagamento', route: '/payment' },
    { id: 'favorites', icon: Heart, text: 'Profissionais Favoritos', route: '/profile/favorites' }, // ← Aponta para a nova pasta na raiz
    { id: 'addresses', icon: MapPin, text: 'Meus Endereços', route: '/profile/addresses' },
    { id: 'history', icon: Clock, text: 'Histórico de Serviços', route: '/profile/history' },
    { id: 'settings', icon: Settings, text: 'Configurações', route: '/profile/settings' },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5B21B6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header/Perfil */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            {user?.isPrime && (
              <View style={styles.primeBadge}>
                <Crown size={12} color="#FFFFFF" fill="#FFFFFF" />
              </View>
            )}
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userLocation}>{user?.location}</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user?.totalOrders}</Text>
            <Text style={styles.statLabel}>Serviços</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user?.rating}</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user?.coupons}</Text>
            <Text style={styles.statLabel}>Cupons</Text>
          </View>
        </View>

        {/* Informações de Contato */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações de Contato</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Mail size={18} color="#6B7280" />
              <Text style={styles.infoText}>{user?.email}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Phone size={18} color="#6B7280" />
              <Text style={styles.infoText}>{user?.phone}</Text>
            </View>
          </View>
        </View>

        {/* Menu de Opções */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <View key={item.id}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => {
                      if (item.route) {
                        router.push(item.route);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuIconContainer}>
                        <IconComponent size={20} color="#5B21B6" />
                      </View>
                      <Text style={styles.menuItemText}>{item.text}</Text>
                    </View>
                    <ChevronRight size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                  {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
                </View>
              );
            })}
          </View>
        </View>

        {/* Botões de Ação Inferiores */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.helpButton} activeOpacity={0.7}>
            <HelpCircle size={20} color="#374151" />
            <Text style={styles.helpButtonText}>Ajuda & Suporte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#F3E8FF',
  },
  primeBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#5B21B6',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: -20,
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    height: '100%',
  },
  infoSection: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  helpButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  helpButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: 8,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
});