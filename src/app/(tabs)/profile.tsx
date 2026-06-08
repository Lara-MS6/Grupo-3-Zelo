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

// Mock de dados do usuário (substitua pela sua lógica real de auth)
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
    // Simula carregamento dos dados do usuário
    // Substitua por: const session = await getSession();
    setTimeout(() => {
      setUser(MOCK_USER);
      setLoading(false);
    }, 500);
  }, []);

  const handleLogout = async () => {
    // Substitua por: await logout();
    router.replace('/(auth)/login');
  };

  const menuItems = [
    { 
      icon: CreditCard, 
      label: 'Métodos de Pagamento', 
      onPress: () => router.push('/payment')  // ← CORRIGIDO: navega para tela de pagamento
    },
    { 
      icon: Heart, 
      label: 'Profissionais Favoritos', 
      onPress: () => {} 
    },
    { 
      icon: MapPin, 
      label: 'Endereços Salvos', 
      onPress: () => {} 
    },
    { 
      icon: Clock, 
      label: 'Histórico de Serviços', 
      onPress: () => router.push('/(tabs)/orders') 
    },
    { 
      icon: Settings, 
      label: 'Configurações', 
      onPress: () => {} 
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#5B21B6" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Card do Usuário */}
        <View style={styles.userCard}>
          <View style={styles.userHeader}>
            <Image 
              source={{ uri: user?.avatar }} 
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
              <Text style={styles.userLocation}>{user?.location || 'Localização não informada'}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total de pedidos</Text>
              <Text style={styles.statValue}>({user?.totalOrders || 0})</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Avaliação</Text>
              <Text style={styles.statValue}>({user?.rating?.toFixed(1) || '0.0'})</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Cupons</Text>
              <Text style={styles.statValue}>({user?.coupons || 0})</Text>
            </View>
          </View>
        </View>

        {/* Menu Principal */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <item.icon size={20} color="#5B21B6" />
                </View>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Botões inferiores */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.helpButton}>
            <HelpCircle size={18} color="#5B21B6" />
            <Text style={styles.helpButtonText}>Ajuda</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut size={18} color="#EF4444" />
            <Text style={styles.logoutButtonText}>Sair</Text>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
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
  // User Card
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3E8FF',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
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
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  // Menu
  menuSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  // Bottom Buttons
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 16,
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
    color: '#5B21B6',
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
    borderColor: '#FECACA',
    gap: 8,
  },
  logoutButtonText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomSpace: {
    height: 32,
  },
});