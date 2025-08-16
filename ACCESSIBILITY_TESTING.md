# 🔍 Accessibility Testing Setup

## ✅ Configuración Completada

### Dependencias Agregadas:
- `@storybook/test-runner`: "^0.19.1" 
- `playwright`: "^1.48.0"
- `axe-playwright`: "^2.0.3"
- `http-server`: "^14.1.1"

### Archivos de Configuración Creados:
- `.storybook/main.ts` - Configuración principal de Storybook
- `.storybook/preview.ts` - Preview con configuración de a11y
- `.storybook/test-runner.ts` - Configuración de tests de accesibilidad
- `playwright.config.ts` - Configuración de Playwright

### Scripts Agregados:
- `test:a11y` - Ejecuta tests de accesibilidad
- `storybook` - Inicia Storybook dev server

## 🧪 Comandos de Testing Local

```powershell
# 1. Instalar dependencias nuevas
npm install

# 2. Instalar browsers de Playwright
npx playwright install --with-deps

# 3. Iniciar Storybook (en terminal separado)
npm run storybook

# 4. Ejecutar tests de accesibilidad
npm run test:a11y
```

## 🚀 Flujo de CI/CD Corregido

### PR Checks Workflow:
1. ✅ Instala dependencias con `npm ci`
2. ✅ Instala browsers de Playwright con `npx playwright install --with-deps`
3. ✅ Construye Storybook estático
4. ✅ Sirve Storybook en puerto 6006
5. ✅ Espera que Storybook esté listo (con timeout)
6. ✅ Ejecuta tests de accesibilidad con `npm run test:a11y`

## 📋 Verificaciones Pre-Commit

Antes de hacer push, verifica localmente:
- [ ] `npm run build` - Build exitoso
- [ ] `npm run build-storybook` - Storybook build exitoso  
- [ ] `npm run storybook` - Storybook inicia sin errores
- [ ] `npm run test:a11y` - Tests de accesibilidad pasan

## 🔧 Troubleshooting

### Error: Playwright browsers not installed
```powershell
npx playwright install --with-deps
```

### Error: Storybook not starting
```powershell
# Verificar puerto disponible
netstat -an | findstr :6006

# Limpiar cache si es necesario
Remove-Item -Path node_modules -Recurse -Force
npm install
```

### Error: Test runner fails
```powershell
# Verificar que Storybook esté corriendo
curl http://localhost:6006

# Ejecutar con debug
npm run test:a11y -- --verbose
```
