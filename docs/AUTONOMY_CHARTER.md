# Autonomy Charter — @connorhoehnslalom/ui-components

This charter governs the ui-components agent when running in self-driven mode (claiming tasks from the agent-hub without per-task human approval). It is binding. Violations require an immediate pause + human review.

## 1. No-touch list (handoff required before any edit)

Changes to the following files/exports require a hub handoff to every consumer (`event-catalog`, `websocket-gateway`, `vnl-ads`) AND a 24h soak window before merge:

- `src/index.ts` — root barrel (any add/remove/rename)
- `src/components/shared/index.ts` — shared primitives barrel
- `src/components/identity/index.ts` — identity public surface
- `src/components/video/index.ts` — video stable exports (VideoPlayer, VideoGrid, ParticipantTile, ReactionPicker, RecordingList, ConnectionPill, CallStartedBanner, StreamVideo, RemoteTileSlot, CallingStatusPill, ReconnectingBanner, MuteWhileTalkingToast)
- `src/components/social/ChatPanel.tsx` — public props API
- `src/integrations/realtime-modules/index.ts` — integrations barrel
- `src/styles.css` — `@theme` tokens (renaming a token is breaking)
- `package.json` `exports` map
- `CHANGELOG.md` (every release must update it)

Internal refactors that do not change public types may proceed without handoff, but the post-task summary MUST state "no public-API change."

## 2. Version-bump policy

- Patch (`2.x.y` -> `2.x.(y+1)`): bug fixes, internal refactors, new tests/stories/docs, new private components.
- Minor (`2.x.0` -> `2.(x+1).0`): new public exports, new optional props on stable components, new entry-point sub-paths.
- Major: ANY breaking change to a stable export. Requires a written migration note in CHANGELOG and a handoff to each consumer BEFORE merge.
- Every release bumps `package.json` `version` AND adds a CHANGELOG entry in the same commit. The `dist/` directory is rebuilt and committed against the release tag (per the v2.9.1 process).

## 3. Self-driven task cap

- Max 4 `[self-driven]` tasks claimed/completed per UTC day.
- Pause for human review after the 4th task or after any task touching the No-touch list, whichever comes first.
- Resume only after a human acknowledges in the hub via `update_task`.

## 4. Forbidden actions

- Pushing commits to consumer repos. Always create a hub handoff with the suggested diff instead.
- `git push --force` to any branch.
- `npm unpublish` / version yanks.
- Deleting a public export without a deprecation period: mark `@deprecated` in JSDoc, leave the export in place for at least one minor version, then remove with a major bump.
- Skipping git hooks (`--no-verify`, `--no-gpg-sign`).
- Editing `.github/`, `.npmrc`, or CI workflow files without a hub handoff.
- Claiming a task already owned by a different agent.

## 5. Required pre-commit gates

Before every commit the agent MUST run, and ALL must pass:

```
npm test       # vitest run — all suites green
npm run lint   # tsc --noEmit — 0 errors
npm run build  # vite build — succeeds with dist/ regenerated
```

A failing gate is a hard stop. Fix the underlying issue and create a NEW commit (never `--amend` after a hook failure).

## 6. Required post-task summary fields

Every task completion via `mark_task_done` MUST include a summary with these labelled sections (matches the format used in hub#927-932):

- **User impact** — what a downstream consumer sees / can now do
- **Technical detail** — files changed, key design decisions, type signatures touched
- **Verification** — test counts, build output, manual checks performed
- **Commit SHA** — the merge-commit hash
- **Cross-repo handoffs needed** — list of consumer repos + hub task IDs, or "none"

## 7. Escalation

Open a hub `raise_blocker` when:

- A required gate has been failing for > 30 min and the root cause is unclear
- A task description conflicts with this charter
- A consumer-facing breaking change is required to make a feature work
- An external dependency (npm registry, GitHub Packages) is down
