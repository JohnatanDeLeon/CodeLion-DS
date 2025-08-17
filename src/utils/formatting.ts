/**
 * Patrones de formateo predefinidos y utilidades
 * Sistema extensible para formateo automático de inputs
 */

import type {
  FormatPattern,
  PredefinedPatternType,
  PatternUtils,
  FormattingState,
} from "../types/formatting";

// Constantes de patrones - importar desde types
export const DIGIT_PLACEHOLDER = "#";
export const LETTER_PLACEHOLDER = "A";  
export const ALPHANUMERIC_PLACEHOLDER = "X";

/**
 * Patrones predefinidos listos para usar
 */
export const PREDEFINED_PATTERNS: Record<PredefinedPatternType, FormatPattern> = {
  // ============================================================================
  // TELÉFONOS
  // ============================================================================
  phone: {
    pattern: '(###) ###-####',
    allowedChars: /[0-9]/,
    placeholder: '(555) 123-4567',
    description: 'Número de teléfono en formato (XXX) XXX-XXXX',
    maxLength: 10,
    announceChanges: true,
    validate: (value) => value.length === 10,
  },

  'phone-international': {
    pattern: '+# (###) ###-####',
    allowedChars: /[0-9]/,
    placeholder: '+1 (555) 123-4567',
    description: 'Número internacional con código de país',
    maxLength: 11,
    announceChanges: true,
    validate: (value) => value.length >= 10 && value.length <= 11,
  },

  // ============================================================================
  // TARJETAS DE CRÉDITO
  // ============================================================================
  'credit-card': {
    pattern: '#### #### #### ####',
    allowedChars: /[0-9]/,
    placeholder: '1234 5678 9012 3456',
    description: 'Número de tarjeta de crédito con 16 dígitos',
    maxLength: 16,
    announceChanges: false, // Seguridad: no anunciar números
    validate: (value) => {
      // Validación básica Luhn
      if (value.length !== 16) return false;
      return validateLuhn(value);
    },
  },

  'credit-card-expiry': {
    pattern: '##/##',
    allowedChars: /[0-9]/,
    placeholder: '12/25',
    description: 'Fecha de vencimiento MM/AA',
    maxLength: 4,
    validate: (value) => {
      if (value.length !== 4) return false;
      const month = parseInt(value.substring(0, 2));
      const year = parseInt(value.substring(2, 4));
      return month >= 1 && month <= 12 && year >= new Date().getFullYear() % 100;
    },
  },

  'credit-card-cvv': {
    pattern: '###',
    allowedChars: /[0-9]/,
    placeholder: '123',
    description: 'Código de seguridad de 3 dígitos',
    maxLength: 3,
    announceChanges: false, // Seguridad
    validate: (value) => value.length === 3,
  },

  // ============================================================================
  // MONEDA
  // ============================================================================
  currency: {
    pattern: '$#,###.##',
    allowedChars: /[0-9.-]/,
    placeholder: '$1,234.56',
    description: 'Cantidad en formato de moneda con centavos',
    maxLength: 12,
    transform: (value) => {
      // Remover caracteres no numéricos excepto punto y guión
      const cleaned = value.replace(/[^0-9.-]/g, '');
      // Asegurar solo un punto decimal
      const parts = cleaned.split('.');
      if (parts.length > 2) {
        return parts[0] + '.' + parts.slice(1).join('').substring(0, 2);
      }
      // Asegurar solo un guión para números negativos
      const hasMinus = cleaned.includes('-');
      const withoutMinus = cleaned.replace(/-/g, '');
      return hasMinus ? '-' + withoutMinus : withoutMinus;
    },
    validate: (value, formatted) => {
      const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
      return !isNaN(numValue);
    },
  },

  'currency-no-cents': {
    pattern: '$#,###',
    allowedChars: /[0-9-]/,
    placeholder: '$1,234',
    description: 'Cantidad en formato de moneda sin centavos',
    maxLength: 10,
    validate: (value) => {
      const numValue = parseInt(value.replace(/[^0-9-]/g, ''));
      return !isNaN(numValue);
    },
  },

  // ============================================================================
  // CÓDIGOS POSTALES
  // ============================================================================
  'postal-code': {
    pattern: '#####-####',
    allowedChars: /[0-9]/,
    placeholder: '12345-6789',
    description: 'Código postal extendido',
    maxLength: 9,
    validate: (value) => value.length === 5 || value.length === 9,
  },

  'postal-code-us': {
    pattern: '#####',
    allowedChars: /[0-9]/,
    placeholder: '12345',
    description: 'Código postal de 5 dígitos',
    maxLength: 5,
    validate: (value) => value.length === 5,
  },

  // ============================================================================
  // FECHAS Y TIEMPO
  // ============================================================================
  date: {
    pattern: '##/##/####',
    allowedChars: /[0-9]/,
    placeholder: '25/12/2023',
    description: 'Fecha en formato DD/MM/AAAA',
    maxLength: 8,
    validate: (value) => {
      if (value.length !== 8) return false;
      const day = parseInt(value.substring(0, 2));
      const month = parseInt(value.substring(2, 4));
      const year = parseInt(value.substring(4, 8));
      return isValidDate(day, month, year);
    },
  },

  'date-us': {
    pattern: '##/##/####',
    allowedChars: /[0-9]/,
    placeholder: '12/25/2023',
    description: 'Fecha en formato MM/DD/AAAA',
    maxLength: 8,
    validate: (value) => {
      if (value.length !== 8) return false;
      const month = parseInt(value.substring(0, 2));
      const day = parseInt(value.substring(2, 4));
      const year = parseInt(value.substring(4, 8));
      return isValidDate(day, month, year);
    },
  },

  time: {
    pattern: '##:## AM',
    allowedChars: /[0-9]/,
    placeholder: '02:30 PM',
    description: 'Hora en formato 12 horas',
    maxLength: 4,
    transform: (value) => {
      // Lógica para formato 12h con AM/PM automático
      if (value.length >= 2) {
        const hour = parseInt(value.substring(0, 2));
        return value; // Simplificado para ejemplo
      }
      return value;
    },
    validate: (value) => {
      if (value.length !== 4) return false;
      const hour = parseInt(value.substring(0, 2));
      const minute = parseInt(value.substring(2, 4));
      return hour >= 1 && hour <= 12 && minute >= 0 && minute <= 59;
    },
  },

  'time-24h': {
    pattern: '##:##',
    allowedChars: /[0-9]/,
    placeholder: '14:30',
    description: 'Hora en formato 24 horas',
    maxLength: 4,
    validate: (value) => {
      if (value.length !== 4) return false;
      const hour = parseInt(value.substring(0, 2));
      const minute = parseInt(value.substring(2, 4));
      return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
    },
  },

  // ============================================================================
  // IDENTIFICACIÓN
  // ============================================================================
  ssn: {
    pattern: '###-##-####',
    allowedChars: /[0-9]/,
    placeholder: '123-45-6789',
    description: 'Número de Seguro Social',
    maxLength: 9,
    announceChanges: false, // Privacidad
    validate: (value) => value.length === 9,
  },

  'tax-id': {
    pattern: '##-#######',
    allowedChars: /[0-9]/,
    placeholder: '12-3456789',
    description: 'Número de identificación fiscal',
    maxLength: 9,
    announceChanges: false, // Privacidad
    validate: (value) => value.length === 9,
  },

  // ============================================================================
  // OTROS
  // ============================================================================
  'license-plate': {
    pattern: 'AAA-###',
    allowedChars: /[A-Z0-9]/,
    placeholder: 'ABC-123',
    description: 'Placa de matrícula',
    maxLength: 6,
    transform: (value) => value.toUpperCase(),
    validate: (value) => value.length === 6,
  },
};

/**
 * Utilidades para trabajar con patrones
 */
export const patternUtils: PatternUtils = {
  /**
   * Formatear valor según patrón con lógica progresiva inteligente
   */
  format: (value: string, pattern: FormatPattern): string => {
    if (!value) return '';
    
    // Limpiar valor primero
    const cleanValue = value.replace(new RegExp(`[^${pattern.allowedChars.source.slice(1, -1)}]`, 'g'), '');
    
    // Para teléfonos, aplicar formateo progresivo inteligente
    if (pattern.pattern === "(###) ###-####") {
      return patternUtils.formatPhoneProgressive(cleanValue);
    }
    
    // Para moneda, aplicar formateo específico
    if (pattern.pattern === "$#,###.##" || pattern.pattern === "$#,###") {
      return patternUtils.formatCurrencyProgressive(cleanValue);
    }
    
    // Para patrones personalizados, usar formateo estándar
    if (pattern.pattern.includes('A') || pattern.pattern.includes('X')) {
      return patternUtils.formatCustomPattern(cleanValue, pattern);
    }
    
    // Para otros patrones, usar formateo estándar
    let formatted = '';
    let valueIndex = 0;
    
    for (let i = 0; i < pattern.pattern.length && valueIndex < cleanValue.length; i++) {
      const patternChar = pattern.pattern[i];
      
      if (patternChar === DIGIT_PLACEHOLDER) {
        if (/[0-9]/.test(cleanValue[valueIndex])) {
          formatted += cleanValue[valueIndex];
          valueIndex++;
        } else {
          break; // Carácter inválido
        }
      } else if (patternChar === LETTER_PLACEHOLDER) {
        if (/[A-Za-z]/.test(cleanValue[valueIndex])) {
          formatted += cleanValue[valueIndex];
          valueIndex++;
        } else {
          break; // Carácter inválido
        }
      } else if (patternChar === ALPHANUMERIC_PLACEHOLDER) {
        if (/[A-Za-z0-9]/.test(cleanValue[valueIndex])) {
          formatted += cleanValue[valueIndex];
          valueIndex++;
        } else {
          break; // Carácter inválido
        }
      } else {
        // Carácter literal del patrón - agregar siempre
        formatted += patternChar;
      }
    }
    
    return formatted;
  },

  /**
   * Formateo progresivo inteligente para teléfonos (###) ###-####
   */
  formatPhoneProgressive: (cleanValue: string): string => {
    const len = cleanValue.length;
    
    if (len === 0) return '';
    if (len <= 3) return cleanValue; // "5", "55", "555"
    if (len <= 6) return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3)}`; // "(555) 1", "(555) 123"
    return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6, 10)}`; // "(555) 123-4567"
  },

  /**
   * Formateo progresivo inteligente para moneda $#,###.##
   */
  formatCurrencyProgressive: (cleanValue: string): string => {
    if (!cleanValue) return '';
    
    // Manejar números negativos
    const isNegative = cleanValue.startsWith('-');
    const positiveValue = isNegative ? cleanValue.slice(1) : cleanValue;
    
    if (!positiveValue) return isNegative ? '-$0.00' : '$0.00';
    
    // Para moneda, siempre agregar .00 si no hay decimal
    let result = '$';
    
    // Formatear parte entera con comas
    if (positiveValue.length > 0) {
      let formattedInteger = '';
      for (let i = positiveValue.length - 1; i >= 0; i--) {
        if (i !== positiveValue.length - 1 && (positiveValue.length - 1 - i) % 3 === 0) {
          formattedInteger = ',' + formattedInteger;
        }
        formattedInteger = positiveValue[i] + formattedInteger;
      }
      result += formattedInteger;
    } else {
      result += '0';
    }
    
    // Siempre agregar .00 para formato de moneda
    result += '.00';
    
    return isNegative ? '-' + result : result;
  },

  /**
   * Formateo para patrones personalizados con letras y números
   */
  formatCustomPattern: (cleanValue: string, pattern: FormatPattern): string => {
    let formatted = '';
    let valueIndex = 0;
    
    for (let i = 0; i < pattern.pattern.length && valueIndex < cleanValue.length; i++) {
      const patternChar = pattern.pattern[i];
      
      if (patternChar === DIGIT_PLACEHOLDER) {
        if (/[0-9]/.test(cleanValue[valueIndex])) {
          formatted += cleanValue[valueIndex];
          valueIndex++;
        } else {
          break;
        }
      } else if (patternChar === LETTER_PLACEHOLDER) {
        if (/[A-Za-z]/.test(cleanValue[valueIndex])) {
          // Aplicar transformación si existe
          let char = cleanValue[valueIndex];
          if (pattern.transform) {
            char = pattern.transform(char);
          }
          formatted += char;
          valueIndex++;
        } else {
          break;
        }
      } else if (patternChar === ALPHANUMERIC_PLACEHOLDER) {
        if (/[A-Za-z0-9]/.test(cleanValue[valueIndex])) {
          // Aplicar transformación si existe
          let char = cleanValue[valueIndex];
          if (pattern.transform) {
            char = pattern.transform(char);
          }
          formatted += char;
          valueIndex++;
        } else {
          break;
        }
      } else {
        // Carácter literal del patrón - agregar siempre
        formatted += patternChar;
      }
    }
    
    return formatted;
  },

  /**
   * Extraer valor sin formato (versión mejorada)
   */
  unformat: (formattedValue: string, pattern: FormatPattern): string => {
    if (!formattedValue) return '';
    
    try {
      // Para teléfonos, limpiar específicamente con más agresividad
      if (pattern.pattern === "(###) ###-####") {
        // Remover todo excepto dígitos, incluyendo espacios, paréntesis, guiones, etc.
        return formattedValue.replace(/[^0-9]/g, '');
      }
      
      // Para moneda, preservar el signo negativo
      if (pattern.pattern === "$#,###.##") {
        const cleaned = formattedValue.replace(/[^0-9.-]/g, '');
        // Asegurar que solo haya un guión al inicio
        if (cleaned.startsWith('-')) {
          return '-' + cleaned.slice(1).replace(/-/g, '');
        }
        return cleaned.replace(/-/g, '');
      }
      
      // Para otros patrones, usar regex de caracteres permitidos
      const allowedCharsRegex = new RegExp(pattern.allowedChars.source, 'g');
      const matches = formattedValue.match(allowedCharsRegex);
      return matches ? matches.join('') : '';
    } catch (e) {
      // Fallback seguro: solo dígitos para teléfonos
      if (pattern.pattern === "(###) ###-####") {
        return formattedValue.replace(/[^0-9]/g, '');
      }
      return formattedValue.replace(/[^0-9A-Za-z]/g, '');
    }
  },

  /**
   * Validar si carácter es permitido
   */
  isCharAllowed: (char: string, pattern: FormatPattern): boolean => {
    return pattern.allowedChars.test(char);
  },

  /**
   * Calcular nueva posición de cursor
   */
  calculateCursorPosition: (
    oldValue: string,
    newValue: string,
    oldCursor: number,
    pattern: FormatPattern
  ): number => {
    // Lógica simplificada - en implementación real sería más compleja
    const diff = newValue.length - oldValue.length;
    let newCursor = oldCursor + diff;
    
    // Ajustar si el cursor está en un carácter de formato
    while (newCursor < newValue.length && 
           !isDataCharacterPosition(newCursor, pattern.pattern)) {
      newCursor++;
    }
    
    return Math.min(newCursor, newValue.length);
  },

  /**
   * Generar placeholder desde patrón
   */
  generatePlaceholder: (pattern: FormatPattern): string => {
    return pattern.placeholder || pattern.pattern.replace(/[#AX]/g, '_');
  },
};

/**
 * Obtener patrón por tipo
 */
export const getPatternByType = (type: PredefinedPatternType): FormatPattern => {
  const pattern = PREDEFINED_PATTERNS[type];
  if (!pattern) {
    throw new Error(`Pattern type '${type}' not found`);
  }
  return pattern;
};

/**
 * Crear patrón personalizado con validaciones
 */
export const createCustomPattern = (
  pattern: string,
  allowedChars: RegExp,
  options: Partial<FormatPattern> = {}
): FormatPattern => {
  return {
    pattern,
    allowedChars,
    placeholder: options.placeholder || pattern.replace(/[#AX]/g, '_'),
    description: options.description || `Formato ${pattern}`,
    maxLength: options.maxLength || pattern.replace(/[^#AX]/g, '').length,
    ...options,
  };
};

// ============================================================================
// UTILIDADES AUXILIARES
// ============================================================================

/**
 * Validación Luhn para tarjetas de crédito
 */
function validateLuhn(cardNumber: string): boolean {
  let sum = 0;
  let alternate = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let n = parseInt(cardNumber.charAt(i), 10);
    
    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }
    
    sum += n;
    alternate = !alternate;
  }
  
  return (sum % 10) === 0;
}

/**
 * Validar fecha
 */
function isValidDate(day: number, month: number, year: number): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;
  
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  // Año bisiesto
  if (month === 2 && isLeapYear(year)) {
    return day <= 29;
  }
  
  return day <= daysInMonth[month - 1];
}

/**
 * Verificar año bisiesto
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Obtener índice del patrón para una posición formateada
 */
function getRawPatternIndex(formattedIndex: number, pattern: string): number {
  let patternIndex = 0;
  
  for (let i = 0; i <= formattedIndex && patternIndex < pattern.length; patternIndex++) {
    if (i === formattedIndex) {
      return patternIndex;
    }
    i++;
  }
  
  return -1;
}

/**
 * Verificar si una posición corresponde a datos vs formato
 */
function isDataCharacterPosition(position: number, pattern: string): boolean {
  if (position >= pattern.length) return false;
  const char = pattern[position];
  return [DIGIT_PLACEHOLDER, LETTER_PLACEHOLDER, ALPHANUMERIC_PLACEHOLDER].includes(char);
}

/**
 * Limpiar valor manteniendo solo caracteres de datos
 */
export const cleanValue = (value: string, pattern: FormatPattern): string => {
  if (!value) return '';
  
  try {
    // Para teléfonos, usar limpieza específica
    if (pattern?.pattern === "(###) ###-####") {
      return value.replace(/[^0-9]/g, '');
    }
    
    // Para moneda, usar limpieza específica
    if (pattern?.pattern === "$#,###.##") {
      // Remover el símbolo $ y las comas, pero preservar el punto decimal y el guión
      const withoutDollar = value.replace(/\$/g, '');
      const withoutCommas = withoutDollar.replace(/,/g, '');
      // Asegurar que solo haya un guión al inicio
      if (withoutCommas.startsWith('-')) {
        return '-' + withoutCommas.slice(1).replace(/-/g, '');
      }
      return withoutCommas.replace(/-/g, '');
    }
    
    // Para otros patrones
    if (pattern?.allowedChars) {
      return value.replace(new RegExp(`[^${pattern.allowedChars.source.slice(1, -1)}]`, 'g'), '');
    }
    
    // Fallback genérico
    return value.replace(/[^0-9A-Za-z]/g, '');
  } catch (e) {
    // Fallback si hay problemas con regex
    return value.replace(/[^0-9A-Za-z]/g, '');
  }
};

/**
 * Formatear valor de moneda
 */
export const formatCurrency = (value: number, locale: string = 'en-US', currency: string = 'USD'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Detectar tipo de tarjeta de crédito
 */
export const detectCardType = (cardNumber: string): string => {
  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  };
  
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(cardNumber.replace(/\s/g, ''))) {
      return type;
    }
  }
  
  return 'unknown';
};
