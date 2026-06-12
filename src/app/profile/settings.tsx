import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  MapPin, 
  Diamond, 
  ChevronRight, 
  UserX 
} from 'lucide-react-native';

export default function SettingsScreen(): React.JSX.Element {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta', 
      'Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita.', 
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => Alert.alert('Conta excluída.') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>configurações</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* GRUPO: CONTA */}
          <View style={styles.groupHeader}>
            <User size={18} color="#4B5563" />
            <Text style={styles.groupTitle}>Conta</Text>
          </View>

          <TouchableOpacity style={styles.rowItem} onPress={() => router.push('/profile/edit')} activeOpacity={0.7}>
            <User size={18} color="#4B5563" style={styles.rowIcon} />
            <Text style={styles.rowText}>Perfil</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowItem} onPress={() => router.push('/profile/password')} activeOpacity={0.7}>
            <Lock size={18} color="#4B5563" style={styles.rowIcon} />
            <Text style={styles.rowText}>Alterar Senha</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Ajustado conforme pedido: "Ativar notificações" e o Switch de controle */}
          <View style={styles.rowItemTextOnly}>
            <View style={styles.rowLeftGroup}>
              <Bell size={18} color="#4B5563" style={styles.rowIcon} />
              <Text style={styles.rowText}>Ativar notificações</Text>
            </View>
            <Switch
              trackColor={{ false: '#D1D5DB', true: '#DDD6FE' }}
              thumbColor={notificationsEnabled ? '#5B21B6' : '#F3F4F6'}
              ios_backgroundColor="#D1D5DB"
              onValueChange={(val) => setNotificationsEnabled(val)}
              value={notificationsEnabled}
            />
          </View>

          <TouchableOpacity style={styles.rowItem} onPress={handleDeleteAccount} activeOpacity={0.7}>
            <UserX size={18} color="#EF4444" style={styles.rowIcon} />
            <Text style={[styles.rowText, { color: '#EF4444' }]}>Excluir Conta</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>


          {/* GRUPO: PAGAMENTOS */}
          <View style={styles.groupHeader}>
            <CreditCard size={18} color="#4B5563" />
            <Text style={styles.groupTitle}>pagamentos</Text>
          </View>

          {/* Linkado diretamente para a rota /payment da sua tela criada */}
          <TouchableOpacity style={styles.rowItem} onPress={() => router.push('/payment')} activeOpacity={0.7}>
            <CreditCard size={18} color="#4B5563" style={styles.rowIcon} />
            <Text style={styles.rowText}>Métodos de pagamento</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>


          {/* GRUPO: ENDEREÇOS */}
          <View style={styles.groupHeader}>
            <MapPin size={18} color="#4B5563" />
            <Text style={styles.groupTitle}>Endereços</Text>
          </View>

          <TouchableOpacity style={styles.rowItem} onPress={() => router.push('/profile/addresses')} activeOpacity={0.7}>
            <MapPin size={18} color="#4B5563" style={styles.rowIcon} />
            <Text style={styles.rowText}>Gerenciar</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>


          {/* GRUPO: ZELO PRIME */}
          <View style={styles.groupHeader}>
            <Diamond size={18} color="#4B5563" />
            <Text style={styles.groupTitle}>Zelo Prime</Text>
          </View>

          <TouchableOpacity style={styles.rowItem} onPress={() => router.push('/prime')} activeOpacity={0.7}>
            <Diamond size={18} color="#4B5563" style={styles.rowIcon} />
            <Text style={styles.rowText}>Gerenciar assinatura</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  headerPlaceholder: { width: 40 },
  headerDivider: { height: 1, backgroundColor: '#E5E7EB' },
  scrollView: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 16 },
  
  groupHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 16, paddingBottom: 12, paddingHorizontal: 4 },
  groupTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  
  rowItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  rowItemTextOnly: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: '#F3F4F6' },
  rowLeftGroup: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  rowIcon: { marginRight: 12 },
  rowText: { flex: 1, fontSize: 15, fontWeight: '500', color: '#374151' }
});