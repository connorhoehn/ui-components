import { t as e } from "./cn-D4QmbyEy.js";
import { useEffect as t, useImperativeHandle as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
import * as a from "yjs";
import { Annotation as o, Compartment as s, EditorState as c } from "@codemirror/state";
import { EditorView as l, drawSelection as ee, highlightActiveLine as te, highlightActiveLineGutter as u, keymap as d, lineNumbers as f, placeholder as p } from "@codemirror/view";
import { defaultKeymap as m, history as h, historyKeymap as g, indentWithTab as _ } from "@codemirror/commands";
import { HighlightStyle as v, StreamLanguage as y, bracketMatching as b, indentOnInput as x, syntaxHighlighting as S } from "@codemirror/language";
import { yCollab as C, ySyncAnnotation as w } from "y-codemirror.next";
import { python as T } from "@codemirror/lang-python";
import { javascript as E } from "@codemirror/lang-javascript";
import { java as D } from "@codemirror/lang-java";
import { go as O } from "@codemirror/lang-go";
import { cpp as k } from "@codemirror/lang-cpp";
import { swift as A } from "@codemirror/legacy-modes/mode/swift";
import { tags as j } from "@lezer/highlight";
//#region src/components/code-pad/languages.ts
var M = [
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
function N(e) {
	return typeof e == "string" && M.some((t) => t.value === e);
}
var P = null;
function F(e) {
	switch (e) {
		case "python": return T();
		case "javascript": return E();
		case "typescript": return E({ typescript: !0 });
		case "java": return D();
		case "go": return O();
		case "cpp": return k();
		case "swift": return P ??= y.define(A), P;
		default: return [];
	}
}
//#endregion
//#region src/components/code-pad/theme.ts
var I = "var(--font-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)", L = "var(--font-sans, system-ui, sans-serif)", R = "color-mix(in srgb, var(--color-primary) 22%, transparent)", z = "color-mix(in srgb, var(--color-primary) 5%, transparent)", B = l.theme({
	"&": {
		height: "100%",
		color: "var(--color-text-primary)",
		backgroundColor: "var(--color-surface)"
	},
	"&.cm-focused": { outline: "none" },
	".cm-scroller": {
		fontFamily: I,
		lineHeight: "1.6"
	},
	".cm-content": {
		caretColor: "var(--color-text-primary)",
		paddingBlock: "8px"
	},
	".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--color-text-primary)" },
	"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: R },
	".cm-activeLine": { backgroundColor: z },
	".cm-gutters": {
		backgroundColor: "var(--color-surface-panel)",
		color: "var(--color-text-tertiary)",
		borderRight: "1px solid var(--color-border)"
	},
	".cm-activeLineGutter": {
		backgroundColor: z,
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
		fontFamily: L,
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
}), V = v.define([
	{
		tag: [
			j.keyword,
			j.controlKeyword,
			j.moduleKeyword,
			j.operatorKeyword,
			j.definitionKeyword,
			j.modifier
		],
		color: "var(--color-accent-fg)"
	},
	{
		tag: [
			j.string,
			j.special(j.string),
			j.regexp,
			j.character
		],
		color: "var(--color-success-fg)"
	},
	{
		tag: [
			j.number,
			j.bool,
			j.null,
			j.atom,
			j.unit
		],
		color: "var(--color-warning-fg)"
	},
	{
		tag: [
			j.comment,
			j.lineComment,
			j.blockComment,
			j.docComment
		],
		color: "var(--color-text-tertiary)",
		fontStyle: "italic"
	},
	{
		tag: [
			j.function(j.variableName),
			j.function(j.propertyName),
			j.definition(j.function(j.variableName))
		],
		color: "var(--color-info-fg)"
	},
	{
		tag: [
			j.typeName,
			j.className,
			j.namespace,
			j.definition(j.typeName)
		],
		color: "var(--color-primary-fg)"
	},
	{
		tag: [
			j.meta,
			j.annotation,
			j.processingInstruction
		],
		color: "var(--color-warning-fg)"
	},
	{
		tag: [
			j.operator,
			j.punctuation,
			j.separator,
			j.bracket
		],
		color: "var(--color-text-secondary)"
	},
	{
		tag: [j.propertyName, j.attributeName],
		color: "var(--color-text-primary)"
	},
	{
		tag: j.invalid,
		color: "var(--color-danger-fg)"
	},
	{
		tag: j.strong,
		fontWeight: "600"
	},
	{
		tag: j.emphasis,
		fontStyle: "italic"
	}
]), H = S(V), U = o.define(), W = o.define();
function G(e) {
	return e.annotation(W) ? "insert" : e.isUserEvent("input.paste") ? "paste" : e.isUserEvent("input.drop") ? "drop" : e.isUserEvent("input") ? "type" : e.isUserEvent("delete") ? "delete" : e.isUserEvent("undo") ? "undo" : e.isUserEvent("redo") ? "redo" : e.isUserEvent("move") ? "move" : "other";
}
var K = [
	"input",
	"delete",
	"undo",
	"redo",
	"move"
], q = c.changeFilter.of((e) => !(e.startState.readOnly && K.some((t) => e.isUserEvent(t))));
function J(e) {
	return e ? [
		c.readOnly.of(!0),
		l.editable.of(!1),
		l.contentAttributes.of({
			tabindex: "0",
			"aria-readonly": "true"
		})
	] : [];
}
function Y(e) {
	return e ? p(e) : [];
}
function X(e) {
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
function Z({ ydoc: o, ytext: p, textName: v = "code", provider: y = null, user: S, defaultValue: T = "", value: E, onChange: D, language: O = "python", readOnly: k = !1, placeholder: A, "aria-label": j = "Code", onPaste: M, onLocalEdit: N, variant: P = "framed", autoFocus: I = !1, className: L, ref: R }) {
	let z = r(null), V = r(null), K = r({
		language: new s(),
		readOnly: new s(),
		placeholder: new s(),
		label: new s()
	}), Z = r({
		onChange: D,
		onPaste: M,
		onLocalEdit: N,
		language: O,
		readOnly: k,
		placeholder: A,
		ariaLabel: j,
		value: E,
		defaultValue: T,
		autoFocus: I
	});
	Z.current = {
		onChange: D,
		onPaste: M,
		onLocalEdit: N,
		language: O,
		readOnly: k,
		placeholder: A,
		ariaLabel: j,
		value: E,
		defaultValue: T,
		autoFocus: I
	};
	let Q = p ?? (o ? o.getText(v) : null), $ = y?.awareness ?? null;
	return t(() => {
		let e = z.current;
		if (!e) return;
		let t = K.current, n = Z.current, r = (e, t, n) => {
			let { from: r, inserted: i, deleted: a, lines: o } = X(e.changes), s = Date.now();
			Z.current.onLocalEdit?.({
				kind: t,
				from: r,
				inserted: i,
				deleted: a,
				length: n,
				at: s
			}), (t === "paste" || t === "drop") && i > 0 && Z.current.onPaste?.({
				characters: i,
				lines: o,
				from: r,
				at: s,
				via: t === "paste" ? "paste" : "drop"
			});
		}, i = null, o;
		Q ? (i = new a.UndoManager(Q), o = C(Q, $, { undoManager: i })) : o = [h(), d.of(g)];
		let s = [
			f(),
			u(),
			te(),
			ee(),
			x(),
			b(),
			H,
			B,
			d.of([...m, _]),
			o,
			q,
			t.language.of(F(n.language)),
			t.readOnly.of(J(n.readOnly)),
			t.placeholder.of(Y(n.placeholder)),
			t.label.of(l.contentAttributes.of({ "aria-label": n.ariaLabel })),
			l.updateListener.of((e) => {
				if (e.docChanged) {
					for (let t of e.transactions) t.docChanged && t.annotation(w) === void 0 && (t.annotation(U) || r(t, G(t), t.newDoc.length));
					Z.current.onChange?.(e.state.doc.toString());
				}
			})
		], p = Q ? Q.toString() : n.value ?? n.defaultValue, v = new l({
			parent: e,
			state: c.create({
				doc: p,
				extensions: s
			})
		});
		V.current = v;
		let y = null;
		if (Q && i) {
			let e = i;
			y = (t, n) => {
				if (n.origin !== e) return;
				let r = 0, i = Infinity, a = 0, o = 0;
				for (let e of t.delta) e.retain && (r += e.retain), typeof e.insert == "string" && (i = Math.min(i, r), a += e.insert.length, r += e.insert.length), e.delete && (i = Math.min(i, r), o += e.delete);
				Z.current.onLocalEdit?.({
					kind: e.undoing ? "undo" : "redo",
					from: Number.isFinite(i) ? i : 0,
					inserted: a,
					deleted: o,
					length: Q.length,
					at: Date.now()
				});
			}, Q.observe(y);
		}
		return n.autoFocus && v.focus(), () => {
			y && Q && Q.unobserve(y), v.destroy(), i?.destroy(), V.current === v && (V.current = null);
		};
	}, [Q, $]), t(() => {
		if (!$ || !S) return;
		let e = $.getLocalState()?.user ?? {};
		$.setLocalStateField("user", {
			...e,
			name: S.name,
			color: S.color,
			colorLight: S.colorLight ?? `color-mix(in srgb, ${S.color} 20%, transparent)`
		});
	}, [
		$,
		S?.name,
		S?.color,
		S?.colorLight
	]), t(() => {
		if ($) return () => {
			$.getLocalState() && $.setLocalStateField("cursor", null);
		};
	}, [$]), t(() => {
		V.current?.dispatch({ effects: K.current.language.reconfigure(F(O)) });
	}, [O]), t(() => {
		V.current?.dispatch({ effects: K.current.readOnly.reconfigure(J(k)) });
	}, [k]), t(() => {
		V.current?.dispatch({ effects: K.current.placeholder.reconfigure(Y(A)) });
	}, [A]), t(() => {
		V.current?.dispatch({ effects: K.current.label.reconfigure(l.contentAttributes.of({ "aria-label": j })) });
	}, [j]), t(() => {
		let e = V.current;
		if (Q || E === void 0 || !e) return;
		let t = e.state.doc.toString();
		t !== E && e.dispatch({
			changes: {
				from: 0,
				to: t.length,
				insert: E
			},
			annotations: U.of(!0)
		});
	}, [E, Q]), n(R, () => ({
		get view() {
			return V.current;
		},
		getText() {
			return V.current?.state.doc.toString() ?? "";
		},
		insertText(e, t = "cursor") {
			let n = V.current;
			if (!n) return;
			let r = n.state.doc.length, i = typeof t == "number" ? Math.max(0, Math.min(t, r)) : t === "start" ? 0 : t === "end" ? r : n.state.selection.main.head;
			n.dispatch({
				changes: {
					from: i,
					insert: e
				},
				selection: { anchor: i + e.length },
				annotations: W.of(!0),
				scrollIntoView: !0
			});
		},
		focus() {
			V.current?.focus();
		}
	}), []), /* @__PURE__ */ i("div", {
		ref: z,
		"data-testid": "code-pad",
		"data-language": O,
		"data-readonly": k ? "true" : void 0,
		"data-shared": Q ? "true" : void 0,
		className: e("relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-surface font-code text-[13px] [&>.cm-editor]:min-h-0 [&>.cm-editor]:flex-1", P === "framed" && "rounded-md border border-solid border-border", L)
	});
}
//#endregion
export { M as CODE_PAD_LANGUAGES, Z as CodePad, N as isCodePadLanguage };
