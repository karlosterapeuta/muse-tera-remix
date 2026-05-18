// Função para calcular CRC16 CCITT (0xFFFF)
function crc16(payload: string): string {
  let crc = 0xFFFF;
  
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  
  crc = crc & 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Função para formatar campo EMV
function formatEMVField(id: string, value: string): string {
  const length = value.length.toString().padStart(2, '0');
  return `${id}${length}${value}`;
}

interface PixPayloadParams {
  pixKey: string;
  beneficiaryName: string;
  city: string;
  amount?: number;
  transactionId?: string;
}

export function generatePixPayload({
  pixKey,
  beneficiaryName,
  city,
  amount,
  transactionId = '***'
}: PixPayloadParams): string {
  // Payload Format Indicator
  let payload = formatEMVField('00', '01');
  
  // Merchant Account Information
  let merchantAccount = formatEMVField('00', 'BR.GOV.BCB.PIX');
  merchantAccount += formatEMVField('01', pixKey);
  payload += formatEMVField('26', merchantAccount);
  
  // Merchant Category Code
  payload += formatEMVField('52', '0000');
  
  // Transaction Currency (BRL)
  payload += formatEMVField('53', '986');
  
  // Transaction Amount (opcional)
  if (amount) {
    payload += formatEMVField('54', amount.toFixed(2));
  }
  
  // Country Code
  payload += formatEMVField('58', 'BR');
  
  // Merchant Name
  payload += formatEMVField('59', beneficiaryName.toUpperCase().substring(0, 25));
  
  // Merchant City
  payload += formatEMVField('60', city.toUpperCase().substring(0, 15));
  
  // Additional Data Field Template
  const additionalData = formatEMVField('05', transactionId);
  payload += formatEMVField('62', additionalData);
  
  // CRC16
  payload += '6304';
  const checksum = crc16(payload);
  payload += checksum;
  
  return payload;
}
