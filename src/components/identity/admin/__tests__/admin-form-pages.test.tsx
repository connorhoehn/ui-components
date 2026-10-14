// Admin form pages — payload-shape tests. These pages are presentational
// (state in, callback payload out); the tests pin exactly what each form
// submits, since that is the contract the identity API consumers rely on.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserFormPage } from '../UserFormPage';
import { PoolFormPage } from '../PoolFormPage';
import { GroupFormPage } from '../GroupFormPage';
import { ApplicationFormPage } from '../ApplicationFormPage';
import { EmailTemplateFormPage } from '../EmailTemplateFormPage';

const resolved = () => vi.fn().mockResolvedValue(undefined);

describe('UserFormPage', () => {
  it('create mode requires a password field; edit mode hides it', () => {
    const { rerender } = render(
      <UserFormPage isEdit={false} poolId="p1" onSubmit={resolved()} onCancel={() => {}} />,
    );
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    rerender(<UserFormPage isEdit poolId="p1" onSubmit={resolved()} onCancel={() => {}} />);
    expect(screen.queryByLabelText(/Password/)).toBeNull();
  });

  it('submits the entered profile fields', async () => {
    const onSubmit = resolved();
    render(<UserFormPage isEdit poolId="p1" onSubmit={onSubmit} onCancel={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'a@b.co' } });
    fireEvent.change(screen.getByLabelText(/Given Name/), { target: { value: 'Ada' } });
    fireEvent.click(screen.getByRole('button', { name: 'Update User' }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0]).toMatchObject({ email: 'a@b.co', givenName: 'Ada' });
  });

  it('prefills from the user prop in edit mode and shows the error banner', () => {
    render(
      <UserFormPage
        isEdit
        poolId="p1"
        user={{ email: 'x@y.z', givenName: 'Xen' }}
        onSubmit={resolved()}
        onCancel={() => {}}
        error="email already exists"
      />,
    );
    expect(screen.getByLabelText(/Email/)).toHaveValue('x@y.z');
    expect(screen.getByText('email already exists')).toBeInTheDocument();
  });
});

describe('PoolFormPage', () => {
  it('collects custom attributes as a name→type record', async () => {
    const onSubmit = resolved();
    render(<PoolFormPage isEdit={false} onSubmit={onSubmit} onCancel={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Pool Name/), { target: { value: 'Customers' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Attribute/i }));
    fireEvent.change(screen.getByPlaceholderText('Attribute name'), { target: { value: 'tier' } });
    fireEvent.change(screen.getByPlaceholderText(/Type \(string/), { target: { value: 'string' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Pool/i }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      poolName: 'Customers',
      customAttributes: { tier: 'string' },
    });
  });
});

describe('GroupFormPage', () => {
  it('adds permissions on Enter and submits them', async () => {
    const onSubmit = resolved();
    render(<GroupFormPage isEdit={false} poolId="p1" onSubmit={onSubmit} onCancel={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Group Name/), { target: { value: 'Admins' } });
    const permInput = screen.getByPlaceholderText(/Type a permission/);
    fireEvent.change(permInput, { target: { value: 'users:write' } });
    fireEvent.keyDown(permInput, { key: 'Enter' });
    fireEvent.click(screen.getByRole('button', { name: /Create Group/i }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      groupName: 'Admins',
      permissions: ['users:write'],
    });
  });

  it('member picker reports the selected user to onAddMember', async () => {
    const onAddMember = resolved();
    render(
      <GroupFormPage
        isEdit
        poolId="p1"
        group={{ groupName: 'Admins', permissions: [] }}
        members={[]}
        availableUsers={[{ userId: 'u2', email: 'bo@x.co' }]}
        onAddMember={onAddMember}
        onSubmit={resolved()}
        onCancel={() => {}}
      />,
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Add member' }), { target: { value: 'u2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    await waitFor(() => expect(onAddMember).toHaveBeenCalledWith('u2'));
  });
});

describe('ApplicationFormPage', () => {
  it('toggles grant types via checkboxes and submits redirect URIs', async () => {
    const onSubmit = resolved();
    render(
      <ApplicationFormPage
        isEdit={false}
        pools={[{ poolId: 'p1', poolName: 'Main' }]}
        onSubmit={onSubmit}
        onCancel={() => {}}
      />,
    );
    fireEvent.change(screen.getByLabelText(/Application Name/), { target: { value: 'Portal' } });
    // The pool select is `required` — native constraint validation blocks
    // submit while it is empty, so pick the pool first.
    fireEvent.change(screen.getByLabelText(/Pool/), { target: { value: 'p1' } });
    fireEvent.change(screen.getByPlaceholderText(/callback/), {
      target: { value: 'https://app.example.com/cb' },
    });
    const grant = screen.getByRole('checkbox', { name: /client_credentials/i });
    fireEvent.click(grant);
    fireEvent.click(screen.getByRole('button', { name: /Create Application/i }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    const payload = onSubmit.mock.calls[0][0];
    expect(payload.clientName).toBe('Portal');
    expect(payload.redirectUris).toEqual(['https://app.example.com/cb']);
    expect(payload.grantTypes).toContain('client_credentials');
  });
});

describe('EmailTemplateFormPage', () => {
  it('adds variables on Enter and submits name/subject/bodies', async () => {
    const onSubmit = resolved();
    render(<EmailTemplateFormPage isEdit={false} onSubmit={onSubmit} onCancel={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Template Name/), { target: { value: 'Welcome' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Hi {{name}}' } });
    const varInput = screen.getByPlaceholderText(/variable name/);
    fireEvent.change(varInput, { target: { value: 'name' } });
    fireEvent.keyDown(varInput, { key: 'Enter' });
    fireEvent.click(screen.getByRole('button', { name: /Create Template/i }));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      name: 'Welcome',
      subject: 'Hi {{name}}',
      variables: ['name'],
    });
  });
});
