import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

interface CardData {
  number: string;
  holderName: string;
  expiry: string;
  cvv: string;
}

export default function AddCardScreen(): React.JSX.Element {
  const router = useRouter();

  const [cardData, setCardData] = useState<CardData>({
    number: '',
    holderName: '',
    expiry: '',
    cvv: '',
  });

  const getCardBrand = useCallback((): string => {
    const num = cardData.number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'VISA';
    if (/^5[1-5]/.test(num)) return 'MASTERCARD';
    if (/^3[47]/.test(num)) return 'AMEX';
    return 'VISA';
  }, [cardData.number]);

  const formatCardNumber = (text: string): string => {
    const cleaned = text.replace(/\s/g, '').replace(/[^0-9]/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiry = (text: string): string => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleNumberChange = (text: string): void => {
    setCardData((prev: CardData) => ({ ...prev, number: formatCardNumber(text) }));
  };

  const handleExpiryChange = (text: string): void => {
    setCardData((prev: CardData) => ({ ...prev, expiry: formatExpiry(text) }));
  };

  const handleCvvChange = (text: string): void => {
    const cleaned = text.replace(/[^0-9]/g, '').substring(0, 4);
    setCardData((prev: CardData) => ({ ...prev, cvv: cleaned }));
  };

  const handleHolderNameChange = (text: string): void => {
    setCardData((prev: CardData) => ({ ...prev, holderName: text.toUpperCase() }));
  };

  const isFormValid = (): boolean => {
    return (
      cardData.number.replace(/\s/g, '').length >= 16 &&
      cardData.holderName.length >= 3 &&
      cardData.expiry.length === 5 &&
      cardData.cvv.length >= 3
    );
  };

  const handleAddCard = (): void => {
    if (!isFormValid()) return;
    console.log('Cartao adicionado:', cardData);
    router.back();
  };

  const getCardPreviewBackground = (): string => {
    const brand = getCardBrand();
    if (brand === 'VISA') return '#F0F5FF';
    if (brand === 'MASTERCARD') return '#FFF0F0';
    return '#F0F5FF';
  };

  const getCardPreviewTextColor = (): string => {
    const brand = getCardBrand();
    if (brand === 'VISA') return '#1A1F71';
    if (brand === 'MASTERCARD') return '#374151';
    return '#1A1F71';
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#5B21B6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adicionar Cartão</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <View style={styles.headerDivider} />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.cardPreviewContainer}>
            <View style={[
              styles.cardPreview,
              { backgroundColor: getCardPreviewBackground() }
            ]}>
              <Text style={[
                styles.cardPreviewBrand,
                { color: getCardPreviewTextColor() }
              ]}>
                {getCardBrand()}
              </Text>

              <View style={styles.cardPreviewRow}>
                <View>
                  <Text style={styles.cardPreviewLabel}>Nome do titular</Text>
                  <Text style={styles.cardPreviewValue}>
                    {cardData.holderName || 'Seu nome aqui'}
                  </Text>
                </View>
              </View>

              <View style={styles.cardPreviewRow}>
                <View>
                  <Text style={styles.cardPreviewLabel}>Numero do cartao</Text>
                  <Text style={styles.cardPreviewValue}>
                    {cardData.number || '0000 0000 0000 0000'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Numero do cartao</Text>
              <TextInput
                style={styles.input}
                value={cardData.number}
                onChangeText={handleNumberChange}
                placeholder="0000 0000 0000 0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                maxLength={19}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome do titular (como no cartao)</Text>
              <TextInput
                style={styles.input}
                value={cardData.holderName}
                onChangeText={handleHolderNameChange}
                placeholder="Seu nome aqui"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Validade (MM/AA)</Text>
                <TextInput
                  style={styles.input}
                  value={cardData.expiry}
                  onChangeText={handleExpiryChange}
                  placeholder="00/00"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cardData.cvv}
                  onChangeText={handleCvvChange}
                  placeholder="000"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.addButton,
                !isFormValid() && styles.addButtonDisabled
              ]}
              onPress={handleAddCard}
              disabled={!isFormValid()}
            >
              <Text style={styles.addButtonText}>Adicionar cartão</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpace} />
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
  cardPreviewContainer: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
  },
  cardPreview: {
    borderRadius: 16,
    padding: 20,
    minHeight: 140,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardPreviewBrand: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 16,
  },
  cardPreviewRow: {
    marginBottom: 12,
  },
  cardPreviewLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  cardPreviewValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  formContainer: {
    marginHorizontal: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 24,
    marginTop: 32,
  },
  addButton: {
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
  addButtonDisabled: {
    backgroundColor: '#D1D5DB',
    ...Platform.select({
      ios: { shadowOpacity: 0 },
      android: { elevation: 0 },
    }),
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSpace: {
    height: 32,
  },
});