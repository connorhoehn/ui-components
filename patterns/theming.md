# Theming

The library uses CSS custom properties (variables) for all visual tokens. The `<ThemeProvider>` injects these onto the document root, making them available to every component in the tree without prop drilling or CSS-in-JS runtime overhead.

## Prerequisites

- React 19+

## Basic Usage

```tsx
import { ThemeProvider } from '@connorhoehn/ui-components';

function App() {
  return (
    <ThemeProvider preset="light">
      {/* All components inherit the light theme tokens */}
      <YourApp />
    </ThemeProvider>
  );
}
```

## ThemeProvider Props

```tsx
interface ThemeProviderProps {
  children: ReactNode;
  /** Base preset to use. Defaults to 'light'. */
  preset?: 'light' | 'dark';
  /** Partial overrides merged on top of the preset. */
  theme?: Partial<ThemeTokens>;
}
```

## Available Tokens

The `ThemeTokens` interface defines all design tokens. These are injected as CSS custom properties with the `--ui-` prefix.

### Colors

| Token | CSS Variable | Light Default | Dark Default |
|---|---|---|---|
| `primary` | `--ui-primary` | `#3b82f6` | `#60a5fa` |
| `primaryDark` | `--ui-primary-dark` | `#1d4ed8` | `#3b82f6` |
| `primaryLight` | `--ui-primary-light` | `#93c5fd` | `#1e40af` |
| `danger` | `--ui-danger` | `#dc2626` | `#f87171` |
| `dangerLight` | `--ui-danger-light` | `#fca5a5` | `#7f1d1d` |
| `success` | `--ui-success` | `#10b981` | `#34d399` |
| `successLight` | `--ui-success-light` | `#6ee7b7` | `#064e3b` |
| `warning` | `--ui-warning` | `#f59e0b` | `#fbbf24` |
| `warningLight` | `--ui-warning-light` | `#fcd34d` | `#78350f` |
| `info` | `--ui-info` | `#0ea5e9` | `#38bdf8` |
| `infoLight` | `--ui-info-light` | `#7dd3fc` | `#0c4a6e` |

### Text

| Token | CSS Variable | Light Default | Dark Default |
|---|---|---|---|
| `textPrimary` | `--ui-text-primary` | `#1e293b` | `#f1f5f9` |
| `textSecondary` | `--ui-text-secondary` | `#64748b` | `#cbd5e1` |
| `textMuted` | `--ui-text-muted` | `#94a3b8` | `#64748b` |
| `textInverse` | `--ui-text-inverse` | `#ffffff` | `#0f172a` |

### Surfaces

| Token | CSS Variable | Light Default | Dark Default |
|---|---|---|---|
| `background` | `--ui-background` | `#f8fafc` | `#0f172a` |
| `surface` | `--ui-surface` | `#ffffff` | `#1e293b` |
| `surfaceRaised` | `--ui-surface-raised` | `#ffffff` | `#334155` |
| `surfaceOverlay` | `--ui-surface-overlay` | `rgba(15,23,42,0.5)` | `rgba(0,0,0,0.6)` |
| `border` | `--ui-border` | `#e2e8f0` | `#334155` |
| `borderLight` | `--ui-border-light` | `#f1f5f9` | `#1e293b` |

### Spacing

| Token | CSS Variable | Value |
|---|---|---|
| `spaceXs` | `--ui-space-xs` | `4px` |
| `spaceSm` | `--ui-space-sm` | `8px` |
| `spaceMd` | `--ui-space-md` | `16px` |
| `spaceLg` | `--ui-space-lg` | `24px` |
| `spaceXl` | `--ui-space-xl` | `32px` |

### Font Sizes

| Token | CSS Variable | Value |
|---|---|---|
| `fontXs` | `--ui-font-xs` | `11px` |
| `fontSm` | `--ui-font-sm` | `13px` |
| `fontMd` | `--ui-font-md` | `14px` |
| `fontLg` | `--ui-font-lg` | `16px` |
| `fontXl` | `--ui-font-xl` | `22px` |

### Border Radius

| Token | CSS Variable | Value |
|---|---|---|
| `radiusSm` | `--ui-radius-sm` | `4px` |
| `radiusMd` | `--ui-radius-md` | `6px` |
| `radiusLg` | `--ui-radius-lg` | `8px` |
| `radiusXl` | `--ui-radius-xl` | `12px` |
| `radiusFull` | `--ui-radius-full` | `9999px` |

### Shadows

| Token | CSS Variable | Light Default |
|---|---|---|
| `shadowSm` | `--ui-shadow-sm` | `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)` |
| `shadowMd` | `--ui-shadow-md` | `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` |
| `shadowLg` | `--ui-shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` |
| `shadowXl` | `--ui-shadow-xl` | `0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04)` |

## Token to CSS Variable Naming

Token keys are converted from camelCase to kebab-case with a `--ui-` prefix:

- `primary` becomes `--ui-primary`
- `primaryDark` becomes `--ui-primary-dark`
- `textPrimary` becomes `--ui-text-primary`
- `spaceXs` becomes `--ui-space-xs`

## Using the cssVar() Helper

In custom components, use the `cssVar()` utility to reference tokens in inline styles:

```tsx
import { cssVar } from '@connorhoehn/ui-components';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: cssVar('surface'),
      border: `1px solid ${cssVar('border')}`,
      borderRadius: cssVar('radiusMd'),
      padding: cssVar('spaceMd'),
      boxShadow: cssVar('shadowSm'),
      color: cssVar('textPrimary'),
    }}>
      {children}
    </div>
  );
}
```

`cssVar('textPrimary')` returns the string `"var(--ui-text-primary)"` — a standard CSS variable reference.

## Light vs Dark Presets

Switch between presets via the `preset` prop:

```tsx
import { useState } from 'react';
import { ThemeProvider } from '@connorhoehn/ui-components';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider preset={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Custom Theme (Brand Colors)

Override specific tokens while inheriting the rest from the preset:

```tsx
import { ThemeProvider } from '@connorhoehn/ui-components';
import type { ThemeTokens } from '@connorhoehn/ui-components';

const brandOverrides: Partial<ThemeTokens> = {
  primary: '#7c3aed',       // violet-600
  primaryDark: '#5b21b6',   // violet-800
  primaryLight: '#c4b5fd',  // violet-300
  radiusMd: '8px',          // slightly rounder corners
};

function App() {
  return (
    <ThemeProvider preset="light" theme={brandOverrides}>
      <YourApp />
    </ThemeProvider>
  );
}
```

Only the tokens you specify are overridden; everything else comes from the base preset.

## Scoped Theming

Nest `<ThemeProvider>` components to apply different themes to subtrees. Each provider injects CSS variables at the document root level, so the **innermost** provider wins for overlapping tokens:

```tsx
import { ThemeProvider } from '@connorhoehn/ui-components';

function App() {
  return (
    <ThemeProvider preset="light">
      <MainContent />

      {/* Dark sidebar */}
      <ThemeProvider preset="dark">
        <Sidebar />
      </ThemeProvider>
    </ThemeProvider>
  );
}
```

For true visual scoping (where both themes are visible simultaneously), apply the CSS variables to a container element rather than `:root`. You can use the `themeToCssVars()` utility:

```tsx
import { themeToCssVars, darkTheme } from '@connorhoehn/ui-components';

function DarkPanel({ children }: { children: React.ReactNode }) {
  const vars = themeToCssVars(darkTheme);

  return (
    <div style={vars as React.CSSProperties}>
      {children}
    </div>
  );
}
```

## Programmatic Access via useThemeContext

Access resolved token values in JavaScript:

```tsx
import { useThemeContext } from '@connorhoehn/ui-components';

function DynamicChart() {
  const theme = useThemeContext();

  return (
    <LineChart>
      <Line stroke={theme.primary} />
      <Line stroke={theme.success} />
    </LineChart>
  );
}
```

## Raw Token Values

Import the preset objects directly when you need raw token values outside of React:

```tsx
import { lightTheme, darkTheme } from '@connorhoehn/ui-components';

// Use in tests, Storybook, or non-React contexts
console.log(lightTheme.primary); // '#3b82f6'
```

## CSS Variable Utilities

The library exports several utilities for working with the token system:

| Function | Purpose |
|---|---|
| `cssVar(token)` | Returns `var(--ui-<kebab-token>)` for inline styles |
| `tokenToCssVarName(token)` | Returns `--ui-<kebab-token>` (the property name) |
| `themeToCssVars(tokens)` | Returns a full `Record<string, string>` of all variables |
| `injectThemeVars(tokens)` | Returns a `:root { ... }` CSS string for `<style>` injection |
