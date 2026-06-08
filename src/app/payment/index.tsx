import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Switch,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Plus, 
  CreditCard,
  QrCode,
  Apple
} from 'lucide-react-native';

interface SavedCard {
  id: string;
  brand: 'visa' | 'mastercard';
  number: string;
  expiry: string;
}

const savedCards: SavedCard[] = [
  {
    id: '1',
    brand: 'visa',
    number: '**** **** **** 4792',
    expiry: '12/26',
  },
  {
    id: '2',
    brand: 'mastercard',
    number: '**** **** **** 4792',
    expiry: '12/26',
  },
];

export default function PaymentMethodsScreen(): React.JSX.Element {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string>('card-1');
  const [pixEnabled, setPixEnabled] = useState(true);
  const [applePayEnabled, setApplePayEnabled] = useState(false);

  const getCardStyle = (brand: string) => {
    return brand === 'visa' ? styles.visaCard : styles.mastercardCard;
  };

  const getCardTextColor = (brand: string) => {
    return brand === 'visa' ? '#1A1F71' : '#374151';
  };

  const handleAddCard = () => {
    router.push('/payment/add-card');
  };

  const handlePayment = () => {
    console.log('Finalizar pagamento');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Métodos de Pagamento</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Meus cartões salvos */}
        <Text style={styles.sectionTitle}>Meus cartões salvos</Text>

        <View style={styles.cardsContainer}>
          {savedCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.cardItem,
                getCardStyle(card.brand),
                selectedMethod === `card-${card.id}` && styles.cardSelected
              ]}
              onPress={() => setSelectedMethod(`card-${card.id}`)}
            >
              <Text style={[styles.cardBrand, { color: getCardTextColor(card.brand) }]}>
                {card.brand.toUpperCase()}
              </Text>
              <Text style={styles.cardNumber}>{card.number}</Text>
              <Text style={styles.cardExpiry}>{card.expiry}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Adicionar novo */}
        <Text style={styles.sectionTitle}>Adicionar novo</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <View style={styles.addIconContainer}>
            <Plus size={20} color="#5B21B6" />
          </View>
          <Text style={styles.addButtonText}>Adicionar Cartão crédito/débito</Text>
          <ArrowLeft size={20} color="#9CA3AF" style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>

        {/* Outros métodos */}
        <View style={styles.methodsContainer}>
          {/* PIX */}
          <View style={styles.methodItem}>
            <View style={styles.methodLeft}>
              <View style={[styles.methodIconContainer, { backgroundColor: '#F0FDF4' }]}>
                <QrCode size={20} color="#10B981" />
              </View>
              <Text style={styles.methodText}>PIX</Text>
            </View>
            <Switch
              value={pixEnabled}
              onValueChange={setPixEnabled}
              trackColor={{ false: '#E5E7EB', true: '#5B21B6' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          {/* Apple Pay */}
          <View style={styles.methodItem}>
            <View style={styles.methodLeft}>
              <View style={[styles.methodIconContainer, { backgroundColor: '#F3F4F6' }]}>
                <Apple size={20} color="#111827" />
              </View>
              <Text style={styles.methodText}>Apple Pay</Text>
            </View>
            <Switch
              value={applePayEnabled}
              onValueChange={setApplePayEnabled}
              trackColor={{ false: '#E5E7EB', true: '#5B21B6' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E5E7EB"
            />
          </View>
        </View>

        {/* Total e botão */}
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ 150,00</Text>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Finalizar Pagamento</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  // Header
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
  // Scroll
  scrollView: {
    flex: 1,
  },
  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  // Cards
  cardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  cardItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minHeight: 120,
    justifyContent: 'space-between',
  },
  cardSelected: {
    borderColor: '#5B21B6',
    ...Platform.select({
      ios: {
        shadowColor: '#5B21B6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  visaCard: {
    backgroundColor: '#F0F5FF',
  },
  mastercardCard: {
    backgroundColor: '#FFF0F0',
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardNumber: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    letterSpacing: 1,
  },
  cardExpiry: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  // Add button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  addIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  // Methods
  methodsContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    gap: 12,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  // Footer
  footer: {
    marginHorizontal: 24,
    marginTop: 32,
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
  payButton: {
    backgroundColor: '#5B21B6',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#5B21B6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  payButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSpace: {
    height: 32,
  },
});