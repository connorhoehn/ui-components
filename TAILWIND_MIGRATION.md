# Tailwind CSS v4 Migration

## Status: ✅ Complete (closed out 2026-05-18)

All three waves have shipped. The `src/constants/styles.ts` file is deleted, and
no codepath imports inline-style constants from `constants/`.

| Wave | Commit | Scope | Files |
|------|--------|-------|-------|
| 1 | `f0ad1ed` | Infrastructure + shared components | 19 |
| 2 | `b033c53` | Layout, UI, misc, identity, social, ingest | 71 |
| 3a | (mechanical pass, 2026-05) | Remaining static `style={{}}` in pipelines / doc-editor / video / observability domains | many |
| 3b | this commit | Final static-slice extractions in 6 files (TaskItemRow, ExecutorLog, StepThread, SocialTabContent, TiptapEditor, StepTimeline) | 6 |

**Verification gates (all green at close-out):**
- `npm test` — 1403 / 1403 passing
- `npx tsc --noEmit` — 0 errors
- `npm run build` — succeeds

## Infrastructure (do not change without coordination)

- `src/styles.css` — `@theme` tokens + project keyframes
- `src/lib/cn.ts` — `clsx` + `tailwind-merge` utility
- `vite.config.ts` — `@tailwindcss/vite` plugin, `cssCodeSplit: false`
- `package.json` — `clsx` and `tailwind-merge` as runtime deps, CSS export path

## Policy for remaining `style={{}}` usages

After Wave 3b, ~60 components still use `style={{}}` and this is **intentional**.
A grep is not a migration target list. Inline `style` is the correct tool when
the value depends on **runtime state that cannot be expressed as a Tailwind class**:

| Pattern | Example | Where |
|---|---|---|
| Live coordinates | `style={{ top, left, width }}` from `getCoords()` | cursor overlays in `collaboration/`, `doc-editor/TiptapEditor` |
| Per-entity colors | `style={{ background: participant.color }}` | avatars in `doc-editor/`, `social/`, `video/` |
| Computed sizing | `style={{ gridTemplateColumns: \`repeat(${cols}, 1fr)\` }}` | `video/VideoGrid`, `video/HangoutLayout` |
| Theme-mode colors derived in JS | `background: isDark ? '#1e1f2e' : '#f8fafc'` | `social/SocialTabContent` |
| Prop-driven dimensions | `style={{ width, height }}` from public component API | `shared/SkeletonCard`, `shared/Modal`, `ui/Panel` |
| Tightly coupled layout constants | `FONT_SIZE`/`LINE_HEIGHT`/`PADDING_Y` referenced by both style and JS measurement | `shared/CodeEditor` |
| Pass-through to sub-component `style` prop | `<IconButton style={{ background: ... }} />` overriding the child's internal default | `doc-editor/VideoCallPanel` |

**Heuristic — when to convert vs keep:**

- ✅ **Convert** if the value is a string literal or only varies between a fixed enum of class-expressible options (`isOpen ? 'flex' : 'none'` → `flex` vs `hidden`).
- ❌ **Keep inline** if the value involves arithmetic, runtime measurement, prop pass-through, theme-mode JS branching, or hex colors derived from data.

A future drift check could grep for `style={{}}` blocks where **every** key-value
pair has a string-literal RHS — those are the only legitimate new migration
targets. See `.planning/tailwind-w3-inventory.md` for the 2026-05-18 audit that
applied this heuristic to all 65 then-remaining files.

## Refactoring opportunities (separate from this migration)

These were called out in earlier versions of this doc as refactors to do
**before** Wave 3. Wave 3 is closed; revisit only if the codebase grows toward
the same duplication again.

1. **Duplicated pipeline page shells** — `AllRunsPage`, `PipelineRunsPage`, `PipelineStatsPage`, `PendingApprovalsPage` repeat the same `pageContainer` + `topBar` + table layout. Status: pages now use Tailwind classes directly; a `PipelinePage` layout wrapper would still de-duplicate.
2. **Repeated node config pattern** — Each node type has a `*Node.tsx` + `*Config.tsx` pair. A `NodeConfigShell` component could absorb the card/fieldset/save-button repetition.
3. **`<DataTable>` primitive** — `RunsTable`, `ActiveRunsTable`, and various list pages hand-build `<table>` with the same cell/header utilities.
4. **`pipelines/ui/Button` vs `ui/Button` duplication** — Two parallel implementations exist. The top-level `ui/Button` is the canonical one; callers under `pipelines/ui/` should be migrated and the duplicate deleted.

None of these block anything today. File a tracking task if you pick one up.

## Token reference (still authoritative)

Tokens are declared in `src/styles.css` via `@theme`:

```
--color-primary, --color-border, --color-border-field
--color-surface, --color-text-primary, --color-text-secondary
--color-success, --color-success-bg
--color-state-running, --color-state-pending, --color-state-error
```

Use `cn()` from `src/lib/cn.ts` (`clsx` + `tailwind-merge`) to compose class names.

## Glossary of legacy class shorthands (for spelunking old PRs)

| Legacy inline-style constant | Tailwind equivalent |
|---|---|
| `pageContainerStyle` | `p-6 flex flex-col gap-3` |
| `topBarStyle` | `flex items-center gap-3 px-6 h-12 border-b border-border bg-surface shrink-0` |
| `tableCellStyle` | `px-3 py-2.5 text-xs text-text-secondary` |
| `fieldStyle` | `border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none` |
| `saveBtnStyle(disabled)` | `px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md disabled:opacity-50 disabled:cursor-not-allowed` |
| `cancelBtnStyle` | `px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer` |
| `chipStyle('success')` | `inline-block rounded px-2 py-0.5 text-[11px] font-semibold bg-success-bg text-success` |
| `colors.primary` | `bg-primary` / `text-primary` |
| `colors.border` | `border-border` |
| `colors.state.running` | `text-[var(--color-state-running)]` |
