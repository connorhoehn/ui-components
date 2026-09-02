import { render, screen } from '@testing-library/react';
import { SignoffPanel } from '../SignoffPanel';

describe('SignoffPanel', () => {
  it('shows the quorum hint when nobody has signed', () => {
    render(<SignoffPanel signoffs={[]} />);
    expect(screen.getByText(/2 approvals ratify/)).toBeInTheDocument();
  });

  it('counts approvals against the requirement', () => {
    render(<SignoffPanel required={3} signoffs={[
      { name: 'Nora', decision: 'approve' },
      { name: 'Layla', decision: 'approve' },
      { name: 'Eli', decision: 'reject' },
    ]} />);
    expect(screen.getByText('2/3 approvals')).toBeInTheDocument();
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('renders actions only when given — viewer permission is the caller\'s rule', () => {
    const { rerender } = render(<SignoffPanel signoffs={[]} />);
    expect(screen.queryByText('Approve')).not.toBeInTheDocument();
    rerender(<SignoffPanel signoffs={[]} actions={<button>Approve</button>} />);
    expect(screen.getByText('Approve')).toBeInTheDocument();
  });
});
