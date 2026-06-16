import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { getSession } from '../../lib/auth';
import { View, ActivityIndicator } from 'react-native';

export default function TabsLayout() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSession().then(session => {
            if (!session) router.replace('/(auth)/login');
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' }}>
                <ActivityIndicator size="large" color="#5B21B6" />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}