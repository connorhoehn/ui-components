import type { StoryObj } from '@storybook/react-vite';
import KPIGrid from './KPIGrid';
declare const meta: {
    title: string;
    component: typeof KPIGrid;
    tags: string[];
    parameters: {
        layout: string;
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
    args: {
        children: import("react/jsx-runtime").JSX.Element;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const FourColumns: Story;
export declare const ThreeColumns: Story;
export declare const TwoColumns: Story;
export declare const OneColumn: Story;
export declare const Dense: Story;
//# sourceMappingURL=KPIGrid.stories.d.ts.map