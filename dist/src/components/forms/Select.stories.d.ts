import type { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./Select").SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        size: {
            control: "radio";
            options: string[];
        };
        disabled: {
            control: "boolean";
        };
        invalid: {
            control: "boolean";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithPlaceholder: Story;
export declare const Small: Story;
export declare const Invalid: Story;
export declare const Disabled: Story;
/** The compact tone-coloured capsule a status or priority picker wants. */
export declare const Pill: Story;
/** One pill per tone — the shape a task row repeats down its right edge. */
export declare const PillTones: Story;
/** 2.391.1: `chevron="custom"` — no native arrow; the library chevron (the call-settings selects). */
export declare const CustomChevron: Story;
export declare const CustomChevronDark: Story;
//# sourceMappingURL=Select.stories.d.ts.map