# ADR-003: Shape / Border Radius Scale

Status: Proposed

Context
-------
There was an inconsistency between `Button` and `Input` components: Buttons used `effects.borderRadius.md` by default and `lg` for larger sizes, while Inputs used `effects.borderRadius.xl` (16px) in the recipe, producing a different visual family for controls (see I02 in the component analysis).

Decision
--------
Introduce a canonical shape scale mapping (size → border-radius token) that component recipes can consume. The mapping aligns with the Button family to ensure consistent visual language across controls.

Mapping
-------
- sm → effects.borderRadius.sm (4px)
- md → effects.borderRadius.md (8px)
- lg → effects.borderRadius.lg (12px)
- xl → effects.borderRadius.lg (12px) — xl maps to `lg` to avoid overly large radii for interactive controls

Rationale
---------
- Buttons already use `md` as default and `lg` for larger sizes. Aligning Input radii to the same family improves perceived consistency and reduces visual friction.
- Mapping `xl` → `lg` prevents inputs from feeling too pill-like at large sizes while still allowing larger UI surfaces to use larger radii when intentionally needed.
- Exposing a single `shapeScale` that references token values encourages reuse and avoids hard-coded radii in component recipes.

Consequences
------------
- Input recipes have been updated to reference the `shapeScale` tokens per size.
- No hard-coded border-radius values remain in Input styles.
- Button recipes were left unchanged; they already consume `effects.borderRadius.*` tokens. The canonical mapping is documented here for future component updates.

Notes
-----
If future design reviews require a different mapping (for example xl→xl), update `effects.shapeScale` and the ADR accordingly.

Approved-by: Design Tokens / Engineering
Date: 2025-08-23
