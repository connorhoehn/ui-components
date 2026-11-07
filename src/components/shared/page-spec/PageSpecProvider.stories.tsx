import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageSpecProvider } from './registry';
import { PageFromSpec } from './PageFromSpec';
import { DotMeter } from '../DotMeter';
import { Text } from '../Text';

// How an app declares its own kind: augment the interface, then provide the component.
declare module './types' {
  interface PageSpecLeafKinds {
    'story-capacity': { used: number; total: number; label: string };
  }
}

function Capacity({ used, total, label, 'data-spec-leaf': marker }: { used: number; total: number; label: string; 'data-spec-leaf': string }) {
  return <Text as="div" data-spec-leaf={marker}><DotMeter label={label} value={used / total} /></Text>;
}

const meta: Meta<typeof PageSpecProvider> = {
  title: 'PageSpec/PageSpecProvider',
  component: PageSpecProvider,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="h-[480px]"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof PageSpecProvider>;

/** A registered `story-capacity` kind used inside a spec, type-checked like a built-in one. */
export const RegisteredKind: Story = {
  args: {
    leaves: { 'story-capacity': Capacity },
    children: (
      <PageFromSpec spec={{
        template: 'frame', title: 'Capacity',
        sections: [{ title: 'Workers', body: [{ kind: 'story-capacity', used: 9, total: 12, label: 'busy' }, { kind: 'text', text: '9 of 12 workers busy', tone: 'secondary' }] }],
      }} />
    ),
  },
};
