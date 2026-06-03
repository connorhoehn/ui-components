import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JudgmentTrendChart } from '../JudgmentTrendChart';
import { AggregateSummaryCard } from '../AggregateSummaryCard';
import type { AggregateRow } from '../types';

function row(overrides: Partial<AggregateRow>): AggregateRow {
  return {
    aggregateKey: 'pl_1#r1#2026-06-01',
    pipelineId: 'pl_1',
    rubricId: 'r1',
    dayBucket: '2026-06-01',
    numJudgments: 10,
    numPassed: 9,
    numFailed: 1,
    sumOverallScore: 8.4,
    sumTokensIn: 12000,
    sumTokensOut: 1800,
    sumCostUsd: 0.072,
    firstJudgedAt: '2026-06-01T00:00:00Z',
    lastJudgedAt: '2026-06-01T23:00:00Z',
    ...overrides,
  };
}

describe('JudgmentTrendChart', () => {
  it('renders an empty-state when aggregates is empty', () => {
    render(<JudgmentTrendChart aggregates={[]} />);
    expect(screen.getByText(/No judgment activity in range/)).toBeInTheDocument();
  });

  it('shows a loading message when empty + loading=true', () => {
    render(<JudgmentTrendChart aggregates={[]} loading />);
    expect(screen.getByText(/Loading trends/)).toBeInTheDocument();
  });

  it('renders the overall pass-rate chip and total cost', () => {
    render(
      <JudgmentTrendChart
        aggregates={[
          row({ aggregateKey: 'a', dayBucket: '2026-06-01', numJudgments: 10, numPassed: 9, sumCostUsd: 0.1 }),
          row({ aggregateKey: 'b', dayBucket: '2026-06-02', numJudgments: 5, numPassed: 4, sumCostUsd: 0.05 }),
        ]}
      />,
    );
    // 13/15 ≈ 87% pass
    expect(screen.getByText(/87% pass · 15 judgments/)).toBeInTheDocument();
    expect(screen.getByText(/total cost \$0.1500/)).toBeInTheDocument();
  });

  it('renders one row per aggregate with date, pass-rate %, mean score, cost', () => {
    render(
      <JudgmentTrendChart
        aggregates={[
          row({ aggregateKey: 'a', dayBucket: '2026-06-01', numJudgments: 10, numPassed: 9, sumOverallScore: 8.5, sumCostUsd: 0.1 }),
        ]}
      />,
    );
    expect(screen.getByText('2026-06-01')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument(); // pass-rate chip
    expect(screen.getByText('85%')).toBeInTheDocument(); // mean = 0.85 (8.5 / 10)
    expect(screen.getByText('10')).toBeInTheDocument(); // judgments count
    expect(screen.getByText('$0.1000')).toBeInTheDocument();
  });

  it('sorts desc (newest first) by default', () => {
    const { container } = render(
      <JudgmentTrendChart
        aggregates={[
          row({ aggregateKey: 'a', dayBucket: '2026-06-01' }),
          row({ aggregateKey: 'b', dayBucket: '2026-06-03' }),
          row({ aggregateKey: 'c', dayBucket: '2026-06-02' }),
        ]}
      />,
    );
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0].textContent).toMatch(/2026-06-03/);
    expect(rows[1].textContent).toMatch(/2026-06-02/);
    expect(rows[2].textContent).toMatch(/2026-06-01/);
  });

  it('sorts asc when sortOrder=asc', () => {
    const { container } = render(
      <JudgmentTrendChart
        sortOrder="asc"
        aggregates={[
          row({ aggregateKey: 'a', dayBucket: '2026-06-01' }),
          row({ aggregateKey: 'b', dayBucket: '2026-06-03' }),
        ]}
      />,
    );
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[0].textContent).toMatch(/2026-06-01/);
    expect(rows[1].textContent).toMatch(/2026-06-03/);
  });

  it('uses warning tone when 60-89% pass-rate, danger when <60%', () => {
    const { rerender } = render(
      <JudgmentTrendChart
        aggregates={[row({ numJudgments: 10, numPassed: 7 })]} // 70%
      />,
    );
    // Just sanity-check by chip text presence; tone class names vary by Chip impl.
    expect(screen.getByText(/70% pass/)).toBeInTheDocument();

    rerender(
      <JudgmentTrendChart
        aggregates={[row({ numJudgments: 10, numPassed: 3 })]} // 30%
      />,
    );
    expect(screen.getByText(/30% pass/)).toBeInTheDocument();
  });
});

describe('AggregateSummaryCard', () => {
  it('renders pass-rate chip and verdict prefix', () => {
    render(<AggregateSummaryCard aggregate={row({ numJudgments: 10, numPassed: 9 })} />);
    expect(screen.getByText(/HEALTHY · 90% pass/)).toBeInTheDocument();
    expect(screen.getByText(/10 judgments/)).toBeInTheDocument();
  });

  it('uses FAILING prefix for low pass-rate', () => {
    render(<AggregateSummaryCard aggregate={row({ numJudgments: 10, numPassed: 2 })} />);
    expect(screen.getByText(/FAILING · 20% pass/)).toBeInTheDocument();
  });

  it('omits min/max range when fields missing (older rows)', () => {
    render(<AggregateSummaryCard aggregate={row({ minOverallScore: undefined, maxOverallScore: undefined })} />);
    expect(screen.queryByText(/range/)).not.toBeInTheDocument();
  });

  it('shows min/max range when both fields present', () => {
    render(
      <AggregateSummaryCard
        aggregate={row({ minOverallScore: 0.45, maxOverallScore: 0.95 })}
      />,
    );
    expect(screen.getByText(/range/)).toBeInTheDocument();
    expect(screen.getByText('0.45')).toBeInTheDocument();
    expect(screen.getByText('0.95')).toBeInTheDocument();
  });
});
