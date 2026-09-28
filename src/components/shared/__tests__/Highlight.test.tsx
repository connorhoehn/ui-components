import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Highlight, highlightSegments } from '../Highlight';

afterEach(cleanup);

describe('Highlight', () => {
  it('marks case-insensitive matches of a phrase', () => {
    const { container } = render(<Highlight text="Publish typed Component Contracts today" terms={['component contracts']} />);
    const marks = container.querySelectorAll('mark');
    expect(marks).toHaveLength(1);
    expect(marks[0].textContent).toBe('Component Contracts');
    expect(container.textContent).toBe('Publish typed Component Contracts today');
  });

  it('matches whole terms only', () => {
    const { container } = render(<Highlight text="Auth author authentication AUTH" terms={['auth']} />);
    expect([...container.querySelectorAll('mark')].map((m) => m.textContent)).toEqual(['Auth', 'AUTH']);
  });

  it('prefers the longer overlapping term and escapes regex characters', () => {
    expect(highlightSegments('Auth Migration (v2)', ['auth', 'auth migration', '(v2)']).filter((s) => s.match).map((s) => s.text))
      .toEqual(['Auth Migration', '(v2)']);
  });

  it('renders plain text when there are no usable terms', () => {
    const { container } = render(<Highlight text="Nothing to mark" terms={['', '  ']} />);
    expect(container.querySelector('mark')).toBeNull();
    expect(container.textContent).toBe('Nothing to mark');
  });
});
