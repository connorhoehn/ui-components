import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { JudgmentResultViewer } from '../JudgmentResultViewer';
import { VerdictPanel } from '../VerdictPanel';
import { CriteriaPanel } from '../CriteriaPanel';
import { JudgmentApiProvider } from '../JudgmentApiContext';
import type { JudgmentApi, JudgmentResult } from '../types';

const fixture: JudgmentResult = {
  judgmentId: 'jdg_1',
  runId: 'run_1',
  stepId: 'judge_a',
  pipelineId: 'pl_1',
  rubricId: 'rubric.helpfulness',
  rubricVersion: 2,
  rubricSnapshot: {
    id: 'rubric.helpfulness',
    version: 2,
    overall: 'weighted-mean',
    passThreshold: 0.7,
    criteria: [
      { id: 'relevance', prompt: 'Addresses the question?', scale: '1-5', weight: 2 },
      { id: 'accuracy', prompt: 'Claims verifiable?', scale: '1-5', weight: 3 },
    ],
  },
  mode: 'absolute',
  overallScore: 0.82,
  overallVerdict: 'pass',
  overallPassed: true,
  confidence: 0.9,
  criteria: [
    { criterionId: 'relevance', score: 0.8, rawScore: 4, rationale: 'On topic.', passed: true },
    { criterionId: 'accuracy', score: 0.6, rawScore: 3, rationale: 'Two claims unsupported.', passed: false },
  ],
  rawModelText: '{"criteria":[...]}',
  model: 'claude-sonnet-4-6',
  tokensIn: 1820,
  tokensOut: 240,
  cacheReadTokens: 1500,
  cacheCreationTokens: 0,
  latencyMs: 1850,
  costUsd: 0.0072,
  cacheHit: true,
  judgedAt: '2026-06-03T12:00:00.000Z',
};

describe('VerdictPanel', () => {
  it('shows rubric id+version, model, mode, and verdict prefix', () => {
    render(<VerdictPanel result={fixture} />);
    expect(screen.getByText(/rubric.helpfulness v2/)).toBeInTheDocument();
    expect(screen.getByText(/PASS · pass/)).toBeInTheDocument();
    expect(screen.getByText('claude-sonnet-4-6')).toBeInTheDocument();
    expect(screen.getByText(/mode: absolute/)).toBeInTheDocument();
  });

  it('uses "FAIL · fail" verdict prefix on a failing judgment', () => {
    const failed: JudgmentResult = { ...fixture, overallVerdict: 'fail', overallPassed: false, overallScore: 0.3 };
    render(<VerdictPanel result={failed} />);
    expect(screen.getByText(/FAIL · fail/)).toBeInTheDocument();
  });

  it('renders the score gauge as a role=meter with the correct aria-valuenow', () => {
    render(<VerdictPanel result={fixture} />);
    const meters = screen.getAllByRole('meter');
    // VerdictPanel renders one meter for the overall gauge
    expect(meters.length).toBeGreaterThanOrEqual(1);
    expect(meters[0].getAttribute('aria-valuenow')).toBe('0.82');
  });
});

describe('CriteriaPanel', () => {
  it('renders one row per criterion with id, raw score, prompt, and rationale', () => {
    render(<CriteriaPanel result={fixture} />);
    expect(screen.getByText(/Criteria \(2\)/)).toBeInTheDocument();
    expect(screen.getByText('relevance')).toBeInTheDocument();
    expect(screen.getByText('accuracy')).toBeInTheDocument();
    expect(screen.getByText(/Addresses the question/)).toBeInTheDocument();
    expect(screen.getByText('On topic.')).toBeInTheDocument();
    expect(screen.getByText('Two claims unsupported.')).toBeInTheDocument();
  });

  it('shows the scale label and raw score', () => {
    render(<CriteriaPanel result={fixture} />);
    expect(screen.getAllByText('[1-5]').length).toBe(2);
    expect(screen.getByText(/raw: 4/)).toBeInTheDocument();
    expect(screen.getByText(/raw: 3/)).toBeInTheDocument();
  });

  it('labels each row PASS/FAIL based on the passed flag', () => {
    render(<CriteriaPanel result={fixture} />);
    expect(screen.getByText('PASS')).toBeInTheDocument();
    expect(screen.getByText('FAIL')).toBeInTheDocument();
  });

  it('renders nothing when criteria is empty', () => {
    const empty: JudgmentResult = { ...fixture, criteria: [] };
    const { container } = render(<CriteriaPanel result={empty} />);
    expect(container.querySelector('section')).toBeNull();
  });
});

describe('JudgmentResultViewer', () => {
  it('shows verdict + criteria + metadata footer by default', () => {
    render(<JudgmentResultViewer result={fixture} />);
    expect(screen.getByText(/PASS · pass/)).toBeInTheDocument();
    expect(screen.getByText('relevance')).toBeInTheDocument();
    expect(screen.getByText(/tokens/)).toBeInTheDocument();
    expect(screen.getByText(/\$0.0072/)).toBeInTheDocument();
  });

  it('respects showVerdict/showCriteria/showMetadata flags', () => {
    const { rerender } = render(
      <JudgmentResultViewer result={fixture} showVerdict={false} showMetadata={false} />,
    );
    expect(screen.queryByText(/PASS · pass/)).not.toBeInTheDocument();
    expect(screen.queryByText(/tokens/)).not.toBeInTheDocument();
    expect(screen.getByText('relevance')).toBeInTheDocument();

    rerender(<JudgmentResultViewer result={fixture} showCriteria={false} />);
    expect(screen.queryByText('relevance')).not.toBeInTheDocument();
  });

  it('expandable raw text — collapsed by default, click reveals', () => {
    render(<JudgmentResultViewer result={fixture} showRawText />);
    expect(screen.queryByText(/criteria/, { selector: 'pre' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/Raw model output/));
    expect(screen.getByText(/criteria/, { selector: 'pre' })).toBeInTheDocument();
  });

  it('shows cache-read tokens when present', () => {
    render(<JudgmentResultViewer result={fixture} />);
    expect(screen.getByText(/cache/)).toBeInTheDocument();
    expect(screen.getByText('1500')).toBeInTheDocument();
  });
});

describe('JudgmentResultViewer — raw text lazy fetch (H.2)', () => {
  const truncatedFixture: JudgmentResult = {
    ...fixture,
    rawModelText: undefined,
    rawTextTruncated: true,
  };

  it('hides the toggle entirely when rawText is neither inline nor truncated', () => {
    const { container } = render(
      <JudgmentResultViewer result={{ ...fixture, rawModelText: undefined }} showRawText />,
    );
    expect(container.textContent).not.toMatch(/Raw model output/);
  });

  it('shows fallback hint when truncated AND no provider mounted', () => {
    render(<JudgmentResultViewer result={truncatedFixture} showRawText />);
    fireEvent.click(screen.getByText(/Raw model output/));
    expect(screen.getByText(/no JudgmentApi provider is wired/)).toBeInTheDocument();
  });

  it('lazy-fetches via context.fetchRawText when truncated + provider mounted', async () => {
    const api: JudgmentApi = {
      fetchRawText: vi.fn().mockResolvedValue('recovered from S3'),
      fetchAggregates: vi.fn(),
    };
    render(
      <JudgmentApiProvider value={api}>
        <JudgmentResultViewer result={truncatedFixture} showRawText />
      </JudgmentApiProvider>,
    );

    // Initially the fetcher hasn't been called.
    expect(api.fetchRawText).not.toHaveBeenCalled();

    // Open the toggle — fires the fetch.
    fireEvent.click(screen.getByText(/Raw model output/));
    await waitFor(() => expect(api.fetchRawText).toHaveBeenCalledWith('jdg_1'));
    expect(await screen.findByText('recovered from S3')).toBeInTheDocument();
  });

  it('shows an error surface when the lazy fetch rejects', async () => {
    const api: JudgmentApi = {
      fetchRawText: vi.fn().mockRejectedValue(new Error('s3 denied')),
      fetchAggregates: vi.fn(),
    };
    render(
      <JudgmentApiProvider value={api}>
        <JudgmentResultViewer result={truncatedFixture} showRawText />
      </JudgmentApiProvider>,
    );

    fireEvent.click(screen.getByText(/Raw model output/));
    await waitFor(() =>
      expect(screen.getByText(/Failed to fetch raw text/)).toBeInTheDocument(),
    );
    expect(screen.getByText(/s3 denied/)).toBeInTheDocument();
  });

  // Regression: the lazy-fetch effect listed `lazyLoading` in its deps and
  // only bailed on `lazyText !== null`. A rejected fetch leaves `lazyText`
  // null, so the `lazyLoading` true -> false flip re-ran the effect, every
  // guard passed again, and the request fired again — forever. Measured at
  // ~13k calls in the 100ms window below against a failing endpoint: the
  // raw-output panel strobes between spinner and error and the tab pegs a
  // core.
  //
  // NOTE for whoever edits this: the rejection must construct a NEW Error per
  // call, as a real failing fetch does. `mockRejectedValue(new Error(...))`
  // reuses one instance, so `setLazyError` becomes a no-op write and React's
  // bailout masks the storm down to two calls — the bug still reproduces, but
  // only barely, and the test stops being convincing. Wrapping the wait in a
  // `waitFor` damps it the same way, which is why this reads the counter
  // straight out of a bare `act` window.
  it('does NOT re-fetch in a loop after the lazy fetch rejects', async () => {
    const api: JudgmentApi = {
      fetchRawText: vi.fn(() => Promise.reject(new Error('s3 denied'))),
      fetchAggregates: vi.fn(),
    };
    render(
      <JudgmentApiProvider value={api}>
        <JudgmentResultViewer result={truncatedFixture} showRawText />
      </JudgmentApiProvider>,
    );

    fireEvent.click(screen.getByText(/Raw model output/));

    // Let many effect/microtask rounds elapse; a looping effect re-issues the
    // request throughout this window.
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    expect(api.fetchRawText).toHaveBeenCalledTimes(1);
    // ...and the one failure is still surfaced to the user.
    expect(screen.getByText(/s3 denied/)).toBeInTheDocument();
  });

  it('does NOT fetch when inline rawText is already present (no over-fetch)', async () => {
    const api: JudgmentApi = {
      fetchRawText: vi.fn().mockResolvedValue('should-not-be-called'),
      fetchAggregates: vi.fn(),
    };
    render(
      <JudgmentApiProvider value={api}>
        <JudgmentResultViewer result={fixture} showRawText />
      </JudgmentApiProvider>,
    );
    fireEvent.click(screen.getByText(/Raw model output/));
    // Wait a tick to ensure no fetch fires.
    await new Promise((r) => setTimeout(r, 20));
    expect(api.fetchRawText).not.toHaveBeenCalled();
  });
});
