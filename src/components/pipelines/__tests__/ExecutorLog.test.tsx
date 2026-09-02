// src/components/pipelines/__tests__/ExecutorLog.test.tsx
//
// hub#2225 — coverage for the ExecutorLog timeline component.
// Asserts:
//   1. Empty-state copy renders when the audit hook reports zero items.
//   2. Timeline rows render when items exist.
//   3. Filter chips toggle the visible set.
//   4. Clicking a `pipeline.step.*` row calls onStepClick with the stepId.
//   5. Download button generates valid NDJSON for the currently filtered set.

import React from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { AuditRow } from '../../../api/pipelineAudit';
import type { UsePipelineRunAuditLogResult } from '../hooks/usePipelineRunAuditLog';

// ---------------------------------------------------------------------------
// Mocks — must precede SUT import.
// ---------------------------------------------------------------------------

let mockResult: UsePipelineRunAuditLogResult = {
  items: [],
  loading: false,
  error: null,
  hasMore: false,
  loadMore: vi.fn(),
  liveHealthy: false,
  refresh: vi.fn(),
};

vi.mock('../hooks/usePipelineRunAuditLog', () => ({
  usePipelineRunAuditLog: () => mockResult,
}));

import ExecutorLog from '../ExecutorLog';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRow(overrides: Partial<AuditRow>): AuditRow {
  return {
    auditId: 'ulid-' + Math.random().toString(36).slice(2),
    timestamp: new Date().toISOString(),
    action: 'pipeline.step.started',
    actorUserId: 'executor',
    pipelineId: 'pipe-1',
    runId: 'run-1',
    ...overrides,
  };
}

beforeEach(() => {
  mockResult = {
    items: [],
    loading: false,
    error: null,
    hasMore: false,
    loadMore: vi.fn(),
    liveHealthy: false,
    refresh: vi.fn(),
  };
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ExecutorLog', () => {
  test('renders empty-state copy when items is empty', () => {
    render(<ExecutorLog pipelineId="pipe-1" runId="run-1" />);

    const empty = screen.getByTestId('executor-log-empty');
    expect(empty).toBeTruthy();
    expect(empty.textContent ?? '').toMatch(/Audit log started recording on 2026-05-07/);
    expect(empty.textContent ?? '').toMatch(/hub#2224/);
  });

  test('renders timeline rows when items exist', () => {
    mockResult = {
      ...mockResult,
      items: [
        makeRow({ action: 'pipeline.step.started', auditId: 'a-1', trace: { stepId: 'node-A' } }),
        makeRow({ action: 'pipeline.run.completed', auditId: 'a-2' }),
      ],
    };
    render(<ExecutorLog pipelineId="pipe-1" runId="run-1" />);

    const rows = screen.getAllByTestId('executor-log-row');
    expect(rows.length).toBe(2);
    expect(rows[0].getAttribute('data-action')).toBe('pipeline.step.started');
    expect(rows[1].getAttribute('data-action')).toBe('pipeline.run.completed');
  });

  test('filter chips toggle the filtered list', () => {
    mockResult = {
      ...mockResult,
      items: [
        makeRow({ action: 'pipeline.step.started', auditId: 'a-1' }),
        makeRow({ action: 'pipeline.run.completed', auditId: 'a-2' }),
        makeRow({ action: 'pipeline.approval.recorded', auditId: 'a-3' }),
      ],
    };
    render(<ExecutorLog pipelineId="pipe-1" runId="run-1" />);

    // No filter active → all three.
    expect(screen.getAllByTestId('executor-log-row').length).toBe(3);

    // Activate "Steps" → only the step row remains.
    fireEvent.click(screen.getByTestId('executor-log-chip-steps'));
    const filtered = screen.getAllByTestId('executor-log-row');
    expect(filtered.length).toBe(1);
    expect(filtered[0].getAttribute('data-action')).toBe('pipeline.step.started');

    // Add "Approvals" → step + approval rows.
    fireEvent.click(screen.getByTestId('executor-log-chip-approvals'));
    expect(screen.getAllByTestId('executor-log-row').length).toBe(2);

    // Toggle "Steps" off → only approval row.
    fireEvent.click(screen.getByTestId('executor-log-chip-steps'));
    const final = screen.getAllByTestId('executor-log-row');
    expect(final.length).toBe(1);
    expect(final[0].getAttribute('data-action')).toBe('pipeline.approval.recorded');
  });

  test('clicking a pipeline.step.* row calls onStepClick with the stepId', () => {
    mockResult = {
      ...mockResult,
      items: [
        makeRow({
          action: 'pipeline.step.completed',
          auditId: 'a-1',
          trace: { stepId: 'node-A' },
        }),
        makeRow({
          action: 'pipeline.run.completed',
          auditId: 'a-2',
          trace: {},
        }),
      ],
    };
    const onStepClick = vi.fn();
    render(<ExecutorLog pipelineId="pipe-1" runId="run-1" onStepClick={onStepClick} />);

    const rows = screen.getAllByTestId('executor-log-row');
    // Click the step row → callback fires with stepId.
    fireEvent.click(rows[0]);
    expect(onStepClick).toHaveBeenCalledTimes(1);
    expect(onStepClick).toHaveBeenCalledWith('node-A');

    // Click the run row → no additional invocation (run actions don't forward).
    fireEvent.click(rows[1]);
    expect(onStepClick).toHaveBeenCalledTimes(1);
  });

  test('download button generates valid NDJSON of filtered items', () => {
    const rows = [
      makeRow({ action: 'pipeline.step.started', auditId: 'a-1', timestamp: '2026-05-06T00:00:00.000Z' }),
      makeRow({ action: 'pipeline.run.completed', auditId: 'a-2', timestamp: '2026-05-06T00:00:01.000Z' }),
    ];
    mockResult = { ...mockResult, items: rows };

    // Capture Blob payloads written via createObjectURL.
    const blobs: Blob[] = [];
    const originalCreate = URL.createObjectURL;
    const originalRevoke = URL.revokeObjectURL;
    URL.createObjectURL = vi.fn((b: Blob) => {
      blobs.push(b);
      return 'blob:mock';
    }) as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = vi.fn() as unknown as typeof URL.revokeObjectURL;

    try {
      render(<ExecutorLog pipelineId="pipe-1" runId="run-1" />);
      fireEvent.click(screen.getByTestId('executor-log-download'));

      expect(blobs.length).toBe(1);
      expect(blobs[0].type).toBe('application/x-ndjson');

      return blobs[0].text().then((ndjson) => {
        // Each non-empty line must parse as JSON and round-trip back to the row.
        const lines = ndjson.split('\n').filter((l) => l.length > 0);
        expect(lines.length).toBe(2);
        const parsed = lines.map((l) => JSON.parse(l) as AuditRow);
        expect(parsed[0].auditId).toBe('a-1');
        expect(parsed[1].auditId).toBe('a-2');
        expect(parsed[0].action).toBe('pipeline.step.started');
        expect(parsed[1].action).toBe('pipeline.run.completed');
      });
    } finally {
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    }
  });
});
