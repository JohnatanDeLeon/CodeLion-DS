---
"@johnatandeleon/design-system": prerelease
---

## 🚀 Versión de Prueba (Beta) - Input Mask Engine

### ✨ Nuevas Características
- **Sistema de Máscaras de Input Completo**: Motor de máscaras robusto y extensible
- **Máscara de Currency**: Formateo automático de moneda con soporte para dólares y centavos
- **Máscara de Phone**: Formateo automático de números telefónicos US
- **Máscara de Serial**: Formateo de códigos seriales (AAA-0000)
- **Sistema de Registro de Máscaras**: API para registrar máscaras personalizadas

### 🔧 Mejoras Técnicas
- **Hook useInputMask**: Hook React optimizado para manejo de máscaras
- **Validación Robusta**: Sistema de validación para inputs con máscaras
- **Posicionamiento de Cursor Inteligente**: Manejo automático de la posición del cursor
- **Metadata Enriquecida**: Información adicional como valor en centavos, dólares, etc.

### 🧪 Testing y Calidad
- **Tests Unitarios Completos**: 376 tests pasando al 100%
- **Tests de Integración**: Validación DOM completa para máscaras
- **Tests de Máscaras**: Cobertura completa para currency, phone y serial
- **Validaciones DOM**: Verificación de que los valores esperados aparecen en el DOM

### 📚 Documentación y Storybook
- **Stories Completas**: Documentación interactiva para todas las máscaras
- **Componentes de Debug**: CurrencyTest y DirectCurrencyTest para troubleshooting
- **Guías de Uso**: Instrucciones detalladas para implementar máscaras
- **Ejemplos Prácticos**: Casos de uso reales para e-commerce y formularios

### 🎯 Casos de Uso Principales
- **E-commerce**: Precios y cantidades con formato automático
- **Formularios**: Validación y formateo de datos de entrada
- **Aplicaciones Financieras**: Manejo preciso de valores monetarios
- **Sistemas de Inventario**: Códigos de producto y números seriales

### 🔍 Características de Debug
- **Logger Interno**: Sistema de logging para debugging sin console.*
- **Componentes de Test**: Herramientas visuales para validar máscaras
- **Información de Metadata**: Visualización de valores raw, formatted y meta
- **Validación en Tiempo Real**: Feedback inmediato sobre el comportamiento de las máscaras

### 🚨 Cambios Breaking
- Ninguno - esta es una versión de prueba que mantiene compatibilidad

### 📋 Instrucciones de Instalación
```bash
# Instalar versión beta
npm install @johnatandeleon/design-system@beta

# O especificar versión exacta
npm install @johnatandeleon/design-system@3.1.1-beta.0
```

### 🧪 Cómo Probar
1. Abrir Storybook: `npm run storybook`
2. Navegar a "Components/Forms/Input/Masks"
3. Probar las máscaras de currency, phone y serial
4. Usar los componentes de debug para validar comportamiento

### 🔗 Enlaces Útiles
- **Storybook**: http://localhost:6006
- **Tests**: `npm test`
- **Build**: `npm run build`
- **Linting**: `npm run lint`

