import { t as e } from "./cn-D4QmbyEy.js";
import { useCallback as t, useEffect as n, useMemo as r, useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import * as c from "yjs";
import { EditorContent as l, useEditor as u } from "@tiptap/react";
import d from "@tiptap/starter-kit";
import f from "@tiptap/extension-task-list";
import p from "@tiptap/extension-task-item";
import m from "@tiptap/extension-placeholder";
import h from "@tiptap/extension-collaboration";
import { absolutePositionToRelativePosition as g, relativePositionToAbsolutePosition as _, ySyncPluginKey as v } from "@tiptap/y-tiptap";
import { Extension as y } from "@tiptap/core";
//#region src/components/doc-editor/EditorToolbar.tsx
var b = [
	{
		label: "B",
		action: (e) => {
			e.chain().focus().toggleBold().run();
		},
		isActive: (e) => e.isActive("bold")
	},
	{
		label: "I",
		action: (e) => {
			e.chain().focus().toggleItalic().run();
		},
		isActive: (e) => e.isActive("italic")
	},
	{
		label: "S",
		action: (e) => {
			e.chain().focus().toggleStrike().run();
		},
		isActive: (e) => e.isActive("strike")
	},
	{
		label: "</>",
		action: (e) => {
			e.chain().focus().toggleCode().run();
		},
		isActive: (e) => e.isActive("code")
	},
	{
		label: "H1",
		action: (e) => {
			e.chain().focus().toggleHeading({ level: 1 }).run();
		},
		isActive: (e) => e.isActive("heading", { level: 1 })
	},
	{
		label: "H2",
		action: (e) => {
			e.chain().focus().toggleHeading({ level: 2 }).run();
		},
		isActive: (e) => e.isActive("heading", { level: 2 })
	},
	{
		label: "H3",
		action: (e) => {
			e.chain().focus().toggleHeading({ level: 3 }).run();
		},
		isActive: (e) => e.isActive("heading", { level: 3 })
	},
	{
		label: "Bullet",
		action: (e) => {
			e.chain().focus().toggleBulletList().run();
		},
		isActive: (e) => e.isActive("bulletList")
	},
	{
		label: "Ordered",
		action: (e) => {
			e.chain().focus().toggleOrderedList().run();
		},
		isActive: (e) => e.isActive("orderedList")
	},
	{
		label: "Task",
		action: (e) => {
			e.chain().focus().toggleTaskList().run();
		},
		isActive: (e) => e.isActive("taskList")
	},
	{
		label: "Quote",
		action: (e) => {
			e.chain().focus().toggleBlockquote().run();
		},
		isActive: (e) => e.isActive("blockquote")
	},
	{
		label: "Code Block",
		action: (e) => {
			e.chain().focus().toggleCodeBlock().run();
		},
		isActive: (e) => e.isActive("codeBlock")
	},
	{
		label: "HR",
		action: (e) => {
			e.chain().focus().setHorizontalRule().run();
		},
		isActive: () => !1
	}
];
function x({ editor: t }) {
	return t ? /* @__PURE__ */ o("div", {
		className: e("flex flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-surface-panel rounded-t-lg"),
		children: b.map((n) => {
			let r = n.isActive(t);
			return /* @__PURE__ */ o("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => n.action(t),
				className: e("px-2 py-1 text-xs font-[inherit] border border-border-emphasis rounded cursor-pointer leading-snug", r ? "bg-info text-white" : "bg-surface text-text-primary"),
				title: n.label,
				children: n.label
			}, n.label);
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/canvasLineSpacing.ts
var S = [
	"1",
	"1.5",
	"2"
], C = {
	1: "Single",
	"1.5": "1.5",
	2: "Double"
};
function w(e) {
	return typeof e == "string" && S.includes(e);
}
function T(e) {
	return w(e) ? e : null;
}
function E(e) {
	let t = T(e);
	return !t || t === "1" ? {} : {
		"data-line-spacing": t,
		style: `line-height: calc(var(--doc-line, 1.5em) * ${t})`
	};
}
var D = y.create({
	name: "canvasLineSpacing",
	addOptions() {
		return { types: ["paragraph"] };
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { lineSpacing: {
				default: null,
				parseHTML: (e) => T(e.getAttribute("data-line-spacing")),
				renderHTML: (e) => E(e.lineSpacing)
			} }
		}];
	},
	addCommands() {
		return {
			setLineSpacing: (e) => ({ commands: t }) => w(e) ? e === "1" ? t.unsetLineSpacing() : this.options.types.map((n) => t.updateAttributes(n, { lineSpacing: e })).some(Boolean) : !1,
			unsetLineSpacing: () => ({ commands: e }) => this.options.types.map((t) => e.resetAttributes(t, "lineSpacing")).some(Boolean)
		};
	}
}), O = [
	"disc",
	"circle",
	"square"
], k = [
	"decimal",
	"lower-alpha",
	"upper-alpha",
	"lower-roman",
	"upper-roman"
], A = ["tiered-bullets", "outline"], j = {
	disc: "● Filled circle",
	circle: "○ Hollow circle",
	square: "■ Square",
	decimal: "1. 2. 3.",
	"lower-alpha": "a. b. c.",
	"upper-alpha": "A. B. C.",
	"lower-roman": "i. ii. iii.",
	"upper-roman": "I. II. III.",
	"tiered-bullets": "● ○ ■  Bullets by level",
	outline: "1. a. i.  Outline by level"
}, M = [
	...O,
	...k,
	...A
];
function N(e) {
	return typeof e == "string" && M.includes(e) ? e : null;
}
function P(e) {
	return O.includes(e) || e === "tiered-bullets" ? "bulletList" : "orderedList";
}
var F = y.create({
	name: "canvasListStyle",
	addGlobalAttributes() {
		return [{
			types: ["bulletList", "orderedList"],
			attributes: { listStyle: {
				default: null,
				parseHTML: (e) => N(e.getAttribute("data-list-style")),
				renderHTML: (e) => {
					let t = N(e.listStyle);
					return t ? { "data-list-style": t } : {};
				}
			} }
		}];
	},
	addCommands() {
		return { setListStyle: (e) => ({ chain: t, editor: n }) => {
			if (!N(e)) return !1;
			let r = P(e), i = t();
			return n.isActive(r) || (r === "bulletList" ? i.toggleBulletList() : i.toggleOrderedList()), i.updateAttributes(r, { listStyle: e }).run();
		} };
	}
});
//#endregion
//#region src/components/doc-editor/TiptapEditor.tsx
function I(e, t, n) {
	try {
		if (t < 0 || t > e.state.doc.content.size) return null;
		let r = e.coordsAtPos(t), i = (n || e.dom).getBoundingClientRect();
		return {
			top: r.top - i.top,
			left: r.left - i.left,
			height: r.bottom - r.top
		};
	} catch {
		return null;
	}
}
function L({ cursors: e, editorView: t, containerEl: n }) {
	return t ? /* @__PURE__ */ o(a, { children: e.map((e) => {
		if (e.head == null) return null;
		let r = I(t, e.head, n);
		if (!r) return null;
		let i = e.name.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2) || e.name.slice(0, 2).toUpperCase(), a = [];
		if (e.anchor != null && e.anchor !== e.head) {
			let r = Math.min(e.anchor, e.head), i = Math.max(e.anchor, e.head);
			try {
				let s = t.dom.offsetWidth, c = r;
				for (; c <= i;) {
					let l = I(t, c, n);
					if (!l) break;
					let u = c, d = l.top;
					for (let e = c + 1; e <= i; e++) {
						let r = I(t, e, n);
						if (!r || Math.abs(r.top - d) > 2) break;
						u = e;
					}
					let f = I(t, u, n);
					if (f) {
						let t = c === r ? l.left : 0, n = u === i ? f.left + 4 : s;
						a.push(/* @__PURE__ */ o("div", {
							"data-testid": "remote-selection",
							"data-remote-user": e.name,
							className: "absolute rounded-sm pointer-events-none opacity-[0.12] z-[5]",
							style: {
								top: d,
								left: t,
								width: Math.max(n - t, 4),
								height: l.height || 18,
								background: e.color
							}
						}, `sel-${e.clientId}-${c}`));
					}
					c = u + 1;
				}
			} catch {}
		}
		return /* @__PURE__ */ s("div", {
			className: "pointer-events-none",
			children: [
				a,
				/* @__PURE__ */ o("div", {
					"data-testid": "remote-cursor",
					"data-remote-user": e.name,
					className: "absolute w-0.5 opacity-40 rounded-[1px] pointer-events-none z-10 [animation:cursorBlink_1.2s_ease-in-out_infinite]",
					style: {
						top: r.top,
						left: r.left - 1,
						height: r.height || 18,
						background: e.color
					}
				}),
				/* @__PURE__ */ o("div", {
					className: "absolute w-2 opacity-[0.06] rounded pointer-events-none z-[9]",
					style: {
						top: r.top,
						left: r.left - 4,
						height: r.height || 18,
						background: e.color
					}
				}),
				/* @__PURE__ */ o("div", {
					className: "absolute text-white text-[10px] font-bold py-px px-[5px] rounded-[4px_4px_4px_0] whitespace-nowrap pointer-events-none z-[11] opacity-[0.55] shadow-[0_1px_4px_rgba(0,0,0,0.1)]",
					style: {
						top: r.top - 18,
						left: r.left - 2,
						background: e.color
					},
					title: e.name,
					children: i
				})
			]
		}, e.clientId);
	}) }) : null;
}
function R({ fragment: a, ydoc: y, provider: b, user: S, editable: C = !0, placeholder: w = "Start typing...", sectionId: T, onUpdateCursorInfo: E, extensions: O, chrome: k = "card", hideToolbar: A = !1, onEditorReady: j }) {
	let M = r(() => [
		d.configure({
			history: !1,
			undoRedo: !1
		}),
		f,
		p.configure({ nested: !0 }),
		m.configure({ placeholder: w }),
		D,
		F,
		h.configure({
			document: y,
			fragment: a
		}),
		...O ?? []
	], [
		y,
		a,
		O
	]), N = u({
		extensions: M,
		editable: C
	}, [M]);
	n(() => {
		!N || N.isDestroyed || N.isEditable !== C && N.setEditable(C);
	}, [N, C]);
	let [P, I] = i([]), [R, z] = i(null);
	n(() => {
		if (E) E(S.name, S.color);
		else if (b?.awareness) {
			let e = b.awareness.getLocalState()?.user || {};
			b.awareness.setLocalStateField("user", {
				...e,
				name: S.name,
				color: S.color
			});
		}
	}, [
		b,
		S,
		E
	]);
	let B = t(() => {
		if (!b?.awareness || !N?.view) return;
		let e = b.awareness.getStates(), t = b.awareness.clientID, n = [];
		e.forEach((e, r) => {
			if (r === t) return;
			let i = e.user;
			if (!(!i || !e.cursor) && !(T && e.cursor.sectionId !== T)) try {
				let t = v.getState(N.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let a = _(t.doc, t.type, c.createRelativePositionFromJSON(e.cursor.anchor), t.binding.mapping), o = _(t.doc, t.type, c.createRelativePositionFromJSON(e.cursor.head), t.binding.mapping);
				n.push({
					clientId: r,
					name: i.name || `User ${r}`,
					color: i.color || "var(--color-info)",
					anchor: a,
					head: o
				});
			} catch {}
		}), I(n);
	}, [
		b,
		N,
		T
	]);
	n(() => {
		if (!N?.view || !b?.awareness) return;
		let e = () => {
			try {
				let e = v.getState(N.view.state);
				if (!e?.type || !e?.binding?.mapping) return;
				let { anchor: t, head: n } = N.view.state.selection, r = g(t, e.type, e.binding.mapping), i = g(n, e.type, e.binding.mapping);
				b.awareness.setLocalStateField("cursor", {
					anchor: r,
					head: i,
					sectionId: T
				});
			} catch {}
		};
		return N.on("selectionUpdate", e), e(), () => {
			N.off("selectionUpdate", e), b.awareness.setLocalStateField("cursor", null);
		};
	}, [
		N,
		b,
		T
	]), n(() => {
		if (!b?.awareness) return;
		let e = () => B();
		return b.awareness.on("change", e), () => {
			b.awareness.off("change", e);
		};
	}, [b, B]);
	let V = k === "none";
	return n(() => {
		j?.(N);
	}, [N]), /* @__PURE__ */ s("div", {
		className: e(!V && C ? "border border-border rounded-lg overflow-hidden relative" : "relative"),
		children: [C && !A && /* @__PURE__ */ o(x, { editor: N }), /* @__PURE__ */ s("div", {
			ref: z,
			className: e("relative", V ? "leading-relaxed" : "px-4 py-3 text-sm leading-relaxed text-text-primary"),
			children: [/* @__PURE__ */ o(l, { editor: N }), /* @__PURE__ */ o(L, {
				cursors: P,
				editorView: N?.view,
				containerEl: R
			})]
		})]
	});
}
//#endregion
export { A as a, N as c, C as d, w as f, x as h, j as i, D as l, T as m, O as n, k as o, E as p, F as r, P as s, R as t, S as u };
