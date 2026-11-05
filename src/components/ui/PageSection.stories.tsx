import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageSection } from './PageSection';

const meta: Meta<typeof PageSection> = { title: 'UI/PageSection', component: PageSection };
export default meta;

export const WithContent: StoryObj<typeof PageSection> = {
  args: { size: 'sm', title: 'Recent runs', description: 'Finished runs from the queue.', children: <p className="m-0 text-sm">inference-canary-nightly · Completed</p> },
};

/** Nothing to show: one row — the title and one quiet line (since 2.449.0). */
export const Empty: StoryObj<typeof PageSection> = {
  args: { size: 'sm', title: 'Needs your attention', empty: 'Nothing right now — questions and reviews will appear in the composer.' },
};

/** `divided`: a token hairline between each direct child group (since 2.501.0). */
export const Divided: StoryObj<typeof PageSection> = {
  args: {
    size: 'sm',
    title: 'Pipeline health',
    divided: true,
    children: [
      <p key="a" className="m-0 text-sm">ingest.events · Running</p>,
      <p key="b" className="m-0 text-sm">transform.users · Succeeded</p>,
      <p key="c" className="m-0 text-sm">export.warehouse · Failed</p>,
    ],
  },
};
