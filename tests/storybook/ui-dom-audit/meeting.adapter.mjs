// ui-dom-audit adapter for the meeting stories (goal G18, realtime-modules
// docs/design/meeting-rooms-goal.md). The skill's contract targets app pages;
// make-contract.mjs drops the rules that only make sense on a full page
// (shell, rails, page title, content column), each with its reason, and keeps
// the rest (contrast, overlap, clipping, control sizes, landmarks, composer).
//
// Run from the repo root:
//   npx storybook dev -p 6006 --ci --no-open &        # or reuse one; STORYBOOK_PORT overrides
//   node tests/storybook/ui-dom-audit/make-contract.mjs \
//     skills/ui-dom-audit/references/work-ui.contract.json .scratch/meeting-audit/storybook.contract.json
//   MEETING_AUDIT_CONTRACT=.scratch/meeting-audit/storybook.contract.json \
//   node skills/ui-dom-audit/scripts/audit.mjs --project . \
//     --adapter tests/storybook/ui-dom-audit/meeting.adapter.mjs \
//     --themes light,dark --widths 1440,900,390 --strict-coverage --out .scratch/meeting-audit
//
// Expected (2.474.0): every finding is outside the meeting files or a
// Storybook artefact — see the G18 line in meeting-rooms-audit.md.

/** Minimal Storybook binding for the ui-dom-audit skill: meeting stories, no sign-in. */
import { fileURLToPath } from 'node:url';
const R = '#storybook-root';
const here = fileURLToPath(new URL('.', import.meta.url));
// Portal selector bindings (portal/e2e/ui-dom-audit.adapter.ts) with the app frame [data-shell-nav] replaced by the story root.
const selectors = {
  storyRoot: `${R} > *`,
  graphDetailLabels: '[data-ui-text="graph-detail"]', graphMetadataLabels: '[data-ui-text="graph-metadata"]', activePersonCaptions: '[data-ui-text="active-person-caption"]',
  codeLabels: 'button code, button .font-mono:not(kbd), [role="button"] code, [role="button"] .font-mono:not(kbd), input[data-ui-text="code"]',
  conversationLabels: '[data-testid="conversation-row"] > span:nth-of-type(2) > span:first-child > span:first-child',
  conversationMetadata: '[data-testid="conversation-time"], [data-testid="conversation-mention"], [data-testid="conversation-unread"]',
  decorativeText: '[aria-hidden="true"]',
  rowMenuGlyphs: '[data-testid*="-row-menu-"][aria-haspopup] > span',
  keyboardHints: 'kbd', captions: '[data-ui-text="caption"]',
  avatarControl: '[data-testid="presence-avatar"], button[aria-label$=" more users"], [data-ui-text="avatar"]',
  workspaceColumns: '[data-testid="social-chat-workspace"], [data-testid="explorer-layout"]',
  splitColumns: '[data-testid$="-split"]:has(> [data-testid$="-primary"])',
  controls: 'button, input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="hidden"]), select, textarea, [role="button"]',
  nativeSelects: 'select:not([data-ui-native-select][data-ui-native-reason]), select[data-ui-native-reason=""], input[list], datalist',
  unmarkedListboxes: '[role="listbox"]:not([data-ui-listbox])',
  listboxOptions: '[data-ui-listbox] [role="option"]', openListboxes: '[data-ui-listbox]',
  toolbarControls: '[data-toolbar-variant="collection"] button:not([aria-label="Clear search"]), [data-toolbar-variant="collection"] input',
  collections: '[data-collection-page]', collectionToolbars: '[data-toolbar-variant="collection"]', sectionTitles: '[data-section-title]',
  tables: `${R} table:not([role="presentation"]):not(.ProseMirror table)`,
  collectionTables: `${R} [data-collection-table] table, ${R} [data-collection-page] table:not([role="presentation"]):not(.ProseMirror table)`,
  composers: '[data-composer-surface]', nestedComposers: '[data-composer-surface] [data-composer-surface]',
  composerBoundary: '[data-docked-column], [data-testid$="-pane-column"], [data-testid="social-chat-pane"], [data-section-content], [data-testid="shell-split-primary"], [data-subnav-content], [data-testid="page-conversation-pane"]',
  composerColumns: '[data-docked-column], [data-testid$="-pane-column"], [data-testid="social-chat-pane"], [data-section-content], [data-testid="shell-split-primary"], [data-subnav-content], [data-testid="page-conversation-pane"]',
  composerDocks: '[data-column-dock], [data-floating-composer-dock]',
  containedControls: ':is(button, a[href], [role="tab"], select, textarea, input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]))',
  // No shell regions: the story root is the column a control must stay inside.
  containmentRegions: R,
  tileLists: `${R} [role="list"]`,
  popovers: '[data-ui-dialog="popover"]', boards: '[data-ui-board]', boardLanes: '[data-ui-board-lane]',
  panels: '[role="dialog"], [role="alertdialog"], dialog[open], [data-ui-dialog]', emptyStates: '[data-ui-empty]',
  sections: `${R} [data-ui-section]`,
  pageTitles: `${R} h1`, sectionHeadings: `${R} h2`,
};
const STORIES = [
  'video-meetingstage-composition--main-meeting', 'video-meetingstage-composition--in-breakout-room', 'video-meetingstage-composition--teal-brand',
  'video-breakoutroomspanel--organizer-open', 'video-breakoutroomspanel--organizer-draft', 'video-breakoutroomspanel--organizer-closing', 'video-breakoutroomspanel--participant-self-select',
  'video-breakoutroombanner--with-timer-and-announcement', 'video-recordingconsentnotice--recording-and-transcription',
  'video-meetingtoolbar--teams', 'video-meetingtoolbar--phone', 'video-meetingchat-announcements--organizer-rooms-open',
  'video-meetingrehearsal-live-bindings--three-people', 'video-raisedhandbadge--on-a-tile',
];
const CHAT = new Set(['video-meetingchat-announcements--organizer-rooms-open']);
const EXEMPT = { mode: 'exempt', reason: 'Isolated meeting component story with no conversation surface; the chat composer belongs to the MeetingChat story, which is classified required.' };
export default {
  baseURL: `http://localhost:${process.env.STORYBOOK_PORT ?? 6006}`, selectors,
  contract: process.env.MEETING_AUDIT_CONTRACT ?? here + 'storybook.contract.json',
  revision: () => ({ storybook: 'ui-components' }),
  async cases(options = {}) {
    return STORIES.filter(id => !options.path || id.includes(options.path)).map(id => ({
      tenant: 'storybook', path: `/iframe.html?id=${id}&viewMode=story`, story: id,
      required: ['$storyRoot'],
      composerExpectation: CHAT.has(id) ? { mode: 'required' } : EXEMPT,
    }));
  },
  async authenticate() {},
  async assertRoute(page, spec) {
    const u = new URL(page.url());
    if (u.pathname !== '/iframe.html' || u.searchParams.get('id') !== spec.story) throw new Error(`Unexpected location ${page.url()}`);
  },
  async theme(page, theme) {
    if (!['light', 'dark'].includes(theme)) throw new Error(`Unknown theme ${theme}`);
    // Storybook's ThemeProvider writes light tokens inline on :root, which beat [data-theme] on <html>.
    // Setting data-theme on <body> as well redeclares the tokens on a descendant, so the story (and body portals) flip.
    await page.evaluate(v => { document.documentElement.dataset.theme = v; document.body.dataset.theme = v; }, theme);
  },
  async ready(page, spec) {
    await page.locator(`${R} > *`).first().waitFor({ state: 'visible', timeout: 20000 });
    const err = await page.evaluate(() => document.body.classList.contains('sb-show-errordisplay') ? document.querySelector('#error-message')?.textContent ?? 'story error' : '');
    if (err) throw new Error(`Story failed to render: ${err}`);
    // Positive marker for the chat story: its message input, not the composer marker the audit itself judges.
    if (CHAT.has(spec.story)) await page.locator(`${R} :is(input[type="text"], input:not([type]), textarea, [contenteditable="true"])`).first().waitFor({ state: 'visible', timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
  },
};
