// AgentCard's `onClick` is optional, but the card rendered as a <button>
// either way: a tab stop with a pointer cursor and a hover lift, announced to
// a screen reader as a button, that swallowed every click. The dashboard grid
// renders one per agent, so a read-only dashboard was a wall of dead tab
// stops. StatCard, ThumbnailCard and KPICard all drop to a plain element when
// nothing is wired; this now does too.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AgentCard } from '../components/AgentCard';
import type { AgentDefinition } from '../../../types/agents';

const AGENT = {
  id: 'a-1',
  name: 'Router',
  description: 'Routes work',
  status: 'healthy',
  model: 'claude-opus',
  tools: ['search'],
  guardrails: [],
} as unknown as AgentDefinition;

describe('AgentCard — only a button when it can be clicked', () => {
  it('renders no button and no pointer affordance with no onClick', () => {
    const { container } = render(<AgentCard agent={AGENT} />);
    expect(screen.queryByRole('button')).toBeNull();
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('DIV');
    expect(root.className).not.toMatch(/cursor-pointer/);
    // The content is untouched — this is about the affordance, not the card.
    expect(screen.getByText('Router')).toBeInTheDocument();
  });

  it('renders a real button that fires when onClick is wired', () => {
    const onClick = vi.fn();
    const { container } = render(<AgentCard agent={AGENT} onClick={onClick} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe('BUTTON');
    expect(root.className).toMatch(/cursor-pointer/);
    fireEvent.click(root);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
