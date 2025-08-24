# ADR-002: Focus Styling Policy

Status: Accepted

Context
-------
Previously, several components used `:focus` to apply visual focus styles and performed small translateY transforms on focus to simulate elevation. This caused issues:

- Keyboard users rely on consistent visible focus; :focus matches pointer focus too which can be noisy.
- Transforms on focus moved elements causing layout shifts and potential reflow issues.
- Focus styles needed to be token-driven for theme and contrast consistency.

Decision
--------
1. Use `:focus-visible` for all visual focus indicators. This ensures focus rings are shown for keyboard and other non-pointer interactions while avoiding visual noise for mouse users.
2. Remove any transforms that displace elements when focused. Hover interactions may keep subtle translate transforms, but focus must never move the element.
3. Provide a shared utility `focusRing(colorToken, width)` that components can import to get a consistent, token-derived focus ring implemented via `box-shadow` and `outline` fallbacks.
4. Focus ring colors should be taken from design tokens (e.g., `colors.primary[500]`) and use a semi-opaque overlay to maintain contrast in light/dark themes.

Consequences
------------
- Visual focus indicators will be consistent across components and align with the Button implementation.
- Keyboard users will get reliable focus styling; mouse-only interactions will not see focus rings unless intentionally focused.
- Removing transforms on focus reduces layout shift and improves perceived stability.

Notes
-----
- This ADR does not change component sizes, spacing, or variants. Those are handled in separate tasks.
- Implementations should still verify contrast ratios of focus rings against component backgrounds to meet WCAG AA.
