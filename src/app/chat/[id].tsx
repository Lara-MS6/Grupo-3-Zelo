import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  MoreVertical,
  Check,
  CheckCheck
} from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

const chatsData: Record<string, { user: ChatUser; messages: Message[] }> = {
  '1': {
    user: {
      id: '1',
      name: 'Carlos Santos',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      isOnline: true,
    },
    messages: [
      { id: '1', text: 'Olá! Tenho disponibilidade para amanhã às 14h.', sender: 'other', time: '10:30' },
      { id: '2', text: 'Perfeito! Pode confirmar o endereço?', sender: 'me', time: '10:32', status: 'read' },
      { id: '3', text: 'Claro! Qual é o bairro?', sender: 'other', time: '10:33' },
      { id: '4', text: 'Taguatinga Norte, próximo ao metrô.', sender: 'me', time: '10:35', status: 'read' },
      { id: '5', text: 'Ótimo! Consigo chegar fácil. Vou levar todo o material necessário.', sender: 'other', time: '10:36' },
      { id: '6', text: 'Perfeito, obrigado!', sender: 'me', time: '10:38', status: 'read' },
    ],
  },
  '2': {
    user: {
      id: '2',
      name: 'Ana Lima',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isOnline: true,
    },
    messages: [
      { id: '1', text: 'Obrigada pela preferência!', sender: 'other', time: '09:15' },
      { id: '2', text: 'Precisa de algum material específico?', sender: 'me', time: '09:20', status: 'read' },
    ],
  },
  '3': {
    user: {
      id: '3',
      name: 'Mariana Silva',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      isOnline: false,
      lastSeen: '7min',
    },
    messages: [
      { id: '1', text: 'Obrigada pela preferência!', sender: 'other', time: '08:45' },
    ],
  },
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollViewRef = useRef<any>(null);  // ← CORRIGIDO: useRef<any>(null)
  const [newMessage, setNewMessage] = useState('');
  
  const chatId = Array.isArray(id) ? id[0] : id;
  const chatData = chatsData[chatId] || chatsData['1'];
  const { user, messages: initialMessages } = chatData;
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'me',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Entendido! Vou confirmar seu agendamento.',
        sender: 'other',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderStatus = (status?: string) => {
    if (status === 'read') return <CheckCheck size={14} color="#5B21B6" />;
    if (status === 'delivered') return <CheckCheck size={14} color="#9CA3AF" />;
    return <Check size={14} color="#9CA3AF" />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userStatus}>
              {user.isOnline ? 'Online' : `Visto há ${user.lastSeen}`}
            </Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={20} color="#5B21B6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MoreVertical size={20} color="#5B21B6" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerDivider} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.dateContainer}>
            <View style={styles.dateLine} />
            <Text style={styles.dateText}>Hoje</Text>
            <View style={styles.dateLine} />
          </View>

          {messages.map((msg) => (
            <View 
              key={msg.id} 
              style={[
                styles.messageWrapper,
                msg.sender === 'me' ? styles.myMessageWrapper : styles.otherMessageWrapper
              ]}
            >
              <View style={[
                styles.messageBubble,
                msg.sender === 'me' ? styles.myBubble : styles.otherBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  msg.sender === 'me' ? styles.myMessageText : styles.otherMessageText
                ]}>
                  {msg.text}
                </Text>
              </View>
              <View style={styles.messageMeta}>
                <Text style={styles.messageTime}>{msg.time}</Text>
                {msg.sender === 'me' && renderStatus(msg.status)}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Digite uma mensagem..."
              placeholderTextColor="#9CA3AF"
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
            />
          </View>
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
  },
  userTextContainer: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  userStatus: {
    fontSize: 13,
    color: '#10B981',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
  },
  otherMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    maxWidth: '100%',
  },
  myBubble: {
    backgroundColor: '#5B21B6',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#374151',
  },
  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
    alignSelf: 'flex-end',
  },
  messageTime: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
  },
  input: {
    fontSize: 16,
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5B21B6',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(91, 33, 182, 0.3)',
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
    boxShadow: 'none',
  },
});