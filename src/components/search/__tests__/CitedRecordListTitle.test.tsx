import { render, cleanup, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CitedRecordList, citedSourceTitle, type CitedRecordItem } from '../CitedRecordList';

afterEach(cleanup);

const work: CitedRecordItem = { n: 1, type: 'work', id: 'w1', title: 'Tenant-by-tenant cutover runbook for the auth migration', subtitle: 'Auth migration', href: '/w1' } as CitedRecordItem;

describe('CitedRecordList per-source title (2.440.0)', () => {
  it('the Sources button carries the full text as its tooltip; sourceTitle overrides', () => {
    render(<CitedRecordList records={[work, { ...work, n: 2, id: 'w2', sourceTitle: 'Runbook v2 — full reading' }]} onOpen={() => {}} />);
    expect(screen.getByRole('button', { name: /Source 1:/ })).toHaveAttribute('title', 'Tenant-by-tenant cutover runbook for the auth migration · Auth migration');
    expect(screen.getByRole('button', { name: /Source 2:/ })).toHaveAttribute('title', 'Runbook v2 — full reading');
  });
  it('citedSourceTitle falls back to the title alone', () => {
    expect(citedSourceTitle({ ...work, subtitle: undefined } as CitedRecordItem)).toBe(work.title);
  });
});
