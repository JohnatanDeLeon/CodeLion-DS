import { style, globalStyle } from "@vanilla-extract/css";
import { colors, effects, typography, spacing, animation } from "../tokens";

/**
 * Input Component Styles - Implementación Directa
 * Solución específica para el problema de solapamiento ícono-placeholder
 */

/* ============================================================================
 * CONTENEDOR PRINCIPAL
 * ============================================================================ */

export const inputContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[2.5], // 10px
});

/* ============================================================================
 * WRAPPER DEL INPUT - Posicionamiento relativo para íconos absolutos
 * ============================================================================ */

export const inputWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
});

/* ============================================================================
 * ÍCONOS - Posicionamiento absoluto con tamaños fijos
 * ============================================================================ */

export const inputLeftIcon = style({
  position: "absolute",
  left: "1rem", // 16px desde el borde izquierdo
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  pointerEvents: "none", // Importante: evita interferir con clics
  
  // Estado base - Más visible pero "apagado"
  color: colors.neutral[500], // Más contraste que neutral[400]
  transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  
  // Asegurar tamaño consistente del ícono
  width: "1rem", // 16px
  height: "1rem", // 16px
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  
  // Sutil efecto de profundidad en estado base
  filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
});

export const inputRightIcon = style({
  position: "absolute",
  right: "1rem", // 16px desde el borde derecho
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
  pointerEvents: "none", // Importante: evita interferir con clics
  
  // Estado base - Más visible pero "apagado"
  color: colors.neutral[500], // Más contraste que neutral[400]
  transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  
  // Asegurar tamaño consistente del ícono
  width: "1rem", // 16px
  height: "1rem", // 16px
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  
  // Sutil efecto de profundidad en estado base
  filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))",
});

/* ============================================================================
 * CAMPO INPUT BASE
 * ============================================================================ */

export const inputField = style({
  width: "100%",
  padding: `${spacing[3]} ${spacing[4]}`, // 12px vertical, 16px horizontal
  
  // ESTADO BASE (IDLE) MEJORADO - "Apagado" pero perceptible
  border: `1px solid ${colors.neutral[300]}`, // Más visible que neutral[200]
  borderRadius: effects.borderRadius.xl, // 12px
  backgroundColor: colors.neutral[25], // Ligeramente tintado en lugar de blanco puro
  fontSize: typography.fontSize.sm, // 14px
  fontWeight: typography.fontWeight.semibold, // 600
  fontFamily: typography.fontFamily.sans,
  
  // Transición suave para efecto "encendido/apagado"
  transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  
  // Sombra sutil que sugiere interactividad
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.neutral[200]}25`, // Sombra interior sutil
  
  // Placeholder styles - Más contraste en estado base
  "::placeholder": {
    color: colors.neutral[500], // Más visible que neutral[400]
    fontWeight: typography.fontWeight.medium, // 500
  },
  
  // HOVER STATE - Transición intermedia hacia "encendido"
  ":hover": {
    borderColor: colors.neutral[400], // Progresión gradual
    boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.neutral[300]}40`, // Efecto de pre-focus
    backgroundColor: colors.white, // Se aclara al pasar mouse
    transform: "translateY(-1px)", // Sutil elevación como en Button
  },
  
  // FOCUS STATE - "ENCENDIDO" dramático
  ":focus": {
    outline: "none",
    borderColor: colors.primary[600], // Más intenso que [500]
    backgroundColor: colors.white, // Completamente blanco cuando activo
    
    // Efecto de "encendido" con glow más prominente
    boxShadow: [
      `0 0 0 3px ${colors.primary[500]}30`, // Ring más visible
      `0 0 30px ${colors.primary[500]}15`, // Glow effect extendido
      `${effects.shadow.md}`, // Sombra más pronunciada
      `inset 0 1px 0 ${colors.white}` // Highlight interior
    ].join(", "),
    
    transform: "translateY(-2px)", // Elevación más pronunciada que hover
  },
  
  // DISABLED STATE - Claramente "apagado"
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
    backgroundColor: colors.neutral[100], // Más gris que el base
    borderColor: colors.neutral[200], // Borde menos contrastante
    transform: "none", // Sin elevación
    boxShadow: "none", // Sin efectos de luz
  },
  
  // Responsive design
  "@media": {
    "(max-width: 640px)": {
      fontSize: typography.fontSize.base, // 16px - prevents zoom on iOS
    },
  },
});

/* ============================================================================
 * CLASES PARA INPUTS CON ÍCONOS - Padding específico para evitar solapamiento
 * ============================================================================ */

export const inputFieldWithLeftIcon = style({
  paddingLeft: "2.75rem", // 44px = 16px (ícono) + 8px (espacio) + 16px (padding base) + 4px (extra)
});

export const inputFieldWithRightIcon = style({
  paddingRight: "2.75rem", // 44px = 16px (ícono) + 8px (espacio) + 16px (padding base) + 4px (extra)
});

export const inputFieldWithBothIcons = style({
  paddingLeft: "2.75rem",
  paddingRight: "2.75rem",
});

export const inputFieldWithErrorAndRightIcon = style({
  paddingRight: "3rem", // 48px - espacio extra para el ícono de error
});

/* ============================================================================
 * ESTADOS DE ERROR
 * ============================================================================ */

export const inputFieldError = style({
  // Estado base error - "Apagado" pero con indicación de error
  borderColor: colors.error[400], // Más visible que [300]
  backgroundColor: colors.error[25],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.error[200]}25`,
  
  // Hover error - Transición hacia "encendido"
  ":hover": {
    borderColor: colors.error[500],
    backgroundColor: colors.error[50],
    boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.error[400]}40`,
    transform: "translateY(-1px)",
  },
  
  // Focus error - "Encendido" con error prominente
  ":focus": {
    borderColor: colors.error[600],
    backgroundColor: colors.white,
    boxShadow: [
      `0 0 0 3px ${colors.error[500]}30`,
      `0 0 30px ${colors.error[500]}15`,
      `${effects.shadow.md}`,
      `inset 0 1px 0 ${colors.white}`
    ].join(", "),
    transform: "translateY(-2px)",
  },
});

export const inputFieldSuccess = style({
  // Estado base success - "Apagado" pero con indicación de éxito
  borderColor: colors.success[400], // Más visible que [300]
  backgroundColor: colors.success[25],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.success[200]}25`,
  
  // Hover success - Transición hacia "encendido"
  ":hover": {
    borderColor: colors.success[500],
    backgroundColor: colors.success[50],
    boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.success[400]}40`,
    transform: "translateY(-1px)",
  },
  
  // Focus success - "Encendido" con éxito prominente
  ":focus": {
    borderColor: colors.success[600],
    backgroundColor: colors.white,
    boxShadow: [
      `0 0 0 3px ${colors.success[500]}30`,
      `0 0 30px ${colors.success[500]}15`,
      `${effects.shadow.md}`,
      `inset 0 1px 0 ${colors.white}`
    ].join(", "),
    transform: "translateY(-2px)",
  },
});

export const inputFieldWarning = style({
  // Estado base warning - "Apagado" pero con indicación de advertencia
  borderColor: colors.warning[400], // Más visible que [300]
  backgroundColor: colors.warning[25],
  boxShadow: `${effects.shadow.xs}, inset 0 1px 2px ${colors.warning[200]}25`,
  
  // Hover warning - Transición hacia "encendido"
  ":hover": {
    borderColor: colors.warning[500],
    backgroundColor: colors.warning[50],
    boxShadow: `${effects.shadow.sm}, 0 0 0 1px ${colors.warning[400]}40`,
    transform: "translateY(-1px)",
  },
  
  // Focus warning - "Encendido" con advertencia prominente
  ":focus": {
    borderColor: colors.warning[600],
    backgroundColor: colors.white,
    boxShadow: [
      `0 0 0 3px ${colors.warning[500]}30`,
      `0 0 30px ${colors.warning[500]}15`,
      `${effects.shadow.md}`,
      `inset 0 1px 0 ${colors.white}`
    ].join(", "),
    transform: "translateY(-2px)",
  },
});

/* ============================================================================
 * ESTILOS DE ÍCONOS EN DIFERENTES ESTADOS
 * ============================================================================ */

// ESTADOS INTERACTIVOS DE ÍCONOS - "Encendido/Apagado"

// Hover - Transición intermedia
globalStyle(`${inputWrapper}:hover ${inputLeftIcon}`, {
  color: colors.neutral[600],
  filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1))",
  transform: "translateY(-50%) scale(1.05)", // Sutil aumento
});

globalStyle(`${inputWrapper}:hover ${inputRightIcon}`, {
  color: colors.neutral[600],
  filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1))",
  transform: "translateY(-50%) scale(1.05)", // Sutil aumento
});

// Focus - "ENCENDIDO" dramático
globalStyle(`${inputWrapper}:focus-within ${inputLeftIcon}`, {
  color: colors.primary[600], // Más intenso que [500]
  filter: [
    "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))",
    `drop-shadow(0 0 8px ${colors.primary[500]}40)` // Glow effect
  ].join(" "),
  transform: "translateY(-50%) scale(1.1)", // Más prominente
});

globalStyle(`${inputWrapper}:focus-within ${inputRightIcon}`, {
  color: colors.primary[600], // Más intenso que [500]
  filter: [
    "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))",
    `drop-shadow(0 0 8px ${colors.primary[500]}40)` // Glow effect
  ].join(" "),
  transform: "translateY(-50%) scale(1.1)", // Más prominente
});

// Ícono cuando el input está deshabilitado
globalStyle(`${inputField}:disabled ~ ${inputLeftIcon}`, {
  color: colors.neutral[400],
  opacity: 0.6,
});

globalStyle(`${inputField}:disabled ~ ${inputRightIcon}`, {
  color: colors.neutral[400],
  opacity: 0.6,
});

// Ícono cuando el input tiene error
globalStyle(`${inputFieldError} ~ ${inputLeftIcon}`, {
  color: colors.error[500],
});

/* ============================================================================
 * LABEL
 * ============================================================================ */

export const inputLabel = style({
  display: "block",
  fontSize: typography.fontSize.sm, // 14px
  fontWeight: typography.fontWeight.semibold, // 600
  
  // Estado base - Mejor contraste y presencia visual
  color: colors.neutral[800], // Más contraste que neutral[700]
  letterSpacing: typography.letterSpacing.tight,
  fontFamily: typography.fontFamily.sans,
  marginBottom: spacing[1.5],
  
  // Sutil efecto de profundidad
  textShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
  
  // Transición suave para cambios de estado
  transition: `color ${animation.duration.normal} ${animation.easing.easeInOut}`,
});

export const inputLabelRequired = style({
  selectors: {
    "&::after": {
      content: " *",
      color: colors.error[500],
    },
  },
});

export const inputLabelError = style({
  color: colors.error[700],
});

/* ============================================================================
 * TEXTOS DE AYUDA Y ERROR
 * ============================================================================ */

export const inputHint = style({
  fontSize: typography.fontSize.sm, // 14px
  color: colors.neutral[500],
  fontWeight: typography.fontWeight.medium, // 500
  fontFamily: typography.fontFamily.sans,
  marginTop: spacing[1.5],
});

export const inputErrorMessage = style({
  fontSize: typography.fontSize.sm, // 14px
  color: colors.error[600],
  fontWeight: typography.fontWeight.semibold, // 600
  fontFamily: typography.fontFamily.sans,
  display: "flex",
  alignItems: "center",
  gap: spacing[2], // 8px
  marginTop: spacing[3], // 12px
});

/* ============================================================================
 * ÍCONOS DE ESTADO (ERROR, SUCCESS, WARNING)
 * ============================================================================ */

export const inputErrorIcon = style({
  position: "absolute",
  right: "1rem", // 16px
  top: "50%",
  transform: "translateY(-50%)",
  color: colors.error[500],
  zIndex: 15, // Mayor que íconos regulares
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.25rem", // 20px
  height: "1.25rem", // 20px
  borderRadius: effects.borderRadius.full,
  backgroundColor: colors.error[100],
});

export const inputSuccessIcon = style({
  position: "absolute",
  right: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
  color: colors.success[500],
  zIndex: 15,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1rem",
  height: "1rem",
});

export const inputWarningIcon = style({
  position: "absolute",
  right: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
  color: colors.warning[500],
  zIndex: 15,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1rem",
  height: "1rem",
});

/* ============================================================================
 * LOADING SPINNER
 * ============================================================================ */

export const inputSpinner = style({
  animation: "spin 1s linear infinite",
  color: colors.primary[500],
});

// Animación de spinner
globalStyle("@keyframes spin", {
  to: { transform: "rotate(360deg)" },
});

/* ============================================================================
 * VARIANTES DE TAMAÑO
 * ============================================================================ */

export const inputFieldSmall = style({
  padding: `${spacing[2]} ${spacing[3]}`, // 8px 12px
  fontSize: typography.fontSize.xs,
  height: spacing[8], // 32px
});

export const inputFieldLarge = style({
  padding: `${spacing[4]} ${spacing[5]}`, // 16px 20px
  fontSize: typography.fontSize.base,
  height: spacing[12], // 48px
});

// Ajustes de padding para tamaños con íconos
export const inputFieldSmallWithLeftIcon = style({
  paddingLeft: "2.5rem", // 40px para inputs pequeños
});

export const inputFieldSmallWithRightIcon = style({
  paddingRight: "2.5rem", // 40px para inputs pequeños
});

export const inputFieldLargeWithLeftIcon = style({
  paddingLeft: "3rem", // 48px para inputs grandes
});

export const inputFieldLargeWithRightIcon = style({
  paddingRight: "3rem", // 48px para inputs grandes
});

/* ============================================================================
 * DARK MODE SUPPORT
 * ============================================================================ */

globalStyle(`${inputField} @media (prefers-color-scheme: dark)`, {
  backgroundColor: colors.neutral[800],
  borderColor: colors.neutral[600],
  color: colors.white,
});

globalStyle(`${inputField}::placeholder @media (prefers-color-scheme: dark)`, {
  color: colors.neutral[400],
});

globalStyle(`${inputLabel} @media (prefers-color-scheme: dark)`, {
  color: colors.neutral[200],
});

globalStyle(`${inputHint} @media (prefers-color-scheme: dark)`, {
  color: colors.neutral[400],
});