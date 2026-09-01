import type { StoryObj } from '@storybook/react-vite';
import { CapabilityDeniedFallback } from './CapabilityDeniedFallback';
declare const meta: {
    title: string;
    component: typeof CapabilityDeniedFallback;
    tags: string[];
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithSingleAction: Story;
export declare const WithMultipleActions: Story;
export declare const CustomCopy: Story;
export declare const NoIcon: Story;
//# sourceMappingURL=CapabilityDeniedFallback.stories.d.ts.map