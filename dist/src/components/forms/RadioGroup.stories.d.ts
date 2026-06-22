import { StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';
declare const meta: {
    title: string;
    component: typeof RadioGroup;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        orientation: {
            control: "radio";
            options: string[];
        };
        disabled: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const DefaultVertical: Story;
export declare const WithDescriptions: Story;
export declare const HorizontalOrientation: Story;
export declare const Disabled: Story;
//# sourceMappingURL=RadioGroup.stories.d.ts.map