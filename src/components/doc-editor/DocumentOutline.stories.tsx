import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocumentOutline } from './DocumentOutline';
import EditorShell from './EditorShell';
import { Stack } from '../ui/Stack';
import { Text as T } from '../shared/Text';
import { Button } from '../ui/Button';
import Chip from '../shared/Chip';

const meta = { title: 'Doc-Editor/DocumentOutline', component: DocumentOutline } satisfies Meta<typeof DocumentOutline>;
export default meta;
type Story = StoryObj<typeof meta>;
const entries = ['Change summary', 'Changes', 'Review checks', 'Proposed runbook', 'Sources'].map((text, index) => ({ id: `section-${index}`, text: `${index + 1}. ${text}`, level: 1 }));

/** A review remains an application page: an index and anchored sections, without paper or zoom. */
export const ReviewPage: Story = {
  args: { entries },
  render: function ReviewPage() {
    const root = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<string | null>(null);
    const goTo = (id: string) => {
      const target = root.current?.querySelector<HTMLElement>(`#${id}`);
      target?.focus({ preventScroll: true }); target?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActive(id);
    };
    return <Stack ref={root} className="h-[680px] w-full max-w-5xl">
      <EditorShell title="SAML to Cognito migration" titleAs="h1" titleSize="md" headerInset="page" surface="plain" statusPill={<Chip size="md" tone="neutral">Runbook proposal</Chip>}
        breadcrumbs={[{ label: 'Runbooks' }, { label: 'Proposals' }]} subtitle="Proposed update · version 1"
        footer={<Stack className="px-6 py-2"><Button size="sm" variant="ghost" onClick={() => goTo('contents')}>Back to contents ↑</Button></Stack>}>
        <Stack gap="lg" className="px-6 py-4">
          <Stack id="contents" tabIndex={-1} gap="sm" className="border-b border-border pb-4">
            <h2 className="text-base font-semibold">On this page</h2>
            <DocumentOutline entries={entries} activeId={active} onSelect={goTo} aria-label="On this page" wrap />
          </Stack>
          {entries.map(entry => <Stack key={entry.id} id={entry.id} tabIndex={-1} gap="sm" className="scroll-mt-4 border-b border-border pb-6">
            <h2 className="text-base font-semibold">{entry.text}</h2>
            <T wrap>Review this part of the proposed change, its supporting evidence and the checks before accepting it.</T>
            <T tone="secondary" wrap>The page uses application controls and the shared typography scale. The index provides a direct route to each section.</T>
          </Stack>)}
        </Stack>
      </EditorShell>
    </Stack>;
  },
};
