import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { DocumentModePill } from '../DocumentModePill';

afterEach(cleanup);

describe('DocumentModePill', () => {
  it('names the mode and carries the reason as the tooltip', () => {
    render(<DocumentModePill mode="read" reason="Finalized: read only" />);
    const pill = screen.getByTestId('document-mode-pill');
    expect(pill.textContent).toBe('Read');
    expect(pill.getAttribute('title')).toBe('Finalized: read only');
    expect(pill.getAttribute('data-mode')).toBe('read');
  });

  it('is not a control', () => {
    render(<DocumentModePill mode="editing" />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
