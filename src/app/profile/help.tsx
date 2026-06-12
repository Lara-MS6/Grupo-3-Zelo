import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  Phone, 
  ChevronRight, 
  ChevronDown 
} from 'lucide-react-native';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function HelpScreen(): React.JSX.Element {
  const router = useRouter();
  
  // Estado para controlar qual pergunta do FAQ está expandida
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'Como contratar um serviço?',
      answer: 'Navegue até a aba inicial de busca, escolha a categoria desejada (como Limpeza ou Pintura), selecione o profissional ideal baseado nas avaliações e clique em "Contratar".'
    },
    {
      id: '2',
      question: 'Como cancelar um pedido?',
      answer: 'Vá até a aba "Pedidos" no menu inferior, selecione o agendamento ativo que deseja interromper e clique em "Cancelar Pedido". Atente-se às políticas de reembolso do Zelo.'
    },
    {
      id: '3',
      question: 'Como funciona o Zelo Prime?',
      answer: 'O Zelo Prime é a nossa assinatura mensal de R$ 19,90 que concede prioridade máxima nos agendamentos de última hora, prestadores premium verificados e taxa de serviço zero em qualquer chamado.'
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleLiveChat = () => {
    Alert.alert('Zelo Chat', 'Conectando você ao chat online com nossa equipe de suporte...');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:suportezelo@gmail.com').catch(() => {
      Alert.alert('Suporte E-mail', 'Envie sua mensagem para: suportezelo@gmail.com');
    });
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:61999999999').catch(() => {
      Alert.alert('Suporte Telefone', 'Ligue para: (61) 99999-9999');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajuda</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* GRUPO 1: PERGUNTAS FREQUENTES */}
          <View style={styles.groupHeader}>
            <HelpCircle size={18} color="#4B5563" />
            <Text style={styles.groupTitle}>Perguntas frequentes</Text>
          </View>

          {faqData.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <View key={item.id} style={styles.faqWrapper}>
                <TouchableOpacity 
                  style={styles.rowItem} 
                  onPress={() => toggleExpand(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.rowText}>{item.question}</Text>
                  {isExpanded ? (
                    <ChevronDown size={18} color="#9CA3AF" />
                  ) : (
                    <ChevronRight size={18} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
                {isExpanded && (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            );
          })}


          {/* GRUPO 2: FALAR COM SUPORTE */}
          <View style={styles.groupHeader}>
            <MessageSquare size={18} color="#4B5563" />
            <Text style={styles.groupTitle}>Falar com Suporte</Text>
          </View>

          <TouchableOpacity style={styles.rowItem} onPress={handleLiveChat} activeOpacity={0.7}>
            <Text style={styles.rowText}>Chat com atendimento</Text>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>


          {/* GRUPO 3: CONTATOS DIRETOS */}
          <View style={styles.groupHeader}>
            <Mail size={18} color="#4B5563" />
            <Text style={styles.groupTitle}>E-mail</Text>
          </View>
          <TouchableOpacity style={styles.contactContainer} onPress={handleEmailPress} activeOpacity={0.6}>
            <Text style={styles.contactLinkText}>suportezelo@gmail.com</Text>
          </TouchableOpacity>

          <View style={styles.groupHeaderSpacer} />

          <View style={styles.groupHeader}>
            <Phone size={18} color="#4B5563" />
            <Text style={styles.groupTitle}>Telefone</Text>
          </View>
          <TouchableOpacity style={styles.contactContainer} onPress={handlePhonePress} activeOpacity={0.6}>
            <Text style={styles.contactValueText}>(61) 99999-9999</Text>
          </TouchableOpacity>


          {/* RODAPÉ: PROBLEMA NÃO RESOLVIDO */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerSubtitle}>Seu problema não foi resolvido?</Text>
            <TouchableOpacity 
              style={styles.footerButton} 
              onPress={handleLiveChat}
              activeOpacity={0.8}
            >
              <Text style={styles.footerButtonText}>Falar com suporte</Text>
            </TouchableOpacity>
          </View>

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
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  
  groupHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 16, paddingBottom: 12, paddingHorizontal: 4 },
  groupHeaderSpacer: { height: 8 },
  groupTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
  
  faqWrapper: { borderBottomWidth: 1, borderColor: '#F3F4F6' },
  rowItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 12 },
  rowText: { flex: 1, fontSize: 15, fontWeight: '500', color: '#374151' },
  
  answerContainer: { paddingHorizontal: 12, paddingBottom: 14, paddingTop: 2, backgroundColor: '#F9FAFB', borderRadius: 8, marginBottom: 8 },
  answerText: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  
  contactContainer: { paddingVertical: 4, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: '#F3F4F6', paddingBottom: 14 },
  contactLinkText: { fontSize: 15, fontWeight: '500', color: '#5B21B6', textDecorationLine: 'underline' },
  contactValueText: { fontSize: 15, fontWeight: '500', color: '#374151' },

  footerContainer: { marginTop: 40, alignItems: 'center', gap: 12, paddingHorizontal: 12 },
  footerSubtitle: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  footerButton: { width: '100%', backgroundColor: '#DDD6FE', height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#C4B5FD' },
  footerButtonText: { color: '#5B21B6', fontSize: 16, fontWeight: '700' }
});