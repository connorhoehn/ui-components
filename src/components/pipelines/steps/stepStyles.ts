import type { CSSProperties } from 'react';
import { colors } from '../../../constants/styles';

export const codeBlockStyle: CSSProperties = {
  margin: 0,
  padding: '8px 12px',
  background: colors.surfaceInset,
  border: `1px solid ${colors.border}`,
  borderRadius: 6,
  fontSize: 11,
  fontFamily: 'monospace',
  color: colors.textSecondary,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  maxHeight: 300,
  overflow: 'auto',
};

export const proseBlockStyle: CSSProperties = {
  padding: '10px 14px',
  background: colors.surfaceInset,
  border: `1px solid ${colors.border}`,
  borderRadius: 6,
  fontSize: 13,
  color: colors.textPrimary,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  lineHeight: 1.6,
  maxHeight: 400,
  overflow: 'auto',
};

export const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '4px 8px',
  fontSize: 10,
  fontWeight: 600,
  color: colors.textTertiary,
  textTransform: 'uppercase',
};

export const tdStyle: CSSProperties = {
  padding: '5px 8px',
  fontSize: 11,
  color: colors.textSecondary,
  verticalAlign: 'top',
};

export function eventChipStyle(color: string): CSSProperties {
  return {
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 3,
    fontSize: 10,
    fontWeight: 600,
    background: color + '18',
    color,
  };
}
