# 🏷️ Guía de Versionado del Design System

## Flujo de Trabajo con Changesets

### 1. Crear un changeset

```bash
# Después de hacer cambios
npx changeset
```

Responde las preguntas:
- ¿Qué paquetes han cambiado? → `@company/design-system`
- ¿Qué tipo de cambio? → `patch/minor/major`
- Describe el cambio → Mensaje claro para el changelog

### 2. Commit changes + changeset

```bash
git add .
git commit -m "feat(button): add loading state support

- Add loading prop to Button component
- Include spinner animation
- Update stories and tests"
```

### 3. Release (en CI/CD)

```bash
# Generar nueva versión
npx changeset version

# Publicar
npx changeset publish
```

## Ejemplos de Versionado

### Patch Release (1.2.3 → 1.2.4)
```bash
# Bug fixes, pequeñas mejoras
fix(tooltip): correct arrow positioning
docs(button): update prop descriptions
test(input): add missing accessibility tests
```

### Minor Release (1.2.4 → 1.3.0)
```bash
# Nuevas funcionalidades
feat(modal): add new Modal component
feat(button): add outline variant
feat(tokens): add semantic color tokens
```

### Major Release (1.3.0 → 2.0.0)
```bash
# Breaking changes
feat(button)!: redesign API with new prop structure

BREAKING CHANGES:
- Remove `type` prop, replace with `variant`
- Change `large` size to `lg`
- Update color token names
```

## Migration Guides

Para cada MAJOR release, incluir:

1. **Breaking Changes**: Lista detallada
2. **Migration Path**: Pasos específicos
3. **Codemod**: Scripts automáticos si es posible
4. **Timeline**: Fechas de deprecation y removal