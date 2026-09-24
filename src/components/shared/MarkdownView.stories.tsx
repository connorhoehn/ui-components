import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkdownView } from './MarkdownView';

const SAMPLE = `# Enterprise context

Governance facts extracted from onboarding calls and design reviews.

## Dimensions covered

| Dimension | Status |
| --- | --- |
| CI | Verified |
| CD | Claimed |

- Rotate secrets quarterly
- Never commit \`.env\` files

\`\`\`ts
export function score(level: number): string {
  return level >= 4 ? "exceptional" : "baseline";
}
\`\`\`

> Levels 4–5 require Observed evidence, sustained over time.

See the [rubric](https://example.com/rubric) for full detail.
`;

const meta = {
  title: 'Shared/MarkdownView',
  component: MarkdownView,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof MarkdownView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { markdown: SAMPLE },
};

/** `sm`: prose inside a card — headings stepped down to 17/15/14/13px. */
export const ScaleSmall: Story = {
  args: { markdown: SAMPLE, scale: 'sm' },
};

/** `lg`: a guide read on its own page (Distillation Knowledge mockup). */
export const ScaleLarge: Story = {
  args: { markdown: SAMPLE, scale: 'lg' },
};
