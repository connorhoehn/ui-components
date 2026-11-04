import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionStack } from './SectionStack';
import { PageSection } from './PageSection';
import { Button } from './Button';
import { StatStrip } from '../shared/StatStrip';
import { WorkflowStepper, type WorkflowStep } from '../shared/WorkflowStepper';
import { DensityProvider } from '../shared/Density';
import { ActionRowList, type ActionRowItem } from '../work/ActionRowList';

const STEPS: WorkflowStep[] = [
  { step: 1, label: 'Brief', done: true, active: false },
  { step: 2, label: 'Script', done: true, active: false },
  { step: 3, label: 'Storyboard', done: false, active: true },
  { step: 4, label: 'Animatic', done: false, active: false },
  { step: 5, label: 'Render', done: false, active: false },
];

const SHOTS: ActionRowItem[] = [
  { id: 'sc1', title: 'Scene 1 · The harbour at dawn', description: '6 shots · storyboard approved', meta: 'Ready' },
  { id: 'sc2', title: 'Scene 2 · The lighthouse stairs', description: '4 shots · 1 needs a new angle', meta: 'In review' },
  { id: 'sc3', title: 'Scene 3 · Storm over the bay', description: '9 shots · artwork generating', meta: 'Generating' },
  { id: 'sc4', title: 'Scene 4 · Rescue', description: '5 shots', meta: 'Not started' },
  { id: 'sc5', title: 'Scene 5 · Home', description: '3 shots', meta: 'Not started', disabled: true, disabledReason: 'Waiting on scene 4' },
];

function EpisodeOverview({ showBlocked = false }: { showBlocked?: boolean }) {
  return (
    <SectionStack as="section" aria-label="Episode overview">
      <PageSection title="Episode 3 · The Keeper" description="Storyboard in progress — 27 shots across 5 scenes." actions={<Button variant="secondary">Share</Button>} />
      <StatStrip items={[
        { label: 'Scenes', value: 5 },
        { label: 'Shots', value: 27 },
        { label: 'Approved', value: 6, tone: 'accent' },
        { label: 'Render minutes', value: '0' },
      ]} />
      <PageSection size="md" title="Pipeline">
        <WorkflowStepper steps={STEPS} aria-label="Episode pipeline" />
      </PageSection>
      <PageSection size="md" title="Scenes" count={SHOTS.length}>
        <ActionRowList striped items={SHOTS} aria-label="Scenes" />
      </PageSection>
      {/* Nothing blocked: the section is not rendered, and SectionStack draws no rule for it. */}
      {showBlocked && <PageSection size="md" title="Blocked" empty="Nothing blocked" />}
    </SectionStack>
  );
}

const meta = {
  title: 'UI/SectionStack',
  component: SectionStack,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SectionStack>;
export default meta;
type Story = StoryObj<typeof meta>;

/** An overview page: header, stats, a stepper, a striped list; a conditional section that is absent leaves no rule. */
export const Overview: Story = { render: () => <EpisodeOverview /> };

/** The same page with the conditional section present. */
export const WithEmptySection: Story = { render: () => <EpisodeOverview showBlocked /> };

/** Under the compact density the rhythm tightens to 16px either side of each rule. */
export const Compact: Story = {
  render: () => (
    <DensityProvider density="compact">
      <EpisodeOverview />
    </DensityProvider>
  ),
};

/** `divided={false}`: the same section distance, no rules. */
export const Undivided: Story = {
  render: () => (
    <SectionStack divided={false}>
      <PageSection size="md" title="Pipeline"><WorkflowStepper steps={STEPS} /></PageSection>
      <PageSection size="md" title="Scenes"><ActionRowList striped items={SHOTS.slice(0, 3)} /></PageSection>
    </SectionStack>
  ),
};

export const Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-surface p-4">
      <EpisodeOverview />
    </div>
  ),
};
