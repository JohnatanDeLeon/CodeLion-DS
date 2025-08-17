/**
 * Input Formatting System
 * Sistema robusto para formateo automático con patrones predefinidos y personalizados
 */

/**
 * Carácter especial que representa un dígito en el patrón
 */
export const DIGIT_PLACEHOLDER = "#";

/**
 * Carácter especial que representa una letra en el patrón
 */
export const LETTER_PLACEHOLDER = "A";

/**
 * Carácter especial que representa cualquier carácter alfanumérico
 */
export const ALPHANUMERIC_PLACEHOLDER = "X";

/**
 * Definición de un patrón de formateo
 */
export interface FormatPattern {
  /**
   * Patrón de formateo usando placeholders
   * # = dígito, A = letra, X = alfanumérico
   * Ejemplo: "(###) ###-####" para teléfono
   */
  pattern: string;

  /**
   * Caracteres permitidos como entrada
   */
  allowedChars: RegExp;

  /**
   * Valor de ejemplo para mostrar al usuario
   */
  placeholder?: string;

  /**
   * Descripción del formato para accesibilidad
   */
  description?: string;

  /**
   * Transformación personalizada del valor antes de formatear
   */
  transform?: (value: string) => string;

  /**
   * Validación personalizada del valor completo
   */
  validate?: (value: string, formattedValue: string) => boolean;

  /**
   * Longitud máxima del valor sin formato
   */
  maxLength?: number;

  /**
   * Si debe anunciar cambios a lectores de pantalla
   */
  announceChanges?: boolean;
}

/**
 * Tipos de patrones predefinidos
 */
export type PredefinedPatternType =
  | "phone"
  | "phone-international"
  | "credit-card"
  | "credit-card-expiry"
  | "credit-card-cvv"
  | "currency"
  | "currency-no-cents"
  | "postal-code"
  | "postal-code-us"
  | "date"
  | "date-us"
  | "time"
  | "time-24h"
  | "ssn"
  | "tax-id"
  | "license-plate";

/**
 * Configuración de formateo para el Input
 */
export interface InputFormatConfig {
  /**
   * Tipo de patrón predefinido a usar
   */
  type?: PredefinedPatternType;

  /**
   * Patrón personalizado (sobrescribe type si se proporciona)
   */
  pattern?: FormatPattern;

  /**
   * Si debe mostrar formato en placeholder
   */
  showFormatInPlaceholder?: boolean;

  /**
   * Si debe preservar caracteres de formato al copiar
   */
  preserveFormatOnCopy?: boolean;

  /**
   * Callback cuando el valor cambia
   */
  onValueChange?: (rawValue: string, formattedValue: string) => void;

  /**
   * Callback cuando el formato se completa
   */
  onFormatComplete?: (rawValue: string, formattedValue: string) => void;
}

/**
 * Estado del hook de formateo
 */
export interface FormattingState {
  /**
   * Valor formateado mostrado al usuario
   */
  formattedValue: string;

  /**
   * Valor sin formato (solo datos)
   */
  rawValue: string;

  /**
   * Si el formato está completo
   */
  isComplete: boolean;

  /**
   * Si el valor actual es válido
   */
  isValid: boolean;

  /**
   * Posición del cursor
   */
  cursorPosition: number;

  /**
   * Si está en estado de formateo
   */
  isFormatting: boolean;
}

/**
 * Resultado del hook useInputFormat
 */
export interface UseInputFormatResult extends FormattingState {
  /**
   * Manejador de cambios del input
   */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Manejador de pegado
   */
  handlePaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;

  /**
   * Manejador de teclas
   */
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Manejador de selección/cursor
   */
  handleSelect: (event: React.SyntheticEvent<HTMLInputElement>) => void;

  /**
   * Resetear el valor
   */
  reset: () => void;

  /**
   * Establecer valor programáticamente
   */
  setValue: (value: string) => void;

  /**
   * Obtener placeholder formateado
   */
  getFormattedPlaceholder: () => string;

  /**
   * Obtener descripción para screen readers
   */
  getA11yDescription: () => string;
}

/**
 * Opciones del hook de formateo
 */
export interface UseInputFormatOptions {
  /**
   * Configuración de formateo
   */
  config: InputFormatConfig;

  /**
   * Valor inicial
   */
  initialValue?: string;

  /**
   * Si debe activarse inmediatamente
   */
  immediate?: boolean;

  /**
   * Callback de debug
   */
  onDebug?: (state: FormattingState) => void;

  /**
   * Callback cuando el valor formateado cambia (para componentes controlados)
   */
  onFormatChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Utilidades para trabajo con patrones
 */
export interface PatternUtils {
  /**
   * Formatear un valor según patrón
   */
  format: (value: string, pattern: FormatPattern) => string;

  /**
   * Extraer valor sin formato
   */
  unformat: (formattedValue: string, pattern: FormatPattern) => string;

  /**
   * Validar si un carácter es permitido
   */
  isCharAllowed: (char: string, pattern: FormatPattern) => boolean;

  /**
   * Calcular posición de cursor después de formateo
   */
  calculateCursorPosition: (
    oldValue: string,
    newValue: string,
    oldCursor: number,
    pattern: FormatPattern,
  ) => number;

  /**
   * Generar placeholder desde patrón
   */
  generatePlaceholder: (pattern: FormatPattern) => string;
}

/**
 * Eventos de formateo para analytics
 */
export interface FormattingEvents {
  onFormatStart?: () => void;
  onFormatComplete?: (pattern: string, duration: number) => void;
  onFormatError?: (error: string, pattern: string) => void;
  onValidationChange?: (isValid: boolean, value: string) => void;
}

/**
 * Props extendidas para Input con formateo
 */
export interface FormattedInputProps {
  /**
   * Configuración de formateo
   */
  format?: InputFormatConfig;

  /**
   * Eventos de formateo
   */
  formatEvents?: FormattingEvents;

  /**
   * Si debe mostrar indicador de formato activo
   */
  showFormatIndicator?: boolean;

  /**
   * Estilo del indicador de formato
   */
  formatIndicatorStyle?: "subtle" | "prominent" | "none";
}

/**
 * Error de formateo
 */
export class FormattingError extends Error {
  constructor(
    message: string,
    public pattern: string,
    public value: string,
  ) {
    super(message);
    this.name = "FormattingError";
  }
}
