// The docked card (modeControl="menu") names an active command as a chip on
// its own line under the mode row — "/workflow ⟡ migration-plan" — and the
// picked argument replaces the command's label while it is intact in the
// draft (2.385.0). Other mode controls keep the tinted strip.
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { RichChatComposer } from '../RichChatComposer';
import type { ComposerCommand } from '../composerCommands';

afterEach(cleanup);

const workflow: ComposerCommand = {
  trigger: '/workflow',
  label: 'Choose a workflow',
  icon: <span data-testid="wf-icon">⑂</span>,
  argument: { placeholder: 'which pipeline', search: () => [{ id: 'migration-plan', label: 'migration-plan', icon: '⟡' }] },
};

const base = {
  onSend: () => {},
  'data-testid': 'composer',
  layout: 'wide',
  mode: 'agent',
  modeControl: 'menu',
  onModeChange: () => {},
  commands: [workflow] as ComposerCommand[],
  onDraftChange: () => {},
} as const;

describe('command chip in the docked card', () => {
  it('shows the picked argument after the trigger, below the mode row', () => {
    render(
      <RichChatComposer
        {...base}
        draft={{ html: '<p>/workflow migration-plan Remove the bridge</p>', files: [], command: { trigger: '/workflow', argument: { id: 'migration-plan', label: 'migration-plan', icon: '⟡' } } }}
      />,
    );
    const chip = screen.getByTestId('composer-command');
    expect(chip).toHaveAttribute('data-command-chip', 'true');
    expect(chip).toHaveTextContent('/workflow');
    expect(screen.getByTestId('composer-command-argument')).toHaveTextContent('migration-plan');
    expect(chip).not.toHaveTextContent('Choose a workflow');
    expect(screen.getByTestId('wf-icon')).toBeInTheDocument();
    const modes = screen.getByTestId('composer-modes');
    expect(modes.compareDocumentPosition(chip) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('with no argument yet, the chip says what to pick', () => {
    render(<RichChatComposer {...base} draft={{ html: '<p>/workflow </p>', files: [] }} />);
    expect(screen.getByTestId('composer-command-placeholder')).toHaveTextContent('which pipeline');
  });

  it('other mode controls keep the strip', () => {
    render(<RichChatComposer {...base} modeControl="tabs" draft={{ html: '<p>/workflow </p>', files: [] }} />);
    expect(screen.getByTestId('composer-command')).not.toHaveAttribute('data-command-chip');
  });
});
