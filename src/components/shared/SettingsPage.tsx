// SettingsPage — `SettingsLayout` as a page template: the trail above it, the
// fill rule and the template marker around it. The section rail, the
// scrolling section body and the sticky save bar are SettingsLayout's.
import { cn } from '../../lib/cn';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { SettingsLayout, type SettingsLayoutProps } from '../layout/SettingsLayout';
import { PAGE_GUTTER_X, type PageGutter } from './pageTemplate';

export interface SettingsPageProps extends Omit<SettingsLayoutProps, 'style' | 'gutter'> {
  /** The trail above the settings rail. */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * The title's element. Default `h1` (since 2.515.12; it was a `div`, so the
   * page had no heading): the page title, as the other five templates draw it.
   */
  titleAs?: SettingsLayoutProps['titleAs'];
  /**
   * The title's size. Default `page` (since 2.516.1): 20px semibold on a 28px
   * line, the page title the other five templates draw (it was 14px). `panel`
   * restores the 14px title.
   */
  titleSize?: SettingsLayoutProps['titleSize'];
  /**
   * The section body's element. Default `div` (since 2.516.1; it was `main`):
   * a page template sits inside its shell's `<main>`, as the other five
   * templates do, so it draws no landmark of its own. Pass `main` for a page
   * rendered without a shell.
   */
  contentAs?: SettingsLayoutProps['contentAs'];
  /**
   * Default `page` — the trail at `--ui-page-gutter`. The rail stays flush.
   * `none` (the frame owns the gutter) also drops the narrow header's 12px top
   * padding (since 2.516.1, `SettingsLayout gutter="none"`).
   */
  gutter?: PageGutter;
  /** Set by `PageFromSpec`: the spec template this page was built from. */
  'data-page-spec'?: string;
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
export function SettingsPage({ breadcrumbs, titleAs = 'h1', titleSize = 'page', contentAs = 'div', gutter = 'page', className, 'data-testid': testId = 'settings-page', 'data-page-spec': spec, ...layout }: SettingsPageProps) {
  const trail = !!breadcrumbs && breadcrumbs.length > 0;
  return (
    <div className={cn('flex h-full min-h-0 min-w-0 flex-col', className)} data-page-template="settings" data-page-column="" data-page-spec={spec} data-testid={testId}>
      {trail && (
        <div className={cn('shrink-0 min-w-0 border-b border-border py-2', gutter === 'page' && PAGE_GUTTER_X)} data-page-trail="">
          <Breadcrumbs items={breadcrumbs!} separator="›" maxItems={5} className="min-w-0" />
        </div>
      )}
      <SettingsLayout {...layout} titleAs={titleAs} titleSize={titleSize} contentAs={contentAs} gutter={gutter === 'none' ? 'none' : 'default'} className="min-h-0 flex-1" data-testid={`${testId}-layout`} />
    </div>
  );
}

export default SettingsPage;
