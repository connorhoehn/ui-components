// The Storymaker Studio audit (2026-11) found run pages showing a step's
// internals to people reading a run: the execution timeline table, "Node
// configuration", "Output: No output data" and "Node <id> (unknown) began
// execution", plus a "Retry from here" on a step that was still pending.
// These pin the at-rest contract: rows collapsed, internals behind a
// "Technical details" disclosure, empty sections omitted, no "(unknown)",
// and re-run buttons only on finished steps unless the host says otherwise.

import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { StepExecution } from '../../../types/pipeline';
import { StepThread, defaultCanRerunStep } from '../steps/StepThread';
import { StepTree } from '../steps/StepTree';

const step = (over: Partial<StepExecution>): StepExecution =>
  ({
    nodeId: 'n1',
    status: 'completed',
    startedAt: '2026-11-04T10:00:00.000Z',
    completedAt: '2026-11-04T10:00:02.000Z',
    durationMs: 2000,
    ...over,
  }) as unknown as StepExecution;

const expand = (stepId: string) => fireEvent.click(screen.getByTestId(`step-row-${stepId}`));
const openTechnical = (stepId: string) => fireEvent.click(screen.getByTestId(`step-technical-toggle-${stepId}`));

describe('StepThread at rest', () => {
  it('is collapsed by default and shows no internals', () => {
    render(<StepThread stepId="s1" index={0} nodeType="transform" nodeConfig={{ label: 'Clean', mode: 'x' }} step={step({})} />);
    expect(screen.getByTestId('step-row-s1')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Execution Timeline')).not.toBeInTheDocument();
    expect(screen.queryByText('Node Configuration')).not.toBeInTheDocument();
  });

  it('defaultExpanded opens the row, but internals stay behind Technical details', () => {
    render(<StepThread defaultExpanded stepId="s1" index={0} nodeType="transform" nodeConfig={{ mode: 'x' }} step={step({ output: { rows: 3 } })} />);
    expect(screen.getByTestId('step-row-s1')).toHaveAttribute('aria-expanded', 'true');
    const toggle = screen.getByTestId('step-technical-toggle-s1');
    expect(toggle).toHaveTextContent('Technical details');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Execution Timeline')).not.toBeInTheDocument();
    expect(screen.queryByText('Node Configuration')).not.toBeInTheDocument();
    expect(screen.queryByText('Output')).not.toBeInTheDocument();

    openTechnical('s1');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Execution Timeline')).toBeInTheDocument();
    expect(screen.getByText('Node Configuration')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
  });

  it("showTechnicalDetails='expanded' starts the disclosure open", () => {
    render(<StepThread defaultExpanded showTechnicalDetails="expanded" stepId="s1" index={0} nodeType="transform" step={step({})} />);
    expect(screen.getByTestId('step-technical-toggle-s1')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Execution Timeline')).toBeInTheDocument();
  });

  it("showTechnicalDetails='hidden' renders no disclosure at all", () => {
    render(<StepThread defaultExpanded showTechnicalDetails="hidden" stepId="s1" index={0} nodeType="transform" nodeConfig={{ mode: 'x' }} step={step({ output: { rows: 3 } })} />);
    expect(screen.queryByTestId('step-technical-s1')).not.toBeInTheDocument();
    expect(screen.queryByText('Execution Timeline')).not.toBeInTheDocument();
  });

  it('renderStepDetail stays visible in the summary area with the row collapsed', () => {
    render(<StepThread stepId="s1" index={0} nodeType="transform" step={step({})} renderStepDetail={() => <span>Deck ready</span>} />);
    expect(screen.getByTestId('step-detail-s1')).toHaveTextContent('Deck ready');
  });

  it('a user-facing result (an error) shows in the expanded row without opening the disclosure', () => {
    render(<StepThread defaultExpanded stepId="s1" index={0} nodeType="transform" step={step({ status: 'failed', error: 'Render timed out' })} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Render timed out')).toBeInTheDocument();
  });
});

describe('StepThread omits empty sections', () => {
  it('prints no "No output data", "No configuration" or empty timeline', () => {
    render(
      <StepThread
        defaultExpanded
        showTechnicalDetails="expanded"
        stepId="s1"
        index={0}
        nodeType="transform"
        step={step({ status: 'skipped', startedAt: undefined, completedAt: undefined, durationMs: undefined })}
      />,
    );
    expect(screen.queryByText('No output data')).not.toBeInTheDocument();
    expect(screen.queryByText('No configuration')).not.toBeInTheDocument();
    expect(screen.queryByText('Execution Timeline')).not.toBeInTheDocument();
    expect(screen.queryByText('Output')).not.toBeInTheDocument();
    // Nothing technical to show, so no disclosure either.
    expect(screen.queryByTestId('step-technical-s1')).not.toBeInTheDocument();
  });

  it('omits the Output section for an empty output object', () => {
    render(<StepThread defaultExpanded showTechnicalDetails="expanded" stepId="s1" index={0} nodeType="transform" step={step({ output: {} })} />);
    expect(screen.getByText('Execution Timeline')).toBeInTheDocument();
    expect(screen.queryByText('Output')).not.toBeInTheDocument();
  });
});

describe('StepThread never prints "(unknown)"', () => {
  it('names the step, not "(unknown)", when the node type is missing', () => {
    render(<StepThread defaultExpanded showTechnicalDetails="expanded" stepId="abcdef1234" index={0} nodeType="unknown" step={step({})} />);
    expect(document.body.textContent).not.toMatch(/\(unknown\)/);
    expect(screen.getByText('Step abcdef12 began execution')).toBeInTheDocument();
  });

  it('StepTree with a step missing from the definition prints no "(unknown)"', () => {
    render(<StepTree defaultExpanded showTechnicalDetails="expanded" steps={{ ghost123: step({}) }} nodeDataMap={{}} />);
    expect(document.body.textContent).not.toMatch(/unknown/i);
  });
});

describe('Retry / Resume gating', () => {
  const statuses: StepExecution['status'][] = ['pending', 'running', 'completed', 'failed', 'skipped', 'cancelled', 'awaiting'];

  it.each(statuses)('default offers re-run for a %s step only when it has finished', (status) => {
    render(
      <StepThread
        defaultExpanded
        stepId="s1"
        index={0}
        nodeType="transform"
        step={step({ status })}
        onRetryFromStep={vi.fn()}
        onResumeFromStep={vi.fn()}
      />,
    );
    const finished = status === 'completed' || status === 'failed' || status === 'cancelled';
    expect(defaultCanRerunStep(step({ status }))).toBe(finished);
    expect(!!screen.queryByTestId('retry-from-step-s1')).toBe(finished);
    expect(!!screen.queryByTestId('resume-from-step-s1')).toBe(finished);
  });

  it('canRetry / canResume override the default independently', () => {
    const canRetry = vi.fn(() => false);
    const canResume = vi.fn(() => true);
    const s = step({ status: 'completed' });
    render(
      <StepThread
        defaultExpanded
        stepId="s1"
        index={0}
        nodeType="transform"
        step={s}
        onRetryFromStep={vi.fn()}
        onResumeFromStep={vi.fn()}
        canRetry={canRetry}
        canResume={canResume}
      />,
    );
    expect(screen.queryByTestId('retry-from-step-s1')).not.toBeInTheDocument();
    expect(screen.getByTestId('resume-from-step-s1')).toBeInTheDocument();
    expect(canRetry).toHaveBeenCalledWith(s, 's1');
  });

  it('canRetry returning true still needs onRetryFromStep', () => {
    render(<StepThread defaultExpanded stepId="s1" index={0} nodeType="transform" step={step({})} canRetry={() => true} />);
    expect(screen.queryByTestId('retry-from-step-s1')).not.toBeInTheDocument();
  });

  it('StepTree forwards canRetry to every step', () => {
    render(
      <StepTree
        defaultExpanded
        steps={{ a: step({ status: 'pending' }), b: step({ status: 'completed' }) }}
        nodeDataMap={{}}
        onRetryFromStep={vi.fn()}
        canRetry={(s) => s.status === 'pending'}
      />,
    );
    expect(screen.getByTestId('retry-from-step-a')).toBeInTheDocument();
    expect(screen.queryByTestId('retry-from-step-b')).not.toBeInTheDocument();
  });
});
