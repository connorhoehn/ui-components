import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ExplorerLayout } from './ExplorerLayout';
import { GroupedList } from '../shared/GroupedList';
import { SearchInput } from '../shared/SearchInput';
import { DetailSection } from '../shared/DetailSection';
import { StatusPill } from '../shared/StatusPill';
import Banner from '../shared/Banner';
import { RailSectionHeader } from '../social/RailSectionHeader';
import { ScopeHeader } from '../work/ScopeHeader';
import { SourceList } from '../work/SourceCard';
import { ProcedureSteps } from '../work/ProcedureSteps';
import { EditorShell } from '../doc-editor/EditorShell';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { ArrowRightIcon } from '../ui/Icons';

const meta: Meta<typeof ExplorerLayout> = {
  title: 'Layout/ExplorerLayout',
  component: ExplorerLayout,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof ExplorerLayout>;

/**
 * 2.389.0 — the Distillation guide record, composed only from library parts:
 * `paneHeader` + `ScopeHeader variant="crumbs"`, `RailSectionHeader count`,
 * `GroupedList groupHeading="label" currentStyle="bar"`, `EditorShell
 * titleSize="lg" tabsTrailing`, `Banner layout="callout"` and `SourceList
 * layout="row"`.
 */
export const GuideRecord: Story = {
  render: function GuideRecordStory() {
    const [q, setQ] = useState('');
    const [tab, setTab] = useState('content');
    return (
      <div className="h-[880px] w-[1320px] bg-surface">
        <ExplorerLayout
          railTitle="Knowledge"
          railHeading="prominent"
          railWidth="ml"
          panePadding="none"
          railHeader={
            <div className="flex flex-col gap-2 pb-2">
              <RailSectionHeader label="Guides & findings" count={11} presentational={false} />
              <div className="px-2">
                <SearchInput value={q} onChange={setQ} placeholder="Search guides & findings" />
              </div>
            </div>
          }
          rail={
            <GroupedList
              groupHeading="label"
              currentStyle="bar"
              currentId="saml"
              onOpenRow={() => {}}
              groups={[{ id: 'recent', title: 'Recently updated', count: 4 }, { id: 'week', title: 'Earlier this week', count: 2 }]}
              rows={[
                { id: 'idle', groupId: 'recent', title: 'Propose an idle-capacity teardown', subline: 'Procedure · Published · 16h' },
                { id: 'sso', groupId: 'recent', title: 'Bring SSO up on a new origin', subline: 'Procedure · Published · 18h' },
                { id: 'ci', groupId: 'recent', title: 'Rerun-and-diff triage for a flaky CI test', subline: 'Runbook · Published · 19h' },
                { id: 'saml', groupId: 'recent', title: 'Cut one tenant over from SAML to Cognito', subline: 'Procedure · Draft · 20h' },
                { id: 'fargate', groupId: 'week', title: 'Collector-fleet Fargate tasks are AWS-managed', subline: 'Insight · Published · 1d' },
                { id: 'aurora', groupId: 'week', title: 'Recover a cold Aurora Data API with retries', subline: 'Runbook · Published · 2d' },
              ]}
            />
          }
          paneHeader={
            <ScopeHeader
              variant="crumbs"
              breadcrumbs={[{ label: 'Build', href: '#' }, { label: 'Distillation', href: '#' }, { label: 'Knowledge' }]}
              controls={<Select size="md" aria-label="Repository" defaultValue="all" options={[{ value: 'all', label: 'All repositories' }]} />}
              link={{ label: 'Open Library ↗', href: '#library' }}
            />
          }
        >
          <EditorShell
            title="Cut one tenant over from SAML to Cognito"
            titleSize="lg"
            statusPill={<StatusPill state="neutral" label="Draft" size="sm" />}
            subtitle="Updated 20h ago"
            tabs={[{ id: 'content', label: 'Content' }, { id: 'history', label: 'History' }, { id: 'runs', label: 'Runs', count: 2 }]}
            activeTab={tab}
            onTabChange={setTab}
            tabsTrailing={<Button size="sm" variant="secondary">Sources 4</Button>}
            surface="plain"
          >
            <div className="flex flex-col px-5 py-4">
              <DetailSection first title="When this helps">
                <p className="m-0 text-sm text-text-primary">Planning to move a customer&apos;s sign-in to Cognito? Use this guide to plan a gradual switch, keep people signed in, and preserve a way to roll back.</p>
              </DetailSection>
              <DetailSection title="Use it in your work">
                <div className="flex gap-3">
                  <Button variant="primary">Draft a plan for my project</Button>
                  <Button variant="secondary">Explain this guide</Button>
                </div>
              </DetailSection>
              <Banner
                variant="warning"
                layout="callout"
                icon
                title="Check the redirect before you use this"
                action={<Button variant="link" size="sm" className="inline-flex items-center gap-1">View run <ArrowRightIcon size={14} /></Button>}
                className="my-3"
              >
                The last attempt stopped at step 3 because sign-in still pointed to the old service.
              </Banner>
              <DetailSection first title="The approach" hint="4 steps">
                <ProcedureSteps
                  steps={[
                    { id: 's1', title: 'Keep the existing sign-in available as a fallback.' },
                    { id: 's2', title: 'Check that active sessions stay signed in.' },
                    { id: 's3', title: 'Switch one customer and verify sign-in.' },
                    { id: 's4', title: 'Restore the previous sign-in if the checks fail.' },
                  ]}
                />
              </DetailSection>
              <DetailSection title="Based on">
                <SourceList layout="row" aria-label="Based on" onOpen={() => {}} items={[{ id: 'cl-010', title: 'Retire the SAML shim tenant by tenant', meta: 'Source pattern · auth-service' }]} />
              </DetailSection>
            </div>
          </EditorShell>
        </ExplorerLayout>
      </div>
    );
  },
};
