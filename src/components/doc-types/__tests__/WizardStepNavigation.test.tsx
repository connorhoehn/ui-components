import { render, screen, fireEvent } from '@testing-library/react';
import { StepIndicator, WizardStepNavigation } from '../WizardStepNavigation';

describe('StepIndicator', () => {
  it('marks completed steps with a check', () => {
    const { container } = render(<StepIndicator step={3} total={3} />);
    const checks = Array.from(container.querySelectorAll('div')).filter(
      (el) => el.textContent === '✓',
    );
    expect(checks.length).toBe(2);
  });

  it('renders all three step labels', () => {
    render(<StepIndicator step={1} total={3} />);
    expect(screen.getByText('Basic Info')).toBeInTheDocument();
    expect(screen.getByText('Sections')).toBeInTheDocument();
    expect(screen.getByText('View Modes')).toBeInTheDocument();
  });
});

describe('WizardStepNavigation', () => {
  function defaults(overrides: Partial<Parameters<typeof WizardStepNavigation>[0]> = {}) {
    return {
      step: 1,
      totalSteps: 3,
      canAdvance: true,
      isEditing: false,
      onCancel: vi.fn(),
      onBack: vi.fn(),
      onNext: vi.fn(),
      ...overrides,
    };
  }

  it('hides Back on the first step', () => {
    render(<WizardStepNavigation {...defaults({ step: 1 })} />);
    expect(screen.queryByText(/← Back/)).toBeNull();
  });

  it('shows Back and labels Next as "Next →" on a middle step', () => {
    render(<WizardStepNavigation {...defaults({ step: 2 })} />);
    expect(screen.getByText('← Back')).toBeInTheDocument();
    expect(screen.getByTestId('wizard-next')).toHaveTextContent('Next →');
  });

  it('labels the final step "Create Type" when not editing', () => {
    render(<WizardStepNavigation {...defaults({ step: 3, totalSteps: 3 })} />);
    expect(screen.getByTestId('wizard-next')).toHaveTextContent('Create Type');
  });

  it('labels the final step "Save Changes" when editing', () => {
    render(
      <WizardStepNavigation
        {...defaults({ step: 3, totalSteps: 3, isEditing: true })}
      />,
    );
    expect(screen.getByTestId('wizard-next')).toHaveTextContent('Save Changes');
  });

  it('disables Next when canAdvance is false', () => {
    render(<WizardStepNavigation {...defaults({ canAdvance: false })} />);
    expect(screen.getByTestId('wizard-next')).toBeDisabled();
  });

  it('fires onCancel and onNext when their buttons are clicked', () => {
    const props = defaults();
    render(<WizardStepNavigation {...props} />);
    fireEvent.click(screen.getByText('Cancel'));
    fireEvent.click(screen.getByTestId('wizard-next'));
    expect(props.onCancel).toHaveBeenCalledTimes(1);
    expect(props.onNext).toHaveBeenCalledTimes(1);
  });

  it('renders Export Schema only when the handler is supplied', () => {
    const { rerender } = render(<WizardStepNavigation {...defaults()} />);
    expect(screen.queryByText('Export Schema')).toBeNull();
    const onExportSchema = vi.fn();
    rerender(<WizardStepNavigation {...defaults({ onExportSchema })} />);
    fireEvent.click(screen.getByText('Export Schema'));
    expect(onExportSchema).toHaveBeenCalledTimes(1);
  });
});
