import type { StoryObj } from '@storybook/react-vite';
import HealthGrid, { type HealthGridEntry } from './HealthGrid';
declare const meta: {
    title: string;
    component: typeof HealthGrid;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        items: HealthGridEntry[];
        title: string;
    };
    argTypes: {
        columns: {
            control: "radio";
            options: number[];
        };
        dense: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const ThreeColumns: Story;
export declare const TwoColumns: Story;
export declare const FourColumns: Story;
export declare const SixColumns: Story;
export declare const Dense: Story;
export declare const NoTitle: Story;
export declare const Empty: Story;
export declare const AllHealthy: Story;
export declare const AllDown: Story;
//# sourceMappingURL=HealthGrid.stories.d.ts.map