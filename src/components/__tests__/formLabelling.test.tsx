// src/components/__tests__/formLabelling.test.tsx
//
// Deep a11y audit, category 5: label association that only worked visually,
// and required/invalid state that never reached the accessibility tree.

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormField from '../shared/FormField';
import ConfigField from '../pipelines/nodes/shared/ConfigField';
import { Input } from '../forms/Input';

describe('shared/FormField — required is exposed programmatically', () => {
  it('sets aria-required on the wired control', () => {
    render(
      <FormField label="Name" required>
        {(wiring) => <Input {...wiring} defaultValue="" />}
      </FormField>,
    );
    const input = screen.getByLabelText(/Name/);
    // The asterisk is decorative; without aria-required the requirement was
    // invisible to screen readers.
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('omits aria-required for an optional field', () => {
    render(
      <FormField label="Nickname">
        {(wiring) => <Input {...wiring} defaultValue="" />}
      </FormField>,
    );
    expect(screen.getByLabelText('Nickname')).not.toHaveAttribute('aria-required');
  });

  it('keeps the asterisk out of the accessible name', () => {
    render(
      <FormField label="Name" required>
        {(wiring) => <Input {...wiring} defaultValue="" />}
      </FormField>,
    );
    expect(screen.getByLabelText(/Name/)).toHaveAccessibleName('Name');
  });
});

describe('pipelines/ConfigField — the label used to label nothing', () => {
  it('associates the label explicitly when given a controlId', () => {
    render(
      <ConfigField label="Max tokens" controlId="max-tokens" help="Upper bound.">
        <Input id="max-tokens" defaultValue="512" />
      </ConfigField>,
    );
    // The label used to have neither htmlFor nor a wrapped control, so it
    // named nothing and the input announced as a bare "edit text".
    expect(screen.getByRole('textbox', { name: 'Max tokens' })).toHaveValue('512');
    // No duplicate group wrapper once the association is explicit.
    expect(screen.queryByRole('group')).toBeNull();
  });

  it('hands the help-text id to the render prop so aria-describedby can reach it', () => {
    render(
      <ConfigField
        label="Branch count"
        help="Between 2 and 8."
        controlId="branch-count"
        render={({ controlId, describedById }) => (
          <Input id={controlId} aria-describedby={describedById} defaultValue="2" />
        )}
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Branch count' });
    expect(input).toHaveAccessibleDescription('Between 2 and 8.');
  });

  it('swaps the description to the error message, which is also a live region', () => {
    render(
      <ConfigField
        label="Branch count"
        error="Must be at least 2."
        help="ignored"
        controlId="branch-count"
        render={({ controlId, describedById }) => (
          <Input id={controlId} aria-describedby={describedById} invalid defaultValue="1" />
        )}
      />,
    );
    const input = screen.getByRole('textbox', { name: 'Branch count' });
    expect(input).toHaveAccessibleDescription('Must be at least 2.');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Must be at least 2.');
  });

  it('leaves the plain children API working for not-yet-migrated panels', () => {
    render(
      <ConfigField label="Legacy field">
        <Input aria-label="Legacy field" defaultValue="x" />
      </ConfigField>,
    );
    // No group wrapper is injected, so panels that already name their own
    // control do not announce the name twice.
    expect(screen.queryByRole('group')).toBeNull();
    expect(screen.getByRole('textbox', { name: 'Legacy field' })).toBeInTheDocument();
  });
});
