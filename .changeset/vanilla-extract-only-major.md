---
"@johnatandeleon/design-system": major
---

BREAKING: unify library on vanilla-extract only

- Removed inline entrypoints and alias: `./css`, `./vanilla` (root export now points to vanilla-extract build)
- Removed `ButtonInline` component and `src/css.ts`
- Removed Tailwind remnants and demo files
- Updated tokens and docs to `@johnatandeleon/design-system`

Migration notes:

- Import components from the root package and include styles once in app entry:

  import '@johnatandeleon/design-system/styles'
  import { Button } from '@johnatandeleon/design-system'

- Replace any `@johnatandeleon/design-system/vanilla` or `.../css` imports with the root package.

