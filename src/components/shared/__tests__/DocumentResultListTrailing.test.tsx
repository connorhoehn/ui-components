import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DocumentResultList, type DocumentResultItem } from '../DocumentResultList';
import { CallPresenceIndicator } from '../../hangout/CallPresenceIndicator';

const items: DocumentResultItem[] = [
  { id: 'a', title: 'Auth architecture', kind: 'page', folder: 'Auth migration' },
  { id: 'b', title: 'Migration brief', kind: 'page' },
];

describe('DocumentResultList trailing slot (A-7)', () => {
  it('draws a row trailing (a live call) outside the open target, only on rows that have one', () => {
    const onOpen = vi.fn();
    const onCall = vi.fn();
    render(
      <DocumentResultList
        items={items}
        onOpen={onOpen}
        rowTrailing={(i) =>
          i.id === 'a' ? (
            <CallPresenceIndicator participants={[{ userId: 'c', name: 'Connor Hoehn' }]} count={3} onClick={onCall} />
          ) : null
        }
      />,
    );
    const slots = screen.getAllByTestId('document-result-trailing');
    expect(slots).toHaveLength(1);
    const rows = screen.getAllByTestId('document-result-row');
    expect(rows[0]!.contains(slots[0]!)).toBe(true);
    expect(screen.getByTestId('call-presence-count').textContent).toBe('3');
    fireEvent.click(screen.getByTestId('call-presence-indicator'));
    expect(onCall).toHaveBeenCalled();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('takes item.trailing too, and rowTrailing wins', () => {
    render(
      <DocumentResultList
        items={[{ ...items[0]!, trailing: <span>item</span> }, { ...items[1]!, trailing: <span>item-b</span> }]}
        onOpen={() => {}}
        rowTrailing={(i) => (i.id === 'b' ? <span>host</span> : null)}
      />,
    );
    expect(screen.getByText('item')).toBeTruthy();
    expect(screen.getByText('host')).toBeTruthy();
    expect(screen.queryByText('item-b')).toBeNull();
  });
});
