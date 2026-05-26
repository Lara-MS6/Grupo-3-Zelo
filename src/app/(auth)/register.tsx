import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !phone || !password || !confirmPassword) {
            alert('Preencha todos os campos');
            return;
        }
        if (password !== confirmPassword) {
            alert('As senhas não coincidem');
            return;
        }
        if (!acceptedTerms) {
            alert('Aceite os termos de uso');
            return;
        }
        setLoading(true);
        // Simulação de cadastro
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    const formatPhone = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Botão Voltar */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={24} color="#5B21B6" />
                    </TouchableOpacity>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Criar conta</Text>
                        <Text style={styles.subtitle}>
                            Preencha seus dados para começar
                        </Text>
                    </View>

                    {/* Formulário */}
                    <View style={styles.form}>
                        {/* Nome Completo */}
                        <View style={styles.inputContainer}>
                            <User size={20} color="#9CA3AF" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Nome completo"
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="words"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputContainer}>
                            <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="E-mail"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        {/* Telefone */}
                        <View style={styles.inputContainer}>
                            <Phone size={20} color="#9CA3AF" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Telefone"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={(text) => setPhone(formatPhone(text))}
                                maxLength={15}
                            />
                        </View>

                        {/* Senha */}
                        <View style={styles.inputContainer}>
                            <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} color="#9CA3AF" />
                                ) : (
                                    <Eye size={20} color="#9CA3AF" />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Confirmar Senha */}
                        <View style={styles.inputContainer}>
                            <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar senha"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.eyeButton}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} color="#9CA3AF" />
                                ) : (
                                    <Eye size={20} color="#9CA3AF" />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Termos */}
                        <TouchableOpacity
                            style={styles.termsContainer}
                            onPress={() => setAcceptedTerms(!acceptedTerms)}
                        >
                            <View style={[
                                styles.checkbox,
                                acceptedTerms && styles.checkboxChecked
                            ]}>
                                {acceptedTerms && <CheckCircle2 size={16} color="#FFFFFF" />}
                            </View>
                            <Text style={styles.termsText}>
                                Aceito os <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
                                <Text style={styles.termsLink}>Política de Privacidade</Text>
                            </Text>
                        </TouchableOpacity>

                        {/* Botão Cadastrar */}
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Link para login */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Já tem uma conta? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                            <Text style={styles.footerLink}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        lineHeight: 24,
    },
    form: {
        gap: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    eyeButton: {
        padding: 4,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#5B21B6',
        borderColor: '#5B21B6',
    },
    termsText: {
        flex: 1,
        color: '#4B5563',
        fontSize: 14,
        lineHeight: 20,
    },
    termsLink: {
        color: '#5B21B6',
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#5B21B6',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 8,
        boxShadow: '0px 4px 12px rgba(91, 33, 182, 0.3)',
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    footerText: {
        color: '#6B7280',
        fontSize: 16,
    },
    footerLink: {
        color: '#5B21B6',
        fontWeight: '700',
        fontSize: 16,
    },
});