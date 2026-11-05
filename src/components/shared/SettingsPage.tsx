// SettingsPage — `SettingsLayout` as a page template: the trail above it, the
// fill rule and the template marker around it. The section rail, the
// scrolling section body and the sticky save bar are SettingsLayout's.
import { cn } from '../../lib/cn';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { SettingsLayout, type SettingsLayoutProps } from '../layout/SettingsLayout';
import { PAGE_GUTTER_X, type PageGutter } from './pageTemplate';

export interface SettingsPageProps extends Omit<SettingsLayoutProps, 'style'> {
  /** The trail above the settings rail. */
  breadcrumbs?: BreadcrumbItem[];
  /** Default `page` — the trail at `--ui-page-gutter`. The rail stays flush. */
  gutter?: PageGutter;
}

/**
 * Use this when a page edits settings in sections: a section rail, one scrolling section body and a sticky save bar while dirty (`SettingsLayout`), under the page trail.
 *
 * Fills its parent (`h-full min-h-0`); only the section body scrolls.
 *
 * @example
 * <SettingsPage title="Workspace" breadcrumbs={trail} dirty={dirty} onSave={save} onCancel={reset}
 *   sections={[
 *     { id: 'general', label: 'General', content: <GeneralForm /> },
 *     { id: 'members', label: 'Members', content: <MembersForm /> },
 *   ]} />
 */
export function SettingsPage({ breadcrumbs, gutter = 'page', className, 'data-testid': testId = 'settings-page', ...layout }: SettingsPageProps) {
  const trail = !!breadcrumbs && breadcrumbs.length > 0;
  return (
    <div className={cn('flex h-full min-h-0 min-w-0 flex-col', className)} data-page-template="settings" data-testid={testId}>
      {trail && (
        <div className={cn('shrink-0 min-w-0 border-b border-border py-2', gutter === 'page' && PAGE_GUTTER_X)}>
          <Breadcrumbs items={breadcrumbs!} separator="›" maxItems={5} className="min-w-0" />
        </div>
      )}
      <SettingsLayout {...layout} className="min-h-0 flex-1" data-testid={`${testId}-layout`} />
    </div>
  );
}

export default SettingsPage;
