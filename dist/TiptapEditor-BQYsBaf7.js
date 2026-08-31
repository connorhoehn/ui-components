import { t as e } from "./cn-DhjIN-s0.js";
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
//#region src/components/doc-editor/EditorToolbar.tsx
var y = [
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
function b({ editor: t }) {
	return t ? /* @__PURE__ */ o("div", {
		className: e("flex flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-surface-panel rounded-t-lg"),
		children: y.map((n) => {
			let r = n.isActive(t);
			return /* @__PURE__ */ o("button", {
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
//#region src/components/doc-editor/TiptapEditor.tsx
function x(e, t, n) {
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
function S({ cursors: e, editorView: t, containerEl: n }) {
	return t ? /* @__PURE__ */ o(a, { children: e.map((e) => {
		if (e.head == null) return null;
		let r = x(t, e.head, n);
		if (!r) return null;
		let i = e.name.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2) || e.name.slice(0, 2).toUpperCase(), a = [];
		if (e.anchor != null && e.anchor !== e.head) {
			let r = Math.min(e.anchor, e.head), i = Math.max(e.anchor, e.head);
			try {
				let s = t.dom.offsetWidth, c = r;
				for (; c <= i;) {
					let l = x(t, c, n);
					if (!l) break;
					let u = c, d = l.top;
					for (let e = c + 1; e <= i; e++) {
						let r = x(t, e, n);
						if (!r || Math.abs(r.top - d) > 2) break;
						u = e;
					}
					let f = x(t, u, n);
					if (f) {
						let t = c === r ? l.left : 0, n = u === i ? f.left + 4 : s;
						a.push(/* @__PURE__ */ o("div", {
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
function C({ fragment: a, ydoc: y, provider: x, user: C, editable: w = !0, placeholder: T = "Start typing...", sectionId: E, onUpdateCursorInfo: D, extensions: O }) {
	let k = r(() => [
		d.configure({ history: !1 }),
		f,
		p.configure({ nested: !0 }),
		m.configure({ placeholder: T }),
		h.configure({
			document: y,
			fragment: a
		}),
		...O ?? []
	], [
		y,
		a,
		O
	]), A = u({
		extensions: k,
		editable: w
	}, [k]), [j, M] = i([]), [N, P] = i(null);
	n(() => {
		if (D) D(C.name, C.color);
		else if (x?.awareness) {
			let e = x.awareness.getLocalState()?.user || {};
			x.awareness.setLocalStateField("user", {
				...e,
				name: C.name,
				color: C.color
			});
		}
	}, [
		x,
		C,
		D
	]);
	let F = t(() => {
		if (!x?.awareness || !A?.view) return;
		let e = x.awareness.getStates(), t = x.awareness.clientID, n = [];
		e.forEach((e, r) => {
			if (r === t) return;
			let i = e.user;
			if (!(!i || !e.cursor) && !(E && e.cursor.sectionId !== E)) try {
				let t = v.getState(A.view.state);
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
		}), M(n);
	}, [
		x,
		A,
		E
	]);
	return n(() => {
		if (!A?.view || !x?.awareness) return;
		let e = () => {
			try {
				let e = v.getState(A.view.state);
				if (!e?.type || !e?.binding?.mapping) return;
				let { anchor: t, head: n } = A.view.state.selection, r = g(t, e.type, e.binding.mapping), i = g(n, e.type, e.binding.mapping);
				x.awareness.setLocalStateField("cursor", {
					anchor: r,
					head: i,
					sectionId: E
				});
			} catch {}
		};
		return A.on("selectionUpdate", e), e(), () => {
			A.off("selectionUpdate", e), x.awareness.setLocalStateField("cursor", null);
		};
	}, [
		A,
		x,
		E
	]), n(() => {
		if (!x?.awareness) return;
		let e = () => F();
		return x.awareness.on("change", e), () => {
			x.awareness.off("change", e);
		};
	}, [x, F]), /* @__PURE__ */ s("div", {
		className: e(w ? "border border-border rounded-lg overflow-hidden relative" : "relative"),
		children: [w && /* @__PURE__ */ o(b, { editor: A }), /* @__PURE__ */ s("div", {
			ref: P,
			className: e("px-4 py-3 text-sm leading-relaxed text-text-primary relative"),
			children: [/* @__PURE__ */ o(l, { editor: A }), /* @__PURE__ */ o(S, {
				cursors: j,
				editorView: A?.view,
				containerEl: N
			})]
		})]
	});
}
//#endregion
export { b as n, C as t };
