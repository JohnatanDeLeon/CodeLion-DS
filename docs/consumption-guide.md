# 📥 Guía de Consumo del Design System

## 1. Configuración en Proyecto Consumidor

### 1.1 Configuración de registry

```bash
# En el proyecto consumidor, crear .npmrc
echo "@johnatandeleon:registry=https://npm.pkg.github.com" >> .npmrc
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
npm install @johnatandeleon/design-system

# O con versión específica
npm install @johnatandeleon/design-system@^1.0.0
```

## 2. Configuración en Aplicación

### 2.1 Next.js Setup

```tsx
// pages/_app.tsx o app/layout.tsx
import '@johnatandeleon/design-system/styles';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### 2.2 Vite/React Setup

```tsx
// main.tsx
import '@johnatandeleon/design-system/styles';
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
    include: ['@johnatandeleon/design-system']
  }
});

// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@johnatandeleon/design-system': path.resolve(
        __dirname, 
        'node_modules/@johnatandeleon/design-system'
      )
    }
  }
};
```

## 3. Uso de Componentes

### 3.1 Importación básica

```tsx
import { Button } from '@johnatandeleon/design-system';

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
import { tokens, colors, spacing } from '@johnatandeleon/design-system/styles';

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
import type { ButtonProps } from '@johnatandeleon/design-system';

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
    "@johnatandeleon/design-system": "^1.0.0",
    
    // ✅ CONSERVADOR: Solo patches automáticos  
    "@johnatandeleon/design-system": "~1.0.0",
    
    // ❌ EVITAR: Versión exacta (no recibe fixes)
    "@johnatandeleon/design-system": "1.0.0",
    
    // ❌ PELIGROSO: Major updates automáticos
    "@johnatandeleon/design-system": "*"
  }
}
```

### 4.2 Políticas por tipo de proyecto

```json
// Proyectos en desarrollo activo
{
  "@johnatandeleon/design-system": "^1.0.0"
}

// Proyectos en producción crítica
{
  "@johnatandeleon/design-system": "~1.0.0"
}

// Proyectos legacy
{
  "@johnatandeleon/design-system": "1.0.0"
}
```

### 4.3 Renovate/Dependabot configuración

```json
// renovate.json
{
  "extends": ["config:base"],
  "packageRules": [
    {
"matchPackageNames": ["@johnatandeleon/design-system"],
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
npm ls @johnatandeleon/design-system

# Error: CSS no se aplica
# Solución: Importar estilos
import '@johnatandeleon/design-system/styles';
```

### 5.2 Debug de bundling

```bash
# Verificar resolución de módulos
npm ls @johnatandeleon/design-system

# Verificar tamaño del bundle
npm run build -- --analyze

# Verificar tree-shaking
# Solo componentes importados deben aparecer en bundle final
```