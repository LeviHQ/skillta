# Add complete light and dark themes

## Goal
Add a persistent light/dark mode switch across SkillTa while preserving the current appearance as the default dark theme.

## Implementation
- Add a global theme provider with `dark` as the fixed default and saved user preference.
- Add an accessible sun/moon icon toggle to the desktop and mobile navigation.
- Define a complete light palette for backgrounds, text, cards, borders, gradients, glass surfaces, shadows, scrollbars, status colors, and charts.
- Keep the existing dark palette visually unchanged.
- Replace dark-only styling found across pages and shared sections with semantic theme-aware styling, without changing content, SEO, plans, or workflows.
- Prevent a light/dark flash on reload by applying the saved theme before the app paints.

## Verification
- Check the landing page and representative content, tool, pricing, dashboard, dialog, and mobile navigation views in both themes.
- Confirm readable contrast, visible controls, no overlapping content, persisted theme after reload, and a clean project build.

## Technical details
- Use the existing `next-themes` package with class-based theming.
- Keep all palette values in the global design tokens; components will use semantic token classes.
- Respect reduced-motion preferences and expose clear labels/tooltips for the icon control.
