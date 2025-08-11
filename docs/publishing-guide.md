# 📦 Guía de Publicación - GitHub Packages

## 1. Configuración Inicial

### 1.1 Personal Access Token

```bash
# 1. Ve a GitHub → Settings → Developer settings → Personal access tokens
# 2. Genera token con permisos:
#    - write:packages
#    - read:packages
#    - delete:packages (opcional)
# 3. Guarda el token de forma segura
```

### 1.2 Configurar npm local

```bash
# Configurar registry para scope @company
npm config set @company:registry https://npm.pkg.github.com

# Configurar autenticación
npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN_HERE
```

### 1.3 Verificar configuración

```bash
# Verificar configuración
npm config get @company:registry
npm config get //npm.pkg.github.com/:_authToken

# Test de autenticación
npm whoami --registry=https://npm.pkg.github.com
```

## 2. Publicación Manual

### 2.1 Preparar release

```bash
# 1. Crear changeset
npx changeset

# 2. Commit cambios
git add .
git commit -m "feat(button): add new loading animation"

# 3. Push to main
git push origin main
```

### 2.2 Generar versión y publicar

```bash
# Generar nueva versión
npx changeset version

# Commit version bump
git add .
git commit -m "chore: version bump"
git push origin main

# Publicar
npm run build
npx changeset publish

# Tag release
git push --tags
```

## 3. Verificar publicación

```bash
# Ver paquetes publicados
npm view @johnatandeleon/design-system --registry=https://npm.pkg.github.com

# Ver todas las versiones
npm view @johnatandeleon/design-system versions --json
```