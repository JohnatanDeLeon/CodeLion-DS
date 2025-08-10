# ⚡ Quick Reference - Design System

## 🚀 Setup Inicial

```bash
# 1. Clonar repositorio  
git clone https://github.com/company/design-system.git
cd design-system

# 2. Instalar dependencias
npm install

# 3. Desarrollo
npm run dev  # Inicia Storybook en http://localhost:6006

# 4. Testing
npm test              # Tests unitarios
npm run test:coverage # Con coverage
npm run type-check    # TypeScript
```

## 📝 Desarrollo de Componentes

```bash
# 1. Crear changeset
npx changeset
# → Seleccionar: @company/design-system
# → Tipo: patch/minor/major  
# → Descripción: "Add loading state to Button"

# 2. Desarrollar componente
mkdir src/components/NewComponent
# → NewComponent.tsx
# → NewComponent.stories.tsx  
# → NewComponent.test.tsx
# → index.ts

# 3. Commit
git add .
git commit -m "feat(new-component): add NewComponent with accessibility support"

# 4. Push & PR
git push origin feature/new-component
# → Crear PR en GitHub
```

## 🏷️ Versionado

```bash
# Desarrollo local
npx changeset        # Crear changeset
npx changeset version # Generar versión (local testing)
npx changeset publish # Publicar (local testing)

# En CI/CD (automático)
# main branch → auto version bump → auto publish → auto tag
```

## 📦 Publicación Manual

```bash
# 1. Build
npm run build

# 2. Verificar package
npm pack --dry-run

# 3. Publicar
npm publish --registry=https://npm.pkg.github.com

# 4. Verificar
npm view @company/design-system --registry=https://npm.pkg.github.com
```

## 📥 Consumo en Proyectos

```bash
# 1. Configurar .npmrc
echo "@company:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}" >> .npmrc

# 2. Instalar
npm install @company/design-system@^1.2.0

# 3. Importar estilos (en app entry point)
import '@company/design-system/styles';

# 4. Usar componentes
import { Button, Input } from '@company/design-system';
```

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev                 # Storybook development
npm run build              # Build library  
npm run build-storybook    # Build Storybook static

# Testing
npm test                   # Run tests
npm run test:ui           # Tests con UI
npm run test:coverage     # Tests con coverage

# Linting & Formatting
npm run lint              # ESLint
npm run lint:fix          # ESLint con auto-fix
npm run type-check        # TypeScript check

# Changesets
npx changeset             # Crear changeset
npx changeset version     # Version bump
npx changeset publish     # Publish packages

# GitHub Packages
npm whoami --registry=https://npm.pkg.github.com
npm view @company/design-system versions --json
```

## 🎯 Rangos de Versiones

```json
{
  "dependencies": {
    // ✅ Recomendado: minor updates automáticos
    "@company/design-system": "^1.2.0",
    
    // 🔒 Conservador: solo patches  
    "@company/design-system": "~1.2.0",
    
    // 📌 Fixed: versión exacta
    "@company/design-system": "1.2.0"
  }
}
```

## 🚨 Troubleshooting

```bash
# Token issues
npm whoami --registry=https://npm.pkg.github.com
# Si falla: verificar NPM_TOKEN en .env

# Module resolution
npm ls @company/design-system
# Verificar versión instalada

# CSS no se aplica  
# Asegurar: import '@company/design-system/styles'; 

# Bundle size issues
npm run build -- --analyze
# Verificar tree-shaking correcto

# CI/CD failures
# Verificar: tests, lint, changeset presence
```

## 📊 Monitoreo

```bash
# Package metrics
npm view @company/design-system
npm audit

# Bundle analysis  
npm run build -- --analyze
ls -la dist/

# Dependencies
npm outdated
npm audit
```

## 🔐 Seguridad

```bash
# Verificar firmas
npm audit signatures

# Checksum verification
npm pack --dry-run
shasum -a 256 *.tgz

# License compliance
npx license-checker --onlyAllow 'MIT;Apache-2.0;BSD-3-Clause'
```