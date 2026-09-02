import { render, screen } from '@testing-library/react';
import { Divider } from '../Divider';
import { DetailSection } from '../DetailSection';

describe('Divider', () => {
  it('renders a plain rule as an <hr> when unlabelled', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('a captioned rule is a named separator, not an hr with text beside it', () => {
    render(<Divider label="Evidence" />);
    const sep = screen.getByRole('separator', { name: 'Evidence' });
    expect(sep).toBeInTheDocument();
    expect(screen.getByText('Evidence')).toBeInTheDocument();
  });

  it('takes a spacing scale', () => {
    const { container } = render(<Divider spacing="none" />);
    expect(container.querySelector('hr')?.className).toContain('my-0');
  });
});

describe('DetailSection', () => {
  it('draws a leading rule so a section cannot read as a continuation', () => {
    const { container } = render(<DetailSection title="Contract">body</DetailSection>);
    expect(container.querySelector('hr')).toBeInTheDocument();
    expect(screen.getByText('Contract')).toBeInTheDocument();
  });

  it('suppresses the rule on the first section — no stray line under the header', () => {
    const { container } = render(<DetailSection title="Contract" first>body</DetailSection>);
    expect(container.querySelector('hr')).not.toBeInTheDocument();
  });

  it('renders a hint and actions beside the title', () => {
    render(
      <DetailSection title="Related" hint="3 found" actions={<button>all</button>}>
        body
      </DetailSection>,
    );
    expect(screen.getByText('3 found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'all' })).toBeInTheDocument();
  });
});
