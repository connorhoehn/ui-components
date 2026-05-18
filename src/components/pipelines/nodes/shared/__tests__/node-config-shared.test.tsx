import { render, screen, fireEvent } from '@testing-library/react';
import NodeConfigShell from '../NodeConfigShell';
import ConfigField from '../ConfigField';
import ConfigSection from '../ConfigSection';

describe('NodeConfigShell', () => {
  it('renders children', () => {
    render(
      <NodeConfigShell>
        <span>inner content</span>
      </NodeConfigShell>
    );
    expect(screen.getByText('inner content')).toBeInTheDocument();
  });

  it('merges className with the default layout classes', () => {
    const { container } = render(
      <NodeConfigShell className="custom-cls">
        <span>x</span>
      </NodeConfigShell>
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('flex', 'flex-col', 'gap-3', 'px-4', 'py-3', 'custom-cls');
  });
});

describe('ConfigField', () => {
  it('renders the label and children', () => {
    render(
      <ConfigField label="Field A">
        <input data-testid="field-input" />
      </ConfigField>
    );
    expect(screen.getByText('Field A')).toBeInTheDocument();
    expect(screen.getByTestId('field-input')).toBeInTheDocument();
  });

  it('shows the required indicator when required is set', () => {
    const { container } = render(
      <ConfigField label="Required field" required>
        <input />
      </ConfigField>
    );
    expect(container.querySelector('label')?.textContent).toContain('●');
  });

  it('omits the required indicator when required is not set', () => {
    const { container } = render(
      <ConfigField label="Optional field">
        <input />
      </ConfigField>
    );
    expect(container.querySelector('label')?.textContent).not.toContain('●');
  });

  it('renders error text when error is provided', () => {
    render(
      <ConfigField label="Field" error="Required.">
        <input />
      </ConfigField>
    );
    expect(screen.getByText('Required.')).toBeInTheDocument();
  });

  it('renders help text when help is provided and no error', () => {
    render(
      <ConfigField label="Field" help="Some hint">
        <input />
      </ConfigField>
    );
    expect(screen.getByText('Some hint')).toBeInTheDocument();
  });

  it('hides help text when both help and error are provided', () => {
    render(
      <ConfigField label="Field" help="Some hint" error="Bad">
        <input />
      </ConfigField>
    );
    expect(screen.getByText('Bad')).toBeInTheDocument();
    expect(screen.queryByText('Some hint')).not.toBeInTheDocument();
  });
});

describe('ConfigSection', () => {
  it('renders the title and expanded children by default', () => {
    render(
      <ConfigSection title="Advanced">
        <span>nested</span>
      </ConfigSection>
    );
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByText('nested')).toBeInTheDocument();
  });

  it('hides children when defaultCollapsed is true', () => {
    render(
      <ConfigSection title="Advanced" defaultCollapsed>
        <span>nested</span>
      </ConfigSection>
    );
    expect(screen.queryByText('nested')).not.toBeInTheDocument();
  });

  it('toggles children visibility when the header is clicked', () => {
    render(
      <ConfigSection title="Advanced">
        <span>nested</span>
      </ConfigSection>
    );
    expect(screen.getByText('nested')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Advanced/ }));
    expect(screen.queryByText('nested')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Advanced/ }));
    expect(screen.getByText('nested')).toBeInTheDocument();
  });
});
