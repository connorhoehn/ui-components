import type { StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';
declare const meta: {
    title: string;
    component: typeof SearchInput;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Interactive: Story;
export declare const Empty: Story;
/** `tone="code"` reaches the `<input>` itself. `className` only ever landed
 *  on the wrapper, so before this prop a SearchInput dropped into a dark
 *  panel stayed a white box no matter what the caller passed. */
export declare const CodeTone: Story;
//# sourceMappingURL=SearchInput.stories.d.ts.map