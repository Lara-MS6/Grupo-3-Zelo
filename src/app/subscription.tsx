import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
    Diamond,
    Check,
    X,
    ArrowLeft,
    ShieldCheck,
    Clock,
    Zap,
    CreditCard
} from 'lucide-react-native';

export default function SubscriptionScreen() {
    const router = useRouter();
    const [isYearly, setIsYearly] = useState(false);

    const monthlyPrice = 19.90;
    const yearlyPrice = 199.90;
    const currentPrice = isYearly ? yearlyPrice : monthlyPrice;
    const periodText = isYearly ? '/ano' : '/mês';

    const primeBenefits = [
        'Prioridade no atendimento',
        'Disponibilidade de última hora',
        'Profissionais top avaliados',
        'Sem taxas complicadas'
    ];

    const freeFeatures = [
        { label: 'Fila normal', included: true },
        { label: 'Poucas opções', included: true },
        { label: 'Sem urgência', included: true },
        { label: 'Prioridade', included: false },
        { label: 'Top avaliados', included: false },
        { label: 'Rapidez', included: false },
    ];

    const primeFeatures = [
        { label: 'Prioridade', included: true },
        { label: 'Top avaliados', included: true },
        { label: 'Rapidez', included: true },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={24} color="#5B21B6" />
                    </TouchableOpacity>
                </View>

                {/* Card Principal */}
                <View style={styles.primeCard}>
                    {/* Ícone e Título */}
                    <View style={styles.titleContainer}>
                        <Diamond size={40} color="#5B21B6" strokeWidth={1.5} />
                        <Text style={styles.primeTitle}>Zelo Prime</Text>
                        <Text style={styles.primeSubtitle}>
                            Mais rapidez e prioridade
                        </Text>
                    </View>

                    {/* Badge Mais Popular */}
                    <View style={styles.badgeContainer}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Mais Popular</Text>
                        </View>
                    </View>

                    {/* Lista de Benefícios */}
                    <View style={styles.benefitsList}>
                        {primeBenefits.map((benefit, index) => (
                            <View key={index} style={styles.benefitItem}>
                                <Check size={18} color="#5B21B6" strokeWidth={2.5} />
                                <Text style={styles.benefitText}>{benefit}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Divisor */}
                    <View style={styles.divider} />

                    {/* Preço */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.currency}>R$</Text>
                        <Text style={styles.price}>{currentPrice.toFixed(2).replace('.', ',')}</Text>
                        <Text style={styles.period}>{periodText}</Text>
                    </View>

                    <Text style={styles.trialText}>ou 7 dias grátis</Text>

                    {/* Toggle Anual/Mensal */}
                    <View style={styles.toggleContainer}>
                        <Text style={[
                            styles.toggleLabel,
                            !isYearly && styles.toggleLabelActive
                        ]}>
                            Mensal
                        </Text>
                        <Switch
                            value={isYearly}
                            onValueChange={setIsYearly}
                            trackColor={{ false: '#E5E7EB', true: '#5B21B6' }}
                            thumbColor="#FFFFFF"
                            ios_backgroundColor="#E5E7EB"
                        />
                        <Text style={[
                            styles.toggleLabel,
                            isYearly && styles.toggleLabelActive
                        ]}>
                            Anual
                            <Text style={styles.discountBadge}> -17%</Text>
                        </Text>
                    </View>

                    {/* Botão Principal */}
                    <TouchableOpacity style={styles.ctaButton}>
                        <Text style={styles.ctaButtonText}>Começar teste grátis</Text>
                    </TouchableOpacity>

                    {/* Garantias */}
                    <View style={styles.guarantees}>
                        <View style={styles.guaranteeItem}>
                            <ShieldCheck size={16} color="#6B7280" />
                            <Text style={styles.guaranteeText}>Cancele quando quiser</Text>
                        </View>
                        <View style={styles.guaranteeItem}>
                            <Clock size={16} color="#6B7280" />
                            <Text style={styles.guaranteeText}>Sem compromisso</Text>
                        </View>
                        <View style={styles.guaranteeItem}>
                            <CreditCard size={16} color="#6B7280" />
                            <Text style={styles.guaranteeText}>Pagamento seguro</Text>
                        </View>
                    </View>
                </View>

                {/* Divisor */}
                <View style={styles.sectionDivider} />

                {/* Comparação Sem Prime / Com Prime */}
                <Text style={styles.compareTitle}>Compare os planos</Text>

                <View style={styles.compareContainer}>
                    {/* Sem Prime */}
                    <View style={styles.compareColumn}>
                        <View style={styles.compareHeaderFree}>
                            <Text style={styles.compareHeaderTextFree}>Sem Prime</Text>
                        </View>
                        {freeFeatures.map((feature, index) => (
                            <View key={index} style={styles.compareRow}>
                                {feature.included ? (
                                    <Check size={16} color="#10B981" strokeWidth={2.5} />
                                ) : (
                                    <X size={16} color="#EF4444" strokeWidth={2.5} />
                                )}
                                <Text style={[
                                    styles.compareFeatureText,
                                    !feature.included && styles.compareFeatureTextDisabled
                                ]}>
                                    {feature.label}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Com Prime */}
                    <View style={styles.compareColumn}>
                        <View style={styles.compareHeaderPrime}>
                            <Zap size={16} color="#FFFFFF" />
                            <Text style={styles.compareHeaderTextPrime}>Com Prime</Text>
                        </View>
                        {primeFeatures.map((feature, index) => (
                            <View key={index} style={styles.compareRow}>
                                <Check size={16} color="#5B21B6" strokeWidth={2.5} />
                                <Text style={styles.compareFeatureTextPrime}>
                                    {feature.label}
                                </Text>
                            </View>
                        ))}
                        {/* Preencher espaço para alinhar */}
                        <View style={styles.compareRow}>
                            <Check size={16} color="#5B21B6" strokeWidth={2.5} />
                            <Text style={styles.compareFeatureTextPrime}>Rapidez</Text>
                        </View>
                    </View>
                </View>

                {/* Rodapé */}
                <Text style={styles.footerText}>
                    Ao assinar, você concorda com nossos Termos de Serviço
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Card Principal Zelo Prime
    primeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        borderWidth: 2,
        borderColor: '#5B21B6',
        boxShadow: '0px 8px 24px rgba(91, 33, 182, 0.15)',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    primeTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        marginTop: 12,
    },
    primeSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 4,
    },
    // Badge
    badgeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    badge: {
        backgroundColor: '#5B21B6',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    // Benefícios
    benefitsList: {
        gap: 12,
        marginBottom: 20,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    benefitText: {
        fontSize: 15,
        color: '#374151',
        fontWeight: '500',
    },
    // Divisor
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 20,
    },
    sectionDivider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 28,
    },
    // Preço
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 4,
    },
    currency: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
        marginRight: 2,
    },
    price: {
        fontSize: 48,
        fontWeight: '800',
        color: '#111827',
        lineHeight: 52,
    },
    period: {
        fontSize: 18,
        color: '#6B7280',
        marginBottom: 8,
        marginLeft: 2,
    },
    trialText: {
        textAlign: 'center',
        color: '#6B7280',
        fontSize: 14,
        marginBottom: 16,
    },
    // Toggle
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 20,
    },
    toggleLabel: {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    toggleLabelActive: {
        color: '#5B21B6',
        fontWeight: '700',
    },
    discountBadge: {
        color: '#10B981',
        fontWeight: '700',
        fontSize: 12,
    },
    // Botão CTA
    ctaButton: {
        backgroundColor: '#5B21B6',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20,
        boxShadow: '0px 4px 16px rgba(91, 33, 182, 0.35)',
    },
    ctaButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    // Garantias
    guarantees: {
        gap: 10,
        alignItems: 'center',
    },
    guaranteeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    guaranteeText: {
        color: '#6B7280',
        fontSize: 13,
    },
    // Comparação
    compareTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
        marginBottom: 20,
    },
    compareContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    compareColumn: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    compareHeaderFree: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    compareHeaderTextFree: {
        color: '#6B7280',
        fontWeight: '700',
        fontSize: 14,
    },
    compareHeaderPrime: {
        backgroundColor: '#5B21B6',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 16,
    },
    compareHeaderTextPrime: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    compareRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 8,
    },
    compareFeatureText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    compareFeatureTextDisabled: {
        color: '#9CA3AF',
        textDecorationLine: 'line-through',
    },
    compareFeatureTextPrime: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '600',
    },
    // Rodapé
    footerText: {
        textAlign: 'center',
        color: '#9CA3AF',
        fontSize: 12,
        marginTop: 24,
        lineHeight: 18,
    },
});