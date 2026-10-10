import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TraceTimeline } from '../TraceTimeline';
import type {
  TraceTimeline as TraceTimelineType,
  TraceSpan,
} from '../../../../types/agents';

function makeSpan(overrides: Partial<TraceSpan> = {}): TraceSpan {
  return {
    traceId: 't1',
    spanId: 's1',
    name: 'root span',
    kind: 'agent',
    startTime: '2026-05-17T00:00:00.000Z',
    endTime: '2026-05-17T00:00:00.100Z',
    durationMs: 100,
    status: 'ok',
    attributes: {},
    ...overrides,
  };
}

function makeTrace(overrides: Partial<TraceTimelineType> = {}): TraceTimelineType {
  return {
    traceId: 't1',
    rootSpanId: 's1',
    spans: [makeSpan()],
    totalDurationMs: 100,
    agentId: 'agent-1',
    startedAt: '2026-05-17T00:00:00.000Z',
    ...overrides,
  };
}

describe('TraceTimeline', () => {
  it('renders the trace id and total duration in the header', () => {
    render(<TraceTimeline trace={makeTrace({ traceId: 'trace-abc', totalDurationMs: 250 })} />);
    expect(screen.getByText('trace-abc')).toBeInTheDocument();
    expect(screen.getByText('250ms total')).toBeInTheDocument();
  });

  // Added with the agent-step trace consumer: a caller rendering one
  // specific kind of trace needs to be able to name it and to drop legend
  // entries that can never appear in its data.
  it('uses the title prop for the header label, defaulting to "Trace"', () => {
    const { unmount } = render(<TraceTimeline trace={makeTrace()} />);
    expect(screen.getByText('Trace')).toBeInTheDocument();
    unmount();

    render(<TraceTimeline trace={makeTrace()} title="Tool calls" />);
    expect(screen.getByText('Tool calls')).toBeInTheDocument();
    expect(screen.queryByText('Trace')).not.toBeInTheDocument();
  });

  it('legendKinds restricts the legend to the listed kinds', () => {
    render(<TraceTimeline trace={makeTrace()} legendKinds={['agent', 'tool']} />);
    expect(screen.getByText('Agent')).toBeInTheDocument();
    expect(screen.getByText('Tool')).toBeInTheDocument();
    for (const absent of ['LLM', 'Retrieval', 'Guardrail', 'Internal']) {
      expect(screen.queryByText(absent)).not.toBeInTheDocument();
    }
  });

  it('renders the legend with all six span-kind labels', () => {
    render(<TraceTimeline trace={makeTrace()} />);
    for (const label of ['Agent', 'Tool', 'LLM', 'Retrieval', 'Guardrail', 'Internal']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('renders spans walking the parent→child tree from rootSpanId', () => {
    const trace = makeTrace({
      spans: [
        makeSpan({ spanId: 's1', name: 'root' }),
        makeSpan({ spanId: 's2', parentSpanId: 's1', name: 'child-a' }),
        makeSpan({ spanId: 's3', parentSpanId: 's2', name: 'grandchild' }),
        makeSpan({ spanId: 's4', parentSpanId: 's1', name: 'child-b' }),
      ],
    });
    render(<TraceTimeline trace={trace} />);
    expect(screen.getByText('root')).toBeInTheDocument();
    expect(screen.getByText('child-a')).toBeInTheDocument();
    expect(screen.getByText('grandchild')).toBeInTheDocument();
    expect(screen.getByText('child-b')).toBeInTheDocument();
  });

  it('clicking a span row opens the detail panel with kind, duration, status, span id', () => {
    const trace = makeTrace({
      spans: [
        makeSpan({
          spanId: 's1',
          name: 'inspect-me',
          kind: 'tool',
          durationMs: 42,
          status: 'ok',
        }),
      ],
    });
    render(<TraceTimeline trace={trace} />);
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('inspect-me'));
    // Close button is unique to the detail panel — its presence proves the panel opened.
    expect(screen.getByText('Close')).toBeInTheDocument();
    // Detail-panel labels are unique to the detail panel.
    expect(screen.getByText('Kind')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Span ID')).toBeInTheDocument();
    // "Tool" appears in both legend and detail; "42ms" appears in both the
    // span row label and detail. Verify both surfaces are now showing.
    expect(screen.getAllByText('Tool').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('42ms').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('ok')).toBeInTheDocument();
    expect(screen.getByText('s1')).toBeInTheDocument();
  });

  it('detail-panel status is emerald when ok, red when error', () => {
    const trace = makeTrace({
      spans: [makeSpan({ spanId: 's1', status: 'error' })],
    });
    render(<TraceTimeline trace={trace} />);
    fireEvent.click(screen.getByText('root span'));
    const statusEl = screen.getByText('error');
    expect(statusEl).toHaveClass('text-danger-fg');
  });

  it('Close button hides the detail panel', () => {
    render(<TraceTimeline trace={makeTrace()} />);
    fireEvent.click(screen.getByText('root span'));
    expect(screen.getByText('Close')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
  });

  it('attributes section appears when the selected span has attributes', () => {
    const trace = makeTrace({
      spans: [
        makeSpan({
          spanId: 's1',
          attributes: { 'http.status': 200, retries: 0 },
        }),
      ],
    });
    render(<TraceTimeline trace={trace} />);
    fireEvent.click(screen.getByText('root span'));
    expect(screen.getByText('Attributes')).toBeInTheDocument();
    expect(screen.getByText('http.status:')).toBeInTheDocument();
    expect(screen.getByText('retries:')).toBeInTheDocument();
  });

  it('attributes section is hidden when the selected span has no attributes', () => {
    render(<TraceTimeline trace={makeTrace()} />);
    fireEvent.click(screen.getByText('root span'));
    expect(screen.queryByText('Attributes')).not.toBeInTheDocument();
  });

  it('zero-duration trace does not crash and shows 0ms duration label', () => {
    const trace = makeTrace({
      totalDurationMs: 0,
      spans: [makeSpan({ durationMs: 0 })],
    });
    expect(() => render(<TraceTimeline trace={trace} />)).not.toThrow();
    expect(screen.getByText('0ms total')).toBeInTheDocument();
  });

  it('threads className onto the outer wrapper', () => {
    const { container } = render(
      <TraceTimeline trace={makeTrace()} className="custom-trace" />,
    );
    expect(container.firstChild).toHaveClass('custom-trace');
  });

  it('row color swatch reflects the span kind', () => {
    const trace = makeTrace({
      spans: [makeSpan({ kind: 'llm' })],
    });
    const { container } = render(<TraceTimeline trace={trace} />);
    // amber bar in the spans area for kind='llm'
    expect(container.querySelector('.bg-warning')).not.toBeNull();
  });

  // REGRESSION: each span row was a plain <div> with onClick, so the detail
  // panel it opens was unreachable by keyboard. Rows are now real <button>s.
  it('exposes each span row as a focusable button that opens the detail panel', () => {
    render(<TraceTimeline trace={makeTrace()} />);

    const row = screen.getByRole('button', { name: /root span/ });
    expect(row.tagName).toBe('BUTTON');
    expect(row).toHaveAttribute('type', 'button');

    // A <div> row cannot take focus; a <button> can.
    row.focus();
    expect(row).toHaveFocus();

    fireEvent.click(row);
    expect(screen.getByText('Span ID')).toBeInTheDocument();
  });
});

describe('TraceTimeline waterfall options', () => {
  const spans = [
    makeSpan({ spanId: 'root', name: 'root', durationMs: 1000 }),
    makeSpan({
      spanId: 'a', parentSpanId: 'root', name: 'fast_tool', kind: 'tool',
      startTime: '2026-05-17T00:00:00.800Z', durationMs: 100,
    }),
    makeSpan({
      spanId: 'b', parentSpanId: 'root', name: 'bad_tool', kind: 'tool', status: 'error',
      startTime: '2026-05-17T00:00:00.100Z', durationMs: 500,
      attributes: { 'error.message': 'upstream 503' },
    }),
  ];
  const trace = makeTrace({ rootSpanId: 'root', spans, totalDurationMs: 1000 });
  const bar = (name: string) =>
    screen.getByText(name).closest('button')!.querySelector<HTMLElement>('.absolute.h-4')!;

  it('defaults to the real time axis', () => {
    render(<TraceTimeline trace={trace} />);
    expect(bar('fast_tool').style.left).toBe('80%');
  });

  it('by-duration mode starts every bar at 0 and scales to the longest span', () => {
    render(<TraceTimeline trace={trace} scale="duration" />);
    expect(bar('fast_tool').style.left).toBe('0%');
    expect(bar('fast_tool').style.width).toBe('10%');
    expect(bar('root').style.width).toBe('100%');
  });

  it('toggle switches between By time and By duration', () => {
    render(<TraceTimeline trace={trace} scaleToggle />);
    fireEvent.click(screen.getByRole('button', { name: 'By duration' }));
    expect(bar('fast_tool').style.left).toBe('0%');
    fireEvent.click(screen.getByRole('button', { name: 'By time' }));
    expect(bar('fast_tool').style.left).toBe('80%');
  });

  it('is controlled when onScaleChange is given', () => {
    const onScaleChange = vi.fn();
    render(<TraceTimeline trace={trace} scaleToggle scale="time" onScaleChange={onScaleChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'By duration' }));
    expect(onScaleChange).toHaveBeenCalledWith('duration');
    expect(bar('fast_tool').style.left).toBe('80%');
  });

  it('colours bars by pass/fail and swaps the legend', () => {
    render(<TraceTimeline trace={trace} colorByStatus />);
    expect(bar('bad_tool').className).toContain('bg-danger');
    expect(bar('fast_tool').className).toContain('bg-success');
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.queryByText('Retrieval')).not.toBeInTheDocument();
  });

  it('carries the error text in the row tooltip and the detail panel', () => {
    render(<TraceTimeline trace={trace} colorByStatus />);
    const row = screen.getByText('bad_tool').closest('button')!;
    expect(row.title).toBe('bad_tool - upstream 503 (500ms)');
    fireEvent.click(row);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getAllByText('upstream 503').length).toBeGreaterThan(0);
  });

  it('supports a custom errorText and a right-hand duration column', () => {
    render(<TraceTimeline trace={trace} durationColumn errorText={(s) => (s.status === 'error' ? 'custom' : undefined)} />);
    expect(screen.getAllByTestId('trace-duration')).toHaveLength(3);
    expect(screen.getByText('bad_tool').closest('button')!.title).toContain('custom');
  });
});
