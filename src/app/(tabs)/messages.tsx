import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';

interface Message {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: string;
  isOnline?: boolean;
}

const messagesData: Message[] = [
  {
    id: '1',
    name: 'Carlos Santos',
    lastMessage: 'Tenho disponibilidade',
    time: '5min',
    unreadCount: 1,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Ana Lima',
    lastMessage: 'Obrigada pela preferência',
    time: '7min',
    unreadCount: 2,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Mariana Silva',
    lastMessage: 'Obrigada pela preferência!',
    time: '7min',
    unreadCount: 2,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: '4',
    name: 'Maria Antônia',
    lastMessage: 'Obrigada pela preferência',
    time: '7min',
    unreadCount: 3,
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: '5',
    name: 'José Miguel',
    lastMessage: 'Obrigada pela preferência',
    time: '1Sem',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '6',
    name: 'Marcos Souza',
    lastMessage: 'Obrigada pela preferência',
    time: '1Sem',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
  {
    id: '7',
    name: 'Pedro Silva',
    lastMessage: 'Obrigada pela preferência',
    time: '2Sem',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
  },
  {
    id: '8',
    name: 'Cintia Mendes',
    lastMessage: 'Obrigada pela preferência',
    time: '3Sem',
    unreadCount: 0,
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messagesData.filter(msg => 
    msg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mensagens</Text>
      </View>

      {/* Divisor */}
      <View style={styles.headerDivider} />

      {/* Barra de Busca */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" />
        <TextInput 
          placeholder="Buscar conversa..."
          style={styles.searchInput}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Lista de Mensagens */}
      <ScrollView 
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
      >
        {filteredMessages.map((msg) => (
          <TouchableOpacity 
            key={msg.id}
            style={styles.messageItem}
            activeOpacity={0.7}
            onPress={() => router.push(`/chat/${msg.id}`)}
          >
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Image source={{ uri: msg.avatar }} style={styles.avatar} />
              {msg.isOnline && <View style={styles.onlineIndicator} />}
            </View>

            {/* Conteúdo */}
            <View style={styles.messageContent}>
              <View style={styles.messageRow}>
                <Text style={styles.messageName}>{msg.name}</Text>
                <Text style={styles.messageTime}>{msg.time}</Text>
              </View>
              <View style={styles.messageRow}>
                <Text 
                  style={[
                    styles.messagePreview,
                    msg.unreadCount > 0 && styles.messagePreviewUnread
                  ]}
                  numberOfLines={1}
                >
                  {msg.lastMessage}
                </Text>
                {msg.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>{msg.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E5E7EB',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  messageContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  messageTime: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  messagePreview: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    flex: 1,
    marginRight: 8,
  },
  messagePreviewUnread: {
    color: '#374151',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#5B21B6',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});