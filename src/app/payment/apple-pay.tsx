import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Apple } from 'lucide-react-native';

export default function ApplePayScreen(): React.JSX.Element {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleApplePayAuth = () => {
    setIsAuthenticating(true);
    
    // Simula a autenticação do Face ID / Touch ID por 2 segundos
    setTimeout(() => {
      setIsAuthenticating(false);
      Alert.alert(
        "Pagamento Autorizado", 
        "Seu pagamento com Apple Pay foi processado com sucesso!",
        [{ text: "OK", onPress: () => router.replace('/payment') }]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header seguindo o padrão Zelo */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apple Pay</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Central do Apple Pay */}
        <View style={styles.appleCard}>
          <View style={styles.logoContainer}>
            <Apple size={40} color="#000000" />
            <Text style={styles.payText}>Pay</Text>
          </View>
          
          <Text style={styles.description}>
            Pague de forma rápida e segura utilizando o seu cartão padrão configurado na Carteira da Apple.
          </Text>
        </View>

        {/* Área de Status da Autenticação */}
        <View style={styles.authContainer}>
          {isAuthenticating ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#5B21B6" />
              <Text style={styles.authStatusText}>Aguardando Face ID / Touch ID...</Text>
            </View>
          ) : (
            <Text style={styles.hintText}>
              Clique no botão abaixo para iniciar a validação biométrica e confirmar.
            </Text>
          )}
        </View>

        {/* Footer com Resumo do Valor e o Botão Preto Oficial Estilizado */}
        <View style={styles.footerCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ 150,00</Text>
          </View>

          <TouchableOpacity 
            style={[styles.applePayButton, isAuthenticating && styles.disabledButton]} 
            onPress={handleApplePayAuth}
            disabled={isAuthenticating}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Apple size={22} color="#FFFFFF" />
              <Text style={styles.applePayButtonText}>Pagar com Apple Pay</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  headerPlaceholder: {
    width: 40,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  // Card Principal Branco
  appleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 24,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  payText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 2,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  // Área Central de Feedback Biométrico
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginVertical: 24,
  },
  loadingBox: {
    alignItems: 'center',
    gap: 12,
  },
  authStatusText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5B21B6',
  },
  hintText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
  },
  // Footer e Botão de Ação
  footerCard: {
    marginHorizontal: 24,
    gap: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5B21B6',
  },
  applePayButton: {
    backgroundColor: '#000000', // Preto oficial seguindo as diretrizes de design da Apple
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  applePayButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});