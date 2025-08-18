---
"@johnatandeleon/design-system": major
---

Se removió la lógica pública de `format`/`mask` del componente `Input` y se
realizaron limpiezas relacionadas (handlers, props y tests). Además se
ajustaron estilos y stories para mejorar el contraste y la accesibilidad.

BREAKING CHANGE: Consumidores que dependan de las props o comportamiento
`format`/`mask` del componente `Input` deberán actualizar su código para
eliminar o sustituir esa funcionalidad.

Por favor ejecutar `npm run version` (o el flujo habitual de changesets) para
aplicar la versión y generar el changelog.
