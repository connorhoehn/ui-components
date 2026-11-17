import { d as e } from "./Button-DQoeE5dN.js";
import { t } from "./Chip-BtSN-nsV.js";
import { n, t as r } from "./Stack-CE1FjEn8.js";
import { t as i } from "./Text-XdCzxWMv.js";
import { t as a } from "./Card-j0qB4VOx.js";
import { t as o } from "./Slider-COaaKXgy.js";
import { n as s } from "./VisuallyHidden-CVFiyXyk.js";
import { t as c } from "./LogStream-BiRhfUBG.js";
import { useCallback as l, useEffect as u, useImperativeHandle as d, useMemo as f, useRef as p, useState as m } from "react";
import { jsx as h, jsxs as g } from "react/jsx-runtime";
import * as _ from "yjs";
import { Annotation as v, Compartment as y, EditorState as b } from "@codemirror/state";
import { EditorView as x, drawSelection as S, highlightActiveLine as C, highlightActiveLineGutter as w, keymap as T, lineNumbers as E, placeholder as D } from "@codemirror/view";
import { defaultKeymap as O, history as k, historyKeymap as A, indentWithTab as j } from "@codemirror/commands";
import { HighlightStyle as M, StreamLanguage as N, bracketMatching as P, indentOnInput as F, syntaxHighlighting as I } from "@codemirror/language";
import { yCollab as L, ySyncAnnotation as R } from "y-codemirror.next";
import { python as z } from "@codemirror/lang-python";
import { javascript as B } from "@codemirror/lang-javascript";
import { java as V } from "@codemirror/lang-java";
import { go as H } from "@codemirror/lang-go";
import { cpp as U } from "@codemirror/lang-cpp";
import { swift as W } from "@codemirror/legacy-modes/mode/swift";
import { tags as G } from "@lezer/highlight";
//#region src/components/code-pad/languages.ts
var K = [
	{
		value: "python",
		label: "Python"
	},
	{
		value: "javascript",
		label: "JavaScript"
	},
	{
		value: "typescript",
		label: "TypeScript"
	},
	{
		value: "java",
		label: "Java"
	},
	{
		value: "go",
		label: "Go"
	},
	{
		value: "cpp",
		label: "C++"
	},
	{
		value: "swift",
		label: "Swift"
	}
];
function q(e) {
	return typeof e == "string" && K.some((t) => t.value === e);
}
var J = null;
function ee(e, t) {
	let n = t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
	if (n) return n();
	switch (e) {
		case "python": return z();
		case "javascript": return B();
		case "typescript": return B({ typescript: !0 });
		case "java": return V();
		case "go": return H();
		case "cpp": return U();
		case "swift": return J ??= N.define(W), J;
		default: return [];
	}
}
//#endregion
//#region src/components/code-pad/theme.ts
var Y = "var(--font-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)", X = "var(--font-sans, system-ui, sans-serif)", te = "color-mix(in srgb, var(--color-primary) 22%, transparent)", ne = "color-mix(in srgb, var(--color-primary) 5%, transparent)", re = x.theme({
	"&": {
		height: "100%",
		color: "var(--color-text-primary)",
		backgroundColor: "var(--color-surface)"
	},
	"&.cm-focused": { outline: "none" },
	".cm-scroller": {
		fontFamily: Y,
		lineHeight: "1.6"
	},
	".cm-content": {
		caretColor: "var(--color-text-primary)",
		paddingBlock: "8px"
	},
	".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--color-text-primary)" },
	"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: te },
	".cm-activeLine": { backgroundColor: ne },
	".cm-gutters": {
		backgroundColor: "var(--color-surface-panel)",
		color: "var(--color-text-tertiary)",
		borderRight: "1px solid var(--color-border)"
	},
	".cm-activeLineGutter": {
		backgroundColor: ne,
		color: "var(--color-text-secondary)"
	},
	".cm-lineNumbers .cm-gutterElement": { paddingInline: "8px 10px" },
	"&.cm-focused .cm-matchingBracket": {
		backgroundColor: "color-mix(in srgb, var(--color-success) 20%, transparent)",
		outline: "1px solid color-mix(in srgb, var(--color-success) 45%, transparent)"
	},
	"&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "color-mix(in srgb, var(--color-danger) 18%, transparent)" },
	".cm-placeholder": { color: "var(--color-text-tertiary)" },
	".cm-ySelectionInfo": {
		fontFamily: X,
		fontSize: "10px",
		fontWeight: "600",
		lineHeight: "1.4",
		color: "white",
		padding: "0 4px",
		borderRadius: "3px 3px 3px 0",
		top: "-1.45em",
		opacity: "0.85"
	},
	".cm-ySelectionCaret:hover > .cm-ySelectionInfo": { opacity: "1" }
}), ie = M.define([
	{
		tag: [
			G.keyword,
			G.controlKeyword,
			G.moduleKeyword,
			G.operatorKeyword,
			G.definitionKeyword,
			G.modifier
		],
		color: "var(--color-accent-fg)"
	},
	{
		tag: [
			G.string,
			G.special(G.string),
			G.regexp,
			G.character
		],
		color: "var(--color-success-fg)"
	},
	{
		tag: [
			G.number,
			G.bool,
			G.null,
			G.atom,
			G.unit
		],
		color: "var(--color-warning-fg)"
	},
	{
		tag: [
			G.comment,
			G.lineComment,
			G.blockComment,
			G.docComment
		],
		color: "var(--color-text-tertiary)",
		fontStyle: "italic"
	},
	{
		tag: [
			G.function(G.variableName),
			G.function(G.propertyName),
			G.definition(G.function(G.variableName))
		],
		color: "var(--color-info-fg)"
	},
	{
		tag: [
			G.typeName,
			G.className,
			G.namespace,
			G.definition(G.typeName)
		],
		color: "var(--color-primary-fg)"
	},
	{
		tag: [
			G.meta,
			G.annotation,
			G.processingInstruction
		],
		color: "var(--color-warning-fg)"
	},
	{
		tag: [
			G.operator,
			G.punctuation,
			G.separator,
			G.bracket
		],
		color: "var(--color-text-secondary)"
	},
	{
		tag: [G.propertyName, G.attributeName],
		color: "var(--color-text-primary)"
	},
	{
		tag: G.invalid,
		color: "var(--color-danger-fg)"
	},
	{
		tag: G.strong,
		fontWeight: "600"
	},
	{
		tag: G.emphasis,
		fontStyle: "italic"
	}
]), ae = I(ie), Z = v.define(), oe = v.define();
function se(e) {
	return e.annotation(oe) ? "insert" : e.isUserEvent("input.paste") ? "paste" : e.isUserEvent("input.drop") ? "drop" : e.isUserEvent("input") ? "type" : e.isUserEvent("delete") ? "delete" : e.isUserEvent("undo") ? "undo" : e.isUserEvent("redo") ? "redo" : e.isUserEvent("move") ? "move" : "other";
}
var ce = [
	"input",
	"delete",
	"undo",
	"redo",
	"move"
], le = b.changeFilter.of((e) => !(e.startState.readOnly && ce.some((t) => e.isUserEvent(t))));
function ue(e) {
	return e ? [
		b.readOnly.of(!0),
		x.editable.of(!1),
		x.contentAttributes.of({
			tabindex: "0",
			"aria-readonly": "true"
		})
	] : [];
}
function de(e) {
	return e ? D(e) : [];
}
function fe(e) {
	let t = Infinity, n = 0, r = 0, i = 0;
	return e.iterChanges((e, a, o, s, c) => {
		t = Math.min(t, e), n += c.length, r += a - e, i += c.length > 0 ? c.lines : 0;
	}), {
		from: Number.isFinite(t) ? t : 0,
		inserted: n,
		deleted: r,
		lines: i
	};
}
function pe({ ydoc: t, ytext: n, textName: r = "code", provider: i = null, user: a, defaultValue: o = "", value: s, onChange: c, language: l = "python", languages: f, extensions: m, readOnly: g = !1, placeholder: v, "aria-label": D = "Code", onPaste: M, onLocalEdit: N, variant: I = "framed", autoFocus: z = !1, className: B, ref: V }) {
	let H = p(null), U = p(null), W = p({
		language: new y(),
		readOnly: new y(),
		placeholder: new y(),
		label: new y(),
		extensions: new y()
	}), G = p({
		onChange: c,
		onPaste: M,
		onLocalEdit: N,
		language: l,
		languages: f,
		extensions: m,
		readOnly: g,
		placeholder: v,
		ariaLabel: D,
		value: s,
		defaultValue: o,
		autoFocus: z
	});
	G.current = {
		onChange: c,
		onPaste: M,
		onLocalEdit: N,
		language: l,
		languages: f,
		extensions: m,
		readOnly: g,
		placeholder: v,
		ariaLabel: D,
		value: s,
		defaultValue: o,
		autoFocus: z
	};
	let K = me(m), q = f && Object.prototype.hasOwnProperty.call(f, l) ? f[l] : void 0, J = n ?? (t ? t.getText(r) : null), Y = i?.awareness ?? null;
	u(() => {
		let e = H.current;
		if (!e) return;
		let t = W.current, n = G.current, r = (e, t, n) => {
			let { from: r, inserted: i, deleted: a, lines: o } = fe(e.changes), s = Date.now();
			G.current.onLocalEdit?.({
				kind: t,
				from: r,
				inserted: i,
				deleted: a,
				length: n,
				at: s
			}), (t === "paste" || t === "drop") && i > 0 && G.current.onPaste?.({
				characters: i,
				lines: o,
				from: r,
				at: s,
				via: t === "paste" ? "paste" : "drop"
			});
		}, i = null, a;
		J ? (i = new _.UndoManager(J), a = L(J, Y, { undoManager: i })) : a = [k(), T.of(A)];
		let o = [
			E(),
			w(),
			C(),
			S(),
			F(),
			P(),
			ae,
			re,
			T.of([...O, j]),
			a,
			le,
			t.language.of(ee(n.language, n.languages)),
			t.readOnly.of(ue(n.readOnly)),
			t.placeholder.of(de(n.placeholder)),
			t.label.of(x.contentAttributes.of({ "aria-label": n.ariaLabel })),
			x.updateListener.of((e) => {
				if (e.docChanged) {
					for (let t of e.transactions) t.docChanged && t.annotation(R) === void 0 && (t.annotation(Z) || r(t, se(t), t.newDoc.length));
					G.current.onChange?.(e.state.doc.toString());
				}
			}),
			t.extensions.of(n.extensions ? [...n.extensions] : [])
		], s = J ? J.toString() : n.value ?? n.defaultValue, c = new x({
			parent: e,
			state: b.create({
				doc: s,
				extensions: o
			})
		});
		U.current = c;
		let l = null;
		if (J && i) {
			let e = i;
			l = (t, n) => {
				if (n.origin !== e) return;
				let r = 0, i = Infinity, a = 0, o = 0;
				for (let e of t.delta) e.retain && (r += e.retain), typeof e.insert == "string" && (i = Math.min(i, r), a += e.insert.length, r += e.insert.length), e.delete && (i = Math.min(i, r), o += e.delete);
				G.current.onLocalEdit?.({
					kind: e.undoing ? "undo" : "redo",
					from: Number.isFinite(i) ? i : 0,
					inserted: a,
					deleted: o,
					length: J.length,
					at: Date.now()
				});
			}, J.observe(l);
		}
		return n.autoFocus && c.focus(), () => {
			l && J && J.unobserve(l), c.destroy(), i?.destroy(), U.current === c && (U.current = null);
		};
	}, [J, Y]), u(() => {
		if (!Y || !a) return;
		let e = Y.getLocalState()?.user ?? {};
		Y.setLocalStateField("user", {
			...e,
			name: a.name,
			color: a.color,
			colorLight: a.colorLight ?? `color-mix(in srgb, ${a.color} 20%, transparent)`
		});
	}, [
		Y,
		a?.name,
		a?.color,
		a?.colorLight
	]), u(() => {
		if (Y) return () => {
			Y.getLocalState() && Y.setLocalStateField("cursor", null);
		};
	}, [Y]);
	let X = p({
		language: l,
		languageLoader: q,
		appExtensions: K
	});
	return u(() => {
		let e = X.current;
		(e.language !== l || e.languageLoader !== q) && (X.current = {
			...e,
			language: l,
			languageLoader: q
		}, U.current?.dispatch({ effects: W.current.language.reconfigure(ee(l, G.current.languages)) }));
	}, [l, q]), u(() => {
		X.current.appExtensions !== K && (X.current = {
			...X.current,
			appExtensions: K
		}, U.current?.dispatch({ effects: W.current.extensions.reconfigure(K ? [...K] : []) }));
	}, [K]), u(() => {
		U.current?.dispatch({ effects: W.current.readOnly.reconfigure(ue(g)) });
	}, [g]), u(() => {
		U.current?.dispatch({ effects: W.current.placeholder.reconfigure(de(v)) });
	}, [v]), u(() => {
		U.current?.dispatch({ effects: W.current.label.reconfigure(x.contentAttributes.of({ "aria-label": D })) });
	}, [D]), u(() => {
		let e = U.current;
		if (J || s === void 0 || !e) return;
		let t = e.state.doc.toString();
		t !== s && e.dispatch({
			changes: {
				from: 0,
				to: t.length,
				insert: s
			},
			annotations: Z.of(!0)
		});
	}, [s, J]), d(V, () => ({
		get view() {
			return U.current;
		},
		getText() {
			return U.current?.state.doc.toString() ?? "";
		},
		insertText(e, t = "cursor") {
			let n = U.current;
			if (!n) return;
			let r = n.state.doc.length, i = typeof t == "number" ? Math.max(0, Math.min(t, r)) : t === "start" ? 0 : t === "end" ? r : n.state.selection.main.head;
			n.dispatch({
				changes: {
					from: i,
					insert: e
				},
				selection: { anchor: i + e.length },
				annotations: oe.of(!0),
				scrollIntoView: !0
			});
		},
		focus() {
			U.current?.focus();
		}
	}), []), /* @__PURE__ */ h("div", {
		ref: H,
		"data-testid": "code-pad",
		"data-language": l,
		"data-readonly": g ? "true" : void 0,
		"data-shared": J ? "true" : void 0,
		className: e("relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-surface font-code text-[13px] [&>.cm-editor]:min-h-0 [&>.cm-editor]:flex-1", I === "framed" && "rounded-md border border-solid border-border", B)
	});
}
function me(e) {
	let t = p(e), n = t.current;
	return n === e || n !== void 0 && e !== void 0 && n.length === e.length && n.every((t, n) => t === e[n]) || (t.current = e), t.current;
}
//#endregion
//#region src/components/code-pad/CodeRunOutput.tsx
var he = {
	queued: {
		label: "Queued",
		tone: "neutral",
		announce: "The run is waiting to start."
	},
	compiling: {
		label: "Compiling",
		tone: "info",
		live: !0,
		announce: "The code is compiling."
	},
	running: {
		label: "Running",
		tone: "info",
		live: !0,
		announce: "The code is running."
	},
	succeeded: {
		label: "Finished",
		tone: "success",
		announce: "The run finished."
	},
	failed: {
		label: "Failed",
		tone: "danger",
		announce: "The run failed."
	},
	compile_error: {
		label: "Didn't compile",
		tone: "danger",
		announce: "The code didn't compile."
	},
	timed_out: {
		label: "Timed out",
		tone: "warning",
		announce: "The run took too long and was stopped."
	},
	memory_exceeded: {
		label: "Out of memory",
		tone: "warning",
		announce: "The run used too much memory and was stopped."
	},
	cancelled: {
		label: "Cancelled",
		tone: "neutral",
		announce: "The run was cancelled."
	},
	internal_error: {
		label: "Couldn't run",
		tone: "danger",
		announce: "The code couldn't be run. Try again."
	}
};
function ge(e) {
	return he[e]?.label ?? String(e);
}
function _e(e) {
	switch (e) {
		case "queued": return "Waiting to start.";
		case "compiling": return "Compiling…";
		case "running": return "Running. Nothing printed yet.";
		case "cancelled": return "The run was cancelled before it printed anything.";
		default: return "The program printed nothing.";
	}
}
function ve(e) {
	return e < 1e3 ? `${Math.round(e)} ms` : e < 6e4 ? `${(e / 1e3).toFixed(2)} s` : `${Math.floor(e / 6e4)} min ${Math.round(e % 6e4 / 1e3)} s`;
}
function ye(e) {
	let t = e.replace(/\r\n?/g, "\n").split("\n");
	return t.length > 1 && t[t.length - 1] === "" && t.pop(), t;
}
var be = {
	compile: "Compiler output",
	stdout: "Output",
	stderr: "Error output"
};
function Q(e, t, n) {
	let r = e === "stderr", a = [{
		id: `${e}-label`,
		message: /* @__PURE__ */ h(i, {
			size: "xs",
			weight: "semibold",
			tone: r ? "danger" : "secondary",
			"data-testid": `code-run-${e}-label`,
			children: be[e]
		})
	}];
	return ye(t).forEach((t, n) => {
		a.push({
			id: `${e}-${n}`,
			level: r ? "error" : void 0,
			message: r ? /* @__PURE__ */ h(i, {
				tone: "danger",
				children: t || " "
			}) : t || " "
		});
	}), n && a.push({
		id: `${e}-cut`,
		message: /* @__PURE__ */ h(i, {
			size: "xs",
			tone: "tertiary",
			"data-testid": `code-run-${e}-cut`,
			children: "Cut at the output limit; the rest was not kept."
		})
	}), a;
}
function xe({ status: n, stdout: o = "", stderr: l = "", compileOutput: u = "", truncated: d, exitCode: f, timeMs: p, peakMemoryMb: m, runBy: _, languageLabel: v, runtimeVersion: y, follow: b = !0, emptyMessage: x = "Nothing has been run yet.", actions: S, variant: C = "framed", className: w, "data-testid": T = "code-run-output" }) {
	let E = n ? he[n] ?? {
		label: String(n),
		tone: "neutral",
		announce: String(n)
	} : null, D = n ? [
		...u ? Q("compile", u, !1) : [],
		...o || d?.stdout ? Q("stdout", o, !!d?.stdout) : [],
		...l || d?.stderr ? Q("stderr", l, !!d?.stderr) : []
	] : [], O = [v, y].filter(Boolean).join(" "), k = [];
	return _ && k.push(_.startsWith("Run by") ? _ : `Run by ${_}`), O && k.push(O), typeof p == "number" && Number.isFinite(p) && k.push(ve(p)), typeof m == "number" && Number.isFinite(m) && k.push(`${Math.round(m)} MB`), typeof f == "number" && k.push(`Exit code ${f}`), /* @__PURE__ */ g(a, {
		"data-testid": T,
		"data-status": n ?? void 0,
		"data-variant": C,
		className: e("flex min-h-0 min-w-0 flex-col", C === "flush" && "rounded-none border-0 bg-transparent", w),
		children: [
			/* @__PURE__ */ g(r, {
				gap: "sm",
				align: "center",
				justify: "between",
				wrap: !1,
				"data-testid": `${T}-header`,
				className: "min-w-0 shrink-0 border-b border-[var(--color-border)] px-3 py-2",
				children: [/* @__PURE__ */ g(r, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [E ? /* @__PURE__ */ h(t, {
						tone: E.tone,
						size: "sm",
						dot: E.live ? "pulse" : "static",
						"data-testid": `${T}-status`,
						children: E.label
					}) : /* @__PURE__ */ h(i, {
						size: "sm",
						weight: "semibold",
						tone: "secondary",
						children: "Output"
					}), k.length > 0 && /* @__PURE__ */ h(i, {
						size: "xs",
						tone: "tertiary",
						tabular: !0,
						truncate: !0,
						"data-testid": `${T}-facts`,
						children: k.join(" · ")
					})]
				}), S && /* @__PURE__ */ h(r, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: "shrink-0",
					"data-testid": `${T}-actions`,
					children: S
				})]
			}),
			/* @__PURE__ */ h(s, {
				as: "div",
				"data-testid": `${T}-announcer`,
				children: /* @__PURE__ */ h("span", {
					role: "status",
					"aria-live": "polite",
					"aria-atomic": "true",
					children: E ? E.announce : ""
				})
			}),
			/* @__PURE__ */ h(c, {
				lines: D,
				title: null,
				follow: b,
				announceLines: !1,
				showTimestamp: !1,
				showLevel: !1,
				showSource: !1,
				emptyMessage: n ? _e(n) : x,
				"data-testid": `${T}-log`,
				className: "min-h-0 flex-1 rounded-none border-0"
			})
		]
	});
}
//#endregion
//#region src/components/code-pad/CodePlayback.tsx
function Se(e) {
	let t = Math.max(0, Math.floor((Number.isFinite(e) ? e : 0) / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = String(t % 60).padStart(2, "0");
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${i}` : `${r}:${i}`;
}
function Ce(e, t) {
	let n = 0, r = e.length - 1, i = -1;
	for (; n <= r;) {
		let a = n + r >> 1;
		e[a].atMs <= t ? (i = a, n = a + 1) : r = a - 1;
	}
	return i;
}
var we = {
	question: "Question",
	run: "Run",
	paste: "Paste"
}, Te = {
	question: "border-[var(--color-info-fg,#1d4ed8)] text-[var(--color-info-fg,#1d4ed8)]",
	run: "border-[var(--color-success-fg,#15803d)] text-[var(--color-success-fg,#15803d)]",
	paste: "border-[var(--color-warning-fg,#b45309)] text-[var(--color-warning-fg,#b45309)]"
};
function $(e) {
	return we[e] ?? (e ? e.charAt(0).toUpperCase() + e.slice(1) : "Marker");
}
function Ee(e) {
	return $(e).charAt(0).toUpperCase();
}
function De(e, t) {
	if (e === t) return null;
	let n = 0, r = Math.min(e.length, t.length);
	for (; n < r && e.charCodeAt(n) === t.charCodeAt(n);) n++;
	let i = e.length, a = t.length;
	for (; i > n && a > n && e.charCodeAt(i - 1) === t.charCodeAt(a - 1);) i--, a--;
	return {
		from: n,
		to: i,
		insert: t.slice(n, a)
	};
}
function Oe({ frames: t, markers: a = [], durationMs: s, timeMs: c, onTimeChange: d, language: _ = "python", languages: v, formatTime: y = Se, emptyMessage: b = "No code was written.", className: x, "data-testid": S = "code-playback" }) {
	let [C, w] = m(c ?? 0), T = Math.max(0, Number.isFinite(s) ? s : 0), E = Math.min(T, Math.max(0, c ?? C)), D = l((e) => {
		let t = Math.min(T, Math.max(0, e));
		c === void 0 && w(t), d?.(t);
	}, [
		T,
		c,
		d
	]), O = f(() => [...t].sort((e, t) => e.atMs - t.atMs), [t]), k = f(() => [...a].sort((e, t) => e.atMs - t.atMs), [a]), A = Ce(O, E), j = A >= 0 ? O[A] : null, M = j?.text ?? "", N = j?.language ?? _, P = p(null), F = O.length > 0;
	u(() => {
		let e = P.current?.view;
		if (!e) return;
		let t = De(e.state.doc.toString(), M);
		t && e.dispatch({ changes: t });
	}, [M, F]);
	let I = Ce(k, E), L = I >= 0 ? k[I] : null, [R, z] = m(0), B = p([]), V = Math.min(R, Math.max(0, k.length - 1)), H = (e, t) => {
		let n = -1;
		e.key === "ArrowRight" || e.key === "ArrowDown" ? n = Math.min(k.length - 1, t + 1) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? n = Math.max(0, t - 1) : e.key === "Home" ? n = 0 : e.key === "End" && (n = k.length - 1), !(n < 0) && (e.preventDefault(), z(n), B.current[n]?.focus());
	}, U = (e) => T > 0 ? Math.min(100, Math.max(0, e / T * 100)) : 0, W = T > 2e4 ? 1e3 : 100;
	return /* @__PURE__ */ g(n, {
		gap: "sm",
		"data-testid": S,
		className: e("min-h-0 min-w-0", x),
		children: [F ? /* @__PURE__ */ h(pe, {
			ref: P,
			readOnly: !0,
			defaultValue: M,
			language: N,
			languages: v,
			"aria-label": "Code playback",
			className: "min-h-0 flex-1"
		}) : /* @__PURE__ */ h(n, {
			gap: "none",
			align: "center",
			justify: "center",
			"data-testid": `${S}-empty`,
			className: "min-h-0 flex-1 rounded-md border border-border py-8",
			children: /* @__PURE__ */ h(i, {
				size: "sm",
				tone: "tertiary",
				children: b
			})
		}), /* @__PURE__ */ g(n, {
			gap: "xs",
			"data-testid": `${S}-timeline`,
			className: "shrink-0",
			children: [
				k.length > 0 && /* @__PURE__ */ h("div", {
					role: "group",
					"aria-label": "Moments",
					"data-testid": `${S}-markers`,
					className: "relative mx-2 h-6",
					children: k.map((t, n) => {
						let r = $(t.kind), i = `${r}: ${t.label}${t.detail ? `. ${t.detail}` : ""}, at ${y(t.atMs)}`;
						return /* @__PURE__ */ h("button", {
							ref: (e) => {
								B.current[n] = e;
							},
							type: "button",
							"data-ui-part": "",
							"data-testid": `${S}-marker`,
							"data-kind": t.kind,
							"data-passed": t.atMs <= E ? "true" : void 0,
							tabIndex: n === V ? 0 : -1,
							"aria-label": i,
							title: `${r}: ${t.label}${t.detail ? ` (${t.detail})` : ""} at ${y(t.atMs)}`,
							onClick: () => {
								z(n), D(t.atMs);
							},
							onFocus: () => z(n),
							onKeyDown: (e) => H(e, n),
							className: e("absolute top-0 flex h-5 min-w-5 -translate-x-1/2 cursor-pointer items-center justify-center rounded border border-solid bg-surface px-1 font-mono text-[10px] font-semibold leading-none", "outline-none focus-visible:ring-2 focus-visible:ring-primary", Te[t.kind] ?? "border-border text-text-secondary", t.atMs <= E ? "opacity-100" : "opacity-70"),
							style: { left: `${U(t.atMs)}%` },
							children: Ee(t.kind)
						}, `${t.atMs}-${n}`);
					})
				}),
				/* @__PURE__ */ h(o, {
					value: E,
					onChange: D,
					min: 0,
					max: T,
					step: W,
					readout: !1,
					"aria-label": "Time in the code",
					"aria-valuetext": `${y(E)} of ${y(T)}`,
					"data-testid": `${S}-slider`
				}),
				/* @__PURE__ */ g(r, {
					gap: "sm",
					justify: "between",
					wrap: !1,
					className: "min-w-0",
					children: [/* @__PURE__ */ g(i, {
						size: "xs",
						tone: "secondary",
						tabular: !0,
						"data-testid": `${S}-time`,
						children: [
							y(E),
							" / ",
							y(T)
						]
					}), L && /* @__PURE__ */ g(i, {
						size: "xs",
						tone: "tertiary",
						truncate: !0,
						"data-testid": `${S}-current`,
						children: [
							$(L.kind),
							": ",
							L.label,
							" at ",
							y(L.atMs)
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { K as CODE_PAD_LANGUAGES, pe as CodePad, Oe as CodePlayback, xe as CodeRunOutput, Ee as codePlaybackMarkerLetter, ge as codeRunStatusLabel, q as isCodePadLanguage };
