# Workspace reading presentations — 2.489.3

CanvasDocumentView remains the owner of editable and read-only workspace
surfaces. No second document renderer or public barrel was added.

- `readingNavigation`: an embedded document contents block after the title and introduction, numbered headings, dotted page leaders, contained section
  jumps with keyboard focus, and a persistent return-to-contents button.
- `readingPresentation="pane"`: read-only continuous sheet at normal text size,
  compact margins, no page rulers, pagination or extra outline column.
- `initialZoom`: lets a snapshot start at a predictable scale while retaining
  the wider page view's zoom control.
- `DocumentOutline.wrap`: keeps long headings readable in a vertical outline.

Reading typography uses a 28px title, existing workspace body/section sizes,
and section dividers. Paper and ink stay paired across themes. Existing callers
retain their defaults; the pane option has no effect on editable documents.

The aws-agentcore adapter binds guarded markdown to an ephemeral local Y.Doc,
with no provider or save path. Brief sources, installed skills and assembly metadata are sections inside the
same document and contents index. Runbook bundle files and provenance remain
available beneath the reader. Original markdown is still what
Copy markdown returns. Display labels are concise editorial names, while the
stored title and document checksum remain intact.

Storybook: Doc-Editor/CanvasDocumentView → Read Only Pane / Read Only Page.
The Storybook config resolves distributed-core's document CJS entry because
0.48.0's ESM bundle includes a Node-only createRequire banner. Vite prebundles
the browser-safe CJS entry; no peer or production alias was added.

The contents is a ProseMirror view decoration with a React portal; it is part of
paper layout and pagination without rewriting saved text. Page references track
rendered heading positions as pagination and width change. The continuous pane
uses section numbering without invented page numbers. Nested headings and
supporting emphasis use the paper's muted ink. Tables keep readable column
widths and scroll inside their existing wrapper.

DocumentOutline also accepts an accessible navigation label for application
review pages. The Review Page story shows numbered sections, a matching contents
heading and a Runbook proposal type chip, without a document canvas.

Validation: 11,262 unit tests passed (2 skipped); source/demo type checks and
production build passed. Four Storybook browser cases passed: continuous panes
at 390/900, a paged reader at 1440, and the application review index. Audit
mutation self-tests and the skill validator passed. Consumer route audits still
report separate review/diff styling and code-table classification findings;
this release is not a claim of whole-app audit parity.
