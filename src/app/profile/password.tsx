import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lock } from 'lucide-react-native';

export default function ChangePasswordScreen(): React.JSX.Element {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
      return;
    }
    
    Alert.alert('Sucesso', 'Sua senha foi alterada com segurança!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alterar Senha</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.infoBox}>
            <Lock size={20} color="#5B21B6" />
            <Text style={styles.infoText}>
              Para garantir a segurança da sua conta Zelo, escolha uma combinação forte contendo letras e números.
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha Atual</Text>
            <TextInput 
              style={styles.input} 
              value={currentPassword} 
              onChangeText={setCurrentPassword} 
              placeholder="Digite a senha atual" 
              secureTextEntry 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nova Senha</Text>
            <TextInput 
              style={styles.input} 
              value={newPassword} 
              onChangeText={setNewPassword} 
              placeholder="Digite a nova senha" 
              secureTextEntry 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar Nova Senha</Text>
            <TextInput 
              style={styles.input} 
              value={confirmPassword} 
              onChangeText={setConfirmPassword} 
              placeholder="Confirme a nova senha" 
              secureTextEntry 
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePassword} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Atualizar Senha</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF' },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  headerPlaceholder: { width: 40 },
  headerDivider: { height: 1, backgroundColor: '#E5E7EB' },
  scrollView: { flex: 1 },
  content: { padding: 24, gap: 20 },
  
  infoBox: { flexDirection: 'row', backgroundColor: '#F3E8FF', borderRadius: 12, padding: 14, gap: 12, alignItems: 'center', marginBottom: 4 },
  infoText: { flex: 1, fontSize: 13, color: '#5B21B6', fontWeight: '500', lineHeight: 18 },
  
  inputGroup: { gap: 6 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', paddingLeft: 2 },
  input: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: '#111827', fontWeight: '500' },
  
  saveButton: { backgroundColor: '#5B21B6', height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});