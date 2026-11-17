import { t as e } from "./cn-D4QmbyEy.js";
import { useEffect as t, useImperativeHandle as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
import * as a from "yjs";
import { Annotation as o, Compartment as s, EditorState as c } from "@codemirror/state";
import { EditorView as l, drawSelection as ee, highlightActiveLine as te, highlightActiveLineGutter as ne, keymap as u, lineNumbers as d, placeholder as f } from "@codemirror/view";
import { defaultKeymap as re, history as p, historyKeymap as m, indentWithTab as ie } from "@codemirror/commands";
import { HighlightStyle as h, StreamLanguage as g, bracketMatching as _, indentOnInput as v, syntaxHighlighting as y } from "@codemirror/language";
import { yCollab as ae, ySyncAnnotation as oe } from "y-codemirror.next";
import { python as b } from "@codemirror/lang-python";
import { javascript as x } from "@codemirror/lang-javascript";
import { java as S } from "@codemirror/lang-java";
import { go as C } from "@codemirror/lang-go";
import { cpp as w } from "@codemirror/lang-cpp";
import { swift as T } from "@codemirror/legacy-modes/mode/swift";
import { tags as E } from "@lezer/highlight";
//#region src/components/code-pad/languages.ts
var D = [
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
function O(e) {
	return typeof e == "string" && D.some((t) => t.value === e);
}
var k = null;
function A(e, t) {
	let n = t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : void 0;
	if (n) return n();
	switch (e) {
		case "python": return b();
		case "javascript": return x();
		case "typescript": return x({ typescript: !0 });
		case "java": return S();
		case "go": return C();
		case "cpp": return w();
		case "swift": return k ??= g.define(T), k;
		default: return [];
	}
}
//#endregion
//#region src/components/code-pad/theme.ts
var j = "var(--font-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)", M = "var(--font-sans, system-ui, sans-serif)", N = "color-mix(in srgb, var(--color-primary) 22%, transparent)", P = "color-mix(in srgb, var(--color-primary) 5%, transparent)", F = l.theme({
	"&": {
		height: "100%",
		color: "var(--color-text-primary)",
		backgroundColor: "var(--color-surface)"
	},
	"&.cm-focused": { outline: "none" },
	".cm-scroller": {
		fontFamily: j,
		lineHeight: "1.6"
	},
	".cm-content": {
		caretColor: "var(--color-text-primary)",
		paddingBlock: "8px"
	},
	".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--color-text-primary)" },
	"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: N },
	".cm-activeLine": { backgroundColor: P },
	".cm-gutters": {
		backgroundColor: "var(--color-surface-panel)",
		color: "var(--color-text-tertiary)",
		borderRight: "1px solid var(--color-border)"
	},
	".cm-activeLineGutter": {
		backgroundColor: P,
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
		fontFamily: M,
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
}), I = h.define([
	{
		tag: [
			E.keyword,
			E.controlKeyword,
			E.moduleKeyword,
			E.operatorKeyword,
			E.definitionKeyword,
			E.modifier
		],
		color: "var(--color-accent-fg)"
	},
	{
		tag: [
			E.string,
			E.special(E.string),
			E.regexp,
			E.character
		],
		color: "var(--color-success-fg)"
	},
	{
		tag: [
			E.number,
			E.bool,
			E.null,
			E.atom,
			E.unit
		],
		color: "var(--color-warning-fg)"
	},
	{
		tag: [
			E.comment,
			E.lineComment,
			E.blockComment,
			E.docComment
		],
		color: "var(--color-text-tertiary)",
		fontStyle: "italic"
	},
	{
		tag: [
			E.function(E.variableName),
			E.function(E.propertyName),
			E.definition(E.function(E.variableName))
		],
		color: "var(--color-info-fg)"
	},
	{
		tag: [
			E.typeName,
			E.className,
			E.namespace,
			E.definition(E.typeName)
		],
		color: "var(--color-primary-fg)"
	},
	{
		tag: [
			E.meta,
			E.annotation,
			E.processingInstruction
		],
		color: "var(--color-warning-fg)"
	},
	{
		tag: [
			E.operator,
			E.punctuation,
			E.separator,
			E.bracket
		],
		color: "var(--color-text-secondary)"
	},
	{
		tag: [E.propertyName, E.attributeName],
		color: "var(--color-text-primary)"
	},
	{
		tag: E.invalid,
		color: "var(--color-danger-fg)"
	},
	{
		tag: E.strong,
		fontWeight: "600"
	},
	{
		tag: E.emphasis,
		fontStyle: "italic"
	}
]), L = y(I), R = o.define(), z = o.define();
function B(e) {
	return e.annotation(z) ? "insert" : e.isUserEvent("input.paste") ? "paste" : e.isUserEvent("input.drop") ? "drop" : e.isUserEvent("input") ? "type" : e.isUserEvent("delete") ? "delete" : e.isUserEvent("undo") ? "undo" : e.isUserEvent("redo") ? "redo" : e.isUserEvent("move") ? "move" : "other";
}
var V = [
	"input",
	"delete",
	"undo",
	"redo",
	"move"
], H = c.changeFilter.of((e) => !(e.startState.readOnly && V.some((t) => e.isUserEvent(t))));
function U(e) {
	return e ? [
		c.readOnly.of(!0),
		l.editable.of(!1),
		l.contentAttributes.of({
			tabindex: "0",
			"aria-readonly": "true"
		})
	] : [];
}
function W(e) {
	return e ? f(e) : [];
}
function G(e) {
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
function K({ ydoc: o, ytext: f, textName: h = "code", provider: g = null, user: y, defaultValue: b = "", value: x, onChange: S, language: C = "python", languages: w, extensions: T, readOnly: E = !1, placeholder: D, "aria-label": O = "Code", onPaste: k, onLocalEdit: j, variant: M = "framed", autoFocus: N = !1, className: P, ref: I }) {
	let V = r(null), K = r(null), q = r({
		language: new s(),
		readOnly: new s(),
		placeholder: new s(),
		label: new s(),
		extensions: new s()
	}), J = r({
		onChange: S,
		onPaste: k,
		onLocalEdit: j,
		language: C,
		languages: w,
		extensions: T,
		readOnly: E,
		placeholder: D,
		ariaLabel: O,
		value: x,
		defaultValue: b,
		autoFocus: N
	});
	J.current = {
		onChange: S,
		onPaste: k,
		onLocalEdit: j,
		language: C,
		languages: w,
		extensions: T,
		readOnly: E,
		placeholder: D,
		ariaLabel: O,
		value: x,
		defaultValue: b,
		autoFocus: N
	};
	let Y = se(T), X = w && Object.prototype.hasOwnProperty.call(w, C) ? w[C] : void 0, Z = f ?? (o ? o.getText(h) : null), Q = g?.awareness ?? null;
	t(() => {
		let e = V.current;
		if (!e) return;
		let t = q.current, n = J.current, r = (e, t, n) => {
			let { from: r, inserted: i, deleted: a, lines: o } = G(e.changes), s = Date.now();
			J.current.onLocalEdit?.({
				kind: t,
				from: r,
				inserted: i,
				deleted: a,
				length: n,
				at: s
			}), (t === "paste" || t === "drop") && i > 0 && J.current.onPaste?.({
				characters: i,
				lines: o,
				from: r,
				at: s,
				via: t === "paste" ? "paste" : "drop"
			});
		}, i = null, o;
		Z ? (i = new a.UndoManager(Z), o = ae(Z, Q, { undoManager: i })) : o = [p(), u.of(m)];
		let s = [
			d(),
			ne(),
			te(),
			ee(),
			v(),
			_(),
			L,
			F,
			u.of([...re, ie]),
			o,
			H,
			t.language.of(A(n.language, n.languages)),
			t.readOnly.of(U(n.readOnly)),
			t.placeholder.of(W(n.placeholder)),
			t.label.of(l.contentAttributes.of({ "aria-label": n.ariaLabel })),
			l.updateListener.of((e) => {
				if (e.docChanged) {
					for (let t of e.transactions) t.docChanged && t.annotation(oe) === void 0 && (t.annotation(R) || r(t, B(t), t.newDoc.length));
					J.current.onChange?.(e.state.doc.toString());
				}
			}),
			t.extensions.of(n.extensions ? [...n.extensions] : [])
		], f = Z ? Z.toString() : n.value ?? n.defaultValue, h = new l({
			parent: e,
			state: c.create({
				doc: f,
				extensions: s
			})
		});
		K.current = h;
		let g = null;
		if (Z && i) {
			let e = i;
			g = (t, n) => {
				if (n.origin !== e) return;
				let r = 0, i = Infinity, a = 0, o = 0;
				for (let e of t.delta) e.retain && (r += e.retain), typeof e.insert == "string" && (i = Math.min(i, r), a += e.insert.length, r += e.insert.length), e.delete && (i = Math.min(i, r), o += e.delete);
				J.current.onLocalEdit?.({
					kind: e.undoing ? "undo" : "redo",
					from: Number.isFinite(i) ? i : 0,
					inserted: a,
					deleted: o,
					length: Z.length,
					at: Date.now()
				});
			}, Z.observe(g);
		}
		return n.autoFocus && h.focus(), () => {
			g && Z && Z.unobserve(g), h.destroy(), i?.destroy(), K.current === h && (K.current = null);
		};
	}, [Z, Q]), t(() => {
		if (!Q || !y) return;
		let e = Q.getLocalState()?.user ?? {};
		Q.setLocalStateField("user", {
			...e,
			name: y.name,
			color: y.color,
			colorLight: y.colorLight ?? `color-mix(in srgb, ${y.color} 20%, transparent)`
		});
	}, [
		Q,
		y?.name,
		y?.color,
		y?.colorLight
	]), t(() => {
		if (Q) return () => {
			Q.getLocalState() && Q.setLocalStateField("cursor", null);
		};
	}, [Q]);
	let $ = r({
		language: C,
		languageLoader: X,
		appExtensions: Y
	});
	return t(() => {
		let e = $.current;
		(e.language !== C || e.languageLoader !== X) && ($.current = {
			...e,
			language: C,
			languageLoader: X
		}, K.current?.dispatch({ effects: q.current.language.reconfigure(A(C, J.current.languages)) }));
	}, [C, X]), t(() => {
		$.current.appExtensions !== Y && ($.current = {
			...$.current,
			appExtensions: Y
		}, K.current?.dispatch({ effects: q.current.extensions.reconfigure(Y ? [...Y] : []) }));
	}, [Y]), t(() => {
		K.current?.dispatch({ effects: q.current.readOnly.reconfigure(U(E)) });
	}, [E]), t(() => {
		K.current?.dispatch({ effects: q.current.placeholder.reconfigure(W(D)) });
	}, [D]), t(() => {
		K.current?.dispatch({ effects: q.current.label.reconfigure(l.contentAttributes.of({ "aria-label": O })) });
	}, [O]), t(() => {
		let e = K.current;
		if (Z || x === void 0 || !e) return;
		let t = e.state.doc.toString();
		t !== x && e.dispatch({
			changes: {
				from: 0,
				to: t.length,
				insert: x
			},
			annotations: R.of(!0)
		});
	}, [x, Z]), n(I, () => ({
		get view() {
			return K.current;
		},
		getText() {
			return K.current?.state.doc.toString() ?? "";
		},
		insertText(e, t = "cursor") {
			let n = K.current;
			if (!n) return;
			let r = n.state.doc.length, i = typeof t == "number" ? Math.max(0, Math.min(t, r)) : t === "start" ? 0 : t === "end" ? r : n.state.selection.main.head;
			n.dispatch({
				changes: {
					from: i,
					insert: e
				},
				selection: { anchor: i + e.length },
				annotations: z.of(!0),
				scrollIntoView: !0
			});
		},
		focus() {
			K.current?.focus();
		}
	}), []), /* @__PURE__ */ i("div", {
		ref: V,
		"data-testid": "code-pad",
		"data-language": C,
		"data-readonly": E ? "true" : void 0,
		"data-shared": Z ? "true" : void 0,
		className: e("relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-surface font-code text-[13px] [&>.cm-editor]:min-h-0 [&>.cm-editor]:flex-1", M === "framed" && "rounded-md border border-solid border-border", P)
	});
}
function se(e) {
	let t = r(e), n = t.current;
	return n === e || n !== void 0 && e !== void 0 && n.length === e.length && n.every((t, n) => t === e[n]) || (t.current = e), t.current;
}
//#endregion
export { D as CODE_PAD_LANGUAGES, K as CodePad, O as isCodePadLanguage };
