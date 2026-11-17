import { d as e } from "./Button-DQoeE5dN.js";
import { t } from "./Chip-BtSN-nsV.js";
import { n, t as r } from "./Stack-CE1FjEn8.js";
import { t as i } from "./Text-XdCzxWMv.js";
import { t as a } from "./Card-j0qB4VOx.js";
import { t as o } from "./Slider-COaaKXgy.js";
import { n as s } from "./VisuallyHidden-CVFiyXyk.js";
import { t as c } from "./LogStream-BiRhfUBG.js";
import { useCallback as l, useEffect as u, useImperativeHandle as d, useLayoutEffect as f, useMemo as p, useRef as m, useState as h } from "react";
import { jsx as g, jsxs as _ } from "react/jsx-runtime";
import * as v from "yjs";
import { Annotation as y, Compartment as b, EditorState as x } from "@codemirror/state";
import { EditorView as S, drawSelection as C, highlightActiveLine as w, highlightActiveLineGutter as T, keymap as E, lineNumbers as D, placeholder as O } from "@codemirror/view";
import { defaultKeymap as k, history as A, historyKeymap as j, indentWithTab as M } from "@codemirror/commands";
import { HighlightStyle as N, StreamLanguage as P, bracketMatching as F, indentOnInput as I, syntaxHighlighting as L } from "@codemirror/language";
import { yCollab as R, ySyncAnnotation as z } from "y-codemirror.next";
import { python as B } from "@codemirror/lang-python";
import { javascript as V } from "@codemirror/lang-javascript";
import { java as H } from "@codemirror/lang-java";
import { go as U } from "@codemirror/lang-go";
import { cpp as W } from "@codemirror/lang-cpp";
import { swift as G } from "@codemirror/legacy-modes/mode/swift";
import { tags as K } from "@lezer/highlight";
//#region src/components/code-pad/languages.ts
var q = [
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
function J(e) {
	return typeof e == "string" && q.some((t) => t.value === e);
}
var Y = null;
function X(e, t) {
	let n = t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
	if (n) return n();
	switch (e) {
		case "python": return B();
		case "javascript": return V();
		case "typescript": return V({ typescript: !0 });
		case "java": return H();
		case "go": return U();
		case "cpp": return W();
		case "swift": return Y ??= P.define(G), Y;
		default: return [];
	}
}
//#endregion
//#region src/components/code-pad/theme.ts
var Z = "var(--font-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)", ee = "var(--font-sans, system-ui, sans-serif)", te = "color-mix(in srgb, var(--color-primary) 22%, transparent)", ne = "color-mix(in srgb, var(--color-primary) 5%, transparent)", re = S.theme({
	"&": {
		height: "100%",
		color: "var(--color-text-primary)",
		backgroundColor: "var(--color-surface)"
	},
	"&.cm-focused": { outline: "none" },
	".cm-scroller": {
		fontFamily: Z,
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
		fontFamily: ee,
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
}), ie = N.define([
	{
		tag: [
			K.keyword,
			K.controlKeyword,
			K.moduleKeyword,
			K.operatorKeyword,
			K.definitionKeyword,
			K.modifier
		],
		color: "var(--color-accent-fg)"
	},
	{
		tag: [
			K.string,
			K.special(K.string),
			K.regexp,
			K.character
		],
		color: "var(--color-success-fg)"
	},
	{
		tag: [
			K.number,
			K.bool,
			K.null,
			K.atom,
			K.unit
		],
		color: "var(--color-warning-fg)"
	},
	{
		tag: [
			K.comment,
			K.lineComment,
			K.blockComment,
			K.docComment
		],
		color: "var(--color-text-tertiary)",
		fontStyle: "italic"
	},
	{
		tag: [
			K.function(K.variableName),
			K.function(K.propertyName),
			K.definition(K.function(K.variableName))
		],
		color: "var(--color-info-fg)"
	},
	{
		tag: [
			K.typeName,
			K.className,
			K.namespace,
			K.definition(K.typeName)
		],
		color: "var(--color-primary-fg)"
	},
	{
		tag: [
			K.meta,
			K.annotation,
			K.processingInstruction
		],
		color: "var(--color-warning-fg)"
	},
	{
		tag: [
			K.operator,
			K.punctuation,
			K.separator,
			K.bracket
		],
		color: "var(--color-text-secondary)"
	},
	{
		tag: [K.propertyName, K.attributeName],
		color: "var(--color-text-primary)"
	},
	{
		tag: K.invalid,
		color: "var(--color-danger-fg)"
	},
	{
		tag: K.strong,
		fontWeight: "600"
	},
	{
		tag: K.emphasis,
		fontStyle: "italic"
	}
]), ae = L(ie), oe = y.define(), se = y.define();
function ce(e) {
	return e.annotation(se) ? "insert" : e.isUserEvent("input.paste") ? "paste" : e.isUserEvent("input.drop") ? "drop" : e.isUserEvent("input") ? "type" : e.isUserEvent("delete") ? "delete" : e.isUserEvent("undo") ? "undo" : e.isUserEvent("redo") ? "redo" : e.isUserEvent("move") ? "move" : "other";
}
var le = [
	"input",
	"delete",
	"undo",
	"redo",
	"move"
], ue = x.changeFilter.of((e) => !(e.startState.readOnly && le.some((t) => e.isUserEvent(t))));
function de(e) {
	return e ? [
		x.readOnly.of(!0),
		S.editable.of(!1),
		S.contentAttributes.of({
			tabindex: "0",
			"aria-readonly": "true"
		})
	] : [];
}
function fe(e) {
	return e ? O(e) : [];
}
function pe(e) {
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
function me({ ydoc: t, ytext: n, textName: r = "code", provider: i = null, user: a, defaultValue: o = "", value: s, onChange: c, language: l = "python", languages: f, extensions: p, readOnly: h = !1, placeholder: _, "aria-label": y = "Code", onPaste: O, onLocalEdit: N, variant: P = "framed", autoFocus: L = !1, className: B, ref: V }) {
	let H = m(null), U = m(null), W = m({
		language: new b(),
		readOnly: new b(),
		placeholder: new b(),
		label: new b(),
		extensions: new b()
	}), G = m({
		onChange: c,
		onPaste: O,
		onLocalEdit: N,
		language: l,
		languages: f,
		extensions: p,
		readOnly: h,
		placeholder: _,
		ariaLabel: y,
		value: s,
		defaultValue: o,
		autoFocus: L
	});
	G.current = {
		onChange: c,
		onPaste: O,
		onLocalEdit: N,
		language: l,
		languages: f,
		extensions: p,
		readOnly: h,
		placeholder: _,
		ariaLabel: y,
		value: s,
		defaultValue: o,
		autoFocus: L
	};
	let K = he(p), q = f && Object.prototype.hasOwnProperty.call(f, l) ? f[l] : void 0, J = n ?? (t ? t.getText(r) : null), Y = i?.awareness ?? null;
	u(() => {
		let e = H.current;
		if (!e) return;
		let t = W.current, n = G.current, r = (e, t, n) => {
			let { from: r, inserted: i, deleted: a, lines: o } = pe(e.changes), s = Date.now();
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
		J ? (i = new v.UndoManager(J), a = R(J, Y, { undoManager: i })) : a = [A(), E.of(j)];
		let o = [
			D(),
			T(),
			w(),
			C(),
			I(),
			F(),
			ae,
			re,
			E.of([...k, M]),
			a,
			ue,
			t.language.of(X(n.language, n.languages)),
			t.readOnly.of(de(n.readOnly)),
			t.placeholder.of(fe(n.placeholder)),
			t.label.of(S.contentAttributes.of({ "aria-label": n.ariaLabel })),
			S.updateListener.of((e) => {
				if (e.docChanged) {
					for (let t of e.transactions) t.docChanged && t.annotation(z) === void 0 && (t.annotation(oe) || r(t, ce(t), t.newDoc.length));
					G.current.onChange?.(e.state.doc.toString());
				}
			}),
			t.extensions.of(n.extensions ? [...n.extensions] : [])
		], s = J ? J.toString() : n.value ?? n.defaultValue, c = new S({
			parent: e,
			state: x.create({
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
	let Z = m({
		language: l,
		languageLoader: q,
		appExtensions: K
	});
	return u(() => {
		let e = Z.current;
		(e.language !== l || e.languageLoader !== q) && (Z.current = {
			...e,
			language: l,
			languageLoader: q
		}, U.current?.dispatch({ effects: W.current.language.reconfigure(X(l, G.current.languages)) }));
	}, [l, q]), u(() => {
		Z.current.appExtensions !== K && (Z.current = {
			...Z.current,
			appExtensions: K
		}, U.current?.dispatch({ effects: W.current.extensions.reconfigure(K ? [...K] : []) }));
	}, [K]), u(() => {
		U.current?.dispatch({ effects: W.current.readOnly.reconfigure(de(h)) });
	}, [h]), u(() => {
		U.current?.dispatch({ effects: W.current.placeholder.reconfigure(fe(_)) });
	}, [_]), u(() => {
		U.current?.dispatch({ effects: W.current.label.reconfigure(S.contentAttributes.of({ "aria-label": y })) });
	}, [y]), u(() => {
		let e = U.current;
		if (J || s === void 0 || !e) return;
		let t = e.state.doc.toString();
		t !== s && e.dispatch({
			changes: {
				from: 0,
				to: t.length,
				insert: s
			},
			annotations: oe.of(!0)
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
				annotations: se.of(!0),
				scrollIntoView: !0
			});
		},
		focus() {
			U.current?.focus();
		}
	}), []), /* @__PURE__ */ g("div", {
		ref: H,
		"data-testid": "code-pad",
		"data-language": l,
		"data-readonly": h ? "true" : void 0,
		"data-shared": J ? "true" : void 0,
		className: e("relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-surface font-code text-[13px] [&>.cm-editor]:min-h-0 [&>.cm-editor]:flex-1", P === "framed" && "rounded-md border border-solid border-border", B)
	});
}
function he(e) {
	let t = m(e), n = t.current;
	return n === e || n !== void 0 && e !== void 0 && n.length === e.length && n.every((t, n) => t === e[n]) || (t.current = e), t.current;
}
//#endregion
//#region src/components/code-pad/CodeRunOutput.tsx
var ge = {
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
function _e(e) {
	return ge[e]?.label ?? String(e);
}
function ve(e) {
	switch (e) {
		case "queued": return "Waiting to start.";
		case "compiling": return "Compiling…";
		case "running": return "Running. Nothing printed yet.";
		case "cancelled": return "The run was cancelled before it printed anything.";
		default: return "The program printed nothing.";
	}
}
function ye(e) {
	return e < 1e3 ? `${Math.round(e)} ms` : e < 6e4 ? `${(e / 1e3).toFixed(2)} s` : `${Math.floor(e / 6e4)} min ${Math.round(e % 6e4 / 1e3)} s`;
}
function be(e) {
	let t = e.replace(/\r\n?/g, "\n").split("\n");
	return t.length > 1 && t[t.length - 1] === "" && t.pop(), t;
}
var xe = {
	compile: "Compiler output",
	stdout: "Output",
	stderr: "Error output"
};
function Q(e, t, n) {
	let r = e === "stderr", a = [{
		id: `${e}-label`,
		message: /* @__PURE__ */ g(i, {
			size: "xs",
			weight: "semibold",
			tone: r ? "danger" : "secondary",
			"data-testid": `code-run-${e}-label`,
			children: xe[e]
		})
	}];
	return be(t).forEach((t, n) => {
		a.push({
			id: `${e}-${n}`,
			level: r ? "error" : void 0,
			message: r ? /* @__PURE__ */ g(i, {
				tone: "danger",
				children: t || " "
			}) : t || " "
		});
	}), n && a.push({
		id: `${e}-cut`,
		message: /* @__PURE__ */ g(i, {
			size: "xs",
			tone: "tertiary",
			"data-testid": `code-run-${e}-cut`,
			children: "Cut at the output limit; the rest was not kept."
		})
	}), a;
}
function Se({ status: n, stdout: o = "", stderr: l = "", compileOutput: u = "", truncated: d, exitCode: f, timeMs: p, peakMemoryMb: m, runBy: h, languageLabel: v, runtimeVersion: y, follow: b = !0, emptyMessage: x = "Nothing has been run yet.", actions: S, variant: C = "framed", className: w, "data-testid": T = "code-run-output" }) {
	let E = n ? ge[n] ?? {
		label: String(n),
		tone: "neutral",
		announce: String(n)
	} : null, D = n ? [
		...u ? Q("compile", u, !1) : [],
		...o || d?.stdout ? Q("stdout", o, !!d?.stdout) : [],
		...l || d?.stderr ? Q("stderr", l, !!d?.stderr) : []
	] : [], O = [v, y].filter(Boolean).join(" "), k = [];
	return h && k.push(h.startsWith("Run by") ? h : `Run by ${h}`), O && k.push(O), typeof p == "number" && Number.isFinite(p) && k.push(ye(p)), typeof m == "number" && Number.isFinite(m) && k.push(`${Math.round(m)} MB`), typeof f == "number" && k.push(`Exit code ${f}`), /* @__PURE__ */ _(a, {
		"data-testid": T,
		"data-status": n ?? void 0,
		"data-variant": C,
		className: e("flex min-h-0 min-w-0 flex-col", C === "flush" && "rounded-none border-0 bg-transparent", w),
		children: [
			/* @__PURE__ */ _(r, {
				gap: "sm",
				align: "center",
				justify: "between",
				wrap: !1,
				"data-testid": `${T}-header`,
				className: "min-w-0 shrink-0 border-b border-[var(--color-border)] px-3 py-2",
				children: [/* @__PURE__ */ _(r, {
					gap: "sm",
					align: "center",
					wrap: !1,
					className: "min-w-0",
					children: [E ? /* @__PURE__ */ g(t, {
						tone: E.tone,
						size: "sm",
						dot: E.live ? "pulse" : "static",
						"data-testid": `${T}-status`,
						children: E.label
					}) : /* @__PURE__ */ g(i, {
						size: "sm",
						weight: "semibold",
						tone: "secondary",
						children: "Output"
					}), k.length > 0 && /* @__PURE__ */ g(i, {
						size: "xs",
						tone: "tertiary",
						tabular: !0,
						truncate: !0,
						"data-testid": `${T}-facts`,
						children: k.join(" · ")
					})]
				}), S && /* @__PURE__ */ g(r, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: "shrink-0",
					"data-testid": `${T}-actions`,
					children: S
				})]
			}),
			/* @__PURE__ */ g(s, {
				as: "div",
				"data-testid": `${T}-announcer`,
				children: /* @__PURE__ */ g("span", {
					role: "status",
					"aria-live": "polite",
					"aria-atomic": "true",
					children: E ? E.announce : ""
				})
			}),
			/* @__PURE__ */ g(c, {
				lines: D,
				title: null,
				follow: b,
				announceLines: !1,
				showTimestamp: !1,
				showLevel: !1,
				showSource: !1,
				emptyMessage: n ? ve(n) : x,
				"data-testid": `${T}-log`,
				className: "min-h-0 flex-1 rounded-none border-0"
			})
		]
	});
}
//#endregion
//#region src/components/code-pad/CodePlayback.tsx
function Ce(e) {
	let t = Math.max(0, Math.floor((Number.isFinite(e) ? e : 0) / 1e3)), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = String(t % 60).padStart(2, "0");
	return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${i}` : `${r}:${i}`;
}
function we(e, t) {
	let n = 0, r = e.length - 1, i = -1;
	for (; n <= r;) {
		let a = n + r >> 1;
		e[a].atMs <= t ? (i = a, n = a + 1) : r = a - 1;
	}
	return i;
}
var Te = {
	question: "Question",
	run: "Run",
	paste: "Paste"
}, Ee = {
	question: "border-[var(--color-info-fg,#1d4ed8)] text-[var(--color-info-fg,#1d4ed8)]",
	run: "border-[var(--color-success-fg,#15803d)] text-[var(--color-success-fg,#15803d)]",
	paste: "border-[var(--color-warning-fg,#b45309)] text-[var(--color-warning-fg,#b45309)]"
};
function $(e) {
	return Te[e] ?? (e ? e.charAt(0).toUpperCase() + e.slice(1) : "Marker");
}
function De(e) {
	return $(e).charAt(0).toUpperCase();
}
var Oe = 24, ke = 24;
function Ae(e, t = Oe) {
	let n = [];
	return e.map((e) => {
		let r = n.findIndex((n) => e - n >= t);
		return r < 0 && (r = n.length), n[r] = e, r;
	});
}
function je(e, t) {
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
function Me({ frames: t, markers: a = [], durationMs: s, timeMs: c, onTimeChange: d, language: v = "python", languages: y, formatTime: b = Ce, emptyMessage: x = "No code was written.", className: S, "data-testid": C = "code-playback" }) {
	let [w, T] = h(c ?? 0), E = Math.max(0, Number.isFinite(s) ? s : 0), D = Math.min(E, Math.max(0, c ?? w)), O = l((e) => {
		let t = Math.min(E, Math.max(0, e));
		c === void 0 && T(t), d?.(t);
	}, [
		E,
		c,
		d
	]), k = p(() => [...t].sort((e, t) => e.atMs - t.atMs), [t]), A = p(() => [...a].sort((e, t) => e.atMs - t.atMs), [a]), j = we(k, D), M = j >= 0 ? k[j] : null, N = M?.text ?? "", P = M?.language ?? v, F = m(null), I = k.length > 0;
	u(() => {
		let e = F.current?.view;
		if (!e) return;
		let t = je(e.state.doc.toString(), N);
		t && e.dispatch({ changes: t });
	}, [N, I]);
	let L = we(A, D), R = L >= 0 ? A[L] : null, [z, B] = h(0), V = m([]), H = Math.min(z, Math.max(0, A.length - 1)), U = (e, t) => {
		let n = -1;
		e.key === "ArrowRight" || e.key === "ArrowDown" ? n = Math.min(A.length - 1, t + 1) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? n = Math.max(0, t - 1) : e.key === "Home" ? n = 0 : e.key === "End" && (n = A.length - 1), !(n < 0) && (e.preventDefault(), B(n), V.current[n]?.focus());
	}, W = (e) => E > 0 ? Math.min(100, Math.max(0, e / E * 100)) : 0, G = m(null), [K, q] = h(0), J = A.length > 0;
	f(() => {
		let e = G.current;
		if (!e) return;
		let t = () => q(e.getBoundingClientRect().width);
		if (t(), typeof ResizeObserver > "u") return;
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [J]);
	let Y = p(() => K > 0 && E > 0 ? Ae(A.map((e) => Math.min(E, Math.max(0, e.atMs)) / E * K)) : A.map(() => 0), [
		A,
		K,
		E
	]), X = Y.reduce((e, t) => Math.max(e, t + 1), 1), Z = E > 2e4 ? 1e3 : 100;
	return /* @__PURE__ */ _(n, {
		gap: "sm",
		"data-testid": C,
		className: e("min-h-0 min-w-0", S),
		children: [I ? /* @__PURE__ */ g(me, {
			ref: F,
			readOnly: !0,
			defaultValue: N,
			language: P,
			languages: y,
			"aria-label": "Code playback",
			className: "min-h-0 flex-1"
		}) : /* @__PURE__ */ g(n, {
			gap: "none",
			align: "center",
			justify: "center",
			"data-testid": `${C}-empty`,
			className: "min-h-0 flex-1 rounded-md border border-border py-8",
			children: /* @__PURE__ */ g(i, {
				size: "sm",
				tone: "tertiary",
				children: x
			})
		}), /* @__PURE__ */ _(n, {
			gap: "xs",
			"data-testid": `${C}-timeline`,
			className: "shrink-0",
			children: [
				A.length > 0 && /* @__PURE__ */ g("div", {
					ref: G,
					role: "group",
					"aria-label": "Moments",
					"data-testid": `${C}-markers`,
					"data-rows": X,
					className: "relative mx-2 h-6",
					style: X > 1 ? { height: `${(X - 1) * ke + 24}px` } : void 0,
					children: A.map((t, n) => {
						let r = $(t.kind), i = `${r}: ${t.label}${t.detail ? `. ${t.detail}` : ""}, at ${b(t.atMs)}`;
						return /* @__PURE__ */ g("button", {
							ref: (e) => {
								V.current[n] = e;
							},
							type: "button",
							"data-ui-part": "",
							"data-testid": `${C}-marker`,
							"data-kind": t.kind,
							"data-row": Y[n] ?? 0,
							"data-passed": t.atMs <= D ? "true" : void 0,
							tabIndex: n === H ? 0 : -1,
							"aria-label": i,
							title: `${r}: ${t.label}${t.detail ? ` (${t.detail})` : ""} at ${b(t.atMs)}`,
							onClick: () => {
								B(n), O(t.atMs);
							},
							onFocus: () => B(n),
							onKeyDown: (e) => U(e, n),
							className: e("absolute top-0 flex h-5 min-w-5 -translate-x-1/2 cursor-pointer items-center justify-center rounded border border-solid bg-surface px-1 font-mono text-[10px] font-semibold leading-none", "outline-none focus-visible:ring-2 focus-visible:ring-primary", Ee[t.kind] ?? "border-border text-text-secondary", t.atMs <= D ? "opacity-100" : "opacity-70"),
							style: Y[n] ? {
								left: `${W(t.atMs)}%`,
								top: `${Y[n] * ke}px`
							} : { left: `${W(t.atMs)}%` },
							children: De(t.kind)
						}, `${t.atMs}-${n}`);
					})
				}),
				/* @__PURE__ */ g(o, {
					value: D,
					onChange: O,
					min: 0,
					max: E,
					step: Z,
					readout: !1,
					"aria-label": "Time in the code",
					"aria-valuetext": `${b(D)} of ${b(E)}`,
					"data-testid": `${C}-slider`
				}),
				/* @__PURE__ */ _(r, {
					gap: "sm",
					justify: "between",
					wrap: !1,
					className: "min-w-0",
					children: [/* @__PURE__ */ _(i, {
						size: "xs",
						tone: "secondary",
						tabular: !0,
						"data-testid": `${C}-time`,
						children: [
							b(D),
							" / ",
							b(E)
						]
					}), R && /* @__PURE__ */ _(i, {
						size: "xs",
						tone: "tertiary",
						truncate: !0,
						"data-testid": `${C}-current`,
						children: [
							$(R.kind),
							": ",
							R.label,
							" at ",
							b(R.atMs)
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { q as CODE_PAD_LANGUAGES, me as CodePad, Me as CodePlayback, Se as CodeRunOutput, De as codePlaybackMarkerLetter, Ae as codePlaybackMarkerRows, _e as codeRunStatusLabel, J as isCodePadLanguage };
