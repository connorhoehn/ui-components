// The expanded step panel picks ONE renderer for `step.output`, and the choice
// is the whole value of the panel: an agent step rendered as a JSON dump hides
// the tool-call waterfall, and a vision step rendered the same way hides the
// caption and the extracted fields. These lock the branch order in
// StepThread's output ternary, plus the two seams around it — the step-row
// test handle the host's Playwright specs bind to, and the optional host image
// resolver that the produced-images section needs.

import { render, screen, fireEvent } from '@testing-library/react';
import type { StepExecution } from '../../../types/pipeline';
import { StepThread } from '../steps/StepThread';
import { PipelineEditorServicesProvider } from '../services/PipelineEditorServicesContext';

const step = (over: Partial<StepExecution>): StepExecution =>
  ({
    nodeId: 'n1',
    status: 'completed',
    startedAt: '2026-09-02T19:51:06.000Z',
    completedAt: '2026-09-02T19:51:08.000Z',
    ...over,
  }) as unknown as StepExecution;

const expand = (stepId: string) => fireEvent.click(screen.getByTestId(`step-row-${stepId}`));

describe('StepThread — row handle', () => {
  it('exposes a stable test handle and the node type on the collapsed row', () => {
    render(<StepThread stepId="abc12345" step={step({})} index={0} nodeType="trigger" />);
    const row = screen.getByTestId('step-row-abc12345');
    expect(row).toHaveAttribute('data-node-type', 'trigger');
  });
});

describe('StepThread — output branch selection', () => {
  it('renders the agent trace, not a JSON dump, for an agent step output', () => {
    render(
      <StepThread
        stepId="s1"
        index={0}
        nodeType="agent"
        step={step({
          output: {
            text: 'Done.',
            turns: 2,
            model: 'claude-sonnet-4-6',
            tokensIn: 10,
            tokensOut: 5,
            stopReason: 'complete',
            toolless: false,
            toolCalls: [
              { name: 'read_file', ok: true, startedAt: '2026-09-02T19:51:06.100Z', endedAt: '2026-09-02T19:51:06.400Z' },
            ],
          },
        })}
      />,
    );
    expand('s1');
    expect(screen.getByTestId('agent-trace')).toBeInTheDocument();
    expect(screen.queryByText('Output')).not.toBeInTheDocument();
  });

  it('renders the live trace while an agent step is still running', () => {
    render(
      <StepThread
        stepId="s2"
        index={0}
        nodeType="agent"
        step={step({
          status: 'running',
          completedAt: undefined,
          agentLive: {
            toolCalls: [{ name: 'grep', ok: true, startedAt: '2026-09-02T19:51:06.100Z' }],
          },
        })}
      />,
    );
    expand('s2');
    expect(screen.getByTestId('agent-live-badge')).toBeInTheDocument();
  });

  it('renders the vision viewer for a vision step output', () => {
    render(
      <StepThread
        stepId="s3"
        index={0}
        nodeType="image:vision-analyze"
        step={step({ output: { imageId: 'img-1', caption: 'A red bicycle', extracted: { colors: ['red'] } } })}
      />,
    );
    expand('s3');
    expect(screen.getByText('Vision result')).toBeInTheDocument();
    expect(screen.getByText('A red bicycle')).toBeInTheDocument();
  });

  it('falls back to the raw JSON dump for an unrecognised output shape', () => {
    render(
      <StepThread stepId="s4" index={0} nodeType="transform" step={step({ output: { rows: 3 } })} />,
    );
    expand('s4');
    expect(screen.getByText('Output')).toBeInTheDocument();
  });
});

describe('StepThread — produced images', () => {
  const withImages = step({
    images: [{ imageId: 'img-9', width: 800, height: 600, mimeType: 'image/png' }],
  });

  it('omits the section when no host image resolver is mounted', () => {
    render(<StepThread stepId="s5" step={withImages} index={0} nodeType="image:crop" />);
    expand('s5');
    expect(screen.queryByText(/Produced images/)).not.toBeInTheDocument();
  });

  it('resolves thumbnails through the host resolver when one is mounted', () => {
    render(
      <PipelineEditorServicesProvider services={{ getImageUrl: (id) => `/api/images/${id}` }}>
        <StepThread stepId="s6" step={withImages} index={0} nodeType="image:crop" />
      </PipelineEditorServicesProvider>,
    );
    expand('s6');
    expect(screen.getByText('Produced images (1)')).toBeInTheDocument();
    expect(screen.getByAltText('Produced image img-9')).toHaveAttribute('src', '/api/images/img-9');
  });
});
