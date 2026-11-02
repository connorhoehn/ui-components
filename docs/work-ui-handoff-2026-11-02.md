# Work UI handoff — 2.490.0

WorkflowStepper accepts optional milestone descriptions and failed/cancelled
outcomes. Described compact tracks occupy 128px per milestone, connect node to
node, and scroll within their container if needed. Failure never renders as a
success check. Existing simple stepper consumers retain their layout.

Breadcrumbs uses one line, ellipsis, full accessible names and title tooltips.
Deep trails default to four visible items. GroupedList's ordinary text-only
rows align with the group label after its caret. RailSection now accepts an
explicit plain variant for standalone information panes, using h2 and the
pane's existing gutter. Segmented Tabs reserves the same border in active and
inactive states so changing selection does not change tab height.

Storybook coverage: WorkflowStepper/RunTiming and FailedRun,
Breadcrumbs/NarrowRecordTrail, GroupedList/DesignRecordRail,
RailSection/InformationPane, and Tabs/Segmented. The browser geometry test is
`tests/storybook/navigation-timing.spec.ts`.

## Audit ownership

`skills/ui-dom-audit` remains the single shared owner for the DOM contract,
collector, mutation tests and reports. Codex, Claude and aws-agentcore already
link to it. The new `navigation.breadcrumb` rule checks distinct adjacent
levels, a single line and explicit ellipsis. Its fixtures include valid and
broken examples; no tolerance was relaxed.

The next extraction candidate is aws-agentcore's generic source-inheritance
audit and installed-package verification. Keep source paths, migration
requirements, raw-element budgets, route inventories, authentication and
journey seals in consumer policy. Do not copy app-specific demo or AWS-debug
skills into this library. Full review:
`../../aws-agentcore/docs/ui-audit-ownership-2026-11-02.md` (sibling repository).

The portal consumes the real packed 2.490.0 archive and its optimized dependency
cache has been refreshed. Its run/Findings/Designs browser checks include both
themes and 900/1440 widths. Remaining shared audit debt is the compact composer
focus indicator and light selected-rail count contrast; see the consumer's
`docs/work-ui-followup-2026-11-02.md` for evidence and scope.
