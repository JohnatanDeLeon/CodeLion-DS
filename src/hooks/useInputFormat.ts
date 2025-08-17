/**
 * Hook para formateo automático de inputs
 * Maneja la lógica completa de formateo, validación y accesibilidad
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  UseInputFormatResult, 
  UseInputFormatOptions, 
  FormattingState, 
  FormatPattern,
  InputFormatConfig 
} from '../types/formatting';
import { 
  getPatternByType, 
  patternUtils, 
  cleanValue 
} from '../utils/formatting';
import { announce } from '../utils/a11y';

/**
 * Hook principal para formateo de inputs
 */
export const useInputFormat = ({
  config,
  initialValue = '',
  immediate = true,
  onDebug,
}: UseInputFormatOptions): UseInputFormatResult => {
  
  // Obtener patrón de configuración
  const pattern = config.pattern || (config.type ? getPatternByType(config.type) : null);
  
  if (!pattern) {
    // Si no hay patrón válido, retornar un hook básico sin formateo
    return {
      formattedValue: initialValue,
      rawValue: initialValue,
      isComplete: false,
      isValid: true,
      cursorPosition: 0,
      isFormatting: false,
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
      handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => {},
      handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {},
      handleSelect: (e: React.SyntheticEvent<HTMLInputElement>) => {},
      reset: () => {},
      setValue: (value: string) => {},
      getFormattedPlaceholder: () => '',
      getA11yDescription: () => '',
    };
  }

  // Refs para manejo de cursor y elementos DOM
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorPositionRef = useRef<number>(0);
  const isFormattingRef = useRef<boolean>(false);
  const lastAnnouncementRef = useRef<string>('');
  const lastFormattedValueRef = useRef<string>('');
  const accumulatedValueRef = useRef<string>(''); // Para acumular caracteres en moneda

  // Estado principal del formateo
  const [state, setState] = useState<FormattingState>(() => {
    const cleaned = cleanValue(initialValue, pattern);
    const formatted = immediate ? patternUtils.format(cleaned, pattern) : initialValue;
    
    // Inicializar valor acumulado para moneda
    if (pattern.pattern === "$#,###.##" || pattern.pattern === "$#,###") {
      accumulatedValueRef.current = cleaned;
    }
    
    return {
      formattedValue: formatted,
      rawValue: cleaned,
      isComplete: pattern.validate ? pattern.validate(cleaned, formatted) : false,
      isValid: true,
      cursorPosition: 0,
      isFormatting: false,
    };
  });

  // Debug callback
  useEffect(() => {
    if (onDebug) {
      onDebug(state);
    }
  }, [state, onDebug]);

  /**
   * Actualizar estado de formateo
   */
  const updateState = useCallback((updates: Partial<FormattingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  /**
   * Establecer posición del cursor
   */
  const setCursorPosition = useCallback((position: number) => {
    cursorPositionRef.current = position;
    
    // Aplicar posición después del render
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(position, position);
      }
    });
  }, []);

  /**
   * Calcular posición del cursor después del formateo
   */
  const calculateCursorPosition = useCallback((
    oldValue: string,
    newValue: string,
    oldCursor: number,
    newRawValue: string
  ): number => {
    if (oldValue === newValue) return oldCursor;
    
    // Para patrones simples, usar lógica básica
    if (pattern.pattern === "(###) ###-####") {
      return calculatePhoneCursorPosition(oldValue, newValue, oldCursor, newRawValue);
    }
    
    if (pattern.pattern === "$#,###.##") {
      return calculateCurrencyCursorPosition(oldValue, newValue, oldCursor, newRawValue);
    }
    
    // Lógica genérica para otros patrones
    const diff = newValue.length - oldValue.length;
    let newCursor = oldCursor + diff;
    
    // Ajustar si el cursor está en un carácter de formato
    while (newCursor < newValue.length && 
           !isDataCharacterPosition(newCursor, pattern.pattern)) {
      newCursor++;
    }
    
    return Math.min(Math.max(0, newCursor), newValue.length);
  }, [pattern.pattern]);

  /**
   * Calcular posición del cursor para teléfonos
   */
  const calculatePhoneCursorPosition = useCallback((
    oldValue: string,
    newValue: string,
    oldCursor: number,
    newRawValue: string
  ): number => {
    // Mapear posición del cursor en el valor sin formato
    const oldRawValue = patternUtils.unformat(oldValue, pattern);
    const oldRawCursor = mapFormattedToRawPosition(oldValue, oldCursor);
    
    // Calcular nueva posición
    let newRawCursor = oldRawCursor;
    
    // Si se agregó un carácter, avanzar
    if (newRawValue.length > oldRawValue.length) {
      newRawCursor = oldRawCursor + 1;
    }
    // Si se eliminó un carácter, retroceder
    else if (newRawValue.length < oldRawValue.length) {
      newRawCursor = Math.max(0, oldRawCursor - 1);
    }
    
    // Mapear de vuelta a posición formateada
    return mapRawToFormattedPosition(newValue, newRawCursor);
  }, [pattern]);

  /**
   * Calcular posición del cursor para moneda
   */
  const calculateCurrencyCursorPosition = useCallback((
    oldValue: string,
    newValue: string,
    oldCursor: number,
    newRawValue: string
  ): number => {
    // Para moneda, mantener posición relativa después del símbolo $
    const oldAfterDollar = oldCursor > 1 ? oldCursor - 1 : 0;
    const newAfterDollar = newValue.length > 1 ? newValue.length - 1 : 0;
    
    return Math.min(newAfterDollar, newValue.length);
  }, []);

  /**
   * Mapear posición formateada a posición en valor sin formato
   */
  const mapFormattedToRawPosition = useCallback((formattedValue: string, formattedPosition: number): number => {
    let rawPosition = 0;
    
    for (let i = 0; i < formattedPosition && i < formattedValue.length; i++) {
      const patternIndex = i;
      if (patternIndex < pattern.pattern.length) {
        const patternChar = pattern.pattern[patternIndex];
        if (['#', 'A', 'X'].includes(patternChar)) {
          rawPosition++;
        }
      }
    }
    
    return rawPosition;
  }, [pattern.pattern]);

  /**
   * Mapear posición en valor sin formato a posición formateada
   */
  const mapRawToFormattedPosition = useCallback((formattedValue: string, rawPosition: number): number => {
    let formattedPosition = 0;
    let rawCount = 0;
    
    for (let i = 0; i < formattedValue.length && rawCount < rawPosition; i++) {
      const patternIndex = i;
      if (patternIndex < pattern.pattern.length) {
        const patternChar = pattern.pattern[patternIndex];
        if (['#', 'A', 'X'].includes(patternChar)) {
          rawCount++;
        }
      }
      formattedPosition = i + 1;
    }
    
    return formattedPosition;
  }, [pattern.pattern]);

  /**
   * Formatear valor y actualizar estado
   */
  const formatAndUpdate = useCallback((newRawValue: string, cursorPos?: number) => {
    isFormattingRef.current = true;

    // Debug: Log the formatting process
    console.log('🔍 formatAndUpdate - newRawValue:', newRawValue, 'pattern:', pattern.pattern);

    // Limpiar valor
    const cleaned = cleanValue(newRawValue, pattern);
    console.log('🔍 formatAndUpdate - cleaned:', cleaned);

    // Aplicar transformación personalizada si existe
    const transformed = pattern.transform ? pattern.transform(cleaned) : cleaned;
    console.log('🔍 formatAndUpdate - transformed:', transformed);

    // Formatear
    const formatted = patternUtils.format(transformed, pattern);
    console.log('🔍 formatAndUpdate - formatted:', formatted);

    // Validar
    const isValid = pattern.validate ? pattern.validate(transformed, formatted) : true;
    const isComplete = pattern.validate ? pattern.validate(transformed, formatted) : 
                      (pattern.maxLength ? transformed.length === pattern.maxLength : false);

    // Calcular nueva posición de cursor
    let newCursorPosition = formatted.length;
    if (cursorPos !== undefined) {
      newCursorPosition = calculateCursorPosition(
        lastFormattedValueRef.current,
        formatted,
        cursorPos,
        transformed
      );
    }

    // Actualizar estado
    updateState({
      formattedValue: formatted,
      rawValue: transformed,
      isComplete,
      isValid,
      cursorPosition: newCursorPosition,
      isFormatting: true,
    });

    // Establecer cursor
    setCursorPosition(newCursorPosition);

    // Actualizar referencia del último valor formateado
    lastFormattedValueRef.current = formatted;

    // Callbacks
    if (config.onValueChange) {
      config.onValueChange(transformed, formatted);
    }

    if (isComplete && config.onFormatComplete) {
      config.onFormatComplete(transformed, formatted);
    }

    isFormattingRef.current = false;
  }, [state.formattedValue, pattern, config, updateState, setCursorPosition, calculateCursorPosition]);

  /**
   * Manejador de cambios del input
   */
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (isFormattingRef.current) return;

    inputRef.current = event.target;
    const newValue = event.target.value;
    const cursorPosition = event.target.selectionStart || 0;
    
    cursorPositionRef.current = cursorPosition;

    // Debug: Log the input value
    console.log('🔍 handleChange - newValue:', newValue, 'pattern:', pattern.pattern);

    // Para moneda, usar un enfoque de acumulación diferente
    if (pattern.pattern === "$#,###.##" || pattern.pattern === "$#,###") {
      // Extraer solo los dígitos (sin punto decimal ni guión)
      const digitsOnly = newValue.replace(/[^0-9]/g, '');
      console.log('🔍 handleChange - digitsOnly:', digitsOnly);
      
      // Acumular el valor como un número entero
      accumulatedValueRef.current = digitsOnly;
      console.log('🔍 handleChange - accumulatedValue:', accumulatedValueRef.current);
      
      // Usar el valor acumulado para formateo
      formatAndUpdate(accumulatedValueRef.current, cursorPosition);
    } else {
      // Usar el valor directamente para otros patrones
      formatAndUpdate(newValue, cursorPosition);
    }
  }, [formatAndUpdate, pattern.pattern]);

  /**
   * Manejador de pegado inteligente
   */
  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    
    const pastedText = event.clipboardData.getData('text');
    
    // Limpiar el texto pegado primero para remover cualquier formato existente
    const unformatted = patternUtils.unformat(pastedText, pattern);
    
    // Para teléfonos, truncar a 10 dígitos máximo
    let truncated = unformatted;
    if (pattern.pattern === "(###) ###-####") {
      truncated = unformatted.slice(0, 10); // Forzar 10 dígitos máximo
    } else if (pattern.maxLength) {
      truncated = unformatted.slice(0, pattern.maxLength);
    }
    
    // Formatear el texto limpio y truncado
    formatAndUpdate(truncated);
  }, [formatAndUpdate, pattern]);

  /**
   * Manejador de teclas especiales
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    
    // Validar caracteres permitidos básicamente
    if (key.length === 1) {
      if (!patternUtils.isCharAllowed(key, pattern)) {
        event.preventDefault();
        return;
      }
    }
    
    // Manejar backspace y delete para patrones específicos
    if (key === 'Backspace' || key === 'Delete') {
      const input = event.target as HTMLInputElement;
      const cursorPosition = input.selectionStart || 0;
      
      // Para teléfonos, manejar eliminación inteligente
      if (pattern.pattern === "(###) ###-####") {
        handlePhoneKeyDown(event, cursorPosition);
      }
      // Para moneda, manejar eliminación inteligente
      else if (pattern.pattern === "$#,###.##" || pattern.pattern === "$#,###") {
        handleCurrencyKeyDown(event, cursorPosition);
      }
    }
  }, [pattern]);

  /**
   * Manejar teclas especiales para teléfonos
   */
  const handlePhoneKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>, cursorPosition: number) => {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    
    // Si el cursor está en un carácter de formato, saltar al siguiente carácter de datos
    if (cursorPosition < currentValue.length) {
      const nextDataPosition = findNextDataPosition(cursorPosition, pattern.pattern);
      if (nextDataPosition !== cursorPosition) {
        event.preventDefault();
        input.setSelectionRange(nextDataPosition, nextDataPosition);
        return;
      }
    }
  }, [pattern.pattern]);

  /**
   * Manejar teclas especiales para moneda
   */
  const handleCurrencyKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>, cursorPosition: number) => {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    
    // Si el cursor está en un carácter de formato, saltar al siguiente carácter de datos
    if (cursorPosition < currentValue.length) {
      const nextDataPosition = findNextDataPosition(cursorPosition, pattern.pattern);
      if (nextDataPosition !== cursorPosition) {
        event.preventDefault();
        input.setSelectionRange(nextDataPosition, nextDataPosition);
        return;
      }
    }
  }, [pattern.pattern]);

  /**
   * Manejador de selección/cursor
   */
  const handleSelect = useCallback((event: React.SyntheticEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    cursorPositionRef.current = input.selectionStart || 0;
  }, []);

  /**
   * Resetear valor
   */
  const reset = useCallback(() => {
    updateState({
      formattedValue: '',
      rawValue: '',
      isComplete: false,
      isValid: true,
      cursorPosition: 0,
      isFormatting: false,
    });
    setCursorPosition(0);
    lastFormattedValueRef.current = '';
  }, [updateState, setCursorPosition]);

  /**
   * Establecer valor programáticamente
   */
  const setValue = useCallback((value: string) => {
    const cleaned = cleanValue(value, pattern);
    formatAndUpdate(cleaned, 0);
  }, [pattern, formatAndUpdate]);

  /**
   * Obtener placeholder formateado
   */
  const getFormattedPlaceholder = useCallback((): string => {
    if (config.showFormatInPlaceholder && pattern.placeholder) {
      return pattern.placeholder;
    }
    return patternUtils.generatePlaceholder(pattern);
  }, [config.showFormatInPlaceholder, pattern]);

  /**
   * Obtener descripción para accesibilidad
   */
  const getA11yDescription = useCallback((): string => {
    let description = pattern.description || `Formato: ${pattern.pattern}`;
    
    if (state.isComplete) {
      description += ' - Completo';
    } else if (state.rawValue.length > 0) {
      const remaining = (pattern.maxLength || 0) - state.rawValue.length;
      if (remaining > 0) {
        description += ` - ${remaining} caracteres restantes`;
      }
    }
    
    return description;
  }, [pattern, state]);

  return {
    ...state,
    handleChange,
    handlePaste,
    handleKeyDown,
    handleSelect,
    reset,
    setValue,
    getFormattedPlaceholder,
    getA11yDescription,
  };
};

// ============================================================================
// UTILIDADES AUXILIARES
// ============================================================================

/**
 * Encontrar posición anterior de datos (saltando formato)
 */
function findPreviousDataPosition(currentPos: number, patternString: string): number {
  for (let i = currentPos - 1; i >= 0; i--) {
    if (i < patternString.length && ['#', 'A', 'X'].includes(patternString[i])) {
      return i;
    }
  }
  return 0;
}

/**
 * Encontrar posición siguiente de datos (saltando formato)
 */
function findNextDataPosition(currentPos: number, patternString: string): number {
  for (let i = currentPos + 1; i < patternString.length; i++) {
    if (['#', 'A', 'X'].includes(patternString[i])) {
      return i;
    }
  }
  return patternString.length;
}

/**
 * Verificar si una posición corresponde a datos vs formato
 */
function isDataCharacterPosition(position: number, pattern: string): boolean {
  if (position >= pattern.length) return false;
  const char = pattern[position];
  return ['#', 'A', 'X'].includes(char);
}

/**
 * Hook simplificado para casos básicos
 */
export const useSimpleFormat = (type: string, initialValue?: string) => {
  return useInputFormat({
    config: { type: type as any },
    initialValue,
    immediate: true,
  });
};
