import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ProcedureSteps, PROCEDURE_STEP_STATUS_LABELS, type ProcedureStep } from '../ProcedureSteps';

afterEach(cleanup);

const PLAIN: ProcedureStep[] = [
  { id: 's1', title: 'Rerun the failing test twice on its own.' },
  { id: 's2', title: 'Compare both results with the original CI failure.', body: 'Look at the port each run bound.' },
];

const RUN: ProcedureStep[] = [
  { id: 'a', title: 'Keep the SAML shim behind a flag', status: 'done' },
  { id: 'b', title: 'Confirm active sessions stay signed in', status: 'done' },
  { id: 'c', title: 'Flip one tenant to Cognito', status: 'failed', note: 'The hosted-UI redirect still resolved to the old domain.' },
  { id: 'd', title: 'Roll back if login fails', status: 'pending', note: 'Not reached in this run.' },
  { id: 'e', title: 'Tell the tenant', status: 'skipped' },
];

describe('ProcedureSteps', () => {
  it('renders an ordered list with numbers in the disc when no step has a status', () => {
    render(<ProcedureSteps steps={PLAIN} aria-label="What to do" />);
    const list = screen.getByRole('list', { name: 'What to do' });
    expect(list.tagName).toBe('OL');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]!.textContent).toBe('1Rerun the failing test twice on its own.');
    expect(items[0]!.getAttribute('data-status')).toBe('none');
    expect(screen.getByText('Look at the port each run bound.')).toBeTruthy();
  });

  it('shows outcome markers with their words for a screen reader, keeping the number as text', () => {
    render(<ProcedureSteps steps={RUN} />);
    for (const step of RUN) {
      const li = screen.getByTestId(`procedure-steps-step-${step.id}`);
      expect(li.getAttribute('data-status')).toBe(step.status);
      expect(li.textContent).toContain(`${PROCEDURE_STEP_STATUS_LABELS[step.status!]}:`);
    }
    expect(screen.getByTestId('procedure-steps-step-c').textContent).toContain('Failed:3Flip one tenant to Cognito');
    expect(screen.getByTestId('procedure-steps-note-c').className).toContain('text-danger-fg');
    expect(screen.getByTestId('procedure-steps-note-d').textContent).toBe('Not reached in this run.');
  });

  it('numbered=false draws a bullet for plain steps and no number beside a status', () => {
    render(<ProcedureSteps steps={[PLAIN[0]!, RUN[0]!]} numbered={false} />);
    expect(screen.getByTestId('procedure-steps-step-s1').textContent).toBe('Rerun the failing test twice on its own.');
    expect(screen.getByTestId('procedure-steps-step-a').textContent).toBe('Done:Keep the SAML shim behind a flag');
  });

  it('onSelectStep makes titles buttons', () => {
    const onSelect = vi.fn();
    render(<ProcedureSteps steps={PLAIN} onSelectStep={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Compare both results with the original CI failure.' }));
    expect(onSelect).toHaveBeenCalledWith('s2');
  });

  it('size sm uses the smaller type and markers', () => {
    render(<ProcedureSteps steps={PLAIN} size="sm" />);
    const li = screen.getByTestId('procedure-steps-step-s1');
    expect(li.querySelector('[aria-hidden="true"]')!.className).toContain('h-5');
    expect(li.innerHTML).toContain('text-[12px]');
    expect(li.innerHTML).not.toContain('text-[13px]');
  });

  it('type is on the house scale: sm titles 12px, md titles 14px, notes and bodies 12px (2.515.12; were 13px)', () => {
    const steps = [{ id: 'n', title: 'Title', body: 'Body', note: 'Note' }];
    const { rerender } = render(<ProcedureSteps steps={steps} size="sm" />);
    expect(screen.getByText('Title').closest('div.flex-col')!.className).toContain('text-[12px]');
    rerender(<ProcedureSteps steps={steps} />);
    expect(screen.getByText('Title').closest('div.flex-col')!.className).toContain('text-[14px]');
    expect(screen.getByText('Body').className).toContain('text-[12px]');
    expect(screen.getByTestId('procedure-steps-note-n').className).toContain('text-[12px]');
    expect(screen.getByTestId('procedure-steps-step-n').innerHTML).not.toContain('text-[13px]');
  });

  it('says so when there are no steps', () => {
    render(<ProcedureSteps steps={[]} emptyLabel="This procedure has no steps yet" />);
    expect(screen.getByTestId('procedure-steps-empty').textContent).toBe('This procedure has no steps yet');
  });
});
