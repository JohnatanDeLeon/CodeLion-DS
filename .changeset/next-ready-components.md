---
"@johnatandeleon/design-system": minor
---

Add Textarea, Table and Alert, and make the library usable from Next.js App Router.

- **Textarea**: multi-line field with the same anatomy and styles as Input (label, helper or error message linked with `aria-describedby`, `aria-invalid`).
- **Table** (`Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`): caption as accessible name, `scope="col"` headers, numeric alignment, density, striping and its own horizontal scroll.
- **Alert**: info, success, warning and error tones; errors and warnings use `role="alert"`, the rest `role="status"`.
- The bundle now starts with `"use client"`, so a React Server Component can import it. Before, the build failed with `createContext is not a function`.
- Releases are also published to the public npm registry, so installing no longer needs a token.
