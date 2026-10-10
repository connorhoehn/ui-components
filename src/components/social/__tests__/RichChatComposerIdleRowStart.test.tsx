// `modeRowStart` on the idle single-mode row, and `sendWithReferencesOnly`.
import * as React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

afterEach(cleanup);

const base = {
  'data-testid': 'composer',
  layout: 'wide',
  density: 'compact',
  modes: ['chat'],
  mode: 'chat',
  onModeChange: () => {},
  collapseWhenIdle: true,
} as const;

describe('modeRowStart on the idle row', () => {
  it('is drawn before the pill while the composer is collapsed', () => {
    render(<RichChatComposer {...base} onSend={() => {}} modeRowStart={<span data-testid="lbl">Chat</span>} />);
    expect(screen.getByTestId('composer')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByTestId('composer-mode-row-start')).toContainElement(screen.getByTestId('lbl'));
  });
});

describe('sendWithReferencesOnly', () => {
  const refs = [{ id: 'wi-1', label: 'WI-1' }];

  it('keeps Send disabled for a reference-only draft by default', () => {
    render(<RichChatComposer {...base} onSend={() => {}} references={refs} />);
    expect(screen.getByTestId('composer-send')).toBeDisabled();
  });

  it('enables Send and sends an empty-text message when opted in', () => {
    const onSend = vi.fn();
    render(<RichChatComposer {...base} onSend={onSend} references={refs} sendWithReferencesOnly />);
    const send = screen.getByTestId('composer-send');
    expect(send).not.toBeDisabled();
    fireEvent.click(send);
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend.mock.calls[0][0].text.trim()).toBe('');
  });

  it('stays disabled with the opt-in but no references', () => {
    render(<RichChatComposer {...base} onSend={() => {}} sendWithReferencesOnly />);
    expect(screen.getByTestId('composer-send')).toBeDisabled();
  });
});
