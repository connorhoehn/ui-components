// ContextComposer forwards modeRowStart and sendWithReferencesOnly to
// RichChatComposer (2.413.0).
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { ContextComposer } from '../ContextComposer';

afterEach(cleanup);

beforeAll(() => {
  const rects = () => ({ length: 0, item: () => null, [Symbol.iterator]: [][Symbol.iterator] }) as unknown as DOMRectList;
  const rect = () => ({ x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, toJSON: () => ({}) }) as DOMRect;
  for (const proto of [Range.prototype, Element.prototype]) {
    if (!proto.getClientRects) Object.assign(proto, { getClientRects: rects });
    if (!proto.getBoundingClientRect) Object.assign(proto, { getBoundingClientRect: rect });
  }
});

const context = { kind: 'conversation', id: 'dm-hank', title: 'Hank', dm: true } as const;

describe('ContextComposer forwarded props', () => {
  it('draws modeRowStart on the idle row', () => {
    render(<ContextComposer context={context} onSend={vi.fn(() => true)} modeRowStart={<span>Chat</span>} composerTestId="c" />);
    expect(screen.getByTestId('c')).toHaveAttribute('data-collapsed', 'true');
    expect(screen.getByTestId('c-mode-row-start')).toHaveTextContent('Chat');
  });

  it('enables Send on a references-only draft when sendWithReferencesOnly is set', () => {
    const { rerender } = render(
      <ContextComposer context={context} onSend={vi.fn(() => true)} references={[{ id: 'r', label: 'Page' }]} composerTestId="c" />,
    );
    expect(screen.getByTestId('c-send')).toBeDisabled();
    rerender(
      <ContextComposer context={context} onSend={vi.fn(() => true)} references={[{ id: 'r', label: 'Page' }]} sendWithReferencesOnly composerTestId="c" />,
    );
    expect(screen.getByTestId('c-send')).not.toBeDisabled();
  });
});
