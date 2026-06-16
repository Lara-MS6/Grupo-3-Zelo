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
import { ArrowLeft, MapPin, Trash2, Edit2, Plus } from 'lucide-react-native';

interface Address {
  id: string;
  label: string; // Ex: 'Casa', 'Trabalho'
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  isDefault: boolean;
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    label: 'Casa',
    street: 'Av. Castanheiras',
    number: '980',
    complement: 'Apto 402',
    neighborhood: 'Águas Claras',
    city: 'Brasília',
    state: 'DF',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Trabalho',
    street: 'SGAN 601',
    number: 'S/N',
    complement: 'Bloco H',
    neighborhood: 'Asa Norte',
    city: 'Brasília',
    state: 'DF',
    isDefault: false,
  }
];

export default function AddressesScreen(): React.JSX.Element {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  
  // Estados para controle do Formulário de Adicionar/Editar
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Estados dos inputs do formulário
  const [label, setLabel] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('DF');

  // Função para definir um endereço como principal (Default)
  const handleSetDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(item => ({
        ...item,
        isDefault: item.id === id
      }))
    );
  };

  // Função para deletar endereço
  const handleDelete = (id: string) => {
    Alert.alert('Excluir Endereço', 'Tem certeza que deseja remover este endereço?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Excluir', 
        style: 'destructive',
        onPress: () => setAddresses(prev => prev.filter(item => item.id !== id))
      }
    ]);
  };

  // Abrir formulário para criar um novo
  const openAddForm = () => {
    setEditingId(null);
    setLabel('');
    setStreet('');
    setNumber('');
    setComplement('');
    setNeighborhood('');
    setCity('');
    setState('DF');
    setIsFormOpen(true);
  };

  // Abrir formulário preenchido para editar
  const openEditForm = (address: Address) => {
    setEditingId(address.id);
    setLabel(address.label);
    setStreet(address.street);
    setNumber(address.number);
    setComplement(address.complement || '');
    setNeighborhood(address.neighborhood);
    setCity(address.city);
    setState(address.state);
    setIsFormOpen(true);
  };

  // Salvar alterações (Novo ou Editado)
  const handleSaveAddress = () => {
    if (!label || !street || !number || !neighborhood || !city) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (editingId) {
      // Editando existente
      setAddresses(prev =>
        prev.map(item =>
          item.id === editingId
            ? { ...item, label, street, number, complement, neighborhood, city, state }
            : item
        )
      );
    } else {
      // Criando novo
      const newAddress: Address = {
        id: Math.random().toString(),
        label,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        isDefault: addresses.length === 0, // se for o único, vira padrão
      };
      setAddresses(prev => [...prev, newAddress]);
    }

    setIsFormOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Padrão Zelo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => isFormOpen ? setIsFormOpen(false) : router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isFormOpen ? (editingId ? 'Editar Endereço' : 'Novo Endereço') : 'Meus Endereços'}
        </Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      {/* TELA 1: LISTAGEM DOS ENDEREÇOS SALVOS */}
      {!isFormOpen ? (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {addresses.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardMainRow}>
                    <View style={styles.iconContainer}>
                      <MapPin size={22} color="#5B21B6" />
                    </View>
                    
                    <View style={styles.infoContainer}>
                      <Text style={styles.labelTitle}>{item.label}</Text>
                      <Text style={styles.addressText}>
                        {item.street}, nº {item.number}
                      </Text>
                      {item.complement ? <Text style={styles.subText}>{item.complement}</Text> : null}
                      <Text style={styles.subText}>
                        {item.neighborhood} - {item.city}/{item.state}
                      </Text>
                    </View>

                    {/* Botões de Ação da Direita */}
                    <View style={styles.actionsColumn}>
                      <TouchableOpacity onPress={() => openEditForm(item)} style={styles.actionButton}>
                        <Edit2 size={16} color="#6B7280" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                        <Trash2 size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Seletor de endereço Principal */}
                  <View style={styles.cardDivider} />
                  <TouchableOpacity 
                    style={styles.defaultSelectorRow}
                    onPress={() => handleSetDefault(item.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.outerRadio, item.isDefault && styles.outerRadioSelected]}>
                      {item.isDefault && <View style={styles.innerRadio} />}
                    </View>
                    <Text style={[styles.defaultText, item.isDefault && styles.defaultTextActive]}>
                      {item.isDefault ? 'Endereço principal selecionado' : 'Definir como endereço principal'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Botão Inferior Fixo para Adicionar Novo */}
          <View style={styles.footerButtonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={openAddForm} activeOpacity={0.8}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Adicionar Novo Endereço</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* TELA 2: FORMULÁRIO DE CADASTRO/EDIÇÃO (Abre em cima) */
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.formContent}>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Identificação (Ex: Casa, Trabalho) *</Text>
              <TextInput style={styles.input} value={label} onChangeText={setLabel} placeholder="Identifique o local" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Rua / Logradouro *</Text>
              <TextInput style={styles.input} value={street} onChangeText={setStreet} placeholder="Nome da rua ou avenida" />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Número *</Text>
                <TextInput style={styles.input} value={number} onChangeText={setNumber} placeholder="Ex: 123" />
              </View>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Complemento</Text>
                <TextInput style={styles.input} value={complement} onChangeText={setComplement} placeholder="Apto, Bloco, etc." />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bairro *</Text>
              <TextInput style={styles.input} value={neighborhood} onChangeText={setNeighborhood} placeholder="Digite o bairro" />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 2 }]}>
                <Text style={styles.inputLabel}>Cidade *</Text>
                <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Digite a cidade" />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>UF *</Text>
                <TextInput style={styles.input} value={state} onChangeText={setState} maxLength={2} autoCapitalize="characters" placeholder="DF" />
              </View>
            </View>

            {/* Botão de Salvar o Formulário */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress} activeOpacity={0.8}>
              <Text style={styles.saveButtonText}>Salvar Endereço</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  content: { paddingHorizontal: 24, paddingTop: 24, gap: 16 },
  
  // Cards de Listagem
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E5E7EB',
    ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8 }, android: { elevation: 2 } })
  },
  cardMainRow: { flexDirection: 'row', alignItems: 'flex-start' },
  iconContainer: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center' },
  infoContainer: { flex: 1, marginLeft: 16, marginRight: 8 },
  labelTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 },
  addressText: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 2 },
  subText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  actionsColumn: { gap: 12, justifyContent: 'center' },
  actionButton: { padding: 4 },
  cardDivider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 12 },
  
  // Radio Button / Seleção padrão
  defaultSelectorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  outerRadio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center' },
  outerRadioSelected: { borderColor: '#5B21B6' },
  innerRadio: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#5B21B6' },
  defaultText: { fontSize: 13, fontWeight: '500', color: '#6B7280' },
  defaultTextActive: { color: '#5B21B6', fontWeight: '600' },

  // Botão Fixo de Adicionar Inferior
  footerButtonContainer: { paddingHorizontal: 24, paddingVertical: 16, backgroundColor: '#F9FAFB' },
  addButton: { backgroundColor: '#5B21B6', flexDirection: 'row', height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', gap: 8 },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  // Formulário
  formContent: { padding: 24, gap: 20 },
  inputGroup: { gap: 6 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#374151' },
  input: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', paddingHorizontal: 16, paddingVertical: 12, fontSize: 15, color: '#111827', fontWeight: '500' },
  rowInputs: { flexDirection: 'row', gap: 12 },
  halfInput: { flex: 1 },
  saveButton: { backgroundColor: '#5B21B6', height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' }
});