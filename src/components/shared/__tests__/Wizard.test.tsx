import { useState } from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Wizard, type WizardStep } from '../Wizard';

function Harness({ initialCanAdvance = true }: { initialCanAdvance?: boolean }) {
  const [activeKey, setActiveKey] = useState('one');
  const onFinish = vi.fn();
  const steps: WizardStep[] = [
    { key: 'one', label: 'Step One', content: <div>Content one</div> },
    { key: 'two', label: 'Step Two', canAdvance: initialCanAdvance, content: <div>Content two</div> },
    { key: 'three', label: 'Step Three', content: <div>Content three</div> },
  ];
  return <Wizard steps={steps} activeKey={activeKey} onStep={setActiveKey} onFinish={onFinish} />;
}

afterEach(cleanup);

describe('Wizard', () => {
  it('renders the active step content and rail labels', () => {
    render(<Harness />);
    expect(screen.getByTestId('wizard-content')).toHaveTextContent('Content one');
    expect(screen.getByText('Step Two')).toBeInTheDocument();
  });

  it('advances to the next step on Next', () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId('wizard-next'));
    expect(screen.getByTestId('wizard-content')).toHaveTextContent('Content two');
  });

  it('disables Back on the first step', () => {
    render(<Harness />);
    expect(screen.getByTestId('wizard-back')).toBeDisabled();
  });

  it('goes back to the previous step on Back', () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId('wizard-next'));
    fireEvent.click(screen.getByTestId('wizard-back'));
    expect(screen.getByTestId('wizard-content')).toHaveTextContent('Content one');
  });

  it('refuses to advance when the active step has canAdvance: false', () => {
    render(<Harness initialCanAdvance={false} />);
    fireEvent.click(screen.getByTestId('wizard-next')); // one -> two
    expect(screen.getByTestId('wizard-content')).toHaveTextContent('Content two');
    expect(screen.getByTestId('wizard-next')).toBeDisabled();
    fireEvent.click(screen.getByTestId('wizard-next'));
    expect(screen.getByTestId('wizard-content')).toHaveTextContent('Content two');
  });

  it('clicking a rail step jumps directly to it', () => {
    render(<Harness />);
    fireEvent.click(screen.getByTestId('wizard-step-three'));
    expect(screen.getByTestId('wizard-content')).toHaveTextContent('Content three');
  });

  it('shows "Finish" on the last step and calls onFinish', () => {
    const onFinish = vi.fn();
    render(
      <Wizard
        steps={[
          { key: 'a', label: 'A', content: <div>A</div> },
          { key: 'b', label: 'B', content: <div>B</div> },
        ]}
        activeKey="b"
        onStep={() => {}}
        onFinish={onFinish}
      />,
    );
    expect(screen.getByTestId('wizard-next')).toHaveTextContent('Finish');
    fireEvent.click(screen.getByTestId('wizard-next'));
    expect(onFinish).toHaveBeenCalledTimes(1);
  });
});
