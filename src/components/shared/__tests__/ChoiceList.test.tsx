import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChoiceList, ChoiceOption, ChoiceRow } from '../ChoiceList';

describe('ChoiceList', () => {
  it('an action row does its thing; a disclosure row opens its targets in place', () => {
    const onSelect = vi.fn();
    const onPick = vi.fn();
    render(
      <ChoiceList>
        <ChoiceRow title="Do it" onSelect={onSelect} data-testid="act" />
        <ChoiceRow title="Pick one" data-testid="disc">
          <ChoiceOption label="A" onSelect={() => onPick('a')} />
        </ChoiceRow>
      </ChoiceList>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Do it' }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('disc-panel')).toBeNull();
    const disclosure = screen.getByRole('button', { name: 'Pick one' });
    fireEvent.click(disclosure);
    expect(disclosure).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'A' }));
    expect(onPick).toHaveBeenCalledWith('a');
  });

  it('a disabled row stays visible, says why, and takes no press', () => {
    const onSelect = vi.fn();
    render(
      <ChoiceList>
        <ChoiceRow title="Nope" onSelect={onSelect} disabled disabledReason="Not yet" />
      </ChoiceList>,
    );
    const b = screen.getByRole('button', { name: 'Nope' });
    expect(b).toBeDisabled();
    expect(b).toHaveAttribute('title', 'Not yet');
  });
});
