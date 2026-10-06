import type { StoryObj } from '@storybook/react-vite';
import { MarkdownView } from './MarkdownView';
declare const meta: {
    title: string;
    component: typeof MarkdownView;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
/** `sm`: prose inside a card — headings stepped down to 17/15/14/13px. */
export declare const ScaleSmall: Story;
/** `lg`: a guide read on its own page (Distillation Knowledge mockup). */
export declare const ScaleLarge: Story;
//# sourceMappingURL=MarkdownView.stories.d.ts.map