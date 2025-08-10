# 🔑 Setup Personal Access Token - CodeLion DS

## 📋 Pasos Detallados

### 1. 🏠 Ir a GitHub Settings
```
1. GitHub.com → Login
2. Click tu avatar (esquina superior derecha)
3. "Settings"
4. Scroll abajo → "Developer settings"
5. "Personal access tokens"
6. "Tokens (classic)" ⭐ IMPORTANTE
7. "Generate new token (classic)"
```

### 2. ⚙️ Configurar Token
```yaml
Token name: CodeLion-DS-Publisher
Expiration: 90 days  
Note: Token para publicar CodeLion DS a GitHub Packages

✅ Scopes requeridos:
☑️ repo                 # Acceso al repositorio
☑️ write:packages       # 🔑 CRÍTICO: Publicar packages  
☑️ read:packages        # Leer packages
☑️ workflow             # GitHub Actions (recomendado)
```

### 3. 💾 Guardar Token de Forma Segura

**El token se ve así:**
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ SOLO LO VERÁS UNA VEZ - Cópialo inmediatamente**

### 4. 🔧 Configurar Localmente (PowerShell)

**Opción A: Variable de Entorno (Recomendado)**
```powershell
# Configurar permanentemente
[Environment]::SetEnvironmentVariable("NPM_TOKEN", "ghp_tu_token_aquí", "User")

# Verificar que se guardó
$env:NPM_TOKEN
```

**Opción B: Solo para sesión actual**
```powershell
# Solo para esta sesión
$env:NPM_TOKEN = "ghp_tu_token_aquí"
```

**Opción C: Archivo .env** (NO subir a git)
```bash
# .env
NPM_TOKEN=ghp_tu_token_aquí
```

### 5. 🧪 Probar Configuración

```bash
# Verificar autenticación
npm whoami --registry=https://npm.pkg.github.com

# Debería mostrar tu username de GitHub
```

### 6. 🚀 Primera Publicación

```bash
# Build final
npm run build

# Publicar a GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

## 🔒 Mejores Prácticas de Seguridad

### ✅ DO
- Usar **tokens clásicos** para packages (por ahora)
- **Expiración corta** (30-90 días)
- **Rotar tokens** regularmente
- **Scopes mínimos** necesarios
- **Variables de entorno** para almacenamiento

### ❌ DON'T
- **Hardcodear** tokens en código
- **Compartir** tokens por chat/email
- **Tokens sin expiración**
- **Permisos excesivos**
- **Subir** .env a git

## 🚨 Troubleshooting

### "403 Forbidden" al publicar
```bash
# Verificar registry
npm config get registry

# Verificar token
echo $env:NPM_TOKEN

# Re-login si es necesario
npm login --registry=https://npm.pkg.github.com
```

### Token expirado
```
1. Generar nuevo token
2. Actualizar variable de entorno  
3. Reiniciar terminal
4. Retry publish
```

---

## 🎯 Próximo Paso

Una vez que tengas el token:
```bash
npm run build && npm publish --registry=https://npm.pkg.github.com
```

¡Y CodeLion DS estará rugiendo en GitHub Packages! 🦁📦
