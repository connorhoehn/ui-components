import type { Meta, StoryObj } from '@storybook/react-vite';
import { JudgmentResultViewer } from './JudgmentResultViewer';
import { VerdictPanel } from './VerdictPanel';
import { CriteriaPanel } from './CriteriaPanel';
declare const meta: Meta<typeof JudgmentResultViewer>;
export default meta;
type Story = StoryObj<typeof JudgmentResultViewer>;
export declare const HelpfulnessPass: Story;
export declare const SafetyFail: Story;
export declare const WithRawText: Story;
export declare const VerdictAlone: StoryObj<typeof VerdictPanel>;
export declare const CriteriaAlone: StoryObj<typeof CriteriaPanel>;
//# sourceMappingURL=JudgmentResultViewer.stories.d.ts.map