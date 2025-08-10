# 📥 Guía de Consumo del Design System

## 1. Configuración en Proyecto Consumidor

### 1.1 Configuración de registry

```bash
# En el proyecto consumidor, crear .npmrc
echo "@company:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}" >> .npmrc
```

### 1.2 Variables de entorno

```bash
# .env.local o CI/CD
NPM_TOKEN=ghp_your_personal_access_token_here
```

### 1.3 Instalación

```bash
# Instalar la librería
npm install @company/design-system

# O con versión específica
npm install @company/design-system@^1.2.0
```

## 2. Configuración en Aplicación

### 2.1 Next.js Setup

```tsx
// pages/_app.tsx o app/layout.tsx
import '@company/design-system/styles';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### 2.2 Vite/React Setup

```tsx
// main.tsx
import '@company/design-system/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 2.3 Configuración de bundler

```js
// vite.config.js
export default defineConfig({
  optimizeDeps: {
    include: ['@company/design-system']
  }
});

// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@company/design-system': path.resolve(
        __dirname, 
        'node_modules/@company/design-system'
      )
    }
  }
};
```

## 3. Uso de Componentes

### 3.1 Importación básica

```tsx
import { Button, Input, Card } from '@company/design-system';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### 3.2 Uso de tokens

```tsx
import { tokens, colors, spacing } from '@company/design-system';

// En styled-components
const CustomComponent = styled.div`
  color: ${colors.primary[600]};
  padding: ${spacing[4]};
  background: ${tokens.colors.neutral[50]};
`;

// En CSS Modules
.customComponent {
  color: var(--colors-primary-600);
  padding: var(--spacing-4);
}
```

### 3.3 TypeScript Support

```tsx
import type { ButtonProps } from '@company/design-system';

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  icon, 
  children, 
  ...props 
}) => (
  <Button {...props}>
    {icon && <span className="mr-2">{icon}</span>}
    {children}
  </Button>
);
```

## 4. Estrategias de Versionado

### 4.1 Rangos de versiones recomendados

```json
{
  "dependencies": {
    // ✅ RECOMENDADO: Minor updates automáticos
    "@company/design-system": "^1.2.0",
    
    // ✅ CONSERVADOR: Solo patches automáticos  
    "@company/design-system": "~1.2.0",
    
    // ❌ EVITAR: Versión exacta (no recibe fixes)
    "@company/design-system": "1.2.0",
    
    // ❌ PELIGROSO: Major updates automáticos
    "@company/design-system": "*"
  }
}
```

### 4.2 Políticas por tipo de proyecto

```json
// Proyectos en desarrollo activo
{
  "@company/design-system": "^1.2.0"
}

// Proyectos en producción crítica
{
  "@company/design-system": "~1.2.0"
}

// Proyectos legacy
{
  "@company/design-system": "1.2.0"
}
```

### 4.3 Renovate/Dependabot configuración

```json
// renovate.json
{
  "extends": ["config:base"],
  "packageRules": [
    {
      "matchPackageNames": ["@company/design-system"],
      "minor": {
        "automerge": true
      },
      "patch": {
        "automerge": true
      },
      "major": {
        "automerge": false,
        "assignees": ["@design-system-team"]
      }
    }
  ]
}
```

## 5. Troubleshooting

### 5.1 Problemas comunes

```bash
# Error: 401 Unauthorized
# Solución: Verificar NPM_TOKEN
npm whoami --registry=https://npm.pkg.github.com

# Error: Module not found
# Solución: Verificar imports
npm ls @company/design-system

# Error: CSS no se aplica
# Solución: Importar estilos
import '@company/design-system/styles';
```

### 5.2 Debug de bundling

```bash
# Verificar resolución de módulos
npm ls @company/design-system

# Verificar tamaño del bundle
npm run build -- --analyze

# Verificar tree-shaking
# Solo componentes importados deben aparecer en bundle final
```