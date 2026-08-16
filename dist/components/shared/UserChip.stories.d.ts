import type { StoryObj } from '@storybook/react-vite';
import UserChip from './UserChip';
declare const meta: {
    title: string;
    component: typeof UserChip;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        presence: {
            control: "select";
            options: (string | undefined)[];
        };
        avatarSize: {
            control: {
                type: "number";
                min: number;
                max: number;
                step: number;
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const NameOnly: Story;
export declare const WithHandle: Story;
export declare const Online: Story;
export declare const Clickable: Story;
export declare const Roster: Story;
//# sourceMappingURL=UserChip.stories.d.ts.map