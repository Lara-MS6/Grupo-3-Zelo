import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Copy, Info } from 'lucide-react-native';

export default function PixPaymentScreen(): React.JSX.Element {
  const router = useRouter();
  
  // Dados simulados com base nas imagens enviadas
  const pixKey = "XX.XXX.XXX/XXXX-XX";
  const copiaEColaCode = "00020101021126580014br.gov.bcb.pix0136e3b5643283b24d7c87d5234b32128374";

  const handleCopyPix = () => {
    // Para funcionar nativamente, você pode usar: import * as Clipboard from 'expo-clipboard';
    // await Clipboard.setStringAsync(copiaEColaCode);
    Alert.alert("Sucesso", "Código Pix Copia e Cola copiado para a área de transferência!");
  };

  const handleConfirmPayment = () => {
    console.log('Pagamento com PIX confirmado');
    // Insira aqui a sua lógica de sucesso ou redirecionamento final
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header idêntico ao padrão das suas outras telas */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#5B21B6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagamento via PIX</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.headerDivider} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloco centralizado do QR Code */}
        <View style={styles.qrContainer}>
          <View style={styles.qrCodeBox}>
            {/* Construção visual para simular o visual do QR Code usando Views quadradas */}
            <View style={styles.qrMockRow}>
              <View style={[styles.qrMockBlock, styles.qrCornerBlock]} />
              <View style={styles.qrMockLine} />
              <View style={[styles.qrMockBlock, styles.qrCornerBlock]} />
            </View>
            <View style={[styles.qrMockRow, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
              <View style={[styles.qrMockLine, { width: '80%', height: 6, marginVertical: 4 }]} />
              <View style={[styles.qrMockLine, { width: '60%', height: 6, marginVertical: 4 }]} />
              <View style={[styles.qrMockLine, { width: '75%', height: 6, marginVertical: 4 }]} />
            </View>
            <View style={styles.qrMockRow}>
              <View style={[styles.qrMockBlock, styles.qrCornerBlock]} />
              <View style={styles.qrMockLine} />
              <View style={styles.qrMockBlock} />
            </View>
          </View>
        </View>

        {/* Campo Copia e Cola */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Copia e cola</Text>
          <TouchableOpacity 
            style={styles.copyInputBox} 
            onPress={handleCopyPix} 
            activeOpacity={0.7}
          >
            <Text style={styles.copyText} numberOfLines={1}>
              {copiaEColaCode}
            </Text>
            <Copy size={20} color="#5B21B6" />
          </TouchableOpacity>
        </View>

        {/* Detalhes do Recebimento */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Destinatário</Text>
            <Text style={styles.detailValue}>Serviços online</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Chave Pix</Text>
            <Text style={styles.detailValue}>{pixKey}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Instituição</Text>
            <Text style={styles.detailValue}>Banco do Brasil</Text>
          </View>
        </View>

        {/* Alerta de Tempo */}
        <View style={styles.alertBox}>
          <Info size={18} color="#6B7280" />
          <Text style={styles.alertText}>chave válida por 15 minutos</Text>
        </View>

        {/* Footer com Total e Botão de Confirmação seguindo o seu design */}
        <View style={styles.footerCard}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ 150,00</Text>
          </View>

          <TouchableOpacity 
            style={styles.confirmButton} 
            onPress={handleConfirmPayment}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>Confirmar pagamento com pix</Text>
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
  qrContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  qrCodeBox: {
    width: 160,
    height: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  qrMockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qrMockBlock: {
    width: 22,
    height: 22,
    backgroundColor: '#111827',
  },
  qrCornerBlock: {
    borderWidth: 4,
    borderColor: '#111827',
    backgroundColor: 'transparent',
  },
  qrMockLine: {
    flex: 1,
    height: 5,
    backgroundColor: '#111827',
    marginHorizontal: 8,
    borderRadius: 2,
  },
  sectionContainer: {
    marginHorizontal: 24,
    marginBottom: 20,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  copyInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  copyText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    marginRight: 12,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    marginHorizontal: 24,
  },
  alertText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  footerCard: {
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
  confirmButton: {
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
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSpace: {
    height: 32,
  },
});