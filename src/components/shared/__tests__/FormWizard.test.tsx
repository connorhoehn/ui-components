import { useState } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FormWizard, type FormWizardSection } from '../FormWizard';
import FormField from '../FormField';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';

afterEach(cleanup);

function Harness({ mode = 'single', onSubmit = () => {}, hideWho = false, summary = true }: {
  mode?: 'single' | 'stepped'; onSubmit?: () => void; hideWho?: boolean; summary?: boolean;
}) {
  const [who, setWho] = useState('');
  const [why, setWhy] = useState('');
  const sections: FormWizardSection[] = [
    {
      key: 'who', title: 'Who is it for?', label: 'Who', hidden: hideWho, error: who ? null : 'Choose who.',
      content: <FormField label="Person">{(w) => <Select {...w} value={who} placeholder="Choose" onChange={(e) => setWho(e.target.value)} options={[{ value: 'a', label: 'Ada' }]} data-testid="who" />}</FormField>,
    },
    {
      key: 'why', title: 'Why?', description: 'Approvers read this first.', error: why.length >= 5 ? null : 'Say why.',
      content: <FormField label="Reason">{(w) => <Input {...w} aria-invalid={why.length < 5} value={why} onChange={(e) => setWhy(e.target.value)} data-testid="why" />}</FormField>,
    },
  ];
  return (
    <FormWizard mode={mode} sections={sections} onSubmit={onSubmit} submitLabel="Send"
      summary={summary ? <p>Summary body</p> : undefined} aria-label="Request" />
  );
}

describe('FormWizard — single page', () => {
  it('renders every visible section with a 14/600 heading and 12/400 description, and marks the composite', () => {
    const { container } = render(<Harness />);
    const root = container.querySelector('[data-form-wizard]')!;
    expect(root.getAttribute('data-form-wizard-mode')).toBe('single');
    expect(screen.getByRole('heading', { name: 'Who is it for?' }).className).toContain('text-sm');
    expect(screen.getByRole('heading', { name: 'Who is it for?' }).className).toContain('font-semibold');
    expect(screen.getByText('Approvers read this first.').className).toContain('text-xs');
    expect(container.querySelectorAll('[data-form-wizard-section]')).toHaveLength(2);
    // No stepper by default in single mode.
    expect(screen.queryByTestId('form-wizard-stepper')).toBeNull();
  });

  it('a hidden section is left out entirely', () => {
    render(<Harness hideWho />);
    expect(screen.queryByRole('heading', { name: 'Who is it for?' })).toBeNull();
  });

  it('submit lives in the summary; blocked sections show their error and focus the first invalid control', () => {
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} />);
    const submit = screen.getByTestId('form-wizard-submit');
    expect(screen.getByTestId('form-wizard-summary')).toContainElement(submit);
    fireEvent.click(submit);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByTestId('form-wizard-section-who-error')).toHaveTextContent('Choose who.');
    expect(screen.getByTestId('form-wizard-section-why-error')).toHaveTextContent('Say why.');
    expect(document.activeElement).toBe(screen.getByTestId('who'));
    fireEvent.change(screen.getByTestId('who'), { target: { value: 'a' } });
    fireEvent.change(screen.getByTestId('why'), { target: { value: 'because' } });
    fireEvent.click(submit);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('Enter in a field submits the form', () => {
    const onSubmit = vi.fn();
    render(<Harness onSubmit={onSubmit} hideWho />);
    fireEvent.change(screen.getByTestId('why'), { target: { value: 'because' } });
    fireEvent.submit(screen.getByRole('form', { name: 'Request' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('selects inside are the library listbox, never a platform <select>', () => {
    const { container } = render(<Harness />);
    expect(screen.getByTestId('who').getAttribute('data-ui-control')).toBe('select');
    expect(container.querySelector('select')).toBeNull();
  });

  it('without a summary the actions sit at the form column end', () => {
    const { container } = render(<Harness summary={false} />);
    const column = container.querySelector('[data-form-wizard-column]')!;
    expect(column).toContainElement(screen.getByTestId('form-wizard-submit'));
  });

  it('busy and error states', () => {
    const onDismiss = vi.fn();
    render(<FormWizard sections={[{ key: 'a', title: 'A', content: null }]} onSubmit={() => {}} submitting submitError="Duplicate" onDismissError={onDismiss} summary={<p>s</p>} />);
    const submit = screen.getByTestId('form-wizard-submit');
    expect(submit).toBeDisabled();
    expect(submit).toHaveTextContent('Submitting…');
    expect(screen.getByTestId('form-wizard-error')).toHaveTextContent('Duplicate');
  });
});

describe('FormWizard — stepped', () => {
  it('Next validates the step, stays and focuses the invalid control; Back/Next move; last step submits', () => {
    const onSubmit = vi.fn();
    render(<Harness mode="stepped" onSubmit={onSubmit} />);
    expect(screen.getByTestId('form-wizard-stepper')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Who is it for?' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Why?' })).toBeNull();
    fireEvent.click(screen.getByTestId('form-wizard-next'));
    expect(screen.getByTestId('form-wizard-section-who-error')).toBeInTheDocument();
    expect(document.activeElement).toBe(screen.getByTestId('who'));
    fireEvent.change(screen.getByTestId('who'), { target: { value: 'a' } });
    fireEvent.click(screen.getByTestId('form-wizard-next'));
    expect(screen.getByRole('heading', { name: 'Why?' })).toBeInTheDocument();
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Why?' }));
    fireEvent.click(screen.getByTestId('form-wizard-back'));
    expect(screen.getByRole('heading', { name: 'Who is it for?' })).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('form-wizard-next'));
    fireEvent.change(screen.getByTestId('why'), { target: { value: 'because' } });
    fireEvent.click(screen.getByTestId('form-wizard-submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('a hidden step is not a step', () => {
    render(<Harness mode="stepped" hideWho />);
    expect(screen.getByRole('heading', { name: 'Why?' })).toBeInTheDocument();
    expect(screen.getByTestId('form-wizard-submit')).toBeInTheDocument();
    expect(screen.getByTestId('form-wizard-back')).toBeDisabled();
  });
});
