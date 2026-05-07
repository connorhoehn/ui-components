// frontend/src/constants/styles.ts
//
// Shared inline-style constants for the app (per PIPELINES_PLAN.md §19.5).
//
// STYLE CONVENTIONS — reach for these tokens before writing inline literals:
//
//   tableCellStyle   — pipeline table <td> base (pad + 12px font + secondary text)
//   pageContainerStyle — page root wrapper (24px pad, flex col, gap 12)
//   topBarStyle      — header/toolbar bar (40–56px height, flex row, 24px gutter)
//   chipStyle(v)     — status/category chip (11px, 600 weight, pill shape)
//   fieldStyle       — text input (border, pad, inherit font)
//   saveBtnStyle(d)  — primary confirm button (primary bg, 600 weight)
//   cancelBtnStyle   — neutral cancel button (text-only, #64748b)
//   menuBtn          — dropdown item (full-width, 8/14px pad)
//
// When you need a variant, spread the token and override only what differs:
//   style={{ ...tableCellStyle, fontFamily: 'monospace', fontSize: 11 }}
//
// New tokens for recurring triples belong here — not inline in the component.

import type { CSSProperties } from 'react';

// ---------------------------------------------------------------------------
// Color palette (per §18.17)
// ---------------------------------------------------------------------------

export const colors = {
  // Brand
  primary:        '#646cff',
  primaryHover:   '#4f55ff',

  // Text
  textPrimary:    '#0f172a',
  textSecondary:  '#475569',
  textTertiary:   '#94a3b8',
  textDisabled:   '#cbd5e1',

  // Surfaces
  surface:        '#ffffff',
  surfaceInset:   '#fafbfc',
  surfacePanel:   '#f8fafc',
  surfaceHover:   '#f1f5f9',

  // Borders
  border:         '#e2e8f0',
  borderEmphasis: '#cbd5e1',
  borderField:    '#d1d5db',

  // Pipeline / state colors
  state: {
    idle:      '#d1d5db',
    pending:   '#93c5fd',
    running:   '#2563eb',
    awaiting:  '#f59e0b',
    completed: '#16a34a',
    failed:    '#dc2626',
    skipped:   '#d1d5db',
  },
} as const;

// ---------------------------------------------------------------------------
// Form field — canonical text input style
// Source: AttachmentsPanel.tsx
// ---------------------------------------------------------------------------

export const fieldStyle: CSSProperties = {
  flex: 1, minWidth: 120,
  border: '1px solid #d1d5db', borderRadius: 6, padding: '6px 10px',
  fontSize: 13, fontFamily: 'inherit', background: '#f9fafb', color: '#0f172a',
  outline: 'none',
};

// ---------------------------------------------------------------------------
// Primary (save / confirm) button
// Source: AttachmentsPanel.tsx
// ---------------------------------------------------------------------------

export const saveBtnStyle = (disabled: boolean): CSSProperties => ({
  padding: '6px 14px', fontSize: 13, fontWeight: 600,
  background: '#646cff', color: '#fff', border: 'none',
  borderRadius: 6, cursor: disabled ? 'not-allowed' : 'pointer',
  fontFamily: 'inherit', opacity: disabled ? 0.5 : 1, flexShrink: 0,
});

// ---------------------------------------------------------------------------
// Neutral cancel / close button (text-only, no background)
// Source: AttachmentsPanel.tsx
// ---------------------------------------------------------------------------

export const cancelBtnStyle: CSSProperties = {
  padding: '6px 12px', fontSize: 13,
  background: 'none', border: 'none', color: '#64748b',
  cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
};

// ---------------------------------------------------------------------------
// Menu / dropdown item
// Source: DocumentTypesPage.tsx
// ---------------------------------------------------------------------------

export const menuBtn: CSSProperties = {
  display: 'block', width: '100%', textAlign: 'left',
  padding: '8px 14px', fontSize: 13, border: 'none',
  background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
};

// ---------------------------------------------------------------------------
// Status chip — NEW shared component-style for small status indicators
// 11px font, 600 weight, 2px 8px padding, 4px border-radius.
// ---------------------------------------------------------------------------

export type ChipVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const CHIP_PALETTE: Record<ChipVariant, { background: string; color: string }> = {
  neutral: { background: '#f1f5f9', color: '#475569' },
  success: { background: '#f0fdf4', color: '#16a34a' },
  warning: { background: '#fffbeb', color: '#d97706' },
  danger:  { background: '#fef2f2', color: '#dc2626' },
  info:    { background: '#eff6ff', color: '#2563eb' },
};

// ---------------------------------------------------------------------------
// Table cell — pipeline run/pipeline list rows
// Padding + 12px font + secondary text; spread and override as needed.
// ---------------------------------------------------------------------------

export const tableCellStyle: CSSProperties = {
  padding: '10px 12px',
  fontSize: 12,
  color: colors.textSecondary,
};

// ---------------------------------------------------------------------------
// Page container — outermost wrapper for full-page pipeline views
// ---------------------------------------------------------------------------

export const pageContainerStyle: CSSProperties = {
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

// ---------------------------------------------------------------------------
// Top bar — sticky header / toolbar strip shared across pipeline pages
// ---------------------------------------------------------------------------

export const topBarStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '0 24px',
  height: 48,
  borderBottom: `1px solid ${colors.border}`,
  background: colors.surface,
  flexShrink: 0,
};

export const chipStyle = (variant: ChipVariant): CSSProperties => {
  const { background, color } = CHIP_PALETTE[variant];
  return {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    background,
    color,
    fontFamily: 'inherit',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
  };
};
