import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';
import * as Y from 'yjs';
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate } from 'y-protocols/awareness';
import { ySyncPluginKey, absolutePositionToRelativePosition } from '@tiptap/y-tiptap';
import useFollowCursor from './useFollowCursor';
import CanvasDocumentView, { type CanvasUnsupportedForm } from './CanvasDocumentView';
import PresenceAvatars from '../shared/PresenceAvatars';
import FollowBanner from '../shared/FollowBanner';
import CommentThreadNode from './CommentThread';
import type { CommentThread } from '../../types/document';

// The macro node views come from the REAL adapter, so these stories show what
// the editor actually renders rather than a mock of it. `distributed-core` is
// deliberately NOT imported: it is not a dependency of this package, and the
// chassis is not needed here — a `DocModel` is plain JSON, so the fixture is
// written directly instead of parsed from markdown.
import {
  MacroNode,
  HeadingAnchor,
  MarkdownClipboard,
} from '@connorhoehn/realtime-modules/adapters/tiptap';

const meta = {
  title: 'Doc-Editor/CanvasDocumentView',
  component: CanvasDocumentView,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CanvasDocumentView>;

export default meta;
type Story = StoryObj<typeof meta>;

const USER = { name: 'Ada Lovelace', color: '#8b5cf6' };

/**
 * MacroNode is what gives the schema a `macro` node — without it every macro
 * degrades to plain text. MarkdownClipboard is what makes the page actually
 * exchange markdown: paste a markdown file in, copy a heading out AS a
 * heading, instead of flat text either way.
 */
const EXTENSIONS = [MacroNode, HeadingAnchor, MarkdownClipboard];

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
function useSeed(html: string, body: Y.XmlFragment) {
  const [editor, setEditor] = useState<{ commands: { setContent: (h: string) => void } } | null>(null);
  useEffect(() => {
    if (!editor) return;
    // Guard on the CRDT, NOT on `editor.isEmpty`.
    //
    // The Y.Doc is shared (useMemo) while React's StrictMode mounts the story
    // twice, so two editor instances exist over one document. The second one
    // can still report `isEmpty: true` before it has synced, seed the same
    // HTML again, and leave the page with every block duplicated — the
    // trailing code block being the visible tail of it.
    //
    // The fragment's length is the one fact both editors agree on.
    if (body.length > 0) return;
    editor.commands.setContent(html);
  }, [editor, html, body]);
  return setEditor as (e: unknown) => void;
}

/**
 * A remote participant, simulated.
 *
 * A second Awareness on the same Y.Doc gets its own clientID — exactly what a
 * second browser would hold — and its updates are applied to the story's
 * awareness the way a provider would relay them. The editor's own caret
 * overlay then renders Ada's caret with no special casing, and follow mode has
 * something real to track: her cursor hops to a new block every few seconds.
 *
 * Positions are computed through the live editor's y-sync binding
 * (absolute → relative), the same mapping the overlay uses in the other
 * direction, so the fixture speaks the wire's own vocabulary.
 */
function useSimulatedPeer(
  awareness: Awareness | undefined,
  ydoc: Y.Doc,
  editor: { view?: { state: unknown } } | null,
  user: { name: string; color: string },
) {
  const [clientId, setClientId] = useState<number | null>(null);
  useEffect(() => {
    if (!awareness || !editor?.view) return;
    // The remote awareness gets its OWN Y.Doc for identity only. `new
    // Awareness(ydoc)` inherits ydoc.clientID, so a "peer" built on the
    // shared doc is the SAME client as the local editor — the caret overlay
    // (correctly) skips it as self and nothing renders. The cursor payload is
    // unaffected: relative positions are computed against the shared doc and
    // interpreted by the receiver, so only the identity needs to be distinct.
    const remote = new Awareness(new Y.Doc());
    remote.setLocalStateField('user', user);
    setClientId(remote.clientID);

    const relay = () => {
      applyAwarenessUpdate(awareness, encodeAwarenessUpdate(remote, [remote.clientID]), 'peer-sim');
    };

    let step = 0;
    const move = () => {
      const view = (editor as { view: { state: never } }).view;
      const ystate = ySyncPluginKey.getState(view.state);
      if (!ystate?.type || !ystate?.binding?.mapping) return;
      const docSize = (view.state as { doc: { content: { size: number } } }).doc.content.size;
      if (docSize < 4) return;
      // Walk a fixed circuit of the document so the movement is legible —
      // random hops read as a glitch, a patrol reads as a person.
      const stops = [0.12, 0.38, 0.62, 0.88];
      const pos = Math.max(1, Math.floor(docSize * stops[step % stops.length]!));
      step += 1;
      const rel = absolutePositionToRelativePosition(pos, ystate.type, ystate.binding.mapping);
      if (!rel) return;
      const json = Y.relativePositionToJSON(rel);
      remote.setLocalStateField('cursor', { anchor: json, head: json });
      relay();
    };

    relay();
    const timer = setInterval(move, 2500);
    move();
    return () => {
      clearInterval(timer);
      remote.destroy();
      setClientId(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awareness, ydoc, editor]);
  return clientId;
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
    const onEditorReady = useSeed(SAMPLE_HTML, body);
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

/**
 * The collaborative page: presence avatars in the toolbar, comment threads in
 * the margin beside the text they refer to.
 *
 * The offsets here are hard-coded. Turning a comment's anchor into a pixel
 * offset needs the live ProseMirror view, so this story shows the LAYOUT and
 * the collision stacking — c1 and c2 are deliberately 30px apart to make the
 * push-down visible — not the anchoring, which is the next piece of work.
 */
export const WithPresenceAndComments: Story = {
  args: { isCanvas: true, body: null, ydoc: null as never, provider: null, ...BASE },
  render: (args) => {
    const { ydoc, provider, body } = useFixture();
    const seed = useSeed(SAMPLE_HTML, body);
    const [editor, setEditor] = useState<Parameters<typeof useFollowCursor>[0]['editor']>(null);
    const onEditorReady = (e: unknown) => { seed(e); setEditor(e as never); };
    const [focused, setFocused] = useState<string | null>(null);
    // Host-owned, because the component is controlled — see GutterHidden.
    const [gutterVisible, setGutterVisible] = useState(true);
    // Follow mode, tracked for real: Ada is a simulated second client whose
    // caret patrols the document (the editor's own overlay draws it), and
    // Follow keeps the viewport on her through useFollowCursor — the same
    // awareness → y-sync resolution a deployment uses. Stop, or any local
    // interaction, unlocks.
    const [followingId, setFollowingId] = useState<string | null>(null);
    const adaClientId = useSimulatedPeer(
      (provider as { awareness?: Awareness } | null)?.awareness,
      ydoc,
      editor as never,
      { name: 'Ada Lovelace', color: '#8b5cf6' },
    );
    useFollowCursor({
      editor,
      provider: provider as never,
      followClientId: followingId === 'u1' ? adaClientId : null,
      onLost: () => setFollowingId(null),
    });
    const CAST = [
      { id: 'u1', name: 'Ada Lovelace', color: '#8b5cf6', online: true, mode: 'editor' as const, detail: 'editing', location: 'Rollout plan' },
      { id: 'u2', name: 'Grace Hopper', color: '#2563eb', online: true, mode: 'reviewer' as const, detail: 'reviewing', location: 'Recovery window' },
      { id: 'u3', name: 'Alan Turing', color: '#16a34a', online: false, detail: 'away · 12m' },
    ];
    const following = CAST.find((u) => u.id === followingId) ?? null;

    // The REAL thread component, not a hand-rolled card: replies, resolve,
    // @-mentions and relative timestamps all come for free, and the gutter
    // stays a positioning concern rather than growing its own comment UI.
    const thread = (id: string, who: string, color: string, text: string, replies: CommentThread[] = []) => (
      <CommentThreadNode
        comment={{
          id,
          text,
          userId: id,
          displayName: who,
          color,
          timestamp: new Date(Date.parse('2026-09-01T09:00:00Z')).toISOString(),
          parentCommentId: null,
          replies,
        }}
        depth={0}
        onReply={() => {}}
        mentionUsers={[
          { id: 'u1', name: 'Ada Lovelace' },
          { id: 'u2', name: 'Grace Hopper' },
        ] as never}
      />
    );

    return (
      <CanvasDocumentView
        {...args}
        isCanvas
        body={body}
        ydoc={ydoc}
        provider={provider}
        onEditorReady={onEditorReady as never}
        header={
          <FollowBanner
            name={following?.name ?? null}
            onStop={() => setFollowingId(null)}
          />
        }
        toolbarActions={
          <PresenceAvatars
            users={CAST}
            size={24}
            onUserClick={() => {}}
            onFollowUser={(id) => setFollowingId((cur) => (cur === id ? null : id))}
            followingUserId={followingId}
          />
        }
        gutterItems={[
          { id: 'c1', top: 40, active: focused === 'c1', content: thread('c1', 'Ada Lovelace', '#8b5cf6', 'Do we have the p95 for the recovery window too?', [
            { id: 'c1r1', text: 'Adding it now — 3.2s, same window.', userId: 'u2', displayName: 'Grace Hopper', color: '#2563eb', timestamp: new Date(Date.parse('2026-09-01T09:05:00Z')).toISOString(), parentCommentId: 'c1', replies: [] },
          ]) },
          { id: 'c2', top: 70, active: focused === 'c2', content: thread('c2', 'Grace Hopper', '#2563eb', 'Jitter alone will not fix the synchronised TTL.') },
          { id: 'c3', top: 380, active: focused === 'c3', content: thread('c3', 'Alan Turing', '#16a34a', 'Resolved — added to the ops runbook.') },
        ]}
        onFocusGutterItem={setFocused}
        gutterVisible={gutterVisible}
        onToggleGutter={() => setGutterVisible((v) => !v)}
      />
    );
  },
};

/**
 * The gutter switched OFF — the reading view.
 *
 * Two things to look at. The sheet recentres across the full workspace once
 * the margin column stops reserving space for itself, and the toolbar still
 * says "Comments 3 · hidden". That second half is the whole reason the toggle
 * is shaped this way: a switch that removed the threads without a trace would
 * let someone read this page and never learn three people argued about it.
 *
 * The story owns the state, which is exactly what the host must do — the
 * component is controlled so the preference can be persisted, and a component
 * that owned it privately would forget on every navigation.
 */
export const GutterHidden: Story = {
  args: { isCanvas: true, body: null, ydoc: null as never, provider: null, ...BASE },
  render: (args) => {
    const { ydoc, provider, body } = useFixture();
    const onEditorReady = useSeed(SAMPLE_HTML, body);
    const [gutterVisible, setGutterVisible] = useState(false);
    const note = (id: string, who: string, text: string) => (
      <div className="p-1 text-xs text-text-secondary">
        <span className="font-semibold text-text-primary">{who}</span> — {text}
        <span className="sr-only">{id}</span>
      </div>
    );
    return (
      <CanvasDocumentView
        {...args}
        isCanvas
        body={body}
        ydoc={ydoc}
        provider={provider}
        onEditorReady={onEditorReady as never}
        gutterVisible={gutterVisible}
        onToggleGutter={() => setGutterVisible((v) => !v)}
        gutterItems={[
          { id: 'c1', top: 40, content: note('c1', 'Ada Lovelace', 'Do we have the p95 for the recovery window too?') },
          { id: 'c2', top: 180, content: note('c2', 'Grace Hopper', 'Jitter alone will not fix the synchronised TTL.') },
          { id: 'c3', top: 380, content: note('c3', 'Alan Turing', 'Added to the ops runbook.') },
        ]}
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

/**
 * A picture that is 260px tall, in a paragraph-shaped world.
 *
 * Story fixtures need real intrinsic heights to exercise pagination — that is
 * the whole defect the flow exists to fix — and a fixture that fetched one
 * would be a story that only works online.
 */
const plate = (height: number, fill: string) =>
  `<img src="data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="${height}"><rect width="100%" height="100%" fill="${fill}"/></svg>`,
  )}" width="560" height="${height}" alt="" />`;

const LONG = (n: number) =>
  `<p>${Array.from({ length: n }, (_, i) =>
    `Sentence ${i + 1} of a paragraph long enough to run across a page boundary, which is exactly where a seam has to be able to fall without striking a line of type.`,
  ).join(' ')}</p>`;

/**
 * The document pagination was built for: pictures, a table, headings, code and
 * paragraphs long enough to cross a seam.
 *
 * Scroll to each grey band. Nothing is cut — the pictures and the table have
 * moved down to whole pages, headings travel with the text they introduce, and
 * the paragraphs that DO run through a seam do it in the leading between two
 * lines. Turn the `paginate` control off in the toolbar below and the same
 * document becomes one endless sheet.
 */
export const Paginated: Story = {
  args: { isCanvas: true, body: null, ydoc: null as never, provider: null, paginate: true, ...BASE },
  render: (args) => {
    const { ydoc, provider, body } = useFixture();
    const onEditorReady = useSeed(
      [
        '<h1>Quarterly platform review</h1>',
        LONG(9),
        '<h2>Throughput</h2>',
        plate(260, '#7c9cd6'),
        LONG(7),
        '<h2>Latency by region</h2>',
        '<table><tr><th>Region</th><th>p50</th><th>p95</th></tr>',
        ...['us-east', 'us-west', 'eu-central', 'ap-south', 'sa-east'].map(
          (r) => `<tr><td>${r}</td><td>41ms</td><td>318ms</td></tr>`,
        ),
        '</table>',
        LONG(11),
        '<h3>The cache stampede, again</h3>',
        '<pre><code>cache.set(key, value, ttl + jitter(0, 300))\nmetrics.count("cache.write")\n// and eight more lines that must not be sliced\n</code></pre>',
        plate(410, '#8fb98f'),
        LONG(14),
        '<h2>Next quarter</h2>',
        LONG(6),
        plate(180, '#d6a97c'),
        LONG(9),
      ].join('\n'),
      body,
    );
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
 * The same document as one continuous sheet — what every host got before the
 * flow existed, and what a preview pane or a read-only embed may still want.
 */
export const Unpaginated: Story = {
  ...Paginated,
  args: { ...Paginated.args, paginate: false },
};
