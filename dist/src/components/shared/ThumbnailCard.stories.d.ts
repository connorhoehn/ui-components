import { StoryObj } from '@storybook/react-vite';
import { default as ThumbnailCard } from './ThumbnailCard';
declare const meta: {
    title: string;
    component: typeof ThumbnailCard;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        title: string;
        description: string;
        category: string;
        categoryTone: "info";
        icon: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithBadge: Story;
export declare const AsLink: Story;
export declare const AsButton: Story;
export declare const InCatalogGrid: Story;
//# sourceMappingURL=ThumbnailCard.stories.d.ts.map