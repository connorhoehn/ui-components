// A share dialog that cannot save must say so.
//
// The component renders an answer someone else computed — it is deliberately
// not a permissions engine. That leaves a gap a host can fall into: omitting
// `onChangeRole` correctly makes the roles read-only, and then the reader sees
// a permissions dialog that refuses to work and is told nothing. Withholding
// the control is honest; withholding the reason is not.

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DocumentShareDialog, { type ShareEntry } from '../DocumentShareDialog';

const people: ShareEntry[] = [
    { userId: 'dev-hank', displayName: 'Hank Anderson', role: 'owner' },
    { userId: 'dev-ada', displayName: 'Ada Lovelace', role: 'editor' },
];

describe('DocumentShareDialog notice', () => {
    it('renders nothing extra when the host has no caveat', () => {
        render(<DocumentShareDialog open onClose={vi.fn()} people={people} />);
        expect(screen.queryByTestId('document-share-dialog-notice')).toBeNull();
    });

    it('shows the host’s caveat where it cannot be missed', () => {
        render(
            <DocumentShareDialog
                open
                onClose={vi.fn()}
                people={people}
                notice="Roles are not saved yet."
            />,
        );
        expect(screen.getByTestId('document-share-dialog-notice').textContent)
            .toBe('Roles are not saved yet.');
    });

    it('is read-only without onChangeRole — no select to mislead anyone', () => {
        render(<DocumentShareDialog open onClose={vi.fn()} people={people} notice="n" />);
        expect(screen.queryByTestId('document-share-dialog-role')).toBeNull();
        // Both people, including the non-owner, state their role as text.
        expect(screen.getAllByTestId('document-share-dialog-role-static')).toHaveLength(2);
    });

    it('still offers the roles when the host CAN save them', () => {
        render(
            <DocumentShareDialog open onClose={vi.fn()} people={people} onChangeRole={vi.fn()} />,
        );
        // The owner is always static — a document with no owner is a document
        // nobody is responsible for — so exactly one select, for Ada.
        expect(screen.getAllByTestId('document-share-dialog-role')).toHaveLength(1);
    });

    it('disables general access when the host cannot change it', () => {
        render(<DocumentShareDialog open onClose={vi.fn()} people={people} />);
        expect((screen.getByTestId('document-share-dialog-general-access') as HTMLSelectElement).disabled)
            .toBe(true);
    });
});
