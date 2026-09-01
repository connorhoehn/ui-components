import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';
import * as Y from 'yjs';
import { Awareness } from 'y-protocols/awareness';
import CanvasDocumentView, { type CanvasUnsupportedForm } from './CanvasDocumentView';

// The macro node views come from the REAL adapter, so these stories show what
// the editor actually renders rather than a mock of it. `distributed-core` is
// deliberately NOT imported: it is not a dependency of this package, and the
// chassis is not needed here — a `DocModel` is plain JSON, so the fixture is
// written directly instead of parsed from markdown.
import {
  MacroNode,
  HeadingAnchor,
} from '@connorhoehn/realtime-modules/adapters/tiptap';

const meta = {
  title: 'Doc-Editor/CanvasDocumentView',
  component: CanvasDocumentView,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CanvasDocumentView>;

export default meta;
type Story = StoryObj<typeof meta>;

const USER = { name: 'Ada Lovelace', color: '#8b5cf6' };

/** Registered so the schema has a `macro` node — without it macros are text. */
const EXTENSIONS = [MacroNode, HeadingAnchor];

function useFixture() {
  return useMemo(() => {
    const ydoc = new Y.Doc();
    const awareness = new Awareness(ydoc);
    return {
      ydoc,
      provider: { awareness } as never,
      body: ydoc.getXmlFragment('body'),
    };
  }, []);
}

const BASE = {
  user: USER,
  extensions: EXTENSIONS,
} as const;

/**
 * Seeds the page once the editor exists.
 *
 * Via the editor rather than by writing the Y.XmlFragment directly: with
 * Collaboration bound, the editor IS the writer, and building a second
 * ProseMirror schema here to serialise into the CRDT would put a second
 * prosemirror-model in the graph. Story-only — real documents arrive through
 * the CRDT already populated.
 */
function useSeed(html: string) {
  const [editor, setEditor] = useState<{ commands: { setContent: (h: string) => void }; isEmpty: boolean } | null>(null);
  useEffect(() => {
    if (!editor || !editor.isEmpty) return;
    editor.commands.setContent(html);
  }, [editor, html]);
  return setEditor as (e: unknown) => void;
}

const SAMPLE_HTML = `
<h1>Incident Report: cache stampede</h1>
<p>The cache expired for <strong>every</strong> key at once, and the origin took the full read volume for ~90 seconds. Read latency went from 40ms to 3.2s at p95, and the error rate peaked at 11%.</p>
<h2>What happened</h2>
<p>A deploy rewrote every entry with an identical TTL. Twenty-four hours later they all expired inside the same second, and every miss went straight to origin.</p>
<blockquote><p>The origin was never the bottleneck. The synchronised expiry was.</p></blockquote>
<h2>Action items</h2>
<ul data-type="taskList">
  <li data-type="taskItem" data-checked="false"><label><input type="checkbox"><span></span></label><div><p>Add jitter to the cache TTL</p></div></li>
  <li data-type="taskItem" data-checked="true"><label><input type="checkbox" checked><span></span></label><div><p>Page the on-call earlier</p></div></li>
</ul>
<h2>Follow-up</h2>
<p>Owner: <em>alice@example.dev</em> — review at the next ops sync.</p>
<pre><code>cache.set(key, value, ttl + jitter(0, 300))</code></pre>
`;

/** A document that is already a canvas — the whole page as one editor. */
export const Canvas: Story = {
  args: { isCanvas: true, body: null, ydoc: null as never, provider: null, ...BASE },
  render: (args) => {
    const { ydoc, provider, body } = useFixture();
    const onEditorReady = useSeed(SAMPLE_HTML);
    return (
      <CanvasDocumentView
        {...args}
        isCanvas
        body={body}
        ydoc={ydoc}
        provider={provider}
        onEditorReady={onEditorReady as never}
      />
    );
  },
};

/**
 * A legacy sectioned document. The prompt is the whole point: conversion is
 * an explicit act, never something that happens because a page mounted.
 */
export const NeedsConversion: Story = {
  args: { isCanvas: false, body: null, ydoc: null as never, provider: null, ...BASE },
  render: (args) => {
    const { ydoc, provider, body } = useFixture();
    const [converted, setConverted] = useState(false);
    return (
      <CanvasDocumentView
        {...args}
        isCanvas={converted}
        body={converted ? body : null}
        ydoc={ydoc}
        provider={provider}
        onConvert={async () => { setConverted(true); return null; }}
      />
    );
  },
};

/**
 * The refusal path. `materialize()` declines a non-empty body — that refusal
 * is what stops a double-convert from duplicating the document — so the UI
 * has to show it or the button reads as dead.
 */
export const ConversionRefused: Story = {
  args: { isCanvas: false, body: null, ydoc: null as never, provider: null, ...BASE },
  render: (args) => {
    const { ydoc, provider } = useFixture();
    return (
      <CanvasDocumentView
        {...args}
        ydoc={ydoc}
        provider={provider}
        onConvert={async () => 'the body already has content — refusing to materialise twice'}
      />
    );
  },
};

/** Forms the schema could not express — named, not counted, and kept on the page. */
export const WithUnsupportedContent: Story = {
  args: { isCanvas: true, body: null, ydoc: null as never, provider: null, ...BASE },
  render: (args) => {
    const { ydoc, provider, body } = useFixture();
    const unsupported: CanvasUnsupportedForm[] = [{ kind: 'table' }, { kind: 'image' }];
    return (
      <CanvasDocumentView
        {...args}
        isCanvas
        body={body}
        ydoc={ydoc}
        provider={provider}
        unsupported={unsupported}
      />
    );
  },
};
