# ADR-001: Component theming policy — token-driven themes (no opt-in selectors)

Status: Accepted

Context
-------
Currently some components (notably `Input`) used opt-in CSS selectors like
`[data-theme="dark"]` or `:root[data-theme="dark"]` to alter their
styles for dark mode. `Button` follows a different approach and relies on the
global `colors` tokens (set via vanilla-extract's `createGlobalTheme`/theme
provider) so switching themes is done centrally.

Decision
--------
All components must avoid per-component opt-in theme selectors. Components
should read from the global token set exposed by `src/styles/tokens` and
assume the theme author will swap token values for dark/light modes.

Consequences
------------
- Pros:
  - Consistent theming across components (Button-like behavior).
  - Storybook and visual tests can switch global theme once and verify all
    components.
  - Simpler component styles and fewer overrides.
- Cons:
  - If a component needs special visual treatment in dark mode, the token
    palette should provide a semantic token or alias (see below) instead of
    local selectors.

Examples
--------
Replace selectors like:

  [data-theme="dark"] & { backgroundColor: colors.neutral[800] }

with token-driven usage:

  backgroundColor: colors.neutral[25], // consumer theme remaps neutral.*

If a new semantic token is required, add it under `src/styles/tokens` and map
it to the closest scale (e.g. `colors.input.background` -> `colors.neutral[25]`
for light and `colors.neutral[800]` for dark in the theme override).

Follow-ups
----------
- Migrate remaining components that still use opt-in selectors.
- Add automated check in the linting pipeline to detect `data-theme` selectors
  in `src/styles/recipes`.

Rationale
---------
This ADR aligns the codebase to a single theming strategy used by `Button` and
reduces visual regressions caused by mixed approaches. It keeps the theme
surface predictable and centralizes color decisions to the token layer.
