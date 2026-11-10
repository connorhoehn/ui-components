import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { WrappedPipelineRun, pipelineRunSteps } from '../WrappedPipelineRun';
import type { RMPipelineRunStatus } from '../types';

const running: RMPipelineRunStatus = {
  phase: 'running',
  stepLabel: 'Generating 3D mesh',
  details: {
    startedAt: new Date(Date.now() - 60_000).toISOString(),
    steps: [
      { id: 'approve', label: 'Approved', status: 'completed' },
      { id: 'submit', label: 'Submitted to Meshy', status: 'completed' },
      { id: 'process', label: 'Processing', status: 'running' },
      { id: 'review', label: 'Ready for review', status: 'pending' },
    ],
  },
};

describe('pipelineRunSteps', () => {
  it('maps step statuses and times onto WorkflowStepper steps', () => {
    const steps = pipelineRunSteps([...running.details!.steps!, { id: 'x', label: 'Broke', status: 'failed' }], { approve: '9:02' });
    expect(steps[0]).toMatchObject({ step: 1, label: 'Approved', done: true, active: false, description: '9:02' });
    expect(steps[2]).toMatchObject({ done: false, active: true });
    expect(steps[4]).toMatchObject({ outcome: 'failed' });
  });
});

describe('WrappedPipelineRun', () => {
  it('running: card, pill, facts, the stepper, the progress panel with an in-place Cancel', async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    render(
      <WrappedPipelineRun
        status={running}
        title="Mesh generation (Meshy)"
        facts={[{ label: 'Job ID', value: 'msh_123' }, { label: 'Model', value: 'meshy-5' }]}
        stepTimes={{ approve: '9:02', submit: '9:03' }}
        progress={68}
        remainingMs={105_000}
        progressDescription="Meshy is generating a stylized mesh from the approved concept."
        onCancel={onCancel}
        onRefresh={() => {}}
        headerAction={<a href="https://meshy.ai">Open in Meshy</a>}
        picture={<p>picture</p>}
        log={<p>log lines</p>}
      />,
    );
    const card = screen.getByTestId('wrapped-pipeline-run');
    expect(card).toHaveAttribute('data-pipeline-run');
    expect(card).toHaveAttribute('data-run-phase', 'running');
    expect(card).toHaveTextContent('Mesh generation (Meshy)');
    expect(card).toHaveTextContent('Processing');
    expect(card).toHaveTextContent('msh_123');
    expect(card).toHaveTextContent('9:02');
    expect(card).toHaveTextContent('picture');
    expect(card).toHaveTextContent('log lines');
    expect(screen.getByRole('link', { name: 'Open in Meshy' })).toBeInTheDocument();
    const progress = screen.getByTestId('wrapped-pipeline-run-progress');
    expect(progress).toHaveAttribute('data-run-state', 'running');
    expect(progress).toHaveTextContent('Generating 3D mesh');
    expect(progress).toHaveTextContent('~1m 45s');
    await user.click(screen.getByRole('button', { name: 'Cancel job' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    await user.click(screen.getByTestId('wrapped-pipeline-run-progress-cancel-confirm'));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('finished: no progress panel, the detail line as an alert', () => {
    render(<WrappedPipelineRun status={{ phase: 'failed', detail: 'Meshy refused the image.' }} title="Mesh generation" onCancel={() => {}} />);
    expect(screen.queryByTestId('wrapped-pipeline-run-progress')).toBeNull();
    expect(screen.getByTestId('wrapped-pipeline-run-detail')).toHaveTextContent('Meshy refused the image.');
    expect(screen.queryByRole('button', { name: /Cancel/ })).toBeNull();
  });

  it('loading before the first snapshot', () => {
    render(<WrappedPipelineRun status={undefined} title="Mesh generation" />);
    expect(screen.getByTestId('wrapped-pipeline-run')).toHaveAttribute('data-run-phase', 'loading');
    expect(screen.getByTestId('wrapped-pipeline-run-loading')).toBeInTheDocument();
  });

  it('compact: one line with the step count, Cancel and Open run', async () => {
    const onOpenRun = vi.fn();
    const user = userEvent.setup();
    render(<WrappedPipelineRun compact status={running} title="Mesh generation" subject="Drawing Mina" onCancel={() => {}} onOpenRun={onOpenRun} />);
    const line = screen.getByTestId('wrapped-pipeline-run');
    expect(line).toHaveAttribute('data-pipeline-run', 'compact');
    expect(line).toHaveTextContent('Drawing Mina · step 3 of 4');
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveAttribute('data-action-kind', 'cancel');
    await user.click(screen.getByRole('button', { name: 'Open run' }));
    expect(onOpenRun).toHaveBeenCalledOnce();
  });
});

describe('WrappedPipelineRun on scale (G88-W3, 2.515.12)', () => {
  it('header 16/12px padding, subtitle 4px, pill 11px, compact step labels, h3 by default', () => {
    render(<WrappedPipelineRun status={running} title="Mesh generation" subtitle="Toby · v1.2" />);
    const heading = screen.getByRole('heading', { name: 'Mesh generation' });
    expect(heading.tagName).toBe('H3');
    const header = heading.parentElement!.parentElement!.parentElement!;
    expect(header.className).toContain('px-4');
    expect(header.className).toContain('pt-3');
    expect(header.className).toContain('pb-3');
    expect(header.className).not.toMatch(/px-3\.5|pb-2\.5/);
    expect(header.className).toContain('[&_p]:mt-1');
    const pill = screen.getByTestId('wrapped-pipeline-run-state');
    expect(pill.className).toContain('text-[11px]');
    expect(pill.className).not.toContain('text-[10px]');
    const steps = screen.getByTestId('wrapped-pipeline-run-steps');
    expect(steps.innerHTML).not.toContain('text-[10px]');
    expect(within(steps).getByText('Processing').className).toContain('text-xs');
  });
  it('titleAs sets the heading element', () => {
    render(<WrappedPipelineRun status={running} title="Mesh generation" titleAs="h2" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Mesh generation' })).toBeInTheDocument();
  });
  it('compact pill is 11px', () => {
    render(<WrappedPipelineRun status={running} title="Mesh" compact />);
    expect(screen.getByTestId('wrapped-pipeline-run').innerHTML).not.toContain('text-[10px]');
  });
});
