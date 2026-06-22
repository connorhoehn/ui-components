import { StoryObj } from '@storybook/react-vite';
import { default as LogStream, LogLine } from './LogStream';
declare const meta: {
    title: string;
    component: typeof LogStream;
    tags: string[];
    parameters: {
        layout: string;
    };
    args: {
        lines: LogLine[];
        follow: true;
        title: string;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Empty: Story;
export declare const NoLevelsOrSources: Story;
export declare const WithClear: Story;
export declare const Compact: Story;
//# sourceMappingURL=LogStream.stories.d.ts.map