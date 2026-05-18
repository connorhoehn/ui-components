# Tailwind Wave 3 — File Inventory & Reality Check

**Generated:** 2026-05-18 by orchestrator scout pass.

## TL;DR

The migration doc projects ~65 files of static-style conversion work. The actual
codebase has only **~7 files with non-trivial conversion opportunities** — the
other ~58 inline `style={{}}` usages are **legitimately dynamic** (cursor
positions, theme-variable colors, prop-driven sizing) and were never valid
mechanical-conversion targets. The "wave 3" framing is stale; what remains is a
small split-static-from-dynamic cleanup, not a domain-by-domain conversion.

## Classification

| Bucket | Count | Action |
|---|---|---|
| `convert-all` — every style block is static, fully replaceable | 1 | 1 small task |
| `mixed` — some static slices to extract, dynamic parts stay | 6 | 6 small tasks |
| `mostly-keep` — all `style={{}}` are dynamic; nothing to convert | ~57 | No action |
| test fixture | 1 | No action (intentional prop pass-through) |

## Files with work to do

### `convert-all` (1 file)

| File | Inline blocks | Notes |
|---|---|---|
| `doc-editor/VideoCallPanel.tsx` | 4 | All four `IconButton style={{ color: '#fff', background: '#dc2626'/'rgba(255,255,255,0.1)' }}` props are fully static. Replace with Tailwind classes via the existing `className` chain. |

### `mixed` (6 files — extract static slice, keep dynamic)

| File | Static piece to extract | Dynamic piece (stays) |
|---|---|---|
| `doc-editor/TiptapEditor.tsx` | `position: 'absolute'` × 4 → `className="absolute"` | `top`/`left`/`width`/`background` from coords/colors |
| `doc-editor/TaskItemRow.tsx` | `cursor: editable ? 'pointer' : 'default'` × 2 → `className={cn(editable && 'cursor-pointer')}` | dynamic `backgroundColor` lookups |
| `pipelines/ExecutorLog.tsx` | `{ background: error ? undefined : '#22c55e' }` → `className={cn(!error && 'bg-green-500')}` | dynamic `markerColor(row)` |
| `pipelines/StepTimeline.tsx` | `position: 'absolute'`, `height: '100%'`, `borderRadius: '3px 0 0 3px'` static slices → className | `left`/`top`/`width` from percentages, color lookups |
| `pipelines/steps/StepThread.tsx` | `boxShadow: '0 0 0 1px #e2e8f0'` static → className | dynamic `background: statusColor`, `border` template |
| `social/SocialTabContent.tsx` | Several static `padding: '14px 14px 12px'` / `padding: '5px 8px 5px 24px'` / `padding: '6px 12px'` literals, plus `display: chatSidebarOpen ? 'flex' : 'none'` → className | All `color: sidebarText*` and `background: chatBg`/`sidebarBg` (theme-mode-dependent props) stay |

### Sonnet judgment call (1 file)

| File | Why |
|---|---|
| `shared/CodeEditor.tsx` | Four blocks mixing `FONT_FAMILY` / `FONT_SIZE` / `LINE_HEIGHT` constants with dynamic `contentHeight`, plus template-literal `padding`. Whether to convert depends on whether `FONT_FAMILY` is a custom monospace string (keep as token via CSS var) or just `'monospace'` (use Tailwind `font-mono`). |

## Files that should stay inline (representative — full list = grep)

These were on the original "wave 3" target list but the `style={{}}` usage is
legitimately dynamic:

- All `collaboration/*` cursor components — positions come from live presence data
- `video/{CallStartedBanner,ParticipantTile,CallWidget,VideoGrid,HangoutLayout,ReactionOverlay}.tsx` — colors derived from participant hue, grid columns computed from participant count
- `doc-editor/{ReaderMode,ReviewMode,ReaderSectionCard,DocumentListPage,CommentThread,…}` — all `background: someColor` and `borderLeft: 3px solid ${color}` are runtime values
- All `social/*` chat avatars — `background: color` per author
- `pipelines/canvas/{ErrorOverlay,QuickInsertPopover,CanvasContextMenu}` — popovers positioned by anchor
- `pipelines/replay/{ExecutionTimeline,Scrubber}` — timeline geometry computed from run data
- `agents/components/TraceTimeline.tsx` — span widths computed from durations
- `layout/{AppLayout,CollapsibleSidebar}.tsx` — `SIDEBAR_WIDTH` constant + dynamic colors
- `shared/{SkeletonCard,EventRow,Modal}.tsx` — width/height/zIndex/maxWidth from props

## Recommended path

1. Drop the "6-wave haiku swarm" idea — the work isn't there.
2. Do the 7 small `mixed` + `convert-all` cleanups in **one focused pass** (one or two commits).
3. Update `TAILWIND_MIGRATION.md` to declare Wave 3 closed and document the policy: "remaining `style={{}}` usages are intentional dynamic styling and not migration targets."
4. Add a lint nudge (optional, follow-up): a CI grep that flags `style={{}}` blocks containing only string-literal keys/values without template substitution, so future drift gets caught.

## Resolution (2026-05-18)

Followed the recommended path. **6 of the 7 candidate files were edited**; the
other 2 (CodeEditor, VideoCallPanel) were re-classified as legitimately-keep
after deeper inspection:

| File | Outcome |
|---|---|
| `doc-editor/TaskItemRow.tsx` | ✏️ Extracted `cursor: editable ? 'pointer' : 'default'` from 2 style blocks into `cn()` className conditional. |
| `pipelines/ExecutorLog.tsx` | ✏️ Folded `{ background: error ? undefined : '#22c55e' }` into the existing `cn()` className branch and dropped the style prop entirely. |
| `pipelines/steps/StepThread.tsx` | ✏️ Moved `boxShadow: '0 0 0 1px #e2e8f0'` into className as `shadow-[0_0_0_1px_#e2e8f0]`. |
| `social/SocialTabContent.tsx` | ✏️ 5 blocks: `height: 'calc(100vh - 120px)'`, `display: chatSidebarOpen ? 'flex' : 'none'`, and three hardcoded `padding:` literals moved into className. Dynamic colors (`sidebarBorder`, `sidebarBg`, `chatBg`, `sidebarText*`) stay inline because they're computed from `isDark`. |
| `doc-editor/TiptapEditor.tsx` | ✏️ All 4 cursor/selection blocks split: static `position/opacity/borderRadius/pointerEvents/zIndex/animation/boxShadow/font/padding` → className; dynamic `top/left/width/height/background` from `getCoords()` → style. |
| `pipelines/StepTimeline.tsx` | ✏️ 2 blocks: static `position/borderRadius/transition/display/overflow/height/opacity` → className (`opacity` ported as conditional `opacity-100`/`opacity-[0.85]`); dynamic `left/width/background` stay inline. |
| `doc-editor/VideoCallPanel.tsx` | 🚫 **Kept inline.** The `style={{}}` is passed to `IconButton`, whose own internal `style={{ background: active ? activeColor : 'transparent', ...style }}` requires inline-style specificity to override `'transparent'` with `rgba(255,255,255,0.1)`. Converting to className would lose to IconButton's inline default. Refactoring IconButton's API for one caller isn't worth it. |
| `shared/CodeEditor.tsx` | 🚫 **Kept inline.** `FONT_SIZE`/`LINE_HEIGHT`/`PADDING_Y`/`GUTTER_W` are layout constants used by both inline styles and `LINE_PX = FONT_SIZE * LINE_HEIGHT` measurement code. Decoupling them into Tailwind classes would split a coordinated constant set, making future changes more error-prone. |

Verification: `npm test` (1403/1403), `npx tsc --noEmit` (0 errors), `npm run build` succeeds.

`TAILWIND_MIGRATION.md` updated to declare Wave 3 closed and document the
"convert vs keep" heuristic so future contributors don't re-open this audit.
