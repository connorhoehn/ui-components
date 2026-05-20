import { render, screen } from '@testing-library/react';
import FormField from '../FormField';

describe('FormField', () => {
  it('renders the label and associates it with the input via htmlFor/id', () => {
    render(
      <FormField label="Name">
        {(p) => <input {...p} type="text" defaultValue="x" />}
      </FormField>,
    );
    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
    expect(input.id).toBeTruthy();
  });

  it('renders a hint as aria-describedby', () => {
    render(
      <FormField label="Email" hint="we never share this">
        {(p) => <input {...p} type="email" defaultValue="" />}
      </FormField>,
    );
    const input = screen.getByLabelText('Email');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(screen.getByText('we never share this').id).toBe(describedBy);
  });

  it('renders an error message in place of hint and sets aria-invalid', () => {
    render(
      <FormField label="Email" hint="we never share this" error="required">
        {(p) => <input {...p} type="email" defaultValue="" />}
      </FormField>,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('required')).toBeInTheDocument();
    expect(screen.queryByText('we never share this')).not.toBeInTheDocument();
  });

  it('marks the label with an asterisk when required', () => {
    render(
      <FormField label="Name" required>
        {(p) => <input {...p} type="text" defaultValue="" />}
      </FormField>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not set aria-invalid when there is no error', () => {
    render(
      <FormField label="Name">
        {(p) => <input {...p} type="text" defaultValue="" />}
      </FormField>,
    );
    const input = screen.getByLabelText('Name');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('exposes labelId so non-htmlFor controls can wire aria-labelledby', () => {
    render(
      <FormField label="Enabled">
        {(p) => <button role="switch" aria-checked={false} aria-labelledby={p.labelId}>x</button>}
      </FormField>,
    );
    expect(screen.getByRole('switch')).toHaveAccessibleName('Enabled');
  });

  it('renders inline layout with min-width label', () => {
    render(
      <FormField label="Mode" layout="inline">
        {(p) => <input {...p} type="text" defaultValue="" />}
      </FormField>,
    );
    expect(screen.getByText('Mode').className).toMatch(/min-w-\[140px\]/);
  });

  it('forwards data-testid to the wrapper', () => {
    render(
      <FormField label="x" data-testid="ff">
        {(p) => <input {...p} type="text" defaultValue="" />}
      </FormField>,
    );
    expect(screen.getByTestId('ff')).toBeInTheDocument();
  });

  it('does not render the description container when neither hint nor error is set', () => {
    render(
      <FormField label="x">
        {(p) => <input {...p} type="text" defaultValue="" />}
      </FormField>,
    );
    const input = screen.getByLabelText('x');
    expect(input).not.toHaveAttribute('aria-describedby');
  });
});
