import type { StoryObj } from '@storybook/react-vite';
import TagEditor from './TagEditor';
declare const meta: {
    title: string;
    component: typeof TagEditor;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Empty: Story;
export declare const WithSeed: Story;
export declare const WithSuggestions: Story;
export declare const CaseSensitive: Story;
//# sourceMappingURL=TagEditor.stories.d.ts.map