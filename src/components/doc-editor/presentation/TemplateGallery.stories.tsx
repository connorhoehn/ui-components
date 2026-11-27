import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TemplateGallery, type DeckTemplate } from './TemplateGallery';

/**
 * Starting decks to choose from: the first slide large, up to three more
 * small, the title, description and slide count. Three to four a row on a
 * desktop page, one at phone width.
 */
const meta = {
  title: 'DocEditor/TemplateGallery',
  component: TemplateGallery,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TemplateGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A stand-in for the host's server-rendered preview: plain shapes, named colours. */
function sampleSvg(title: string, accent: string): string {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect width="320" height="180" fill="white"/>'
    + `<rect width="320" height="6" fill="${accent}"/>`
    + `<text x="20" y="44" font-family="sans-serif" font-size="18" fill="black">${title}</text>`
    + `<rect x="20" y="64" width="200" height="8" rx="2" fill="gainsboro"/><rect x="220" y="96" width="24" height="60" fill="${accent}"/></svg>`;
}

const deck = (titles: string[], accent: string) => titles.map((title) => sampleSvg(title, accent));

const TEMPLATES: DeckTemplate[] = [
  { id: 'quarterly', title: 'Quarterly review', description: 'Headline numbers, what shipped, what slipped, and the asks.', slideCount: 9, audience: 'Leadership', previews: deck(['Q3 review', 'Key figures', 'Timeline', 'Asks'], 'steelblue') },
  { id: 'kickoff', title: 'Project kickoff', description: 'Why now, the plan in three steps, the team and the first milestone.', slideCount: 7, audience: 'The project team', previews: deck(['Kickoff', 'Agenda', 'Plan', 'Team'], 'seagreen') },
  { id: 'decision', title: 'Decision brief', description: 'Two options side by side and the recommendation.', slideCount: 5, previews: deck(['Decision', 'Comparison', 'Cost'], 'darkorange') },
  { id: 'update', title: 'Weekly update', description: 'A short status: done, next, blocked.', slideCount: 3, audience: 'Stakeholders', previews: deck(['Weekly update'], 'slateblue') },
  { id: 'blank', title: 'Blank deck', description: 'A title slide and nothing else.', slideCount: 1, previews: [] },
];

function Picker(props: Partial<React.ComponentProps<typeof TemplateGallery>>) {
  const [selectedId, setSelectedId] = useState<string | undefined>('quarterly');
  return <TemplateGallery templates={TEMPLATES} {...props} selectedId={selectedId} onSelect={setSelectedId} />;
}

export const Default: Story = {
  args: { templates: TEMPLATES, onSelect: () => {} },
  render: () => <Picker />,
};

export const Loading: Story = {
  args: { templates: [], onSelect: () => {}, loading: true },
  render: () => <Picker templates={[]} loading />,
};

export const Empty: Story = {
  args: { templates: [], onSelect: () => {} },
  render: () => <Picker templates={[]} emptyDescription="Save a deck as a template to start the next one from it." />,
};
