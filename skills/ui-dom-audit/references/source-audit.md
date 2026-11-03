# Source audit adapter

`createSourceAudit({ typescript, packageName, densityEntryPoints, isPage })`
returns `analyzeTsx(source, relativeFilename)` and
`scanSource({ root, sourceDirs })`. Supply a TypeScript JavaScript compiler API
(the version 7 CLI alone does not provide it). Named library imports and aliases
are inspected for control sizing, geometry classes, inline styles, local density
and collection compositions. CSS private selectors are candidates too. Tests,
stories and dependency directories are skipped. Dynamic styles still require
rendered inspection; this is not a complete CSS parser or an accessibility audit.

`verifyInstalledArchive({ packageRoot, packageName, archivePrefix })` compares
the file dependency with npm lock integrity/resolution, then each archived file
with the installed package. `archivePrefix` defaults to `file:`; a consumer can
require `file:vendor/`. It returns failure messages. An unreadable/malformed
manifest or archive throws rather than passing. Only run on the reviewed local
archive, not an arbitrary downloaded untrusted tarball. Temporary extraction is
removed after comparison; no install, package mutation or browser write occurs.

Keep project roles, route inventories, root shell checks, required composites,
allowed exceptions and per-directory budgets in the consumer. In aws-agentcore,
`scripts/audit-ui-inheritance.cjs` is that adapter; `--json` retains the original
report shape, and `--check` fails only explicit app/package contracts. Candidate
counts do not become hard failures as part of extraction.

The transcript profile is an intentional shared composition: ChatPanel's hover
surface has 8px side padding; MessageRow reserves 20px for the avatar and 8px for
the gap (36px text inset). Continued rows keep the slot and own bubbles reverse
it. The explicit chat.message rules check those measurements. Only the inner
message/header/footer use that grid; adjacent prose and ordinary controls retain
the normal rules. Source: components/social/ChatPanel.tsx and MessageRow.tsx.
