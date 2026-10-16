// Brand ratchet for the meeting components (goal G1, G2, G6 in
// realtime-modules docs/design/meeting-rooms-goal.md). Apps rebrand the
// library through `--color-primary` and the tone scale; anything painted with
// the fixed `accent` purple, a raw palette class, white/black or an arbitrary
// colour stays the same colour in every app. Hand-drawn close glyphs and raw
// text sizes bypass the library's IconButton/CloseIcon and `T`. And demo
// content must be fictional: these names came from a real meeting screenshot.

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '../../../..');
const COMPONENTS = [
  'src/components/video/MeetingToolbar.tsx',
  'src/components/video/MeetingStatusCluster.tsx',
  'src/components/video/MeetingIcons.tsx',
  'src/components/video/BreakoutRoomsPanel.tsx',
  'src/components/video/BreakoutRoomBanner.tsx',
  'src/components/video/RaisedHandBadge.tsx',
  'src/components/video/RecordingConsentNotice.tsx',
  'src/integrations/realtime/meeting.tsx',
];
const DEMO = [
  ...COMPONENTS,
  'src/components/video/MeetingStage.stories.tsx',
  'src/components/video/MeetingToolbar.stories.tsx',
  'src/components/video/BreakoutRoomsPanel.stories.tsx',
  'src/components/video/BreakoutRoomBanner.stories.tsx',
  'src/components/video/RecordingConsentNotice.stories.tsx',
  'src/components/video/RaisedHandBadge.stories.tsx',
  'src/components/video/__tests__/BreakoutRoomsPanel.test.tsx',
  'src/components/video/__tests__/RecordingConsentNotice.test.tsx',
  'src/components/video/__tests__/RaisedHandBadge.test.tsx',
  'src/components/video/__tests__/MeetingToolbar.test.tsx',
];

const UTIL = '(?:bg|text|border|outline|ring|fill|stroke|decoration|from|to|via)';
const RULES: Array<[string, RegExp]> = [
  ['fixed accent instead of the brand (primary)', new RegExp(`\\b${UTIL}-accent\\b`)],
  ['raw palette colour', new RegExp(`\\b${UTIL}-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-\\d`)],
  ['white/black instead of a token', new RegExp(`\\b${UTIL}-(?:white|black)\\b`)],
  ['arbitrary colour', new RegExp(`\\b${UTIL}-\\[#`)],
  ['arbitrary text size (use T)', /\btext-\[\d+(?:px|rem)\]/],
  ['hand-drawn × glyph (use CloseIcon)', /×/],
];
const REFERENCE_NAMES = /Digisha|Prakashchandra|Hilla|Lauren Milosky|Neal Patel|Sanjay Ramanathan|Ivan Nunez|Parker Watson|Fabian Jimenez|Greg Mikels|Kiana Bahramian|Eli Galayda|Yifei Wang|Abhishek Bhardwaj|Chandan Vedavyas|Jeff Averill|Jeff's Room/;

function offences(files: string[], rules: Array<[string, RegExp]>): string[] {
  const out: string[] = [];
  for (const f of files) {
    readFileSync(resolve(root, f), 'utf8').split('\n').forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments may name what they avoid
      for (const [why, re] of rules) if (re.test(line)) out.push(`${f}:${i + 1} ${why}: ${line.trim()}`);
    });
  }
  return out;
}

describe('meeting components follow the brand', () => {
  it('paint only through brand and tone tokens, IconButton/CloseIcon and T', () => {
    expect(offences(COMPONENTS, RULES)).toEqual([]);
  });

  it('demo content is fictional', () => {
    expect(offences(DEMO, [['name from the reference screenshot', REFERENCE_NAMES]])).toEqual([]);
  });

  it('the rules catch what they claim to', () => {
    const hits = (s: string) => RULES.filter(([, re]) => re.test(s)).map(([why]) => why);
    expect(hits("'bg-accent-bg text-accent'")).toEqual(['fixed accent instead of the brand (primary)']);
    expect(hits("'text-[10px] bg-blue-50 text-white'")).toHaveLength(3);
    expect(hits("'bg-primary-bg text-primary-fg focus-visible:outline-primary'")).toEqual([]);
    expect(REFERENCE_NAMES.test("Hilla's Room")).toBe(true);
  });
});
