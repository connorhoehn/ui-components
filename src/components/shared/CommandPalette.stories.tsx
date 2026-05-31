import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import {
  CommandPalette,
  CommandPaletteHint,
  CommandPaletteProvider,
  useCommandPalette,
  type Command,
} from './CommandPalette';

// Stories mount the palette already open so its UI is visible in the
// preview frame without requiring a Cmd+K keystroke.
function AutoOpen() {
  const { open } = useCommandPalette();
  useEffect(() => {
    open();
  }, [open]);
  return null;
}

const meta = {
  title: 'Shared/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

/**
 * Empty mode: no static commands, no registry. Renders only the input +
 * "No results" empty state. Useful baseline for sizing/styling work.
 */
export const Empty: Story = {
  render: () => (
    <CommandPaletteProvider commands={[]} recentsKey={null}>
      <CommandPalette />
      <AutoOpen />
      <div className="p-6">
        <CommandPaletteHint />
      </div>
    </CommandPaletteProvider>
  ),
};

const populatedCommands: Command[] = [
  {
    id: 'new-doc',
    label: 'New document',
    group: 'Documents',
    hint: 'Create a blank doc',
    run: noop,
  },
  {
    id: 'open-doc',
    label: 'Open document…',
    group: 'Documents',
    keywords: ['file', 'recent'],
    run: noop,
  },
  {
    id: 'invite-member',
    label: 'Invite a member',
    group: 'Workspace',
    hint: 'Add a teammate by email',
    run: noop,
  },
  {
    id: 'switch-theme',
    label: 'Switch theme',
    group: 'Workspace',
    keywords: ['dark', 'light'],
    run: noop,
  },
  {
    id: 'go-home',
    label: 'Go to home',
    group: 'Navigation',
    run: noop,
  },
  {
    id: 'go-inbox',
    label: 'Go to inbox',
    group: 'Navigation',
    run: noop,
  },
];

/**
 * Populated mode: a representative spread of commands across groups, with
 * hints and keyword aliases. Showcases group headers and the layout cmdk
 * applies when the list is fully populated.
 */
export const Populated: Story = {
  render: () => (
    <CommandPaletteProvider commands={populatedCommands} recentsKey={null}>
      <CommandPalette />
      <AutoOpen />
      <div className="p-6">
        <CommandPaletteHint />
      </div>
    </CommandPaletteProvider>
  ),
};

const shortcutCommands: Command[] = [
  {
    id: 'new-doc',
    label: 'New document',
    group: 'Documents',
    shortcut: ['⌘', 'N'],
    hotkey: 'mod+n',
    run: noop,
  },
  {
    id: 'find-in-page',
    label: 'Find in page',
    group: 'Documents',
    shortcut: ['⌘', 'F'],
    hotkey: 'mod+f',
    run: noop,
  },
  {
    id: 'toggle-sidebar',
    label: 'Toggle sidebar',
    group: 'Layout',
    shortcut: ['⌘', '\\'],
    hotkey: 'mod+\\',
    run: noop,
  },
  {
    id: 'jump-to-line',
    label: 'Jump to line…',
    group: 'Navigation',
    shortcut: ['⌘', 'G'],
    hotkey: 'mod+g',
    run: noop,
  },
  {
    id: 'show-help',
    label: 'Show keyboard shortcuts',
    group: 'Help',
    shortcut: ['?'],
    hotkey: 'shift+?',
    run: noop,
  },
];

/**
 * WithKeyboardShortcuts mode: each command renders right-aligned kbd
 * chips and binds a global hotkey. Use the keyboard shortcuts in the
 * preview frame to exercise the registered hotkeys.
 */
export const WithKeyboardShortcuts: Story = {
  render: () => (
    <CommandPaletteProvider commands={shortcutCommands} recentsKey={null}>
      <CommandPalette />
      <AutoOpen />
      <div className="p-6">
        <CommandPaletteHint />
      </div>
    </CommandPaletteProvider>
  ),
};
