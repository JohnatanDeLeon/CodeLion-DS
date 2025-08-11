---
"@johnatandeleon/design-system": patch
---

fix: map `/styles` export to `dist/styles.css` so bundlers include the design system CSS even when skipping JS-only side-effect imports.

Consumers should continue importing styles once:

import '@johnatandeleon/design-system/styles'

