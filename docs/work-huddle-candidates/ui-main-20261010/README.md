# Native UI consolidation

This source combines completed native branches onto the main history. It preserves actor-scoped drafts, native pane and tab focus behavior, the newer wrapped call media fit, recording Search types, density2.440, and both main command-chip fixes.

The final source adds a reserved message-actions header and bounded native reaction picker, structural compatibility with the consumer’s exact original SDK, native prejoin device layout and hidden-prefix caret anchoring, forwarded composer gutters, notification icon actions, optional idle call context, and a reusable host-data ActivityTicker. Existing prejoin/composer consumer bytecode patches are no longer needed once this package is installed.

`verification.json` records source/artifact hashes, export and declaration completeness, focused checks and inert browser boundaries. The package is a local native build; no registry publication or live backend restart is part of this change.

The static style guard has16 inherited unrelated failures. The new ticker’s only inline measured DOM position is narrowly allowlisted.
