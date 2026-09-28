import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CallSidePanelToggles } from '../CallSidePanel';
import { ReactionPickerButton } from '../ReactionOverlay';

// 2.401.0: the in-call shelf's header follows the page theme, so the two
// call-chrome controls it carries grew a `surface` tone.
const TABS = [
  { id: 'chat', label: 'Chat', content: null },
  { id: 'people', label: 'People', content: null },
];

describe('CallSidePanelToggles tone', () => {
  it('defaults to the dark chrome buttons', () => {
    render(<CallSidePanelToggles tabs={TABS} />);
    expect(screen.getByTestId('call-side-panel-toggles').getAttribute('data-tone')).toBe('chrome');
    expect(screen.getByTestId('call-chat-open').className).toContain('bg-white/10');
  });

  it('paints theme-following outline buttons with tone="surface", and still toggles', () => {
    const onTabChange = vi.fn();
    render(<CallSidePanelToggles tone="surface" tabs={TABS} activeTab="chat" onTabChange={onTabChange} />);
    const chat = screen.getByTestId('call-chat-open');
    expect(chat.className).toContain('bg-surface-inset');
    expect(chat.className).not.toContain('bg-call-chrome-accent');
    expect(chat.className).toContain('h-8');
    fireEvent.click(chat);
    expect(onTabChange).toHaveBeenCalledWith(null);
  });
});

describe('ReactionPickerButton tone', () => {
  it('defaults to chrome and takes tone="surface"', () => {
    const { rerender } = render(<ReactionPickerButton onReact={() => {}} />);
    expect(screen.getByTestId('reaction-picker-open').getAttribute('data-tone')).toBe('chrome');
    expect(screen.getByTestId('reaction-picker-open').className).toContain('bg-white/10');
    rerender(<ReactionPickerButton tone="surface" onReact={() => {}} />);
    const trigger = screen.getByTestId('reaction-picker-open');
    expect(trigger.className).toContain('bg-surface');
    expect(trigger.className).not.toContain('bg-white/10');
  });
});
