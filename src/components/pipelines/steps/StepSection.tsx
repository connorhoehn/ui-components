import React from 'react';
import { colors } from '../../../constants/styles';

export interface StepSectionProps {
  title: string;
  children: React.ReactNode;
}

export function StepSection({ title, children }: StepSectionProps) {
  return (
    <div style={{ padding: '10px 16px', borderTop: `1px solid ${colors.border}` }}>
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        color: colors.textTertiary,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 6,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}
