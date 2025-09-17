---
"@johnatandeleon/design-system": patch
---

Force explicit height and line-height for the Select component (large size) to match Input sizing (48px). This fixes a 2px visual mismatch between Input and Select in the large size.

- Add explicit `height` and `lineHeight` to the overlay `selectTrigger` and native `selectField` large variants.
- This change aligns Select with Input visual sizing and improves cross-browser consistency.
