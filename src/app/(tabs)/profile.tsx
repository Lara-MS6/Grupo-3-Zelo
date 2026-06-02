import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getSession, logout } from '../../lib/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogOut, User, Mail, Phone } from 'lucide-react-native';

const USERS_KEY = '@zelo:users';

export default function ProfileScreen() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [allUsers, setAllUsers] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const session = await getSession();
        setUser(session);

        const data = await AsyncStorage.getItem(USERS_KEY);
        if (data) setAllUsers(JSON.parse(data));
    };

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.title}>Perfil</Text>

                {user && (
                    <View style={styles.card}>
                        <User size={24} color="#5B21B6" />
                        <Text style={styles.name}>{user.name}</Text>
                        <View style={styles.infoRow}>
                            <Mail size={16} color="#6B7280" />
                            <Text style={styles.info}>{user.email}</Text>
                        </View>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Usuários cadastrados ({allUsers.length})</Text>

                {allUsers.map((u) => (
                    <View key={u.id} style={styles.userCard}>
                        <Text style={styles.userName}>{u.name}</Text>
                        <View style={styles.infoRow}>
                            <Mail size={14} color="#9CA3AF" />
                            <Text style={styles.userEmail}>{u.email}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Phone size={14} color="#9CA3AF" />
                            <Text style={styles.userPhone}>{u.phone || 'Não informado'}</Text>
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut size={20} color="#FFFFFF" />
                    <Text style={styles.logoutText}>Sair da conta</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    scroll: { padding: 24 },
    title: { fontSize: 32, fontWeight: '800', color: '#111827', marginBottom: 24 },
    card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#E5E7EB' },
    name: { fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 12 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
    info: { fontSize: 14, color: '#6B7280' },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 },
    userCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
    userName: { fontSize: 16, fontWeight: '600', color: '#111827' },
    userEmail: { fontSize: 14, color: '#6B7280' },
    userPhone: { fontSize: 14, color: '#6B7280' },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EF4444', paddingVertical: 16, borderRadius: 16, marginTop: 24, gap: 8 },
    logoutText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});