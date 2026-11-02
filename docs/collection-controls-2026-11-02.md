# Collection controls

SegmentedControl now keeps its intrinsic width inside a stretching flex/grid
column. `fullWidth` still fills the row explicitly. Selected and unselected
segments share the same border box, so changing selection does not change their
height. Storybook includes both modes inside a column.

CollectionToolbar keeps Refresh with search and filters. Record actions retain
the trailing slot. It no longer draws an empty trailing slot when no actions
exist. This applies to every consumer, including Contacts and call collections.

The portable UI audit checks the final segment's inset for content-width controls
and requires collection Refresh to belong to the query-control group. Valid and
deliberately broken browser fixtures cover both rules. The skill also requires a
semantic inventory of cross-context header actions, with task-specific exceptions
for parent navigation and actions on a selected record. That judgment cannot be
inferred reliably from button wording alone.

Validation: 1,028 test files; 11,298 tests passed, two skipped; source/demo type
checks; production build; portable audit mutation suite and skill validation.
An initial isolated-worktree test run hit an xterm CSS import caused by symlinked
dependencies. A real dependency directory resolved it, and the integrated suite
above also passes. No consumer or production data is changed by these controls.
