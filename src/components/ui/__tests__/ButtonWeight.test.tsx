import { render, screen } from '@testing-library/react';
import { Button, BUTTON_WEIGHT, type ButtonSize, type ButtonTone, type ButtonVariant } from '../Button';
import { cn } from '../../../lib/cn';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger', 'danger-solid', 'success', 'info', 'link'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];
const TONES: ButtonTone[] = ['surface', 'code'];

// realtime-examples' type audit: `cn('font-semibold', 'font-[inherit]')`
// dropped the weight (tailwind-merge filed `font-[inherit]` as a weight;
// Tailwind compiles it to font-family), so every Button rendered at 400.
describe('Button weight', () => {
  it('is semibold', () => {
    expect(BUTTON_WEIGHT).toBe('font-semibold');
  });

  for (const tone of TONES) {
    for (const variant of VARIANTS) {
      for (const size of SIZES) {
        it(`${tone} ${variant} ${size} renders semibold`, () => {
          render(<Button tone={tone} variant={variant} size={size} data-testid="b">Go</Button>);
          const classes = screen.getByTestId('b').className.split(/\s+/);
          expect(classes).toContain('font-semibold');
          expect(classes).not.toContain('font-normal');
          expect(classes).not.toContain('font-medium');
          // The family reset survives beside the weight.
          expect(classes).toContain('font-[inherit]');
        });
      }
    }
  }

  it('cn treats font-[inherit] as a family, not a weight', () => {
    expect(cn('font-semibold', 'font-[inherit]')).toBe('font-semibold font-[inherit]');
    expect(cn('font-[inherit]', 'font-sans')).toBe('font-sans');
    expect(cn('font-semibold', 'font-medium')).toBe('font-medium');
  });
});
