import type { StoryObj } from '@storybook/react-vite';
import { PageHeader } from './PageHeader';
declare const meta: {
    title: string;
    component: typeof PageHeader;
    tags: string[];
    parameters: {
        layout: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithDescription: Story;
export declare const WithActions: Story;
export declare const WithBack: Story;
export declare const WithBadge: Story;
//# sourceMappingURL=PageHeader.stories.d.ts.map