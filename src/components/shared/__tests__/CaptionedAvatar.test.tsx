import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CaptionedAvatar } from '../CaptionedAvatar';

describe('CaptionedAvatar', () => {
  it('static: avatar, name and role caption', () => {
    render(<CaptionedAvatar name="Mina" role="Lead" />);
    const card = screen.getByTestId('captioned-avatar');
    expect(card.tagName).toBe('DIV');
    expect(card).toHaveAttribute('data-captioned-avatar');
    expect(card).toHaveTextContent('Mina');
    expect(card).toHaveTextContent('Lead');
  });

  it('onClick makes the whole card one button; selected is aria-current', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<CaptionedAvatar name="Toby" role="Candidate" onClick={onClick} selected />);
    const button = screen.getByRole('button', { name: /Toby/ });
    expect(button).toHaveAttribute('aria-current', 'true');
    expect(button).toHaveAttribute('data-selected', 'true');
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('href renders a link', () => {
    render(<CaptionedAvatar name="Ledger" role="Prop" href="#/assets/props/ledger" />);
    expect(screen.getByRole('link', { name: /Ledger/ })).toHaveAttribute('href', '#/assets/props/ledger');
  });
});
