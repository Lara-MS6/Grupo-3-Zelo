import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';

export default function EditProfileScreen(): React.JSX.Element {
  const router = useRouter();
  
  // Estados mockados dos inputs baseados na imagem de exemplo
  const [nome, setNome] = useState('Ricardo Silva');
  const [email, setEmail] = useState('ricardo.zelo@gmail.com');
  const [telefone, setTelefone] = useState('(61) 99999-8888');
  const [titulo, setTitulo] = useState('Eletricista Residencial');
  const [bio, setBio] = useState('Especialista em manutenções elétricas e reformas de baixa tensão.');

  const handleSave = () => {
    Alert.alert('Sucesso', 'Alterações salvas com sucesso!', [
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
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Seletor de Foto do Layout */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.avatarCircle} activeOpacity={0.8}>
              <Text style={styles.avatarText}>Alterar Foto</Text>
            </TouchableOpacity>
          </View>

          {/* Form Inputs baseados no seu modelo */}
          <View style={styles.inputGroup}>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome Completo" />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="E-mail" keyboardType="email-address" />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} placeholder="Telefone" keyboardType="phone-pad" />
          </View>

          <View style={styles.inputGroup}>
            <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Título Principal" />
          </View>

          <View style={styles.inputGroup}>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              value={bio} 
              onChangeText={setBio} 
              placeholder="Bio/Descrição" 
              multiline 
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Badge Documentos Verificados */}
          <View style={styles.verifiedRow}>
            <CheckCircle2 size={18} color="#5B21B6" />
            <Text style={styles.verifiedText}>Documentos Verificados</Text>
          </View>

          {/* Botões de Ação */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
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
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827', flex: 1, textAlign: 'center' },
  headerPlaceholder: { width: 40 },
  headerDivider: { height: 1, backgroundColor: '#E5E7EB' },
  scrollView: { flex: 1 },
  content: { padding: 24, gap: 16 },
  
  avatarContainer: { alignItems: 'center', marginVertical: 8 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#DDD6FE', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#C4B5FD' },
  avatarText: { fontSize: 13, fontWeight: '600', color: '#5B21B6', textAlign: 'center' },

  input: { backgroundColor: '#DDD6FE', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#111827', fontWeight: '500' },
  textArea: { height: 100, paddingTop: 12 },
  inputGroup: { width: '100%' },

  verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, paddingLeft: 4 },
  verifiedText: { fontSize: 14, color: '#374151', fontWeight: '500' },

  saveButton: { backgroundColor: '#5B21B6', height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  cancelButton: { height: 44, justifyContent: 'center', alignItems: 'center' },
  cancelButtonText: { color: '#6B7280', fontSize: 14, fontWeight: '600' }
});