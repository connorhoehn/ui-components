# Optional realtime chat reference renderer

`WrappedChatPanel` now exposes `renderMessageReferences` with the same type and behavior as `ChatPanel`. It forwards the adapted message, including its opaque metadata, to the host callback. The library does not resolve resources, trust message URLs, or authorize access. Deleted messages do not render references.

This additive option defaults to absent; existing consumers require no changes. OrgIQ uses it to resolve stored initiative/work-item kind/ID descriptors under each reader's current access. Consumers of the realtime wrapper in event-catalog, websocket-gateway, vnl-ads and realtime-examples may opt in when their own authorization/resolver exists. Existing ChatPanel consumers already have the same seam.

The source and packed declarations are verified with the wrapper wiring contract, full library tests, source/demo typechecks, and the built package. The scope is a branch integration; no main merge or registry release is requested.

The packaging contract also corrects a preexisting `doc-editor` peer classification: `@tiptap/extension-mention`, `@tiptap/pm`, and `cmdk` are static dependencies of that entry. Walking both the archived consumer base at `e95120a84b5f04ebd7f1be87d5bbc84b479f46fa` and this build produces identical static/dynamic sets. This change adds no runtime peer dependency; it makes the expectation match the already-shipped artifact.
