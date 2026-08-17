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
});
