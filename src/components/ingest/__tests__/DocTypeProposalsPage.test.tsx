import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type {
  DocTypeProposalRow,
  UseDocTypeProposalsResult,
} from '../../../hooks/useDocTypeProposals';

const useDocTypeProposalsMock = vi.fn<() => UseDocTypeProposalsResult>();

vi.mock('../../../hooks/useDocTypeProposals', () => ({
  useDocTypeProposals: () => useDocTypeProposalsMock(),
}));

import DocTypeProposalsPage from '../DocTypeProposalsPage';

function makeProposal(overrides: Partial<DocTypeProposalRow> = {}): DocTypeProposalRow {
  return {
    proposalId: 'prop-1',
    sourceId: 'src-abcdef123456',
    signature: 'sig-1234567890abcdef0000',
    sampleIngestIds: ['i1', 'i2'],
    proposedName: 'Invoice',
    proposedDescription: 'Vendor invoice payload',
    proposedFields: [
      { name: 'amount', sectionType: 'number', required: true },
      { name: 'vendor', sectionType: 'string', required: false },
    ],
    reasoning: 'Found 12 similar payloads with consistent shape.',
    status: 'pending',
    createdAt: '2026-05-17T00:00:00Z',
    ...overrides,
  };
}

function makeHook(
  overrides: Partial<UseDocTypeProposalsResult> = {},
): UseDocTypeProposalsResult {
  return {
    proposals: [],
    loading: false,
    error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    promote: vi.fn().mockResolvedValue(undefined),
    reject: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

beforeEach(() => {
  useDocTypeProposalsMock.mockReset();
});

describe('DocTypeProposalsPage', () => {
  it('renders the empty state when there are no proposals', () => {
    useDocTypeProposalsMock.mockReturnValue(makeHook());
    render(<DocTypeProposalsPage />);
    expect(screen.getByTestId('proposals-empty')).toBeInTheDocument();
    expect(screen.getByText('No proposals waiting')).toBeInTheDocument();
  });

  it('renders the error banner when error is set', () => {
    useDocTypeProposalsMock.mockReturnValue(makeHook({ error: 'fetch failed' }));
    render(<DocTypeProposalsPage />);
    expect(screen.getByTestId('proposals-error')).toHaveTextContent('fetch failed');
  });

  it('renders skeleton placeholders while loading with no proposals', () => {
    useDocTypeProposalsMock.mockReturnValue(makeHook({ loading: true }));
    render(<DocTypeProposalsPage />);
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(2);
    expect(screen.queryByTestId('proposals-list')).not.toBeInTheDocument();
  });

  it('renders proposed name, fields, sample count, and reasoning per row', () => {
    const proposals = [
      makeProposal({ proposalId: 'p-a', proposedName: 'Invoice' }),
      makeProposal({
        proposalId: 'p-b',
        proposedName: 'Receipt',
        sampleIngestIds: ['only-one'],
      }),
    ];
    useDocTypeProposalsMock.mockReturnValue(makeHook({ proposals }));
    render(<DocTypeProposalsPage />);

    expect(screen.getByTestId('proposals-list')).toBeInTheDocument();
    const rowA = screen.getByTestId('proposal-row-p-a');
    expect(rowA).toHaveTextContent('Invoice');
    expect(rowA).toHaveTextContent('amount');
    expect(rowA).toHaveTextContent('vendor');
    expect(rowA).toHaveTextContent('2 samples');
    expect(rowA).toHaveTextContent('Found 12 similar payloads');

    const rowB = screen.getByTestId('proposal-row-p-b');
    expect(rowB).toHaveTextContent('Receipt');
    expect(rowB).toHaveTextContent('1 sample');
  });

  it('truncates reasoning longer than 200 chars with an ellipsis', () => {
    const long = 'x'.repeat(250);
    useDocTypeProposalsMock.mockReturnValue(
      makeHook({ proposals: [makeProposal({ reasoning: long })] }),
    );
    render(<DocTypeProposalsPage />);
    expect(screen.getByTestId('proposal-row-prop-1')).toHaveTextContent(
      `${'x'.repeat(200)}…`,
    );
  });

  it('invokes promote(proposalId) when the Promote button is clicked', () => {
    const promote = vi.fn().mockResolvedValue(undefined);
    useDocTypeProposalsMock.mockReturnValue(
      makeHook({ proposals: [makeProposal({ proposalId: 'p-target' })], promote }),
    );
    render(<DocTypeProposalsPage />);
    fireEvent.click(screen.getByTestId('proposal-promote-p-target'));
    expect(promote).toHaveBeenCalledTimes(1);
    expect(promote).toHaveBeenCalledWith('p-target');
  });

  it('invokes reject(proposalId) when the Reject button is clicked', () => {
    const reject = vi.fn().mockResolvedValue(undefined);
    useDocTypeProposalsMock.mockReturnValue(
      makeHook({ proposals: [makeProposal({ proposalId: 'p-target' })], reject }),
    );
    render(<DocTypeProposalsPage />);
    fireEvent.click(screen.getByTestId('proposal-reject-p-target'));
    expect(reject).toHaveBeenCalledTimes(1);
    expect(reject).toHaveBeenCalledWith('p-target');
  });
});
