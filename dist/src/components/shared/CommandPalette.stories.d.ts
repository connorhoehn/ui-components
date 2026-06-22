import { StoryObj } from '@storybook/react-vite';
import { CommandPalette } from './CommandPalette';
declare const meta: {
    title: string;
    component: typeof CommandPalette;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * Empty mode: no static commands, no registry. Renders only the input +
 * "No results" empty state. Useful baseline for sizing/styling work.
 */
export declare const Empty: Story;
/**
 * Populated mode: a representative spread of commands across groups, with
 * hints and keyword aliases. Showcases group headers and the layout cmdk
 * applies when the list is fully populated.
 */
export declare const Populated: Story;
/**
 * WithKeyboardShortcuts mode: each command renders right-aligned kbd
 * chips and binds a global hotkey. Use the keyboard shortcuts in the
 * preview frame to exercise the registered hotkeys.
 */
export declare const WithKeyboardShortcuts: Story;
//# sourceMappingURL=CommandPalette.stories.d.ts.map