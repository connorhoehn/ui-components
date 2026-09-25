// The file menu (2.390.3): `fileActions` shapes the menu layout's ⋯ into the
// Documents mockup's five groups; disabled rows say why; the Create-from
// flyout carries its caption; PickerDialog picks.
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DocumentMeta } from '../../../types/document';
import WorkspaceDocumentHeader from '../WorkspaceDocumentHeader';
import { PickerDialog } from '../../shared/PickerDialog';

const meta: DocumentMeta = {
  id: 'd1', title: 'My Doc', sourceType: 'notes', sourceId: 's1',
  createdBy: 'u1', createdAt: '2026-01-01T00:00:00Z', aiModel: 'claude', status: 'draft',
};

afterEach(cleanup);

function renderMenu(overrides: Record<string, unknown> = {}) {
  const calls = {
    rename: vi.fn(), move: vi.fn(), copy: vi.fn(), copyLink: vi.fn(), presentation: vi.fn(), summary: vi.fn(),
    actionList: vi.fn(), template: vi.fn(), workflow: vi.fn(), saveTemplate: vi.fn(), md: vi.fn(), print: vi.fn(), trash: vi.fn(),
  };
  render(
    <WorkspaceDocumentHeader
      variant="actions"
      actionsLayout="menu"
      meta={meta}
      mode="editor"
      participants={[]}
      owner={{ userId: 'u1', displayName: 'Ada' }}
      onToggleHistory={vi.fn()}
      extraMenuItems={[{ id: 'automations', label: 'Automations…', onSelect: vi.fn() }, { id: 'work-share', label: 'Share…', onSelect: vi.fn(), group: 'share' }]}
      fileActions={{
        rename: { onSelect: calls.rename },
        move: { onSelect: calls.move },
        copy: { onSelect: calls.copy },
        copyLink: { onSelect: calls.copyLink },
        createFrom: {
          presentation: { onSelect: calls.presentation },
          summary: { onSelect: calls.summary },
          actionList: { onSelect: calls.actionList },
          chooseTemplate: { onSelect: calls.template },
        },
        runWorkflow: { onSelect: calls.workflow },
        saveAsTemplate: { onSelect: calls.saveTemplate },
        downloads: [{ id: 'markdown', label: 'Markdown (.md)', onSelect: calls.md }],
        print: { onSelect: calls.print },
        trash: { onSelect: calls.trash, disabledReason: 'Only editors can move this to the trash.' },
      }}
      {...overrides}
    />,
  );
  fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
  return calls;
}

describe('the file menu', () => {
  it('lays out the five groups in the mockup order with the host extras folded in', () => {
    renderMenu();
    const groups = screen.getAllByRole('group').map((g) => within(g).queryAllByRole('menuitem').map((i) => i.textContent?.replace(/⌘P$/, '').trim()));
    expect(groups[0]).toEqual(['Rename…', 'Move to…', 'Make a copy…', 'Version history']);
    expect(groups[1]).toEqual(['Copy link', 'Share…']);
    expect(groups[2]).toEqual(['Create from this…', 'Run workflow…', 'Save as template…', 'Automations…']);
    expect(groups[3]).toEqual(['Download as…', 'Print…']);
    expect(groups[4]?.[0]).toMatch(/^Move to trash/);
    expect(screen.getByTestId('document-header-print').textContent).toContain('⌘P');
  });

  it('runs an action and closes; a disabled row stays put and says why', () => {
    const calls = renderMenu();
    const trash = screen.getByTestId('document-menu-trash');
    expect(trash.getAttribute('aria-disabled')).toBe('true');
    expect(trash.getAttribute('title')).toBe('Only editors can move this to the trash.');
    fireEvent.click(trash);
    expect(calls.trash).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('document-menu-rename'));
    expect(calls.rename).toHaveBeenCalledOnce();
    expect(screen.queryByTestId('document-menu-copy')).toBeNull();
  });

  it('opens Create from this… with its caption and starts the chosen one', () => {
    const calls = renderMenu();
    act(() => { fireEvent.click(screen.getByTestId('document-menu-create-from')); });
    expect(screen.getByText('Creates a new document.')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('document-menu-create-summary'));
    expect(calls.summary).toHaveBeenCalledOnce();
  });

  it('keeps the old menu when no fileActions are passed', () => {
    render(<WorkspaceDocumentHeader variant="actions" actionsLayout="menu" meta={meta} mode="editor" participants={[]} onToggleHistory={vi.fn()} onPrint={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'More actions' }));
    expect(screen.queryByTestId('document-menu-rename')).toBeNull();
    expect(screen.getByTestId('document-header-print')).toBeInTheDocument();
  });
});

describe('PickerDialog', () => {
  it('selects then confirms; disabled rows cannot be chosen', () => {
    const onPick = vi.fn();
    render(
      <PickerDialog
        open
        title="Move to"
        confirmLabel="Move"
        options={[{ id: 'a', label: 'Alpha' }, { id: 'b', label: 'Beta', depth: 1, disabled: true, disabledReason: 'It is already here' }]}
        onPick={onPick}
        onCancel={vi.fn()}
      />,
    );
    const confirm = screen.getByTestId('confirm-dialog-confirm');
    expect(confirm).toBeDisabled();
    fireEvent.click(screen.getByTestId('picker-dialog-option-b'));
    expect(confirm).toBeDisabled();
    fireEvent.click(screen.getByTestId('picker-dialog-option-a'));
    fireEvent.click(confirm);
    expect(onPick).toHaveBeenCalledWith('a');
  });
});
