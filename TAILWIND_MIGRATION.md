# Tailwind CSS v4 Migration

## Current Status: ~70% complete

Waves 1–2 are done and pushed. Wave 3 (the remaining domains) is documented below for an agent to pick up.

## Completed

| Wave | Commit | Scope | Files |
|------|--------|-------|-------|
| 1 | `f0ad1ed` | Infrastructure + shared components | 19 |
| 2 | `b033c53` | Layout, UI, misc, identity, social, ingest | 71 |

**Infrastructure in place:**
- `src/styles.css` — `@theme` tokens + keyframes
- `src/lib/cn.ts` — `clsx` + `tailwind-merge` utility
- `vite.config.ts` — `@tailwindcss/vite` plugin, `cssCodeSplit: false`
- `package.json` — `clsx` and `tailwind-merge` as runtime deps, CSS export path

## Remaining: Wave 3

122 files across these domains still use inline `style={{}}`:

| Domain | Files | Lines | Notes |
|--------|-------|-------|-------|
| pipelines | 64 | ~38K | Largest domain. 1440 inline style usages. Consider refactoring common patterns into shared components before converting. |
| doc-editor | 37 | ~9.8K | TipTap integration — some inline styles are TipTap-specific |
| observability | 12 | ~5.3K | Dashboard, events, metrics, nodes pages |
| collaboration | 8 | ~1.5K | Cursor/canvas components — some dynamic positioning must stay inline |
| video | 7 | ~560 | Small, mostly straightforward |
| doc-types | 3 | — | Small |
| field-types | 1 | — | Small |
| typed-documents | 2 | — | Small |

## Refactoring opportunities (do before/during conversion)

The pipelines domain is 38K lines with heavy repetition. Before mechanically converting styles, look for:

1. **Duplicated page shells** — AllRunsPage, PipelineRunsPage, PipelineStatsPage, PendingApprovalsPage all repeat the same `pageContainerStyle` + `topBarStyle` + table layout. Extract a `PipelinePage` layout wrapper.

2. **Repeated node patterns** — Each node type (action, approval, condition, fork, join, llm, transform, trigger) has a `*Node.tsx` + `*Config.tsx` pair with nearly identical structure. The `BaseNode` wrapper exists but the config panels all re-implement the same card/fieldset/save-button pattern. Consider a `NodeConfigShell` component.

3. **Table components** — RunsTable, ActiveRunsTable, and various list pages all manually build `<table>` with the same cell/header styling. A `DataTable` primitive (header definitions + row data) would eliminate hundreds of lines.

4. **Button/chip duplication** — `src/components/pipelines/ui/Button.tsx` and `src/components/pipelines/ui/IconButton.tsx` duplicate `src/components/ui/Button.tsx` and `src/components/ui/IconButton.tsx`. These should be consolidated into the top-level `src/components/ui/` versions.

5. **Style constant imports** — Many files import `pageContainerStyle`, `topBarStyle`, `tableCellStyle`, `chipStyle`, `fieldStyle`, `saveBtnStyle`, `cancelBtnStyle` from `../../constants/styles`. After conversion, if `src/constants/styles.ts` has zero remaining imports, delete it entirely.

## Execution guide

### Approach A: Mechanical (just convert styles)

Split into 4 parallel agents:
1. Observability + Video + Collaboration + doc-types + field-types + typed-documents (~7.5K lines)
2. Doc-editor (~9.8K lines)
3. Pipelines top-level + context + canvas + steps + replay + dev + versions + ui (~20K lines)
4. Pipelines nodes (~18K lines)

### Approach B: Refactor-first (recommended for pipelines)

1. First pass: extract shared layout/table/config-panel components in pipelines
2. Second pass: convert the remaining (now smaller) files to Tailwind
3. This likely reduces the 38K lines to ~25K and makes the conversion cleaner

### Conversion rules

Each file should:
- `import { cn } from '<relative-path>/lib/cn'`
- Replace all `style={{...}}` with Tailwind utility classes via `className`
- Remove `import { colors, ... } from '<path>/constants/styles'`
- Keep truly dynamic styles (computed values from props/state) as `style` props
- Common token mappings:

| Inline style | Tailwind class |
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

### Verification

After conversion:
```bash
npm test          # 107 tests must pass (only shared/ has tests)
npm run build     # must succeed
npx tsc --noEmit  # only 5 pre-existing errors allowed (see below)
```

### Pre-existing type errors (not from migration)

```
src/hooks/useComments.ts(8,37): Cannot find module '../../types/gateway'
src/hooks/useLikes.ts(9,37): Cannot find module '../../types/gateway'
src/hooks/usePosts.ts(8,37): Cannot find module '../../types/gateway'
src/index.ts(6,1): duplicate export 'ThemeProvider'
src/index.ts(6,1): duplicate export 'useTheme'
```

### Post-migration cleanup

```bash
grep -r "constants/styles" src/
```
If zero results, delete `src/constants/styles.ts`. Also consolidate `src/components/pipelines/ui/` into `src/components/ui/`.
