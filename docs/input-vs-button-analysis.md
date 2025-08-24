# Análisis comparativo: Button (referencia) vs Input

> Informe técnico y conciso — solo fase de análisis (sin cambios en código).

---

**Checklist de requisitos (extraídos)**

- Revisar código de `Button` e `Input` (componentes, estilos, hooks/utils).  
- Revisar design tokens (colores, spacing, efectos).  
- Revisar variantes, tamaños y estados.  
- Revisar accesibilidad (ARIA, labels, foco, teclado).  
- Revisar tematización / modo oscuro.  
- Revisar API pública (props, defaults, tipos).  
- Revisar convenciones de estilos/arquitectura.  
- Revisar documentación/storybook y pruebas.  
- Producir informe MD único: resumen, tabla exhaustiva, checklist de cobertura, brechas/suposiciones.  

## 1) Resumen ejecutivo

**Paridad global estimada:** 55%

Motivo: ambos componentes comparten buenas prácticas (uso de tokens, tests de accesibilidad, forwardRef, stories), pero existen divergencias importantes en theming, tokens de forma/espaciado, estrategia de foco, y diseño de la API (sizes/variants), que afectan consistencia visual y mantenibilidad.

**Top 5 inconsistencias (breve)**

- I01 — Theming / modo oscuro: `Input` usa selectores opt-in (`[data-theme="dark"]`) y overrides locales; `Button` confía en tokens/global theme. Impacto: riesgo de visuales inconsistentes entre componentes en dark mode.
- I02 — Border-radius / forma: `Button` usa `effects.borderRadius.md|lg` por defecto; `Input` usa `effects.borderRadius.xl` (más redondeado). Impacto: familia visual inconsistente.
- I03 — API (sizes / variants): `Button` tiene sizes `sm|md|lg|xl|icon` y variants semánticas; `Input` usa `sm|md|lg` y variants centradas en input (`default|search|email`) + `state`. Impacto: falta de convención reutilizable entre componentes.
- I04 — Focus / focus-ring strategy: `Button` usa `:focus-visible` con box-shadow simple; `Input` aplica `:focus` con box-shadow complejo y `transform` (translateY). Impacto: inconsistencia en visibilidad de foco y en comportamiento visual (reflow/posición).
- I05 — Arquitectura de estilos / complejidad: `Input` contiene reglas y selectores específicos (dark-mode, icon-padding, múltiples variantes de estado) en un solo archivo de recipe, incrementando surface area; `Button` está más compacto y usa hooks reutilizables (p.e. `useGradient`). Impacto: mayor deuda y coste de mantenimiento en `Input`.

---

## 2) Tabla de inconsistencias (exhaustiva)

> Nota: Evidence incluye fragmentos <=10 líneas y rutas a los archivos inspeccionados.

| ID | Categoría | Severidad | Regla en Button (esperado) | Input (observado) | Evidencia (ruta/fragmento/lineas) | Impacto | Recomendación (descriptiva, sin cambios) | Fuente de la regla |
|---|---:|---|---|---|---|---|---|---|
| I01 | Theming / Modo oscuro | Major | Uso de tokens/global theme; no overrides opt-in en recipes. | Selectores opt-in para dark (`:root[data-theme="dark"] &`, `body[data-theme="dark"] &`). | `src/styles/recipes/button.css.ts` (variants focus) — ejemplo: `":focus-visible": { boxShadow: `0 0 0 2px ${colors.primary[500]}40` }`  
`src/styles/recipes/input.css.ts` — ejemplo: `[':root[data-theme="dark"] &' as any]: { backgroundColor: colors.neutral[800] }` (input.css.ts, multiples ubicaciones) | Dos enfoques provocan divergencias visuales en dark mode; testing y QA más costosos. | Documentar y alinear la estrategia de tematización (ambos componentes deben seguir la misma política), o justificar explícitamente por UX. | Button recipe; Input recipe. |
| I02 | Estilos / Border-radius | Major | `button` usa `effects.borderRadius.md` por defecto, `lg` en tamaños grandes. | `inputField` usa `effects.borderRadius.xl` (12px) como valor base. | `src/styles/recipes/button.css.ts` — `borderRadius: effects.borderRadius.md`  
`src/styles/recipes/input.css.ts` — `borderRadius: effects.borderRadius.xl // 12px` | Sensación visual distinta entre botones e inputs; baja coherencia de familia de componentes. | Alinear token de radii por defecto entre componentes o documentar la razón del radio mayor en `Input`. | Button recipe; Input recipe. |
| I03 | API pública (sizes/variants) | Major | Sizes: `sm|md|lg|xl|icon`. Variants semánticas `primary|secondary|ghost|destructive|gradient`. | Sizes: `sm|md|lg`. Variants: `default|search|email`. Además `state` prop para `error|success|warning`. | `src/components/Button/Button.tsx` — props: `size?: "sm"|"md"|"lg"|"xl"|"icon"`; `variant?: "primary"|...`  
`src/components/Input/Input.tsx` — props: `size?: "sm"|"md"|"lg"`; `variant?: "default"|"search"|"email"; state?: "default"|"error"|"success"|"warning"` | Difícil mapeo directo, más trabajo para documentación y para crear componentes compuestos. | Definir convención unificada o mapping entre vocabularios (documentar la elección para `Input`). | Component props en Button.tsx e Input.tsx. |
| I04 | Focus / Accesibilidad visual | Major | Usa `:focus-visible` (policy: foco por teclado) con box-shadow simple. | Usa `:focus` con box-shadow complejo y `transform: translateY(-2px)` (no usa `:focus-visible`). | `src/styles/recipes/button.css.ts` — `":focus-visible": { boxShadow: "0 0 0 2px currentColor" }`  
`src/styles/recipes/input.css.ts` — `":focus": { borderColor: colors.primary[600], boxShadow: [\`0 0 0 3px ${colors.primary[500]}30\`, ...].join(", "), transform: "translateY(-2px)" }` | Focus rings y comportamiento de foco distintos; posible sobreexposición de animaciones y reflow en inputs. | Adoptar política común de focus (preferir `:focus-visible` para foco por teclado) y documentar excepciones. | Button & Input recipes. |
| I05 | Interacción / Keyboard handling | Minor → Major (contextual) | `<button>` nativo no requiere override de Enter/Space; focus/keyboard manejado por navegador. | `Button` intercepta `onKeyDown`/`onKeyUp` para Enter/Space y llama a `.click()` manualmente; `Input` delega en util `aria.input(...)`. | `src/components/Button/Button.tsx` — handlers: `onKeyDown={(event)=>{ if(event.key==="Enter")... }}` (Button.tsx)  
`src/components/Input/Input.tsx` — `const inputAriaAttributes = {...aria.input({ required, invalid: state === "error", describedBy: displayMessage ? helperTextId : undefined })}` | Posible redundancia o workaround; si no justificado puede introducir divergencias o bugs en comportamiento nativo. | Registrar la razón de interceptar teclado en `Button` o eliminar redundancia; si es intencional, documentar. | Button.tsx (comportamiento de teclado). |
| I06 | Espaciado / Icon padding | Major | `Button` usa `gap` y spacing tokens consistentes. | `Input` usa padding base con tokens (`spacing[3] ${spacing[4]`) pero offsets de iconos usan valores `2.75rem`/`3rem` hard-coded. | `src/styles/recipes/button.css.ts` — `gap: spacing[2]`  
`src/styles/recipes/input.css.ts` — `padding: \`${spacing[3]} ${spacing[4]}\`` y `inputFieldWithLeftIcon = style({ paddingLeft: "2.75rem" })` | Hard-coded offsets reducen mantenibilidad si escala de spacing cambia; menos semántico. | Preferencia por tokens/aliases semánticos (p.e. semanticSpacing) para offsets de iconos o documentar la fórmula usada. | Button & Input recipes. |
| I07 | A11y — Mensajes de error | Minor | Button aplica `aria-disabled` y tests axe; icon-only required aria-label tests. | Input usa `role="alert"` en mensajes de error y `aria-describedby` para helperText; tests verifican esto. | `src/components/Input/Input.tsx` — `role={state === "error" ? "alert" : undefined}` y `aria-describedby` set. (Input.tsx) | En general positivo (Input muestra alert); requiere consistencia de patrón de mensajes entre componentes. | Documentar patrón de mensajes (cuando usar `role="alert"` vs live regions) y alinearlo con guía a11y. | Input.tsx tests & implementation. |
| I08 | Variantes visuales (gradients) | Minor → Contextual | `Button` soporta `variant="gradient"` y custom gradient system (`gradientCustomClass`). | `Input` no expone variante gradient; estilos semánticos (success/error) solo. | `src/styles/recipes/button.css.ts` — `export const gradientCustomClass = style({ vars: {...} })`  
`src/styles/recipes/input.css.ts` — no gradient variants presentes | Capacidad visual desigual; ok si es intencional, pero debe estar documentado. | Registrar si inputs deben o no soportar gradients; si es intencional, documentarlo. | Button recipe vs Input recipe. |
| I09 | Arquitectura / Reutilización | Major | `Button` usa hook `useGradient` y recipes modulares; CSS recipe más acotado. | `Input` concentra reglas específicas (dark-mode, icon interactions, many selectors) en su recipe, aumentando complejidad. | `src/components/Button/Button.tsx` — `const gradientStyles = useGradient(...)`  
`src/styles/recipes/input.css.ts` — archivo extenso con selectores, media queries y muchas reglas. | Mayor deuda técnica y superficie de bugs en `Input`. | Evaluar extracción de utilidades compartidas (icon layout, focus tokens) y documentar límites de recipe. | Código Button & Input. |
| I10 | Tests / Cobertura visual a11y | Minor | Button tiene tests axe (default, disabled, loading, icon-only). | Input tiene tests axe (label/error/loading); falta prueba visual comparativa de focus-ring entre componentes. | `src/components/Button/Button.test.tsx` y `src/components/Input/Input.test.tsx` — contienen `axe` checks. | Buen coverage a11y; gap en test visual de focus parity. | Añadir en docs el requerimiento de pruebas visuales para focus consistency si se decide alinear. | Tests en ambos componentes. |
| I11 | RTL / I18N | Minor | Button no muestra reglas explícitas RTL. | Input posiciona iconos con `left`/`right` (prop `iconPosition`), sin uso de propiedades lógicas (inset-inline). | `src/styles/recipes/input.css.ts` — `inputLeftIcon = style({ left: "1rem" })`, `inputRightIcon = style({ right: "1rem" })` | En RTL el comportamiento puede no invertir automáticamente; riesgo si RTL es un requisito. | Definir policy de RTL y preferir propiedades lógicas (`inset-inline-start`) si se requiere soporte. | Input styles. |
| I12 | Performance / Tamaño de CSS | Minor | Button recipe compacto y uso de hooks evita lógica CSS masiva. | Input recipe es extenso (muchos selectores y reglas específicas), incrementa CSS footprint. | `src/styles/recipes/input.css.ts` — archivo largo con múltiples selectors y styles. | Posible aumento del CSS bundle por componente; impacto marginal pero acumulativo. | Documentar el trade-off y evaluar extracción de utilidades para reducir repetición. | Input recipe. |

---

## 3) Checklist de cobertura (estado)

- API — Revisado. Observación: vocabularios distintos (`variant`/`size`) entre Button e Input. Status: Done (inconsistencias I03).  
- Estados/Variantes/Tamaños — Revisado. Observación: paridad parcial; Input añade `state` como prop explícita; Button modela estados vía variant+props. Status: Done (I03, I08).  
- Estilos/Tokens — Revisado. Observación: uso consistente de tokens para colores/spacing en ambos, pero discrepancias en `borderRadius` y offsets hard-coded (I02, I06). Status: Done (I02, I06).  
- A11y (ARIA, foco, teclado) — Revisado. Observación: ambos con pruebas axe; diferencias en focus strategy (I04) y en intercept keyboard en Button (I05). Status: Done (I04, I05, I07).  
- Interacciones — Revisado. Observación: Button incorpora handlers manuales (Enter/Space). Status: Done (I05).  
- Temas/Modo oscuro/RTL — Revisado. Observación: Input usa opt-in dark selectors; Button no; RTL no cubierto explícitamente. Status: Done (I01, I11).  
- Arquitectura — Revisado. Observación: Input CSS más pesado y específico; Button reutiliza hook. Status: Done (I09).  
- Estilo de código — Revisado. Observación: ambos TSX/vanilla-extract; Input más verboso en CSS. Status: Done.  
- Performance — Revisado. Observación: Input recipe tamaño mayor; impacto marginal. Status: Done (I12).  
- Documentación / Storybook — Revisado. Observación: ambos tienen stories/tests; falta documentación de decisiones (theming/focus/radii/API mapping). Status: Partial.  
- Pruebas — Revisado. Observación: buena cobertura unit + axe; falta pruebas visuales de paridad de foco. Status: Done (I10).

---

## 4) Brechas de información / Suposiciones

**Brechas de información (datos faltantes)**

- G1: Documento oficial de decisiones de diseño (design decisions) que explique convenciones de `variant`/`size`, radii y theming. Efecto: impide confirmar si divergencias son intencionales.  
- G2: Justificación histórica o ticket que explique la interceptación de teclado en `Button` (onKeyDown/onKeyUp). Efecto: no puedo validar si es workaround necesario.  
- G3: Requisitos RTL / I18N del producto (si RTL es requisito). Efecto: no puedo afirmar si la ausencia de propiedades lógicas es problema o no.  
- G4: Requisito explícito para gradients en `Input` (si se esperaba paridad visual con Button). Efecto: no puedo saber si ausencia de gradient variant es limitación o diseño.  
- G5: Política de theming (opt-in `[data-theme]` vs token-driven global theme). Efecto: no puedo validar la elección de Input.

**Suposiciones tomadas**

- S1: Button es la línea base normativa salvo justificación documentada (siguiendo la consigna).  
- S2: Ausencia de documentación = no hay justificación explícita para diferencias; por tanto las diferencias importantes se marcan como inconsistencias.  
- S3: Los fragmentos leídos representan la implementación actual relevante (no se consideraron overrides globales externos no presentes en el repo leído).

**Criterios de severidad aplicados**

- Critical: rota a11y/UX básica o seguridad de foco — no encontrado.  
- Major: contradice fuertemente la línea base o introduce deuda técnica visible — usado para theming, radii, API, focus, arquitectura.  
- Minor: detalles de baja gravedad o mejoras recomendadas — usado para gradients, RTL, performance.

---

**Síntesis final**

- Ejes totales considerados: 11
  - Ejes sin problemas / alineados: 5 (interacción básica, tests/a11y coverage, docs/stories presence, forwardRef pattern, use of tokens)
  - Ejes con divergencias Major: 5 (theming, radii/tokens, API sizes/variants, focus strategy, style architecture)
  - Ejes con divergencias Minor: 1 (RTL/gradients/performance)

**Top 5 riesgos**: I01, I02, I03, I04, I09 (afectan coherencia visual, accesibilidad percibida, y deuda de mantenimiento).

---

**Fin del informe.**

> Nota: Este archivo es solo la transcripción en Markdown del análisis; no se han realizado cambios en el código ni se proponen PRs.
