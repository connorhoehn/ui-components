// Identity admin surfaces had the same defect the pipelines ConfigField audit
// found: a `<label>` with no `htmlFor` that wrapped no control, so it named
// NOTHING. Eight copies of the uppercase filter-bar caption idiom
//
//   <div className="flex flex-col gap-1.5">
//     <label className="text-xs font-semibold …">Entity Type</label>
//     <Select … />
//   </div>
//
// meant eight silent filters. Alongside those sat controls with no name at all
// — repeating URI / custom-attribute rows whose only naming was a placeholder,
// which browsers drop as soon as the field holds a value, i.e. always on an
// edit screen.
//
// Every assertion below resolves the association (query by the visible words,
// get the control back) rather than checking that an attribute is present: an
// id pointing at no element still "has an id".

import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { AuditPage } from '../admin/AuditPage';
import { MfaManagementPage } from '../admin/MfaManagementPage';
import { ApplicationFormPage } from '../admin/ApplicationFormPage';
import { ApplicationPoolFormPage } from '../admin/ApplicationPoolFormPage';
import { PoolFormPage } from '../admin/PoolFormPage';
import { GroupFormPage } from '../admin/GroupFormPage';
import { EmailTemplateFormPage } from '../admin/EmailTemplateFormPage';
import { FormField } from '../shared/FormField';

const noop = () => {};
const asyncNoop = () => Promise.resolve();

describe('AuditPage filter bar', () => {
  function renderPage() {
    return render(
      <AuditPage
        records={[]}
        onQuery={vi.fn().mockResolvedValue(undefined)}
        onViewEntity={noop}
        onReplay={vi.fn().mockResolvedValue(null)}
      />,
    );
  }

  it('names every query filter from its visible caption', () => {
    renderPage();
    expect(screen.getByRole('combobox', { name: 'Entity Type' })).toBeInTheDocument();
    // datetime-local has no mapped ARIA role, so these go through the label
    // text — which is the association we care about anyway.
    expect(screen.getByLabelText('From')).toHaveAttribute('type', 'datetime-local');
    expect(screen.getByLabelText('To')).toHaveAttribute('type', 'datetime-local');
    expect(screen.getByRole('spinbutton', { name: 'Limit' })).toBeInTheDocument();
  });

  it('names both "Entity ID" boxes — query and replay — distinctly per section', () => {
    renderPage();
    // The caption text repeats across the two sections; before the fix neither
    // box was labelled at all, so there was nothing to disambiguate.
    const boxes = screen.getAllByRole('textbox', { name: 'Entity ID' });
    expect(boxes).toHaveLength(2);
    // Each label must resolve to its OWN control, not both to the first one.
    expect(boxes[0]).not.toBe(boxes[1]);
    expect(boxes[0].id).not.toBe(boxes[1].id);
  });

  it('names the replay timestamp', () => {
    renderPage();
    expect(screen.getByLabelText('At Timestamp')).toHaveAttribute('type', 'datetime-local');
  });
});

describe('MfaManagementPage pool filter', () => {
  it('names the pool filter from its inline caption', () => {
    render(
      <MfaManagementPage
        metrics={{ totalUsers: 2, mfaEnabled: 1, mfaDisabled: 1, adoptionRate: 50 }}
        users={[{ userId: 'u1', email: 'a@b.c', mfaEnabled: true, deviceCount: 1, poolId: 'p1' }]}
        pools={[{ poolId: 'p1', poolName: 'Main', userCount: 1 }]}
        onRefresh={noop}
      />,
    );
    expect(screen.getByRole('combobox', { name: 'Filter by pool' })).toBeInTheDocument();
  });
});

describe('repeating rows get positional names', () => {
  it('groups ApplicationFormPage MultiInput rows and names each one', () => {
    render(
      <ApplicationFormPage
        isEdit
        application={{
          clientName: 'App', poolId: 'p1',
          redirectUris: ['https://a.example/cb', 'https://b.example/cb'],
          grantTypes: ['authorization_code'],
        }}
        pools={[{ poolId: 'p1', poolName: 'Main' }]}
        onSubmit={asyncNoop}
        onCancel={noop}
      />,
    );

    // htmlFor cannot point at a repeating list, so the caption names a group.
    const group = screen.getByRole('group', { name: 'Redirect URIs' });
    const rows = within(group).getAllByRole('textbox');
    expect(rows).toHaveLength(2);
    expect(screen.getByRole('textbox', { name: 'Redirect URIs 1' })).toBe(rows[0]);
    expect(screen.getByRole('textbox', { name: 'Redirect URIs 2' })).toBe(rows[1]);
    // Every Remove button used to be named identically "Remove".
    expect(screen.getByRole('button', { name: 'Remove Redirect URIs 2' })).toBeInTheDocument();
  });

  it('names ApplicationPoolFormPage redirect URI rows (heading is not a label)', () => {
    render(
      <ApplicationPoolFormPage onSubmit={asyncNoop} onCancel={noop} />,
    );
    expect(screen.getByRole('textbox', { name: 'Redirect URI 1' })).toBeInTheDocument();
  });

  it('distinguishes PoolFormPage custom-attribute name from type', () => {
    render(
      <PoolFormPage
        isEdit
        pool={{
          poolName: 'Main',
          customAttributes: { dept: 'string' },
          settings: { mfaConfiguration: 'OFF', passwordPolicy: { minLength: 8, requireUppercase: true, requireLowercase: true, requireNumbers: true, requireSymbols: false } },
        }}
        onSubmit={asyncNoop}
        onCancel={noop}
      />,
    );
    const name = screen.getByRole('textbox', { name: 'Attribute 1 name' });
    const type = screen.getByRole('textbox', { name: 'Attribute 1 type' });
    expect(name).not.toBe(type);
    expect((name as HTMLInputElement).value).toBe('dept');
    expect((type as HTMLInputElement).value).toBe('string');
  });
});

describe('controls named from a visible heading', () => {
  it('names the GroupFormPage permission box from the "Permissions" heading', () => {
    render(
      <GroupFormPage
        isEdit={false}
        poolId="p1"
        onSubmit={asyncNoop}
        onCancel={noop}
      />,
    );
    expect(screen.getByRole('textbox', { name: 'Permissions' })).toBeInTheDocument();
  });

  it('names the EmailTemplateFormPage variable box and HTML body', () => {
    render(
      <EmailTemplateFormPage isEdit={false} onSubmit={asyncNoop} onCancel={noop} />,
    );
    expect(screen.getByRole('textbox', { name: 'Variables' })).toBeInTheDocument();
    // Detached <label>, single control → a real htmlFor association.
    expect(screen.getByLabelText('HTML Body').tagName).toBe('TEXTAREA');
  });
});

describe('identity FormField checkbox branch', () => {
  it('reaches the validation error through aria-describedby', () => {
    render(
      <FormField
        label="Accept terms"
        name="terms"
        type="checkbox"
        value={false}
        onChange={noop}
        error="You must accept the terms"
      />,
    );
    const box = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(box).toHaveAccessibleDescription('You must accept the terms');
    // …and the message announces itself when it appears.
    expect(screen.getByRole('alert')).toHaveTextContent('You must accept the terms');
  });

  it('reaches the help text through aria-describedby', () => {
    render(
      <FormField
        label="Send email"
        name="email"
        type="checkbox"
        value
        onChange={noop}
        helpText="We only email about outages"
      />,
    );
    expect(screen.getByRole('checkbox', { name: 'Send email' }))
      .toHaveAccessibleDescription('We only email about outages');
  });

  it('keeps the required marker out of the accessible name', () => {
    render(
      <FormField label="Accept terms" name="terms" type="checkbox" value={false} onChange={noop} required />,
    );
    // The "*" is decorative; the name must be exactly the label.
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });
});
