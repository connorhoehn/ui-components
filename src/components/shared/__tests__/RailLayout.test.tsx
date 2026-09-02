import { render, screen } from '@testing-library/react';
import { RailLayout, RailSection } from '../RailLayout';

describe('RailLayout', () => {
  it('renders the main column and the rail sections', () => {
    render(
      <RailLayout rail={<RailSection title="People"><span>Nora</span></RailSection>}>
        <div>the thread</div>
      </RailLayout>,
    );
    expect(screen.getByText('the thread')).toBeInTheDocument();
    expect(screen.getByText('People')).toBeInTheDocument();
    expect(screen.getByText('Nora')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });
});
