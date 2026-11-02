# Runbook review layout and audit profiles

Shared fixes in 2.499.4 make diff status labels readable at 12px, use SVG file
chevrons, retain 18px baselines for code and line numbers, and use foreground tone
colors for additions/removals and review labels. Wrapped Text preserves inline
marks within one sentence flow. Compact disclosures and document outlines share
12px horizontal padding; medium callouts and review cards use 16px. Source rows
and procedure markers emit semantic layout markers.

The portable UI audit now distinguishes code-diff lines, change gutters,
procedure lists, source rows, select labels and composer mode rows from the
application reading gutter. Each has explicit geometry/type checks and broken
fixtures. Ordinary tables, nearby controls, contrast, focus, overflow and page
placement retain their checks. Grid-centered icons receive the same alignment
treatment as flex-centered icons.

Validation: all 1,028 test files pass (11,302 tests, 2 existing skips); source/demo
lint and production build pass. The audit mutation suite and skill validator
pass. The packed 2.499.4 consumer has all 339 distribution files byte-matched to
the archive (SHA256 53847411389972e1c020902b027bd780ce749c9c7b39d5a60de00d99938a83ec).
The Work proposal deep audit passes 24 states with zero findings and zero
unclassified composer policies across light/dark and 900/1440px. Its independent
browser check covers deferred lookup, section navigation, diff collapse/reopen,
complete horizontal code scrolling and command help without business writes.

The consumer also fixed its late merge-target lookup: contents appear only once
the initial section list is known. This removes a measured five-to-six-section
layout shift without relaxing the audit's repeatability requirement. Consumer
reports and retained debt are in aws-agentcore's docs/work-social-ui-todo.md and
docs/runbook-review-followup-2026-11-02.md.
