import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';

// THE TOOLBAR IS CHROME, SO IT IS DRAWN.
//
// Link, Quote, Emoji and Attach were colour emoji (🔗 ❝ 🙂 📎). Two things
// were wrong with that. A colour emoji does not take `currentColor`: it stays
// bright on a muted toolbar, ignores the hover and disabled states of the
// button around it, and does not invert for dark mode — so it reads as a
// sticker sitting on a control rather than as the control. And the glyphs are
// font-dependent: the U+2190–U+27BF codepoints in particular render as text on
// one platform and as a picture on another unless a U+FE0E forces it, which
// has bitten this project twice (U+21AA, U+25B6).
//
// The assertion is deliberately not "the character is gone" — it is that the
// button draws an SVG and carries no text, which stays true whatever the icon
// is redrawn to look like.

afterEach(cleanup);

function toolbarButton(label: string) {
  return screen.getByLabelText(label);
}

describe('RichChatComposer toolbar glyphs', () => {
  it('draws Link, Quote, Emoji and Attach as icons rather than characters', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments />);
    for (const label of ['Add link', 'Quote', 'Emoji', 'Attach files']) {
      const button = toolbarButton(label);
      expect(button.querySelector('svg')).not.toBeNull();
      expect(button.textContent).toBe('');
    }
  });

  // The icons are aria-hidden, so the button is the only thing naming them.
  it('still names each one for a screen reader', () => {
    render(<RichChatComposer onSend={vi.fn()} allowEmoji allowAttachments />);
    for (const label of ['Add link', 'Quote', 'Emoji', 'Attach files']) {
      expect(toolbarButton(label)).toHaveAttribute('title', label);
      expect(toolbarButton(label).querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    }
  });

  // The text-formatting controls are letterforms on purpose — a B that looks
  // like a bold B needs no icon — so the sweep should have left them alone.
  it('leaves the letterform controls as letters', () => {
    render(<RichChatComposer onSend={vi.fn()} />);
    expect(toolbarButton('Bold').textContent).toBe('B');
    expect(toolbarButton('Italic').textContent).toBe('I');
  });
});
